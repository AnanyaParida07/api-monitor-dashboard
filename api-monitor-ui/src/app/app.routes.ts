import { Routes } from '@angular/router';
import { ApiDetailsComponent } from './pages/api-details/api-details.component';
import { ApiListComponent } from './pages/api-list/api-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApiFormComponent } from './pages/api-form/api-form.component';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent
    },

    {
        path: 'apis',
        component: ApiListComponent
    },

    {
        path: 'apis/new',
        component: ApiFormComponent
    },

    {
        path: 'apis/edit/:id',
        component: ApiFormComponent
    },

    {
        path: 'apis/:id',
        component: ApiDetailsComponent
    }

];