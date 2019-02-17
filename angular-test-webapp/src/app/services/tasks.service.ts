import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private getTasksUrl: string = 'http://localhost:8080';
  private addTaskUrl: string = 'http://localhost:8080/add';
  private deleteTaskUrl: string = 'http://localhost:8080/delete';

  constructor(private httpClient: HttpClient) { }

  getTasks (): Observable<string[]> {
    return this.httpClient.get<string[]>(this.getTasksUrl).pipe(
      tap(data => console.log("All: "+ JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteTask(task: string): Observable<string[]> {
    return this.httpClient.delete<string[]>(this.deleteTaskUrl, {
      params: {
        'task': task
      }
    });
  }

  addTask(task: string): Observable<string[]> {
    return this.httpClient.post<string[]>(this.addTaskUrl, {}, {
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
