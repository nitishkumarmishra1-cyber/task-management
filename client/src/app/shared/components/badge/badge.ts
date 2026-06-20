
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
export type TaskStatus = 'pending' | 'completed';
 
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.css'
})
export class Badge {
  @Input() status: TaskStatus = 'pending';
}
 