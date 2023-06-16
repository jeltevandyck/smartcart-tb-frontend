import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { WebsocketService } from 'src/app/modules/shared/services/websocket.service';

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
  confirmEveryItemScanned: boolean = false;

  constructor(
    private rt: Router,
    private as: AlertService,
    private api: ApiService,
    private cs: CartService,
    private ws: WebsocketService) { }

  ngOnInit(): void {
    this.order = this.cs.getOrder();

    if (!this.order) {
      this.rt.navigate(['/c/start']);
    }

    this.ws.connect();

    this.ws.getMessage().subscribe((msg) => {
      const data = JSON.parse(msg.data);

      if (data.cartId !== this.cs.getCart().id) return; 

      if (data.type === 'scan') {
        const cart = this.cs.getCart();
        this.api.getProductByBarcode(data.data.barcode, cart.storeId)
          .pipe(catchError((error: any) => {

            const errorMsg = error.error.Errors[0].Message;
            this.as.addAlert(new AlertMessage("error", errorMsg));

            return of(null);
          }))
          .subscribe((product: any) => {
            if (product) {
              this.cs.scanProduct(product);
              this.as.addAlert(new AlertMessage('success', `Product ${product.name} added to cart!`));
            }
          })
      }
    });


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
    this.ws.disconnect();
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
        total.discount += (orderItem.product.price * (orderItem.product.discountPercentage / 100)) * orderItem.amount;
      });

      total.price -= total.discount;
    }
    return total;
  }

  checkout() {
    const groceryList = this.cs.getGroceryList();

    const allItemsScanned = groceryList != null ? groceryList.groceryItems.every((groceryItem: any) => groceryItem.isCollected) : true;

    if (this.cs.getOrder().orderItems.length > 0) {

      if (!allItemsScanned && !this.confirmEveryItemScanned) {
        this.activeModal = 'confirm-grocery-list'
        return;
      }

      this.rt.navigate(['/c/checkout']);
    } else {
      this.as.addAlert(new AlertMessage('error', 'You didn\'t add any products to cart.'))
    }
  }

  updateProduct(product: any) {
    this.api.updateOrderItem(product).subscribe((res: any) => {
      this.cs.setOrder(res);
      this.order = res;

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

  confirmCheckout() {
    this.confirmEveryItemScanned = true;
    this.activeModal = '';
    this.checkout();
  }
}
