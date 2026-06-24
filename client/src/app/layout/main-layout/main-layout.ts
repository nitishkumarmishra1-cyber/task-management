import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { MaterialModule } from '../../shared/modules/material-module';
import { IUser, ROLE, SidebarMenuItem } from '../../shared/interfaces';
import { Auth } from '../../shared/services/auth';
import { SocketService } from '@app/shared/services/socket';

@Component({
  selector: 'app-main-layout',
  imports: [MaterialModule, Header, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private auth = inject(Auth);
  private socket = inject(SocketService);
  menuItems: SidebarMenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.buildMenuForRole(this.auth.user?.role);
    this.socket.registerSocket();
  }

  private buildMenuForRole(role: ROLE = ROLE.USER): SidebarMenuItem[] {
    const items: SidebarMenuItem[] = [
      { label: 'My Tasks', icon: 'checklist', route: '/task-management/tasks/my' }
    ];

    if (role === ROLE.MANAGER || role === ROLE.TEAM_LEAD) {
      items.push({ label: 'Team Tasks', icon: 'assignment_ind', route: `/task-management/tasks/${role === ROLE.MANAGER ? 'all' : 'team'}` })
      items.push({ label: 'Users', icon: 'group', route: '/task-management/user-list' });
    }

    return items;
  }
}
