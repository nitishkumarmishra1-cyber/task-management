import { Component, DestroyRef, inject, signal } from '@angular/core';
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
import { ApiResponse } from '@app/shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { SocketService } from '@app/shared/services/socket';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  public notificationCount = signal(0);
  private destroyRef = inject(DestroyRef);
  private readonly socketEvent : string = 'notification:update';

  currentUsername = '';
  currentUserRole = '';

  ngOnInit(): void {
    this.currentUsername = toCapitalCase(this.auth.user!.name ?? '');
    this.currentUserRole = toCapitalCase(this.auth.user!.role ?? '');
    this.getCount();

    // registering this event so update whenever event comes
    this.socket.on(this.socketEvent, this.getCount.bind(this))
  }

  editProfile() : void {
    const dialogRef = this.dialog.open(CreateUpdateUser, {
      width: '550px',
      disableClose: true,
      data: { user: this.auth.user, assignableUsers : [] }
    });

    dialogRef.afterClosed().subscribe((formResult: any) => {
      if (!formResult) return;
    });
  }

  getCount() {
    console.log('sdfdsgfd')
    this.notification.unseenCount().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next : (response : ApiResponse<number>) => {
        this.notificationCount.set(response.data)
      },
      error : (error : HttpErrorResponse) => {
        // 
      }
    })
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