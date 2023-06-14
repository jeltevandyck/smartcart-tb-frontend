import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-select-cart-modal',
  templateUrl: './select-cart-modal.component.html',
  styleUrls: ['./select-cart-modal.component.css']
})
export class SelectCartModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Output() removed = new EventEmitter();

  carts: any[] = []
  currentCart: any;

  constructor(
    private api: ApiService, 
    private cs: CartService,
    private as: AlertService) { }

  ngOnInit(): void {
    this.api.getAllCarts().subscribe((data: any) => {
      this.carts = data;
    })

    this.currentCart = this.cs.getCart();
  }

  select(cart: any) {
    this.cs.setCart(cart);
    this.currentCart = cart;
    this.close.emit();

    this.as.addAlert(new AlertMessage('success', 'Cart selected!'));
    
    this.selected.emit();
  }

  remove() {
    this.cs.removeCart();
    this.currentCart = null;
    this.close.emit();

    this.as.addAlert(new AlertMessage('success', 'Cart removed!'));

    this.removed.emit();
  }
}
