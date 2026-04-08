/**
 * Generator Store — Core application state for UI generation.
 * 
 * Manages the entire lifecycle: prompt → processing → output → insights.
 * Includes history tracking and comparison mode state.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generatorService } from '../services/generatorService';
import { historyService } from '../services/historyService';
import { auditorService } from '../services/auditorService';
import useAuthStore from './authStore';

const useGeneratorStore = create(
  persist(
    (set, get) => ({
      // Input state
      prompt: '',
      
      // Processing state
      isGenerating: false,
      generationPhase: 'idle', // idle | analyzing | generating | scoring | complete | error
      progressMessages: [],
      
      // Output state
      currentOutput: null,
      currentAudit: null,
      
      // History
      history: [],
      isHistoryOpen: false,
      
      // Compare mode
      compareMode: false,
      compareItems: [], // max 2 items for side-by-side
      
      // Explain mode
      explainMode: false,
      
      // View mode for output
      outputView: 'preview', // preview | code
      
      // Refinement state
      isRefining: false,
      parentGenerationId: null,
      
      // Error state
      error: null,
      retryCount: 0,
      maxRetries: 3,
      
      // Generation Mode
      isFlowMode: false,

      // Theme Personality
      theme: 'obsidian', // obsidian | light | cyber

      // === ACTIONS ===
      
      setPrompt: (prompt) => set({ prompt }),
      
      setFlowMode: (isFlow) => set({ isFlowMode: isFlow }),
      
      setTheme: (theme) => set({ theme }),

      setAudit: (audit) => set({ currentAudit: audit }),

      setIsHistoryOpen: (isOpen) => set({ isHistoryOpen: isOpen }),
      
      setOutputView: (view) => set({ outputView: view }),
      
      toggleExplainMode: () => set((s) => ({ explainMode: !s.explainMode })),
      
      toggleCompareMode: () => set((s) => ({
        compareMode: !s.compareMode
      })),
      
      addToCompare: (item) => set((s) => {
        if (s.compareItems.length >= 2) return s;
        if (s.compareItems.find((i) => i.id === item.id)) return s;
        const newItems = [...s.compareItems, item];
        return { 
          compareItems: newItems,
          // Auto-open compare mode if we just filled the second slot
          compareMode: newItems.length === 2 ? true : s.compareMode
        };
      }),
      
      removeFromCompare: (id) => set((s) => ({
        compareItems: s.compareItems.filter((i) => i.id !== id),
      })),
      
      clearCompare: () => set({ compareItems: [] }),

      setRefineMode: (id) => set({ 
        isRefining: true, 
        parentGenerationId: id,
        prompt: ''
      }),
      
      clearRefineMode: () => set({ 
        isRefining: false, 
        parentGenerationId: null 
      }),

      fetchHistory: async () => {
        const token = useAuthStore.getState().token;
        if (!token) return;
        try {
          const remoteHistory = await historyService.getHistory(token);
          set({ history: remoteHistory });
        } catch (err) {
          console.error('History sync failed:', err);
          if (err.message.includes('Unauthorized') || err.message.includes('401')) {
            useAuthStore.getState().logout();
          }
        }
      },

      generate: async (promptText) => {
        const prompt = promptText || get().prompt;
        if (!prompt.trim()) {
          set({ error: 'Please enter a prompt to generate UI.' });
          return;
        }

        set({
          isGenerating: true,
          generationPhase: 'analyzing',
          progressMessages: ['Analyzing your prompt...'],
          error: null,
          retryCount: 0,
        });

        try {
          const parentId = get().parentGenerationId;
          const result = await generatorService.generate(prompt, (phase, message) => {
            set((s) => ({
              generationPhase: phase,
              progressMessages: [...s.progressMessages, message],
            }));
          }, parentId ? get().history.find(h => h.id === parentId) : null);

          const outputWithId = {
            ...result,
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            prompt,
            parentId: parentId || null,
            timestamp: new Date().toISOString(),
          };

          // 0. Perform Design Audit (Architectural Guardrail)
          const audit = await auditorService.audit(outputWithId);

          set((s) => ({
            isGenerating: false,
            isRefining: false,
            parentGenerationId: null,
            generationPhase: 'complete',
            currentOutput: outputWithId,
            currentAudit: audit,
            history: [outputWithId, ...s.history].slice(0, 50),
            prompt: '',
          }));

          // Sync to backend (Fire and forget or handle error)
          const token = useAuthStore.getState().token;
          if (token) {
            historyService.saveGeneration(outputWithId, token).catch(err => {
              if (err.message.includes('401')) useAuthStore.getState().logout();
              console.error(err);
            });
          }
        } catch (err) {
          const retries = get().retryCount;
          set({
            isGenerating: false,
            generationPhase: 'error',
            error: err.message || 'Generation failed. Please try again.',
            retryCount: retries + 1,
          });
        }
      },

      /**
       * Quantum Fix — Agentic Self-Correction Loop.
       * Uses the Auditor's findings to re-prompt and solve design violations.
       */
      quantumFix: async () => {
        const { currentOutput, currentAudit, generate } = get();
        if (!currentOutput || !currentAudit) return;

        const failureBrief = currentAudit.findings
          .map(f => `- ${f.rule}: ${f.message}`)
          .join('\n');

        const correctionPrompt = `REFINE THIS UI: The previous version had these violations. PLEASE FIX THEM:
${failureBrief}
Original intent was: ${currentOutput.prompt || 'the current component'}`;

        set({ isRefining: true, parentGenerationId: currentOutput.id });
        await generate(correctionPrompt);
      },

      retry: () => {
        const { retryCount, maxRetries } = get();
        if (retryCount >= maxRetries) {
          set({ error: `Maximum retries (${maxRetries}) exceeded. Please try a different prompt.` });
          return;
        }
        const lastPrompt = get().currentOutput?.prompt || get().prompt;
        if (lastPrompt) {
          get().generate(lastPrompt);
        }
      },
      
      selectFromHistory: (id) => {
        const item = get().history.find((h) => h.id === id);
        if (item) {
          set({ currentOutput: item, generationPhase: 'complete' });
        }
      },
      
      deleteFromHistory: (id) => {
        set((s) => ({
          history: s.history.filter((h) => h.id !== id),
          currentOutput: s.currentOutput?.id === id ? null : s.currentOutput,
        }));
        const token = useAuthStore.getState().token;
        if (token) {
          historyService.deleteItem(id, token).catch(err => {
            if (err.message.includes('401')) useAuthStore.getState().logout();
            console.error(err);
          });
        }
      },
      
      clearHistory: () => {
        set({ history: [], currentOutput: null });
        const token = useAuthStore.getState().token;
        if (token) historyService.clearHistory(token).catch(console.error);
      },
      
      clearOutput: () => set({
        currentOutput: null,
        generationPhase: 'idle',
        progressMessages: [],
        error: null,
      }),
      
      reset: () => set({
        prompt: '',
        isGenerating: false,
        generationPhase: 'idle',
        progressMessages: [],
        currentOutput: null,
        compareMode: false,
        compareItems: [],
        explainMode: false,
        outputView: 'preview',
        error: null,
        retryCount: 0,
      }),
    }),
    {
      name: 'generator-storage',
      partialize: (state) => ({
        history: state.history,
        theme: state.theme,
      }),
    }
  )
);

export default useGeneratorStore;
