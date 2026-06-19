import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTask } from '../create-update-task/create-update-task';
import { ITask, STATUS } from '../../shared/interfaces';
import { MaterialModule } from '../../shared/modules/material-module';
import { List } from '../../shared/components/list/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, List],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private dialog = inject(MatDialog);
  public columns: string[] = ['title', 'description', 'status', 'assignedTo', 'actions'];
  public tasks: ITask[] = [{
    id: 'task-1',
    title: 'Fix OAuth Token Expiration',
    description: 'Users are intermittently getting logged out due to a timezone mismatch when validating JWT expiry timestamps.',
    status: STATUS.PENDING,
    assignedTo: 'u1' // e.g., @alex_dev
  },
  {
    id: 'task-2',
    title: 'Design Q3 Performance Dashboard',
    description: 'Create high-fidelity interactive wireframes for the manager reporting center using Tailwind components.',
    status: STATUS.COMPLETED,
    assignedTo: 'u3' // e.g., @marcus_design
  },
  {
    id: 'task-3',
    title: 'Refactor List Component Inputs',
    description: 'Resolve singular vs plural structural bindings on data parameters to clean up angular compiler warnings.',
    status: STATUS.COMPLETED,
    assignedTo: 'u1'
  },
  {
    id: 'task-4',
    title: 'Write Core Unit Tests',
    description: 'Achieve at least 85% statement coverage across all feature dialog components and forms.',
    status: STATUS.PENDING,
    assignedTo: 'u2' // e.g., @sarah_qa
  },
  {
    id: 'task-5',
    title: 'Review Database Indexing Strategy',
    description: 'Optimize high-latency lookups on the historical records table. Current execution times exceed 800ms.',
    status: STATUS.PENDING
    // Unassigned edge case test
  }];
  public options: any[] = [
    { id: 1, name: 'edit', listener: (task: ITask) => this.openTaskDialog(task) },
    { id: 2, name: 'deleted', listener: (id: string) => this.deleteTask(id) }
  ];

  openTaskDialog(taskToEdit: ITask | null = null): void {
    const dialogRef = this.dialog.open(CreateUpdateTask, {
      width: '550px',
      disableClose: true,
      data: { task: taskToEdit }
    });

    dialogRef.afterClosed().subscribe((formResult: any) => {
      if (!formResult) return;

      if (taskToEdit) {
        // Edit Task
        this.tasks = this.tasks.map(t =>
          t.id === taskToEdit.id ? { ...t, ...formResult } : t
        );
      } else {
        // Create Task
        const newTask: ITask = {
          id: 't_' + Math.random().toString(36).substring(2, 11),
          ...formResult
        };
        this.tasks = [...this.tasks, newTask];
      }
    });
  }

  deleteTask(id?: string): void {
    if (id && confirm('Are you sure you want to remove this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
}