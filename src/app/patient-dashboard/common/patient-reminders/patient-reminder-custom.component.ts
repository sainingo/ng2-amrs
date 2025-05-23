import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
@Component({
  selector: 'custom-toast-reminder',
  styleUrls: ['./patient-reminder-custom.component.css'],
  templateUrl: './patient-reminder-custom.component.html',
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          display: 'none',
          opacity: 0
        })
      ),
      state('active', style({})),
      state('removed', style({ opacity: 0 })),
      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}')
      ),
      transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
    ])
  ],
  preserveWhitespaces: false
})
export class PatientReminderCustomComponent extends Toast {
  public enrolling = false;
  _options: any = {};

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
    public localStorageService: LocalStorageService
  ) {
    super(toastrService, toastPackage);
    this.options['timeOut'] = 3000;
    this.options['disableTimeOut'] = false;
    Object.assign(this._options, this.options);
  }

  public autoEnrollToProgram(event) {
    event.stopPropagation();
    this.enrolling = true;
    setTimeout(() => {
      this.toastPackage.triggerAction((this.options as any).reminder);
    }, 500);
    return false;
  }

  public addContacts(event) {
    event.stopPropagation();
    setTimeout(() => {
      this.toastPackage.triggerAction((this.options as any).reminder);
    }, 500);
    return false;
  }

  public updateContacts(event) {
    event.stopPropagation();
    setTimeout(() => {
      this.toastPackage.triggerAction((this.options as any).reminder);
    }, 500);
    this.localStorageService.setItem('elicitationAction', 'addContacts');
    return false;
  }

  public updateElicitationDate(event) {
    event.stopPropagation();
    setTimeout(() => {
      this.toastPackage.triggerAction((this.options as any).reminder);
    }, 500);
    this.localStorageService.setItem('elicitationAction', 'updateDate');
    return false;
  }
}
