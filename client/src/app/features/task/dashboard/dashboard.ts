import { ChangeDetectionStrategy, Component, inject, Input, OnInit, OnDestroy, OnChanges, DestroyRef, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTask } from '../create-update-task/create-update-task';
import { ApiResponse, FILTER, ITask, IUser, ROLE } from '@app/shared/interfaces';
import { MaterialModule } from '@app/shared/modules/material-module';
import { List } from '@app/shared/components/list/list';
import { ListAction, ListColumn } from '@app/shared/interfaces/table';
import { Auth } from '@app/shared/services/auth';
import { Task } from '@app/shared/services/task';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@app/shared/services/snackbar';
import { Constant } from '@app/utility/constant';
import { toCapitalCase } from '@app/utility/util';
import { SocketService } from '@app/shared/services/socket';
import { BehaviorSubject, debounceTime, finalize, map, merge, Observable, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, List],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, OnChanges, OnDestroy {
  private task = inject(Task);
  private auth = inject(Auth);
  private alert = inject(AlertService);
  private dialog = inject(MatDialog);
  private socket = inject(SocketService);
  private destroyRef = inject(DestroyRef);

  private readonly socketEvent: string = 'task:update';
  public filter$ = new BehaviorSubject<FILTER>(FILTER.ALL);
  private refresh$ = new Subject<void>();
  public isLoading = signal(false);

  @Input() taskType: 'my' | 'team' | 'all' = 'my';

  public task$: Observable<ITask[]> = merge(
    this.filter$.asObservable(),
    this.refresh$.pipe(map(() => this.filter$.value))
  ).pipe(
    tap(() => this.isLoading.set(true)),
    debounceTime(500),
    switchMap((value: FILTER) => this.task.taskList(this.taskType, value).pipe(finalize(() => this.isLoading.set(false))))
  );

  public pageTitle = signal('');
  public tasks = toSignal(this.task$, { initialValue: [] });

  public STATUS_OPTIONS = Constant.STATUS_OPTIONS;
  public options: ListAction[] = [
    { id: '1', name: 'edit', listener: (task: ITask) => this.openTaskDialog(task) },
    { id: '3', name: 'check_circle', condition: { key: 'status', value: 'pending' }, listener: (task: ITask) => this.markTaskComplete(task!.id as string) },
    { id: '2', name: 'deleted', listener: (task: ITask) => this.deleteTask(task.id) }
  ];

  public columns: ListColumn[] = [
    { key: 'title', label: 'Title', sortable: true, type: 'text', truncateLength: 0 },
    { key: 'description', label: 'Description', sortable: false, type: 'truncate', truncateLength: 30 },
    { key: 'status', label: 'Status', sortable: false, type: 'status-badge', truncateLength: 0 },
    { key: 'assignToName', label: 'Assignee', sortable: false, type: 'text', truncateLength: 0 }
  ];

  ngOnInit() {
    this.socket.on(this.socketEvent, () => {
      this.refresh$.next();
    });
  }

  ngOnChanges() {
    this.pageTitle.set(toCapitalCase(this.taskType));
    this.refresh$.next();
  }

  openTaskDialog(taskToEdit: ITask | null = null): void {
    const dialogRef = this.dialog.open(CreateUpdateTask, {
      width: '550px',
      disableClose: true,
      data: {
        task: taskToEdit,
        canReassign: [ROLE.MANAGER, ROLE.TEAM_LEAD].includes(this.auth.user!.role)
      }
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((formResult: any) => {
      if (!formResult) return;
      this.refresh$.next();
    });
  }

  deleteTask(id?: string): void {
    if (id && confirm('Are you sure you want to remove this task?')) {
      this.task.delete(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response: ApiResponse<ITask>) => {
          this.alert.success(response.message);
          this.refresh$.next();
        },
        error: (error: HttpErrorResponse) => {
          this.alert.error(error.error.message);
        }
      });
    }
  }

  markTaskComplete(id: string): void {
    this.task.markTaskComplete(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response: ApiResponse<ITask>) => {
        this.alert.success(response.message);
        this.refresh$.next();
      },
      error: (error: HttpErrorResponse) => {
        this.alert.error(error.error.message);
      }
    });
  }

  ngOnDestroy() {
    this.socket.off(this.socketEvent);
    this.socket.disconnect();
    this.refresh$.complete();
    this.filter$.complete();
  }
}