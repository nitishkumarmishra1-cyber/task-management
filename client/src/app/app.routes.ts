import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './shared/guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'task',
        component: MainLayout,
        canActivate : [authGuard],
        canActivateChild : [authGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./features/task.routes').then(m => m.TASK_ROUTES)
            }
        ]
    }
];