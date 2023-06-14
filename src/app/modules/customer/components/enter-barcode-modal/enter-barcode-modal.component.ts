import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-enter-barcode-modal',
  templateUrl: './enter-barcode-modal.component.html',
  styleUrls: ['./enter-barcode-modal.component.css']
})
export class EnterBarcodeModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  
  barcode = '';

  constructor(
    private api: ApiService,
    private cs: CartService,
    private as: AlertService,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  enterBarcode() {
    const cart = this.cs.getCart();
    this.api.getProductByBarcode(this.barcode, cart.storeId)
    .pipe(catchError((error: any) => {

      const errorMsg = error.error.Errors[0].Message;

      this.closeModal();
      this.as.addAlert(new AlertMessage("error", errorMsg));

      return of(null);
    }))
    .subscribe((product: any) => {
      if (product) {
        this.cs.scanProduct(product);

        this.closeModal();
        this.as.addAlert(new AlertMessage('success', `Product ${product.name} added to cart!`));
      }
    })

  }

}
