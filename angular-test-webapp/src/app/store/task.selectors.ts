import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TaskState} from '../contract/task.interfaces';


const getTaskFeatureState = createFeatureSelector<TaskState>('tasks');

export const getTasksSelector = createSelector(
  getTaskFeatureState,
  state => state.tasks
);

export const getErrorSelector = createSelector(
  getTaskFeatureState,
  state => state.error
);
