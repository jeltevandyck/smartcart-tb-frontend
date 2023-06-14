import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'c',
  loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
},
{
  path: '',
  redirectTo: 'c',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
