import { Routes } from '@angular/router';
import { Authorize } from '@app/shared/guard/permission-guard';
import { ROLE } from '@app/shared/interfaces';

export const TASK_ROUTES: Routes = [
    {
        path: 'my',
        loadComponent : () => import('./dashboard/dashboard').then(m => m.Dashboard),
        data : { taskType : 'my' }
    },
    {
        path: 'team',
        canActivate : [Authorize(ROLE.TEAM_LEAD, ROLE.MANAGER)],
        loadComponent : () => import('./dashboard/dashboard').then(m => m.Dashboard),
        data : { taskType : 'team' }
    },
    {
        path: 'all',
        canActivate : [Authorize(ROLE.MANAGER)],
        loadComponent : () => import('./dashboard/dashboard').then(m => m.Dashboard),
        data : { taskType : 'all' }
    },
    {
        path: '',
        redirectTo: 'my',
        pathMatch: 'full'
    }
];