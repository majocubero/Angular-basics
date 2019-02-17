import { Component, OnInit } from '@angular/core';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: string[];
  errorMessage: string;
  private _inputTask: string;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks().subscribe(tasks =>{
        this.tasks = tasks;
      },
      error => console.log(error)
    );
  }

  onAdd(task: string): void {
    this.tasksService.addTask(task).subscribe(tasks =>{
      this.tasks = tasks;
      this._inputTask = '';
    },
      error => console.log(error)
    );
  }

  onDelete(task: string): void {
    this.tasksService.deleteTask(task).subscribe(tasks =>{
        this.tasks = tasks;
      },
      error => console.log(error)
    );
  }

  get inputTask(): string {
    return this._inputTask;
  }

  set inputTask(value: string) {
    this._inputTask = value;
  }

}
