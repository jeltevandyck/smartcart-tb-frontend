import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  activeModal = ''
  editProduct: any;
  order: any;

  scannedProductObserver: any;

  constructor(
    private rt: Router,
    private as: AlertService,
    private api: ApiService,
    private cs: CartService) { }

  ngOnInit(): void {
    this.order = this.cs.getOrder();

    if (!this.order) {
      this.rt.navigate(['/c/start']);
    }

    this.scannedProductObserver = this.cs.scannedProduct.subscribe((product: any) => {
      this.api.createOrderItem(this.order, product, 1).subscribe((order: any) => {
        this.cs.updateOrderItemEvent();
        this.order = order;
        this.cs.setOrder(this.order);
      });
    });
  }

  ngOnDestroy(): void {
    this.scannedProductObserver.unsubscribe();
  }

  getTotal() {
    const total = {
      price: 0,
      discount: 0,
      weight: 0
    }
    if (this.order) {
      this.order.orderItems.forEach((orderItem: any) => {
        total.weight += orderItem.product.weight * orderItem.amount;
        total.price += orderItem.product.price * orderItem.amount;
        total.discount += orderItem.product.discount * orderItem.amount;
        total.discount += (orderItem.product.price * (orderItem.product.discountPercentage/100)) * orderItem.amount;
      });

      total.price -= total.discount;
    }
    return total;
  }

  navigate() {
    if (this.cs.getOrder().orderItems.length > 0) {
      this.rt.navigate(['/c/checkout']);
    } else {
      this.as.addAlert(new AlertMessage('error', 'You didn\'t add any products to cart.'))
    }
  }

  updateProduct(product: any) {
    this.api.updateOrderItem(product).subscribe((res: any) => {
      this.cs.setOrder(res);
      this.order = res;

      console.log(this.order)

      this.cs.updateOrderItemEvent();

      this.closeEditModal();
    });
  }

  removeProduct(orderItem: any) {
    this.api.deleteOrderItem(orderItem).subscribe((order: any) => {
      if (order.orderItems == null) order.orderItems = [];
      this.cs.updateOrderItemEvent();
      this.order = order;
      this.cs.setOrder(this.order);
    });
  }

  openEditModal(product: any) {
    this.activeModal = 'edit-product';
    this.editProduct = product;
  }

  closeEditModal() {
    this.activeModal = '';
    this.editProduct = null;
  }
}
