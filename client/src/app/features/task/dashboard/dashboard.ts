import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTask } from '../create-update-task/create-update-task';
import { ApiResponse, ITask, IUser, ROLE } from '@app/shared/interfaces';
import { MaterialModule } from '@app/shared/modules/material-module';
import { List } from '@app/shared/components/list/list';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { Auth } from '@app/shared/services/auth';
import { Task } from '@app/shared/services/task';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@app/shared/services/snackbar';
import { Constant } from '@app/utility/constant';
import { User } from '@app/shared/services/user';
import { toCapitalCase } from '@app/utility/util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, List],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private task = inject(Task);
  private user = inject(User);
  private auth = inject(Auth);
  private alert = inject(AlertService);
  public selectedStatusFilter: 'all' | 'pending' | 'completed' = 'all';
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  @Input() taskType : 'my' | 'team' | 'all' = 'my'; 

  // meta info
  public tasks: ITask[] = [];
  private users: IUser[] = [];
  public pageTitle : string = '';
  
  public STATUS_OPTIONS = Constant.STATUS_OPTIONS;
  public options: ListAction[] = [
    { id: '1', name: 'edit', listener: (task: ITask) => this.openTaskDialog(task) },
    { id: '3', name: 'check_circle', listener: (task: ITask) => this.openTaskDialog(task) },
    { id: '2', name: 'deleted', listener: (id: string) => this.deleteTask(id) }
  ];

  public columns: ListColumn[] = [
    { key: 'title', label: 'Title', sortable: true, type: 'text', truncateLength: 0 },
    { key: 'description', label: 'Description', sortable: false, type: 'truncate', truncateLength: 30 },
    { key: 'status', label: 'Status', sortable: false, type: 'status-badge', truncateLength: 0 },
    { key: 'assignToName', label: 'Assignee', sortable: false, type: 'text', truncateLength: 0 }
  ];

  ngOnInit() {
    this.userList();
  }

  ngOnChanges() {
    this.pageTitle = toCapitalCase(this.taskType);
    this.refresh();
  }

  refresh() {
    this.task.taskList(this.taskType).subscribe({
      next: (response: ApiResponse<ITask[]>) => {
        this.tasks = [...response.data];
        this.cdr.markForCheck()
      },
      error: (error: HttpErrorResponse) => {
        this.alert.error(error.error.message);
      }
    })
  }

  userList() {
    // user cannot access this API so this check will not call any API
    if(this.auth.user?.role === ROLE.USER) return;

    this.user.assignableUsers().subscribe({
      next: (response: ApiResponse<IUser[]>) => {
        this.users = response.data;
      },
      error: (error: HttpErrorResponse) => {
        this.alert.error(error.error.message);
      }
    })
  }

  openTaskDialog(taskToEdit: ITask | null = null): void {
    const dialogRef = this.dialog.open(CreateUpdateTask, {
      width: '550px',
      disableClose: true,
      data: {
        task: taskToEdit,
        canReassign: [ROLE.MANAGER, ROLE.TEAM_LEAD].includes(this.auth.user!.role),
        assignableUsers : this.users
      }
    });

    dialogRef.afterClosed().subscribe((formResult: any) => {
      if (!formResult) return;
      this.refresh();      
    });
  }

  onStatusFilterChange(): void {
    // this.applyFilter();
  }

  deleteTask(id?: string): void {
    if (id && confirm('Are you sure you want to remove this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
}