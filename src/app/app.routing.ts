import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RegisterpropertyComponent } from './registerproperty';
import { DashboardComponent } from './dashboard';
import { ManagementComponent } from './management';
import { AuthGuard } from './_helpers';
import { PredictorComponent } from './predictor';
import { PropertydetailsComponent } from './propertydetails';
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registerproperty', component: RegisterpropertyComponent ,canActivate: [AuthGuard]},
    { path: 'registerproperty/:id', component: RegisterpropertyComponent ,canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
    { path: 'management', component: ManagementComponent ,canActivate: [AuthGuard]},
    { path: 'predictor', component: PredictorComponent ,canActivate: [AuthGuard]},
     { path: 'propertydetails/:id', component: PropertydetailsComponent ,canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
//propertydetails
export const appRoutingModule = RouterModule.forRoot(routes);