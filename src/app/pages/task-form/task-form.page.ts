import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: false
})
export class TaskFormPage implements OnInit {
  task = { titulo: '', descripcion: '', estado: 'pendiente' };
  taskId: number | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(response => {
        if (response.estado) {
          this.task = response.tarea;
        }
      });
    }
  }

  saveTask() {
    if (this.taskId) {
      this.taskService.updateTask({ id: this.taskId, ...this.task }).subscribe(() => this.navCtrl.navigateBack('/task-list'));
    } else {
      this.taskService.addTask(this.task).subscribe(() => this.navCtrl.navigateBack('/task-list'));
    }
  }
}
