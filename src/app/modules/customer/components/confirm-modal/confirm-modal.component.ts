import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fes-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
