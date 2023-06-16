import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${environment.baseUrl}/User`)
  }

  getAllCarts() {
    return this.http.get(`${environment.baseUrl}/Cart`)
  }

  getCartById(id: number) {
    return this.http.get(`${environment.baseUrl}/Cart/${id}`)
  }

  getProductByBarcode(barcode: string, storeId: string) {
    return this.http.get(`${environment.baseUrl}/Product/Barcode?barcode=${barcode}&storeId=${storeId}`)
  }

  registerCart(cart: any, user: any, groceryList: any) {
    const registerCart = {
      id: cart.id,
      userId: user ? user.id : null,
      groceryListId: groceryList ? groceryList.id : null,
      storeId: cart.storeId,
      code: cart.code,
    }

    return this.http.post(`${environment.baseUrl}/Cart/Register`, registerCart)
  }

  unregisterCart(cart: any) {
    const unregisterCart = {
      id: cart.id,
      storeId: cart.storeId,
      code: cart.code,
    }
    
    return this.http.post(`${environment.baseUrl}/Cart/Unregister`, cart)
  }

  createOrder(cart: any, user: any) {
    const order = {
      cartId: cart.id,
      userId: user ? user.id : null,
    }
    return this.http.post(`${environment.baseUrl}/Order`, order)
  }

  updateOrder(order: any, orderStatus: string) {
    const orderUpdate = {
      id: order.id,
      cartId: order.cartId,
      orderStatus: orderStatus,
    }

    return this.http.put(`${environment.baseUrl}/Order`, orderUpdate)
  }

  deleteOrder(order: any) {
    return this.http.delete(`${environment.baseUrl}/Order?id=${order.id}`)
  }
  
  createOrderItem(order: any, product: any, amount: number)
  {
    const orderItem = {
      orderId: order.id,
      productId: product.id,
      amount: amount,
    }

    return this.http.post(`${environment.baseUrl}/Order/Product`, orderItem)
  }

  updateOrderItem(orderItem: any) {
    const orderItemUpdate = {
      id: orderItem.id,
      productId: orderItem.productId,
      orderId: orderItem.orderId,
      amount: orderItem.amount,
    }

    return this.http.put(`${environment.baseUrl}/Order/Product`, orderItemUpdate)
  }

  deleteOrderItem(orderItem: any) {
    return this.http.delete(`${environment.baseUrl}/Order/Product?id=${orderItem.id}`)
  }

  getOrderById(id: string) {
    return this.http.get(`${environment.baseUrl}/Order/${id}`)
  }

  getGroceryListById(id : string) {
    return this.http.get(`${environment.baseUrl}/GroceryList/${id}`)
  }

  resetGroceryList(groceryList: any) {
    const reset = {
      id: groceryList.id,
    }
    return this.http.post(`${environment.baseUrl}/GroceryList/Reset`, reset)
  }
}
