import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'av-dialog-container',
  template: ` <ng-container #myDialog></ng-container> `
})
export class DialogContainerComponent implements OnInit {
  @ViewChild('myDialog', { read: ViewContainerRef, static: true }) myDialog: ViewContainerRef;

  constructor() {}

  ngOnInit() {}
}
