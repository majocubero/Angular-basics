import {TaskStatus} from './task.enums';

export interface Task {
  id: string;
  taskName: string;
  taskStatus: TaskStatus;
}

export interface TaskState {
  tasks: Task[];
  error: string;
}

export interface TaskToAdd {
  taskName: string
}

export interface TaskToComplete {
  id: string
}
