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
  actualWeight: number = 0.0;
  maxWeightDifference: number = 0.0;

  checkoutMethod = '';

  constructor(
    private cs: CartService,
    private api: ApiService,
    private rt: Router,
    private as: AlertService
  ) { }

  ngOnInit(): void {
    this.order = this.cs.getOrder();
    this.actualWeight =this.cs.getWeight();
    this.maxWeightDifference = this.cs.getMaxWeight();

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
    this.cs.removeWeight();

    const cart = this.cs.getCart();

    this.api.unregisterCart(cart).subscribe((res: any) => {
      this.api.updateOrder(this.order, 'PAID').subscribe((res: any) => {
      });
      this.cs.setCart(res);
      this.rt.navigate(['/c/start']);
    });


  }

  getTotal() {
    const total = {
      price: 0,
      discount: 0,
      weight: 0
    }
    if (this.order) {
      this.order.orderItems.forEach((orderItem: any) => {
        total.weight += (orderItem.product.weight * orderItem.amount) * 1000;
        total.price += orderItem.product.price * orderItem.amount;
        total.discount += orderItem.product.discount * orderItem.amount;
        total.discount += (orderItem.product.price * (orderItem.product.discountPercentage / 100)) * orderItem.amount;
      });

      total.price -= total.discount;
    }
    return total;
  }

  getWeightDifference() {
    let diff = Math.abs(this.getTotal().weight - this.actualWeight);
    return diff;
  }
}
