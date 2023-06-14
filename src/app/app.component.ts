import { Component } from '@angular/core';
import { AlertService } from './modules/shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public ars: AlertService) {

  }
}
