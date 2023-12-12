import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  Type,
  ComponentRef,
  ViewContainerRef,
  inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogContainerComponent } from './dialog-container.component';

@Injectable({ providedIn: 'root' })
export class DomPortal {
  private mainContainer: ComponentRef<DialogContainerComponent>;
  private document = inject(DOCUMENT);
  private componentFactoryResolver = inject(ComponentFactoryResolver);
  private injector = inject(Injector);
  private appRef = inject(ApplicationRef);
  componentCreator: ViewContainerRef;

  constructor() {
    this.mainContainer = this.appendComponentToBody(DialogContainerComponent);
    this.componentCreator = this.mainContainer.instance.myDialog;
  }

  appendComponentToBody<T>(component: Type<T>) {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory<T>(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    this.document.body.appendChild(domElem);
    return componentRef;
  }
}
