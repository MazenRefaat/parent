import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  @Input() user;
  @Input() action: String;

  @Output() modalAction: EventEmitter <any> = new EventEmitter;

  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      firstName: this.user.first_name,
      lastName: this.user.last_name
    });
  }

  doAction() {
    let obj = {
      'action': this.action,
      'target': event.target,
      'user': {
        'first_name': this.editForm.value.firstName,
        'last_name': this.editForm.value.lastName
      }
    }
    this.modalAction.emit(obj);
  }
}
