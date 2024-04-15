import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private url = 'https://todo-backend-420400.ew.r.appspot.com/todos';

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(this.url);
  }

  public addTodo(todo: Todo):Observable<Todo>{
    return this.http.post<Todo>(this.url,todo);
  }

  public updateTodo(todo: Todo):Observable<Todo>{
    return this.http.put<Todo>(this.url, todo);
  }

  public deleteTodo(id:number){
    return this.http.delete(this.url+"/"+id);
  }

}
