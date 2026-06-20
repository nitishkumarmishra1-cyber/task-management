import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUser } from '../create-update-user/create-update-user';
import { ApiResponse, ITask, IUser, STATUS } from '@app/shared/interfaces';
import { MaterialModule } from '@app/shared/modules/material-module';
import { List } from '@app/shared/components/list/list';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { User } from '@app/shared/services/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@app/shared/services/snackbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, List],
  templateUrl: './list.html',
  styles : []
})
export class UserList {
  public selectedStatusFilter: 'all' | 'pending' | 'completed' = 'all';
  private dialog = inject(MatDialog);
  private user = inject(User);
  private cdr = inject(ChangeDetectorRef);
  private alert = inject(AlertService);
  
  public users: IUser[] = [];
  public assignableUsers : IUser[] = []; 

  public options: ListAction[] = [
    { id: '1', name: 'edit', listener: (user: IUser) => this.openTaskDialog(user) },
    { id: '2', name: 'deleted', listener: (id: string) => this.deleteTask(id) }
  ];

  public columns: ListColumn[] = [
    { key: 'name', label: 'Name', sortable: true, type: 'text', truncateLength: 0 },
    { key: 'email', label: 'Email', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'role', label: 'Role', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'assignedTo', label: 'Report To', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'isActive', label: 'Status', sortable: false, type: 'text', truncateLength: 0 },
  ];


  ngOnInit() { 
    // load tasks
    this.refresh();
    this.userList();
  }

  refresh() {
    this.user.userList().subscribe({
      next: (response: ApiResponse<IUser[]>) => {
        this.users = [...response.data];
        this.cdr.markForCheck()
      },
      error: (error: HttpErrorResponse) => {
        this.alert.error(error.error.message);
      }
    })
  }

  userList() {
    this.user.assignableUsers().subscribe({
      next: (response: ApiResponse<IUser[]>) => {
        this.assignableUsers = response.data;
      },
      error: (error: HttpErrorResponse) => {
        this.alert.error(error.error.message);
      }
    })
  }

  openTaskDialog(userToEdit: IUser | null = null): void {
    const dialogRef = this.dialog.open(CreateUpdateUser, {
      width: '550px',
      disableClose: true,
      data: { user: userToEdit, assignableUsers : this.assignableUsers }
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
      this.users = this.users.filter(t => t.id !== id);
    }
  }
}