import { Routes } from '@angular/router';
import {LoginCapristanGalvez} from './component/login-capristan-galvez/login-capristan-galvez';
import {HomeCapristanGalvez} from './component/home-capristan-galvez/home-capristan-galvez';
import {ReportesCapristanGalvez} from './component/reportes-capristan-galvez/reportes-capristan-galvez';
import {AuthGuard} from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginCapristanGalvez },
  { path: 'Home', component: HomeCapristanGalvez, canActivate: [AuthGuard] },
  { path: 'Reportes', component: ReportesCapristanGalvez, canActivate: [AuthGuard] },
];
