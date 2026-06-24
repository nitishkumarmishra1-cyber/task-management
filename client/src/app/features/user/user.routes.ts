import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path : '',
        loadComponent : () => import('./list/list').then(m => m.UserList)
    }
];