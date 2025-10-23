import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LoginComponent} from './auth/components/login/login.component'
import {DashboardComponent} from './features/dashboard/dashboard.component'
import {InventarioComponent} from './features/inventario/inventario.component'

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'consultar', component: InventarioComponent},
  {path: '**', redirectTo: 'login'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
