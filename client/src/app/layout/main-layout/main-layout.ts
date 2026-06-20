import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { MaterialModule } from '../../shared/modules/material-module';
import { ROLE, SidebarMenuItem } from '../../shared/interfaces';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-main-layout',
  imports: [MaterialModule, RouterOutlet, RouterLink, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private auth = inject(Auth);
  menuItems: SidebarMenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = this.buildMenuForRole(this.auth.user?.role);
  }

  private buildMenuForRole(role: ROLE = ROLE.USER): SidebarMenuItem[] {
    const items: SidebarMenuItem[] = [
      { label: 'Task List', icon: 'checklist', route: '/task-management/task-list' }
    ];

    if (role === ROLE.MANAGER || role === ROLE.TEAM_LEAD) {
      items.push({ label: 'Users', icon: 'group', route: '/task-management/user-list' });
    }

    return items;
  }
}
