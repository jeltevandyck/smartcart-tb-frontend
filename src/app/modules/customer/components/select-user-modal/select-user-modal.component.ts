import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertMessage } from 'src/app/modules/shared/models/AlertMessage';
import { AlertService } from 'src/app/modules/shared/services/alert.service';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'fes-select-user-modal',
  templateUrl: './select-user-modal.component.html',
  styleUrls: ['./select-user-modal.component.css']
})
export class SelectUserModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() select = new EventEmitter();

  users: any[] = []

  currentUser: any;

  constructor(
    private api: ApiService, 
    private as: AlertService,
    private cs: CartService) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });

    this.currentUser = this.cs.getUser(); 
  }
  
  selectUser(user: any) {
    this.cs.setUser(user);
    this.currentUser = user;
    this.select.emit();
    
    this.as.addAlert(new AlertMessage('success', 'User selected!'));
  }

  remove() {
    this.cs.removeUser();
    this.cs.removeGroceryList();
    this.currentUser = null;
    this.close.emit();

    this.as.addAlert(new AlertMessage('success', 'User removed!'));
  }
}
