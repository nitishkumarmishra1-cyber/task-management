import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '@app/shared/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateUser } from '@app/features/user/create-update-user/create-update-user';
import { toCapitalCase } from '@app/utility/util';
import { Notification } from '@app/shared/services/notification';
import { SocketService } from '@app/shared/services/socket';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { AlertService } from '@app/shared/services/snackbar';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private auth = inject(Auth);
  private notification = inject(Notification);
  private dialog = inject(MatDialog);
  private socket = inject(SocketService);
  private alert = inject(AlertService);
  private refresh$ = new BehaviorSubject<null>(null);

  
  public currentUsername = '';
  public currentUserRole = '';
  private readonly socketEvent : string = 'notification:update';
  private notification$ = combineLatest([
    this.refresh$.asObservable(),
  ]).pipe(
    switchMap(() => this.notification.unseenCount())
  );

  notificationCount = toSignal(this.notification$, { initialValue : 0 });

  ngOnInit(): void {
    this.currentUsername = toCapitalCase(this.auth.user!.name ?? '');
    this.currentUserRole = toCapitalCase(this.auth.user!.role ?? '');

    // registering this event so update whenever event comes
    this.socket.on(this.socketEvent, (data) => {
      const message : string = data?.message ?? '';
      if(message) this.alert.success(message);
      this.refresh$.next(null);
    })
  }

  editProfile() : void {
    this.dialog.open(CreateUpdateUser, {
      width: '550px',
      disableClose: true,
      data: { user: this.auth.user, assignableUsers : [] }
    });
  }

  ngOnDestory() {
    this.socket.off(this.socketEvent)
    this.socket.disconnect();
  }

  onLogout(): void {
    this.auth.logout();
    this.socket.disconnect();
  }
}