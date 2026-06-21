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
        path: 'task-management',
        component: MainLayout,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: 'tasks',
                loadChildren: () => import('./features/task/task.routes').then(m => m.TASK_ROUTES)
            },
            {
                path: 'user-list',
                loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
            },
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo : '/task-management/tasks/my',
        pathMatch : 'full'
    }
];