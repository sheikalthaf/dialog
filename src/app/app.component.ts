import { Component } from '@angular/core';
import { dialogPortal } from './dialog';
import { TestComponent } from './test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `<button (click)="openDialog()">Open Dialog</button>`,
  styles: ``
})
export class AppComponent {
  title = 'dialog';

  dialog = dialogPortal();

  openDialog() {
    this.dialog.open(TestComponent, {
      title: 'Test Dialog',
      width: '500px',
      fullWindow: false,
      data: { test: 'test' }
    });
  }
}
