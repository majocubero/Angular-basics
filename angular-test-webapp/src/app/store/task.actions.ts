import { Action } from '@ngrx/store';
import {Task} from '../contract/task.interfaces';

export enum TaskActionTypes {
  LoadTasks = '[Task] Load Tasks',
  LoadTasksSuccess = '[Task] Load Tasks Success',
  AddTask = '[Task] Add Task',
  AddTaskSuccess = '[Task] Add Task Success',
  CompleteTask = '[Task] Delete Task',
  CompleteTaskSuccess = '[Task] Delete Task Success'

}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LoadTasks;
}

export class LoadTasksSuccess implements Action {
  readonly type = TaskActionTypes.LoadTasksSuccess;

  constructor (public payload: Task[]){}
}

export class AddTaskSuccess implements Action {
  readonly type = TaskActionTypes.AddTaskSuccess;

  constructor(public payload: Task[]){}
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;

  constructor(public payload: string){}
}

export class CompleteTaskSuccess implements Action {
  readonly type = TaskActionTypes.CompleteTaskSuccess;

  constructor(public payload: Task[]){}
}

export class CompleteTask implements Action {
  readonly type = TaskActionTypes.CompleteTask;

  constructor(public payload: string){}
}

export type TaskActions = LoadTasks
  | AddTask | CompleteTask | LoadTasksSuccess
  | AddTaskSuccess | CompleteTaskSuccess;
