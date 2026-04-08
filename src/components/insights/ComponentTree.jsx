/**
 * ComponentTree — Visualizes the generated component's structure.
 * Recursive tree with expand/collapse behavior.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Box, Type, Square } from 'lucide-react';
import useGeneratorStore from '../../store/generatorStore';
import './ComponentTree.css';

const TYPE_ICONS = {
  component: Box,
  div: Square,
  span: Type,
  button: Square,
  input: Square,
  form: Square,
  section: Square,
  nav: Square,
  h1: Type,
  h2: Type,
  h3: Type,
  p: Type,
  ul: Square,
  li: Square,
  table: Square,
  thead: Square,
  tbody: Square,
  select: Square,
};

function TreeNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = TYPE_ICONS[node.type] || Square;

  return (
    <div className="tree-node" style={{ '--depth': depth }}>
      <button
        className="tree-node__row"
        onClick={() => hasChildren && setExpanded(!expanded)}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
        ) : (
          <span className="tree-node__spacer" />
        )}
        <Icon size={12} className={`tree-node__type-icon tree-node__type-icon--${node.type}`} />
        <span className="tree-node__name">{node.name}</span>
        <span className="tree-node__type">&lt;{node.type}&gt;</span>
      </button>
      
      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.children.map((child, i) => (
              <TreeNode key={`${child.name}-${i}`} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComponentTree() {
  const { currentOutput } = useGeneratorStore();

  if (!currentOutput?.componentTree) return null;

  return (
    <div className="component-tree glass-card">
      <h4 className="component-tree__title">
        <Box size={14} /> Component Tree
      </h4>
      <div className="component-tree__content">
        <TreeNode node={currentOutput.componentTree} />
      </div>
    </div>
  );
}
