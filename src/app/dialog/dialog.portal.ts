import { Injectable, Injector, Type, inject } from '@angular/core';
import { DomPortal } from './dom.portal';
import { DialogComponent } from './dialog.component';
import { DialogOptions, createInj, AvDialogRef } from './dialog-ref';
import { first } from 'rxjs/operators';

/**
 * @deprecated Use dialogPortal() instead
 * @example
 * ```
 * import { dialogPortal } from '@appuikit/dialog';
 *
 * class MyComponent {
 *   private dialog = dialogPortal();
 * }
 * ```
 */
@Injectable()
export class DialogService {
  private dialog = dialogPortal();

  open = this.dialog.open;
  closeAll = this.dialog.closeAll;

  // constructor() {
  //   console.trace('DialogService');
  // }
}

export function dialogPortal() {
  const dom = inject(DomPortal);
  const injector = inject(Injector);

  function open<T>(component: Type<T>, opt?: DialogOptions) {
    const options = { ...new DialogOptions(), ...opt };
    const d = DialogComponent;
    const parent = dom.componentCreator.createComponent(
      DialogComponent,
      { injector }
    );
    parent.instance.options = options;

    const diaRef = new AvDialogRef(parent, options);

    parent.instance.afterView.pipe(first()).subscribe(vcRef => {
      const child = vcRef.createComponent(component, {
        injector: createInj(injector, options.data, diaRef)
      });
      diaRef.onDestroy.pipe(first()).subscribe(() => {
        child.destroy();
      });
    });

    const { afterClosed } = diaRef;
    return { afterClosed };
  }

  function closeAll() {
    dom.componentCreator.clear();
  }
  return { open, closeAll };
}
