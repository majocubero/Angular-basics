import {initialState} from './task.initialState';
import {TaskState} from '../contract/task.interfaces';
import {TaskActions, TaskActionTypes} from './task.actions';
export function taskReducer(state = initialState, action: TaskActions): TaskState {
  switch (action.type) {
    case TaskActionTypes.AddTaskSuccess:
      return {
        ...state,
        tasks: action.payload, error: ''

      };
    case TaskActionTypes.CompleteTaskSuccess:
      return{
        ...state,
        tasks: action.payload, error: ''
      };
    case TaskActionTypes.LoadTasksSuccess:
      return{
        ...state,
        tasks: action.payload, error: ''
      };

    default:
      return state;
  }
}
