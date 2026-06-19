import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material-module';
import { ITask } from '../../interfaces';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  @Input({ required : true }) public columns!: string[];
  @Input({ required : true }) public data!: ITask[];
  @Input({ required : true }) public options!: any[];
}