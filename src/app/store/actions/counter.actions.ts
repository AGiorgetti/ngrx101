import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  INCREMENT = '[Counter] Increment',
  DECREMENT = '[Counter] Decrement',
  FAIL = '[Counter] Fail',
  RESET = '[Counter] Reset',
  RANDOM_FAILURE = '[Counter] Random Failure',
}

export class Increment implements Action {
  readonly type = CounterActionTypes.INCREMENT;
}

export class Decrement implements Action {
  readonly type = CounterActionTypes.DECREMENT;
}

export class Fail implements Action {
  readonly type = CounterActionTypes.FAIL;
}

export class Reset implements Action {
  readonly type = CounterActionTypes.RESET;

  constructor(public payload: number) {}
}

export class RandomFailure implements Action {
  readonly type = CounterActionTypes.RANDOM_FAILURE;
}

export type CounterActions = Increment | Decrement | Fail | Reset | RandomFailure;
