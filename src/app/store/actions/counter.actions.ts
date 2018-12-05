import { Action } from '@ngrx/store';

/* an Action is a simple interface

interface Action {
  type: string;
}

*/

// a string enum is a convenient way to avoid magic strings floating around
// it will also enable / suport type inference when it comes to write the reducers
export enum CounterActionTypes {
  INCREMENT = '[Counter] Increment', // best practice: add some namespacing to
                                     // provide context to the action
  DECREMENT = '[Counter] Decrement',
  FAIL = '[Counter] Fail',
  RESET = '[Counter] Reset',
  RANDOM_FAILURE = '[Counter] Random Failure',
}

// each action should be described by its own class

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

  constructor(public payload: number) { }
}

export class RandomFailure implements Action {
  readonly type = CounterActionTypes.RANDOM_FAILURE;
}

// Discriminated Unions (https://www.typescriptlang.org/docs/handbook/advanced-types.html)
// are another 'trick' to take advantage of TypeScript structural type checking
// and type inference when writing the reducers (or whatever needs to deal with
// the stream of actions)
export type CounterActions = Increment | Decrement | Fail | Reset | RandomFailure;
