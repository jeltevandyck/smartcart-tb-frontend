import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit, OnDestroy {

  groceryList: any;
  updatedOrderItemObserver: any;

  constructor(
    private cs: CartService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.groceryList = this.cs.getGroceryList();

    if (this.groceryList != null) {
      this.updatedOrderItemObserver = this.cs.updatedOrderItem.subscribe((product) => {
        this.api.getGroceryListById(this.groceryList.id).subscribe((res) => {
          this.cs.setGroceryList(res);
          this.groceryList = res;
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.updatedOrderItemObserver.unsubscribe();
  }
}
