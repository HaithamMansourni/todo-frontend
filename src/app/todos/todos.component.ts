import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  

  activeTab: string = 'All';
  todos: Array<Todo>;
  todoForm: FormGroup;

  constructor(private todosService: TodosService,private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loadTodos();

    this.todoForm = this.formBuilder.group({
      title : '',
      completed : false
    });
  }

  toggleTodoStatus(todo) {
    this.todosService.updateTodo(todo).subscribe(todo => {
      console.log(todo);
    });
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  loadTodos() {
    this.todosService.getTodos().subscribe({
      next: data => {
        this.todos = data.reverse()
      },
      error: err => {
        console.log(err);
      }
    });;
  }

  getFilteredTodos(): Todo[] {

    if (this.activeTab === 'Active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.activeTab === 'Complete') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

  addTodo(){
    
    if(!this.todoForm.value.title.trim()) return;
    const newTodo: Todo = {
      title: this.todoForm.value.title,
      completed: this.todoForm.value.completed
    };
    this.todosService.addTodo(newTodo).subscribe({
      next : todo => {
        this.loadTodos();
        this.todoForm.reset();
      },
      error : err =>{
        console.log(err);
      }
    });
  }

  deleteTodo(todo){
    let conf = confirm("Vous Ãªtes sur?");
    if (!conf) return;
    this.todosService.deleteTodo(todo.id).subscribe({
      next : () => {
        this.loadTodos();
      },
      error : err =>{
        console.log(err);
      }
    });
  }


}
