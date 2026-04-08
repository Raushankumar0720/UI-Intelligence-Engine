/**
 * Design Store — Manages the "Brand DNA" of the application.
 * 
 * This architectural layer ensures that AI generations are consistent
 * across the entire user journey by enforcing global design tokens.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDesignStore = create(
  persist(
    (set) => ({
      // Brand DNA Tokens
      dna: {
        primaryColor: '#8b5cf6', // Default Prism Purple
        borderRadius: '16px',
        glassIntensity: 40,      // Default Blur
        fontFamily: 'Outfit',
        theme: 'obsidian',       // obsidian | liquid | minimal
      },

      // Actions
      updateDNA: (newDNA) => set((state) => ({
        dna: { ...state.dna, ...newDNA }
      })),

      resetDNA: () => set({
        dna: {
          primaryColor: '#8b5cf6',
          borderRadius: '16px',
          glassIntensity: 40,
          fontFamily: 'Outfit',
          theme: 'obsidian',
        }
      }),
    }),
    {
      name: 'design-dna-storage',
    }
  )
);

export default useDesignStore;
