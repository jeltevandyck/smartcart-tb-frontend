import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order: any;

  checkoutMethod = '';

  constructor(
    private cs: CartService,
    private api: ApiService,
    private rt: Router,
    private as: AlertService
  ) { }

  ngOnInit(): void {
    this.order = this.cs.getOrder();

    if (!this.order) {
      this.rt.navigate(['/c/start']);
    }
  }

  checkout() {
    if (this.checkoutMethod === '') {
      this.as.addAlert(new AlertMessage('error', 'Please select a checkout method!'));
      return;
    }

    this.cs.removeGroceryList();
    this.cs.removeOrder();
    this.cs.removeUser();

    const cart = this.cs.getCart();

    this.api.unregisterCart(cart).subscribe((res: any) => {
      this.api.updateOrder(this.order, 'PAID').subscribe((res: any) => {
      });
      this.cs.setCart(res);
      this.rt.navigate(['/c/start']);
    });


  }
}
