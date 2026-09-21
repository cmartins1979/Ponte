import React, { useState } from 'react';
import { ReminderItem } from '../types';
import { CheckCircle2, Circle, Clock, Plus, Trash2, Calendar } from 'lucide-react';

interface RemindersCardProps {
  reminders: ReminderItem[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (title: string, dueDate: string) => void;
  onDeleteReminder: (id: string) => void;
}

export const RemindersCard: React.FC<RemindersCardProps> = ({
  reminders,
  onToggleReminder,
  onAddReminder,
  onDeleteReminder,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddReminder(newTitle.trim(), newDate.trim() || 'Esta semana');
    setNewTitle('');
    setNewDate('');
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">Lembretes & Entregas</h3>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Novo</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="text"
            placeholder="Ex: Gravar áudio de 90s no grupo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 mb-2 focus:ring-1 focus:ring-sky-500"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Prazo (ex: Sexta, 18h)"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2.5">
        {reminders.map((item) => (
          <div
            key={item.id}
            className={`group flex items-start justify-between gap-2 p-2.5 rounded-xl border transition-all ${
              item.completed
                ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <button
              onClick={() => onToggleReminder(item.id)}
              className="flex items-start gap-2.5 text-left flex-1 min-w-0 cursor-pointer"
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 group-hover:text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="min-w-0">
                <p
                  className={`text-xs font-medium leading-snug truncate ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </p>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {item.dueDate}
                </span>
              </div>
            </button>

            <button
              onClick={() => onDeleteReminder(item.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
              title="Excluir lembrete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
