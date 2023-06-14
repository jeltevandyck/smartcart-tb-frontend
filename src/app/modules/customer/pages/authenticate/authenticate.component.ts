import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  qrCode = ''

  activeModal = ''

  currentCart: any;

  constructor(
    private api: ApiService, 
    public cs: CartService, 
    private rt: Router, 
    private as: AlertService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    if (this.cs.isUser() && this.cs.isOrder()) {
      this.rt.navigate(['/c/dashboard']);
      return;
    }

    this.currentCart = this.cs.getCart();

    if (this.currentCart) {
      this.api.getCartById(this.currentCart.id).subscribe((data) => {
        this.currentCart = data;
        
        this.cs.setCart(this.currentCart);
        this.qrCode = this.currentCart.code;
      })
    }
  }

  generateQrCode() {
    this.currentCart = this.cs.getCart();

    if (this.currentCart) {
      this.qrCode = this.currentCart.code;
    }
  }

  authenticate() {
    const cart = this.cs.getCart();

    if (cart) {

      const user = this.cs.getUser();
      const groceryList = this.cs.getGroceryList();

      this.api.registerCart(cart, user, groceryList)
      .pipe(catchError((err) => {
        this.as.addAlert(new AlertMessage('error', err.error.Errors[0].Message));
        return of(null);
      })).subscribe((data) => {
        if (!data) return;
        this.api.createOrder(cart, user).subscribe((data) => {
          this.cs.setOrder(data);
          this.rt.navigate(['/c/dashboard']);
        })
      })
    } else {
      this.as.addAlert(new AlertMessage('error', 'Please select a cart first!'));
    }
  }

  
  isCollectedAll(list: any) {
    if (!list.groceryItems) {
      return false;
    }
    return list.groceryItems.every((product: any) => product.isCollected);
  }

  reset(list: any) {
    this.api.resetGroceryList(list).subscribe((data) => {
      this.as.addAlert(new AlertMessage('success', 'Grocery List Reset!'));
      this.cs.setGroceryList(data);
    });
  }
}
