import React, { useState } from 'react';
import { CalendarCheck2, CheckSquare, Square, Download, User } from 'lucide-react';
import { SprintTask } from '../types/repomind';

interface SprintPlannerViewProps {
  initialTasks: SprintTask[];
  onViewIssue?: (issueId: string) => void;
}

export const SprintPlannerView: React.FC<SprintPlannerViewProps> = ({
  initialTasks
}) => {
  const [tasks, setTasks] = useState<SprintTask[]>(initialTasks);
  const [sprintGoal] = useState('Reduce critical technical debt & resolve payment payload validation risk.');
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
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarCheck2 className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">📋 Engineering Sprint Planner</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Transform technical debt items directly into estimated engineering sprint backlogs.
          </p>
        </div>

        <button
          onClick={handleExportJira}
          className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-xs transition shadow-sm flex items-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Export to Jira / GitHub CSV →</span>
        </button>
      </div>

      {exportedMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-mono font-bold text-center animate-in fade-in duration-150">
          {exportedMsg}
        </div>
      )}

      {/* Goal & Progress Card */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#E4E4DE]">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-[#686862]">Sprint Allocation Goal</span>
            <div className="text-sm font-extrabold text-[#181816] mt-0.5">{sprintGoal}</div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] text-[#181816]">
              Total Effort: <span className="text-[#181816] font-bold">{totalEffort} hours</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C]">
              Completed: <span className="text-[#181816] font-bold">{completedEffort} / {totalEffort}h</span>
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
                  ? 'bg-[#F7F7F4] border-[#E4E4DE] text-[#96968E]' 
                  : 'bg-white hover:bg-[#F7F7F4] border-[#E4E4DE] text-[#181816]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-[#171717] shrink-0">
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-[#16803C]" />
                  ) : (
                    <Square className="w-5 h-5 text-[#96968E]" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-bold ${task.completed ? 'line-through text-[#96968E]' : 'text-[#181816]'}`}>
                    {task.title}
                  </div>
                  <div className="flex items-center space-x-3 mt-1 text-[10px] font-mono text-[#686862]">
                    <span>Category: {task.category}</span>
                    <span className="flex items-center space-x-1"><User className="w-3 h-3 text-[#171717]" /><span>Assignee: {task.assignee || 'Abhilanshu'}</span></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono shrink-0">
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  task.severity === 'critical' ? 'bg-rose-50 text-[#C53030] border border-rose-200' :
                  'bg-amber-50 text-[#B7791F] border border-amber-200'
                }`}>
                  {task.severity}
                </span>
                <span className="font-bold text-[#181816]">{task.effortHours} hours</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
