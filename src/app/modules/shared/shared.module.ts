import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxQRCodeModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxQRCodeModule,
    ModalComponent
  ]
})
export class SharedModule { }
