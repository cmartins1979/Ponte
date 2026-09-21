export type ModuleKey = 'inicio' | 'P' | 'O' | 'N' | 'T' | 'E' | 'portfolio';

export interface PonteModuleMeta {
  id: number;
  key: ModuleKey;
  letter: string;
  name: string;
  subtitle: string;
  color: string;
  quote: string;
}

export interface ReminderItem {
  id: string;
  title: string;
  dueDate: string;
  type: 'exercicio' | 'mentoria' | 'conversa' | 'outro';
  completed: boolean;
}

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  email: string;
}
