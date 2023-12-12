import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ElementRef,
  inject,
  NgZone,
} from '@angular/core';
import { NguModalViewAnimation, NguModalSideAnimation } from './dialog.animation';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogOptions } from './dialog-ref';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'av-dialog',
  template: `
    <div
      class="dialog-overlay"
      (click)="backdrop.next($event)"
      [class.backdropColor]="backdropColor"
      [ngStyle]="{ 'z-index': options.overrideLowerDialog ? '982' : '980' }"
    >
      <div
        #dialogContainer
        class="center-container"
        [ngStyle]="{ width: options.width }"
        [ngClass]="options.fullWindow ? 'full-window' : ''"
        (click)="test($event)"
      >
        <div
          class="content-container overflow-hidden flex flex-col"
          [@viewAnimation]
          [ngClass]="classNames"
        >
          <div #dialogHeader>
            <div *ngIf="!isHideHeader" class="content-header pl-2.5 h-8 bg-secondary-background">
              <h2>{{ options.title }}</h2>
              <button
                bot-icon-button-small
                iconName="close"
                (click)="backdrop.next('close')"
                class="mr-1"
              ></button>
            </div>
          </div>
          <div class="h-full overflow-auto">
            <ng-container #myDialog></ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['dialog.component.scss'],
  animations: [NguModalViewAnimation, NguModalSideAnimation]
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild('myDialog', { read: ViewContainerRef, static: true }) myDialog: ViewContainerRef;

  @ViewChild('dialogHeader', { static: true }) dialogHeader: ElementRef<HTMLElement>;
  @ViewChild('dialogContainer', { static: true }) dialogContainer: ElementRef<HTMLElement>;

  backdrop = new Subject<any>();

  backdropColor = true;
  isSidePopup = true;
  private afterViewSource = new BehaviorSubject<ViewContainerRef>(null as any);
  afterView = this.afterViewSource.asObservable().pipe(filter(Boolean));
  options: DialogOptions;
  classNames = '';
  isHideHeader = false;

  ngZone = inject(NgZone);

  ngOnInit() {
    this.afterViewSource.next(this.myDialog);
    this.classNames = this.options.classNames?.join(' ') || '';
    this.isHideHeader = this.options.isHideHeader || false;
  }

  ngAfterViewInit() {
    this.afterViewSource.next(this.myDialog);
  }

  test(ev: MouseEvent) {
    ev.stopPropagation();
  }
}
