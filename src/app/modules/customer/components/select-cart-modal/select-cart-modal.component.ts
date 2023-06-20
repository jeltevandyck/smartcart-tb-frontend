import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'fes-select-cart-modal',
  templateUrl: './select-cart-modal.component.html',
  styleUrls: ['./select-cart-modal.component.css']
})
export class SelectCartModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Output() removed = new EventEmitter();

  maxWeightDifference: number = 0;
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

    this.maxWeightDifference = this.cs.getMaxWeight();

    this.currentCart = this.cs.getCart();
  }

  select(cart: any) {

    cart.isClaimed = true;

    this.api.updateCart(cart)
      .pipe(catchError(err => {
        this.as.addAlert(new AlertMessage('error', err.error.Errors[0].Message));
        
        this.close.emit();

        return of(null)
      }))
      .subscribe((data: any) => {
        if (data == null) return;
        this.cs.setCart(cart);
        this.currentCart = cart;
        this.close.emit();

        this.as.addAlert(new AlertMessage('success', 'Cart selected!'));

        this.selected.emit();
      });
  }

  remove() {

    this.currentCart.isClaimed = false;

    this.api.updateCart(this.currentCart)
      .pipe(catchError(err => {

        this.as.addAlert(new AlertMessage('error', err.error.Errors[0].Message));

        this.close.emit();

        return of(null)
      }))
      .subscribe((data: any) => {
        if (data == null) return;

        this.cs.removeCart();
        this.currentCart = null;
        this.close.emit();

        this.as.addAlert(new AlertMessage('success', 'Cart removed!'));

        this.removed.emit();
      });
  }

  updateDifference() {
    this.cs.setMaxWeight(this.maxWeightDifference);

    this.close.emit();
  }
}
