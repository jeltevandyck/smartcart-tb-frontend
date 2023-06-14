import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-select-grocery-list-modal',
  templateUrl: './select-grocery-list-modal.component.html',
  styleUrls: ['./select-grocery-list-modal.component.css']
})
export class SelectGroceryListModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() select = new EventEmitter();

  user: any;

  constructor(
    private cs: CartService,
    private api: ApiService,
    private as: AlertService
  ) { }

  ngOnInit(): void {
    this.user = this.cs.getUser();
  }

  selectList(list: any) {
    this.api.getGroceryListById(list.id).subscribe((groceryList) => {
      this.cs.setGroceryList(groceryList);
      this.close.emit();
      this.select.emit();
      this.as.addAlert(new AlertMessage('success', 'Selected Grocery List!'))
    })
  }

}
