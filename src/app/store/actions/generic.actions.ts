import { Action } from '@ngrx/store';

export enum GenericActionTypes {
  NOOP = '[Generic] noop'
}

export class Noop implements Action {
  readonly type = GenericActionTypes.NOOP;
}

export type GenericActions = Noop;
