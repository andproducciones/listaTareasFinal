import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = 'https://luchandovenceras.online/backend/listatareas.php';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    })
  };

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTasks(): Observable<any> {
    return this.http.post(this.API_URL, { action: 'listar' });
  }

  // Obtener una tarea por ID
  getTaskById(id: number): Observable<any> {
    return this.http.post(this.API_URL, { action: 'tarea', id });
  }

  // Agregar una nueva tarea
  addTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, { action: 'insertar', ...task });
  }

  // Actualizar una tarea existente
  updateTask(task: any): Observable<any> {
    return this.http.post(this.API_URL, { action: 'actualizar', ...task });
  }

  // Eliminar una tarea por ID
  deleteTask(id: number): Observable<any> {
    return this.http.post(this.API_URL, { action: 'eliminar', id });
  }
}
