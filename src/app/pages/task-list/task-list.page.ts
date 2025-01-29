import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: false
})
export class TaskListPage implements OnInit {
  tasks: any[] = [];
  searchText: string = '';

  constructor(private taskService: TaskService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(response => {
      if (response.estado) {
        this.tasks = response.tareas;
      } else {
        console.error('Error al cargar tareas:', response.mensaje);
      }
    });
  }

  filterTasks() {
    this.tasks = this.tasks.filter(task =>
      task.titulo.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addTask() {
    this.navCtrl.navigateForward('/task-form');
    this.loadTasks();
  }

  viewTaskDetail(id: number) {
    this.navCtrl.navigateForward(`/task-detail/${id}`);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(response => {
      if (response.estado) {
        this.loadTasks();
      }
    });
  }
}