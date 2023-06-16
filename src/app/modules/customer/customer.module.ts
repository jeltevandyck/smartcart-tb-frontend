import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './components/products/products.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { SelectCartModalComponent } from './components/select-cart-modal/select-cart-modal.component';
import { SelectUserModalComponent } from './components/select-user-modal/select-user-modal.component';
import { HelpModalComponent } from './components/help-modal/help-modal.component';
import { EnterBarcodeModalComponent } from './components/enter-barcode-modal/enter-barcode-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { SelectGroceryListModalComponent } from './components/select-grocery-list-modal/select-grocery-list-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AuthenticateComponent,
    DashboardComponent,
    CheckoutComponent,
    ProductsComponent,
    GroceryListComponent,
    SelectCartModalComponent,
    SelectUserModalComponent,
    HelpModalComponent,
    EnterBarcodeModalComponent,
    EditProductModalComponent,
    SelectGroceryListModalComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
