import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxQRCodeModule
  ],
  exports: [
    NgxQRCodeModule,
    ModalComponent
  ]
})
export class SharedModule { }
