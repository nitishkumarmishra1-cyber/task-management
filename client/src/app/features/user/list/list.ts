import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUser } from '../create-update-user/create-update-user';
import { ApiResponse, IUser, ROLE } from '@app/shared/interfaces';
import { MaterialModule } from '@app/shared/modules/material-module';
import { List } from '@app/shared/components/list/list';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { User } from '@app/shared/services/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@app/shared/services/snackbar';
import { Constant } from '@app/utility/constant';
import { Auth } from '@app/shared/services/auth';
import { USER_FILTER } from '@app/shared/interfaces/user';
import { BehaviorSubject, debounceTime, map, merge, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private alert = inject(AlertService);
  private auth = inject(Auth);
  private destroyRef = inject(DestroyRef);

  public assignableUsers: IUser[] = [];
  public ROLE_OPTIONS = Constant.ROLE_OPTION(this.auth.user?.role as ROLE);
  public filter$ = new BehaviorSubject<USER_FILTER>(USER_FILTER.ALL);
  private refresh$ = new Subject<void>();
  public showAddUser = signal(false);

  public user$: Observable<IUser[]> = merge(
    this.filter$.asObservable(),
    this.refresh$.pipe(map(() => this.filter$.value))
  ).pipe(
    debounceTime(500),
    switchMap((value: USER_FILTER) => this.user.userList(value))
  );

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
  }

  openTaskDialog(userToEdit: IUser | null = null): void {
    const dialogRef = this.dialog.open(CreateUpdateUser, {
      width: '550px',
      disableClose: true,
      data: { user: userToEdit, assignableUsers: this.assignableUsers }
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((formResult: any) => {
      if (!formResult) return;
      this.refresh$.next();
    });
  }

  deleteTask(id?: string): void {
    if (id && confirm('Are you sure you want to remove this task?')) {
      this.user.delete(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response: ApiResponse<IUser>) => {
          this.alert.success(response.message);
          this.refresh$.next();
        },
        error: (error: HttpErrorResponse) => {
          this.alert.error(error.error.message);
        }
      })
    }
  }

  ngOnDestroy() : void {
    this.refresh$.complete();
    this.filter$.complete();
  }
}