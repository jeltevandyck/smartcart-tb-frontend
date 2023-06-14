import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Output() modal = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Input() order: any;


  constructor(
    private api: ApiService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    
  }

  removeItem(orderItem: any) {
    this.remove.emit(orderItem);
  }

  getTotal(orderItem: any) {

    const total = {
      price: 0,
      discount: 0
    }
    
    total.price += orderItem.product.price * orderItem.amount;
    total.discount += orderItem.product.discount * orderItem.amount;
    total.discount += (orderItem.product.price * (orderItem.product.discountPercentage / 100)) * orderItem.amount;

    total.price -= total.discount;

    return total;
  }

}
