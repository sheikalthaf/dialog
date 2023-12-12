import { ComponentRef, InjectionToken, Injector } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogComponent } from './dialog.component';

abstract class DialogRef<T> {
  data: T = this.options.data;
  private backdropSub: Subscription;
  onDestroy = new Subject();
  private afterClosedSource = new Subject<any>();
  afterClosed = this.afterClosedSource.asObservable().pipe(first());

  constructor(
    private d: ComponentRef<DialogComponent>,
    private options: DialogOptions
  ) {
    if (d) {
      d.instance.backdropColor = options.backdropColor || false;
      this.backdropSub = d.instance.backdrop.subscribe(r => {
        if (options.backdrop || r === 'close') this.close();
      });
    }
  }

  close(data?: any) {
    this.afterClosedSource.next(data);
    this.destroy();
  }

  private destroy() {
    this.backdropSub?.unsubscribe();
    this.afterClosedSource.next(false);
    this.afterClosedSource.complete();
    this.onDestroy.next(false);
    this.d?.destroy();
  }
}

export class AvDialogRef<T = any> extends DialogRef<T> {}

export class DialogTestingRef {
  close() {}
}

export class DialogOptions {
  // tslint:disable-next-line: whitespace
  backdrop? = true;
  // tslint:disable-next-line: whitespace
  backdropColor? = true;
  // tslint:disable-next-line: whitespace
  hideOverlay? = false;
  data?: any;
  // tslint:disable-next-line: whitespace
  isSidePopup? = false;
  title?: string;
  fullWindow?: boolean;
  width?: string;
  classNames?: string[] = [];
  isHideHeader?: boolean;
  overrideLowerDialog?: boolean = false;
}

export const DIALOG_INJ = new InjectionToken('dialogInj');

export function createInj(parent: Injector, data: any, diaref: AvDialogRef) {
  return Injector.create({
    providers: [
      { provide: DIALOG_INJ, useValue: data },
      { provide: AvDialogRef, useValue: diaref }
    ],
    parent,
    name: 'dialogInj'
  });
}

export const DialogTestProviders = [
  { provide: DIALOG_INJ, useValue: {} },
  { provide: AvDialogRef, useValue: null }
];
