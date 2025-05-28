import React from 'react';
import { Users } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

/**
 * @returns {JSX.Element}
 */
function CollaborationStatus() {
  const { connected, collaborators } = useEditorStore();

  if (!connected) {
    return (
      <div className="flex items-center text-slate-500 dark:text-slate-400 border-2 border-solid border-slate-200 dark:border-slate-600 rounded-md px-3 py-1">
        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
        <span className="text-sm">Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 border-2 border-solid border-slate-200 dark:border-slate-600 rounded-md px-3 py-1">
      <div className="flex items-center text-slate-700 dark:text-slate-300">
        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
        <span className="text-sm">Connected</span>
      </div>

      <div className="flex items-center text-slate-500 dark:text-slate-400">
        <Users className="h-4 w-4 mr-1" />
        <span className="text-sm">{collaborators.length} online</span>
      </div>
    </div>
  );
}

export default CollaborationStatus;