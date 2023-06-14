import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'fes-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() edit = new EventEmitter<any>();
  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  getTotal() {
    const orderItem = this.product;

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

  changeAmount(amount: number) {
    if (this.product.amount > 1 || amount >= 1)
    {
      this.product.amount += amount
    }
  }
}
