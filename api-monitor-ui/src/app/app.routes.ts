import { Routes } from '@angular/router';
import { ApiDetailsComponent } from './pages/api-details/api-details.component';
import { ApiListComponent } from './pages/api-list/api-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApiFormComponent } from './pages/api-form/api-form.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard]

    },

    {
        path: 'apis',
        component: ApiListComponent,
        canActivate: [authGuard]

    },

    {
        path: 'apis/new',
        component: ApiFormComponent,
        canActivate: [authGuard,adminGuard]
        

    },

    {
        path: 'apis/edit/:id',
        component: ApiFormComponent,
        canActivate: [authGuard,adminGuard]

    },

    {
        path: 'apis/:id',
        component: ApiDetailsComponent,
        canActivate: [authGuard]

    }

];