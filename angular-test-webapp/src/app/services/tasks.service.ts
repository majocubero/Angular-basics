import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { environment} from '../../environments/environment';
import { Task } from '../contract/task.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private getTasksUrl: string = environment.tasksService;
  private addTaskUrl: string = `${environment.tasksService}/add`;
  private deleteTaskUrl: string = `${environment.tasksService}/delete`;

  constructor(private httpClient: HttpClient) { }

  getTasks (): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.getTasksUrl).pipe(
      tap(data => console.log("All: "+ JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTask(task: string): Observable<Task[]> {
    return this.httpClient.delete<Task[]>(this.deleteTaskUrl, {
      params: {
        'task': task
      }
    });
  }

  addTask(task: string): Observable<Task[]> {
    return this.httpClient.post<Task[]>(this.addTaskUrl, {}, {
      params: {
        'task': task
      }
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred : ${err.error.message}`;
    }
    else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
