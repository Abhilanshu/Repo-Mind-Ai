import React, { useState } from 'react';
import { CalendarCheck2, CheckSquare, Square, Download, Sparkles, Check, User } from 'lucide-react';
import { SprintTask } from '../types/repomind';

interface SprintPlannerViewProps {
  initialTasks: SprintTask[];
  onViewIssue?: (issueId: string) => void;
}

export const SprintPlannerView: React.FC<SprintPlannerViewProps> = ({
  initialTasks,
  onViewIssue
}) => {
  const [tasks, setTasks] = useState<SprintTask[]>(initialTasks);
  const [sprintGoal, setSprintGoal] = useState('Reduce critical technical debt & resolve security risk in core modules.');
  const [exportedMsg, setExportedMsg] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleExportJira = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Issue ID,Summary,Category,Severity,Effort (Hours),Completed,Assignee\n" + 
      tasks.map(t => `"${t.id}","${t.title}","${t.category}","${t.severity}",${t.effortHours},${t.completed},"${t.assignee || 'Unassigned'}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `repomind-sprint-backlog-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    setExportedMsg('✓ Sprint backlog exported to Jira / GitHub CSV format!');
    setTimeout(() => setExportedMsg(null), 3000);
  };

  const totalEffort = tasks.reduce((sum, t) => sum + t.effortHours, 0);
  const completedEffort = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.effortHours, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarCheck2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">📅 AI Sprint Planner</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Transform technical debt items directly into estimated engineering sprint backlogs.
          </p>
        </div>

        <button
          onClick={handleExportJira}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-lg shadow-purple-600/30 flex items-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4 text-purple-200" />
          <span>Export to Jira / GitHub CSV →</span>
        </button>
      </div>

      {exportedMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold text-center animate-in fade-in duration-150">
          {exportedMsg}
        </div>
      )}

      {/* Goal & Progress Card */}
      <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-[#160d33] to-[#120a29] border border-purple-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-purple-900/40">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-purple-400">Sprint 24 Allocation Goal</span>
            <div className="text-sm font-extrabold text-white mt-0.5">{sprintGoal}</div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300">
              Estimated Total Effort: <span className="text-white font-bold">{totalEffort} hours</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
              Completed: <span className="text-white font-bold">{completedEffort} / {totalEffort}h</span>
            </div>
          </div>
        </div>

        {/* Task List Checkboxes */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                task.completed 
                  ? 'bg-purple-950/20 border-purple-900/30 text-slate-400 opacity-60' 
                  : 'bg-purple-950/40 hover:bg-purple-900/40 border-purple-800/40 text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-purple-400 shrink-0">
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-bold ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-[10px] font-mono text-slate-400">
                    <span>Category: {task.category}</span>
                    <span className="flex items-center space-x-1"><User className="w-3 h-3 text-purple-400" /><span>Assignee: {task.assignee || 'Abhilanshu'}</span></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  task.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {task.severity}
                </span>
                <span className="font-bold text-purple-300">{task.effortHours} hours</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
