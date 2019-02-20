import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {select, Store} from '@ngrx/store';
import * as tasksSelector from 'src/app/store/task.selectors';
import * as taskActions from 'src/app/store/task.actions';
import * as interfaces from '../../contract/task.interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: interfaces.Task[];
  errorMessage: string;
  private _inputTask: string;
  tasks$: Observable<interfaces.Task[]>;

  constructor(private tasksService: TasksService,
              private store: Store<interfaces.TaskState>) { }

  ngOnInit() {
    this.store.dispatch(new taskActions.LoadTasks());
    this.tasks$ = this.store.pipe(select(tasksSelector.getTasksSelector));
  }

  onAdd(task: string): void {
    this.store.dispatch(new taskActions.AddTask(task));
    this._inputTask = '';
  }

  onDelete(task: string): void {
    this.store.dispatch(new taskActions.CompleteTask(task));
  }

  get inputTask(): string {
    return this._inputTask;
  }

  set inputTask(value: string) {
    this._inputTask = value;
  }

}
