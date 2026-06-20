import { Routes } from '@angular/router';
import { Authorize } from '@app/shared/guard/permission-guard';
import { ROLE } from '@app/shared/interfaces';

export const USER_ROUTES: Routes = [
    {
        path : '',
        canActivate : [Authorize(ROLE.MANAGER, ROLE.TEAM_LEAD)],
        loadComponent : () => import('./list/list').then(m => m.UserList)
    }
];