import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { StorageService } from 'src/app/modules/shared/services/storage.service';

@Component({
  selector: 'fes-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css']
})
export class HelpModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() open = new EventEmitter<string>();

  constructor(
    private api: ApiService, 
    private cs: CartService, 
    private rt: Router,
    private as: AlertService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  openModal(modal: string) {
    this.open.emit(modal);
  }

  cancel() {
    const order = this.cs.getOrder();
    const cart = this.cs.getCart();
    
    this.api.unregisterCart(cart).subscribe((data) => {
      this.cs.removeUser();
      this.cs.removeGroceryList();
      this.rt.navigate(['/c/start']);
    })
    this.cs.removeOrder();
    this.api.deleteOrder(order)
    .pipe(catchError((err) => {
      if (err) {
        this.as.addAlert(new AlertMessage('error', 'Something went wrong. Please try again later.'));
      }

      return of(null)
    }))
    .subscribe((data) => {
      
    })

    this.closeModal();
  }

}
