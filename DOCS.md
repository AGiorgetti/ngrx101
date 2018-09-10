# ngrx

This sample project will reuse ideas and code from the official ngrx project documentation,
partially rewritten and presented in a different order to 'better' explain the ngrx workflow.

- `@ngrx/store` - RxJS powered state management for Angular applications, inspired by Redux.
- `@ngrx/effects` - Side Effect model for @ngrx/store.

## ngrx/store

ngrx/store is a controlled state container.

Core principles: 

- **State** is a single, **immutable data structure**.
- **Actions** describe state changes.
- **Reducers**: Pure functions (no side effect) that take the previous state and the next action to compute the new state.
- State is accessed within the Store using **selector functions** that return an observable of a slice of the state.

These core principles enable building components that can use the `OnPush` change detection strategy to optimize the Angular application.

When we think about the state inside ngrx/store we should think about a database we can query over (using the selector functions).

Using redux or ngrx to write an application is much like implementing it following the CQRS guidelines and patterns:

- Commands / Events == Actions
- Projections == State -> Selectors || Actions -> Reducers -> State -> Selectors
- Command -> Aggregate -> Event == Action -> Reducer -> State || Action -> (Side)Effects -> Actions

There's an emphasized separation between a read and a write pipeline, like the CQRS approach.

### Setup

    npm install @ngrx/store --save

Then import the `StoreModule` in the AppModule.

    StoreModule.forRoot({}, { initialState: {} })

### The Basic ngrx building blocks and 'workflow'

1) **State**: start defining the application State;
   
   WARNING: the State should be treated as an IMMUTABLE object, you are not allowed to change
            the value of a single property!

    export interface ICounterState {
      count: number;
      faulty: boolean;
    }

    export interface IAppState {
      counterState: ICounterState;
      faulty: false;
    }

2) Good practice: provide a value to initialize the state:

    export const initialAppState: IAppState = {
      counterState: initialCounterState
    };

in the AppModule:

    StoreModule.forRoot(null, { initialState: initialAppState })

3) **Action**, tell the application what to do in order to change the state:

    export enum CounterActionTypes {
      INCREMENT = '[Counter] Increment',
    }

    export class Increment implements Action {
      readonly type = CounterActionTypes.INCREMENT;
    }

4) **Reducer**, how the application react to actions, how the state is changed.

A Reducer is a function that takes two arguments: the current state and the action to perform, it will return the new instance of the state.

    export function counterReducer(state: ICounterState, action: CounterActions): ICounterState {
      switch (action.type) {
        case CounterActionTypes.INCREMENT: {
          return {
            ...state,
            count: state.count + 1
          };
        }

        default: {
          return state;
        }
      }
    }

5) Configure the StoreModule with all the reducers, we must feed the StoreModule.forRoot() function with an ActionReducerMap<TState> object that provide the references to the reducers functions.

I usually add this configuration oject to the index.ts file inside the reducers folder.

    export const reducers: ActionReducerMap<IAppState> = {
      counterState: counterReducer
    };

and in the AppModule:

    StoreModule.forRoot(reducers, { initialState: initialAppState })

6) Selectors - access slices of state exposed as observables, so we get proper notifications when the state changes.

Inject the `Store` object and use the `select` operator to a slice of the state.

Pass it a string:

    store.pipe(select('counterState'));

or (Best Practice) use a selector function:

    import { createSelector } from '@ngrx/store';
    import { IAppState } from '../state';

    export const counterSelector = createSelector((state: IAppState) => state.counterState);

    ...

    this.counter = store.pipe(select(counterSelector));

selection functions can be composed!

7) Dispatch Actions to the Store

Inject the `Store` object and call the `dispatch` method:

    this.store.dispatch(new Increment());

## ngrx/effects

RxJS powered side effect model for @ngrx/store

Core principles: 

- Listen for actions dispatched from @ngrx/store.
- Isolate side effects from components, allowing for more 'pure' components that select state and dispatch actions.
- Provide new sources of actions to reduce state based on external interactions such as network requests, web socket messages and time-based events.

Effects are injectable service classes, they use the following APIs.

**Effect decorator**

The @Effect() decorator provides metadata to register observable side-effects in the effects class.

**Actions Observable**

Represents an observable of all the actions dispatched to the store.

Emits the latest action after the action has passed through all reducers.

The '.ofType()' operator lets you filter for actions of a certain type, this way we can select which action to use inside the side effect.

### Setup

    npm install @ngrx/effects --save

import the EffectsModule in the AppModule

    EffectsModule.forFeature([...list of effects...])

### Basic usage of ngrx/effects

1) define the effect class and mark it with the injectable decorator:

    import { Injectable } from '@angular/core';
    import { Actions } from '@ngrx/effects';

    @Injectable()
    export class CounterEffects {
    
      constructor(
        private actions$: Actions
      ) { }
    }

2) in the index.ts export an array of all the effects and configure the EffectsModule to accept that array in the EffectsModule.forRoot() configuration function:

    export const effects = [ CounterEffects ];

...

    EffectsModule.forRoot(effects)

3) implement the side effects filtering the actions$ observable:

    @Effect()
    fail$ = this.actions$
      .ofType(CounterActionTypes.RANDOM_FAILURE)
      .pipe(
        delay(2000),
        map(() => {
          // get a number between 1 and 10
          const num = Math.floor(Math.random() * 10) + 1;
          if (num < 5) {
            return [
              new Fail()
            ];
          } else {
            return []; // warning: this will compile, but you'll get runtime errors
          }
        })
      );

**Best practices**

Side effects that do not disptach actions at all, use the decorator parameter:

    @Effect({ dispatch: false })

Side effect that might not dispatch an action given some conditions, you have two options:

1- Return / Dispatch a no-op action.

2- use the observable .filter() operator to avoid the observable proceed is the requirements are not mach






