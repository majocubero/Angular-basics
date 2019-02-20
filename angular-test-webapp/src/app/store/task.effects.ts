import { Injectable } from '@angular/core';
import { Actions, Effect, ofType}  from '@ngrx/effects';
import { TasksService } from '../services/tasks.service';
import * as taskActions from 'src/app/store/task.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Task } from '../contract/task.interfaces';

@Injectable()
export class TaskEffects {

  constructor(private actions$: Actions,
              private tasksService: TasksService) {
  }

  @Effect() loadTasks$ = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.LoadTasks),
    mergeMap((action: taskActions.LoadTasks) =>
      this.tasksService.getTasks().pipe(
        map((tasks: Task[]) => (new taskActions.LoadTasksSuccess(tasks))),
      )
    )
  );

  @Effect() addTask$ = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.AddTask),
    mergeMap((action: taskActions.AddTask) =>
      this.tasksService.addTask(action.payload).pipe(
        map((tasks: Task[]) => (new taskActions.AddTaskSuccess(tasks))),
      )
    )
  );

  @Effect() completeTask$ = this.actions$.pipe(
    ofType(taskActions.TaskActionTypes.CompleteTask),
    mergeMap((action: taskActions.CompleteTask) =>
      this.tasksService.deleteTask(action.payload).pipe(
        map((tasks: Task[]) => (new taskActions.CompleteTaskSuccess(tasks))),
      )
    )
  );


}
