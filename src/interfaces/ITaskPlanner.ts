export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  color: string;
  completed: boolean;
  createdAt?: Date | string;
  completedAt?: Date | string;
}

export interface TaskListProps {
  tasks: Task[];
  handleDeleteTask: (taskId: string) => void;
  handleCheckTask: (task: Task) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
}

export interface NewTaskData {
  title: string;
  description?: string;
  category: string;
  color: string;
  completed: boolean;
  createdAt?: Date;
  completedAt?: Date;
}

export interface AddTaskProps {
  onAddTask: (task: NewTaskData) => void;
}

export interface TaskStatsProps {
  total?: number;
  completed?: number;
  pending?: number;
}

export interface GeneratedBatch {
  id: string;
  topic: string;
  tasks: Task[];
  createdAt: string;
}

export interface CreateSaveAIBatch {
  id: string;
  topic: string;
  tasks: Task[];
  createdAt: string;
}