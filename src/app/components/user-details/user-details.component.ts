import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: Object;

  @Output() userAction: EventEmitter <any> = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  doUserAction() {
    this.userAction.emit(event.target);
  }
}
