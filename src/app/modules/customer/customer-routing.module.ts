import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [  {
  path: 'start',
  component: AuthenticateComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'checkout',
  component: CheckoutComponent
},
{
  path: '',
  redirectTo: 'start',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
