import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private scanEvent: EventEmitter<any> = new EventEmitter<any>();
  public scannedProduct: Observable<any> = this.scanEvent.asObservable();

  private updateOrderItem: EventEmitter<any> = new EventEmitter<any>();
  public updatedOrderItem: Observable<any> = this.updateOrderItem.asObservable();

  public order: any

  constructor(private storage: StorageService) { }

  //#region Cart
  setCart(cart: any) {
    this.storage.setItem('cart', cart);
  }

  getCart() {
    return this.storage.getItem('cart');
  }

  removeCart() {
    this.storage.removeItem('cart');
  }

  isCart() {
    return this.storage.getItem('cart') ? true : false;
  }
  //#endregion

  //#region User
  setUser(user: any) {
    this.storage.setItem('user', user);
  }

  getUser() {
    return this.storage.getItem('user');
  }

  removeUser() {
    this.storage.removeItem('user');
  }

  isUser() {
    return this.storage.getItem('user') ? true : false;
  }
  //#endregion

  //#region Grocery List
  setGroceryList(groceryList: any) {
    groceryList.groceryItems = groceryList.groceryItems || [];
    this.storage.setItem('groceryList', groceryList);
  }

  getGroceryList() {
    return this.storage.getItem('groceryList');
  }

  removeGroceryList() {
    this.storage.removeItem('groceryList');
  }

  isGroceryList() {
    return this.storage.getItem('groceryList') ? true : false;
  }

  //#endregion

  //#region Order
  setOrder(order: any) {
    order.orderItems = order.orderItems || [];
    this.storage.setItem('order', order);
    this.order = order;
  }

  getOrder() {
    return this.storage.getItem('order');
  }

  removeOrder() {
    this.storage.removeItem('order');
  }

  isOrder() {
    return this.storage.getItem('order') ? true : false;
  }
  //#endregion

  //#region Product
  scanProduct(product: any) {    
    this.scanEvent.emit(product);
  }

  updateOrderItemEvent() {
    this.updateOrderItem.emit();
  }
  //#endregion

  //#region Weight
  setWeight(weight: any) {
    this.storage.setItem('weight', weight);
  }

  getWeight() {
    return this.storage.getItem('weight');
  }

  removeWeight() {
    this.storage.removeItem('weight');
  }

  isWeight() {
    return this.storage.getItem('weight') ? true : false;
  }

  setMaxWeight(weight: any) {
    this.storage.setItem('maxWeight', weight);
  }

  getMaxWeight() {
    return this.storage.getItem('maxWeight');
  }

  removeMaxWeight() {
    this.storage.removeItem('maxWeight');
  }

  isMaxWeight() {
    return this.storage.getItem('maxWeight') ? true : false;
  }
  //#endregion
}
