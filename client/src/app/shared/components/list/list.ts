import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { MaterialModule } from '@app/shared/modules/material-module';
import { Badge } from '../badge/badge';


@Component({
  selector: 'app-list',
  standalone : true,
  imports: [MaterialModule, Badge],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: ListColumn[] = [];
  @Input() options: ListAction[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);

  get displayedColumns(): string[] {
    const keys = this.columns.map(c => c.key);
    return this.options?.length ? [...keys, 'actions'] : keys;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data || [];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  truncate(value: string, length: number): string {
    if (!value) return '';
    return value.length > length ? value.slice(0, length) + '...' : value;
  }

  showOption(element : any, option : ListAction) : boolean {
    if('condition' in option && option.condition?.key && option.condition?.value) {
      return element[option.condition?.key] === option.condition?.value
    }
    return true
  }
}