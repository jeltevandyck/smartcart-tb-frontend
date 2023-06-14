import { Injectable } from '@angular/core';
import { AlertMessage } from '../models/AlertMessage';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: AlertMessage[] = [];

  constructor() {
    setInterval(() => {
      for (let alert of this.alerts) {
        alert.duration--;
        if (alert.duration === 0) {
          this.alerts.splice(this.alerts.indexOf(alert), 1);
        }
      }
    }, 1000)
  }

  getAlerts() {
    return this.alerts;
  }

  addAlert(error: AlertMessage) {
    this.alerts.push(error);
  }
}
