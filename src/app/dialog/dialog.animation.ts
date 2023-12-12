import {
  AnimationTriggerMetadata,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

export const NguModalSideAnimation: AnimationTriggerMetadata = trigger('sideAnimation', [
  state('1', style({ transform: 'none' })),
  state('void', style({ transform: 'translate3d(100%, 0, 0)' })),
  state('0', style({ transform: 'translate3d(100%, 0, 0)' })),
  transition('* => *', animate('400ms ease'))
]);

export const NguModalViewAnimation: AnimationTriggerMetadata = trigger('viewAnimation', [
  state('1', style({ transform: 'none', opacity: 1 })),
  state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
  state('0', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
  transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
]);
