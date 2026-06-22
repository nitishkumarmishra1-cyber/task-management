import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUser } from '../create-update-user/create-update-user';
import { ApiResponse, ITask, IUser, ROLE, STATUS } from '@app/shared/interfaces';
import { MaterialModule } from '@app/shared/modules/material-module';
import { List } from '@app/shared/components/list/list';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { User } from '@app/shared/services/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@app/shared/services/snackbar';
import { Constant } from '@app/utility/constant';
import { Auth } from '@app/shared/services/auth';
import { USER_FILTER } from '@app/shared/interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, List],
  templateUrl: './list.html',
  styles: []
})
export class UserList {
  public selectedStatusFilter: USER_FILTER = USER_FILTER.ALL;
  private dialog = inject(MatDialog);
  private user = inject(User);
  private cdr = inject(ChangeDetectorRef);
  private alert = inject(AlertService);
  private auth = inject(Auth);

  public users: IUser[] = [];
  public assignableUsers: IUser[] = [];
  public ROLE_OPTIONS = Constant.ROLE_OPTION(this.auth.user?.role as ROLE);
  public showAddUser = signal(false);

  public options: ListAction[] = [
    { id: '1', name: 'edit', listener: (user: IUser) => this.openTaskDialog(user) },
    { id: '2', name: 'deleted', listener: (id: string) => this.deleteTask(id) }
  ];

  public columns: ListColumn[] = [
    { key: 'name', label: 'Name', sortable: true, type: 'text', truncateLength: 0 },
    { key: 'email', label: 'Email', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'role', label: 'Role', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'reportToName', label: 'Report To', sortable: false, type: 'text', truncateLength: 0 },
    { key: 'isActive', label: 'Status', sortable: false, type: 'text', truncateLength: 0 },
  ];


  ngOnInit() {
    // load tasks
    this.showAddUser.set(this.auth.user?.role === ROLE.MANAGER);
    this.refresh();
    this.userList();
  }

  refresh() {
    this.user.userList(this.selectedStatusFilter).subscribe({
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
      data: { user: userToEdit, assignableUsers: this.assignableUsers }
    });

    dialogRef.afterClosed().subscribe((formResult: any) => {
      if (!formResult) return;
      this.refresh();
    });
  }

  deleteTask(id?: string): void {
    if (id && confirm('Are you sure you want to remove this task?')) {
      this.user.delete(id).subscribe({
        next: (response: ApiResponse<IUser>) => {
          this.alert.success(response.message);
          this.refresh();
        },
        error: (error: HttpErrorResponse) => {
          this.alert.error(error.error.message);
        }
      })
    }
  }
}