# ngrx

NgRx is a framework for building Reactive Applications in Angular.

This sample project will reuse some ideas and code from the official ngrx project documentation.
The code will be partially rewritten and presented in a different order to explain the ngrx workflow the way I understand and feel more comfortable doing it.

The following libraries will be used:

- `@ngrx/store` - RxJS powered state management for Angular applications, inspired by Redux.
- `@ngrx/effects` - Side Effect model for @ngrx/store.
- `@ngrx/store-devtools` - Store instrumentation that enables a powerful time-travelling debugger.
- `@ngrx/router-store` - Bindings to connect the Angular Router to ngrx/store.

## ngrx/store

ngrx/store is a controlled state container.

Core principles: 

- **State**: is a single, **immutable data structure**.
- **Actions**: events dispatched from components and services: describe / trigger state changes.
- **Reducers**: _pure functions_ (functions no side effect) that take the previous state and the next action to compute the new state> the reducers are the only way to change the state inside the Store.
- State is accessed within the Store using **selector functions** (_pure functions_) that return an observable of a slice of the state.

These core principles enable building components that can use the `OnPush` change detection strategy to optimize the Angular application.

When we think about the state inside ngrx/store, we should think about a database we can query over (using some selector functions).

The result of the [query' is not finite value, but a stream of data delivered over time that describe the evolution of the system.

Using redux or ngrx to write an application is much like implementing it following the CQRS guidelines and patterns in JavaScript / Angular world.

- **Message Driven**: Commands / Events == Actions / (State Change) Notifications.
- **Read pipeline**: Projections == State -> Selectors || Actions -> Reducers -> State -> Selectors.
- **Write pipeline**: Command -> Aggregate -> Event == Action -> Reducer -> State || Action -> (Side)Effects -> Actions.

There's an emphasized separation between a read and a write pipeline, like the CQRS approach.

### Setup

    npm install @ngrx/store --save

Then import the `StoreModule` in the AppModule.

    StoreModule.forRoot({}, { initialState: {} })

### The Basic ngrx building blocks and 'workflow'

**1) State**: start defining the application State;
   
**WARNING: the State should be treated as an IMMUTABLE object, you are not allowed to change the value of a single property!**

    export interface ICounterState {
      count: number;
      faulty: boolean;
    }

    export interface IAppState {
      counterState: ICounterState;
    }

**2) Good practice**: provide an **initial value** to the store:
    
    export const initialCounterState: ICounterState = {
      count: 0,
      faulty: false
    };

    export const initialAppState: IAppState = {
      counterState: initialCounterState
    };

in the AppModule:

    StoreModule.forRoot(..., { initialState: initialAppState })

**3) Action**: tells the application what to do in order to change the state:

    export enum CounterActionTypes {
      INCREMENT = '[Counter] Increment',
    }

    export class Increment implements Action {
      readonly type = CounterActionTypes.INCREMENT;
    }

    export type CounterActions = Increment;

**4) Reducer**: defines how the application react to actions; how the state is changed.

A Reducer is a pure function that takes two arguments: the current state and the Action to perform, it will return the new instance of the state.

Reducers operate synchronously!

**WARNING: do NOT mutate the state! Always return a new oject, this is the only way we guarantee immutability!**

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

**5) Configure the StoreModule** with all the reducers: we must feed the **StoreModule.forRoot()** function with an **ActionReducerMap&lt;TState&gt;** object that provides the references to the reducers functions.

I usually add this configuration object to the index.ts file inside the reducers folder.

    export const reducers: ActionReducerMap<IAppState> = {
      counterState: counterReducer
    };

and in the AppModule:

    StoreModule.forRoot(reducers, { initialState: initialAppState })

**6) Selectors**: expose a slice of the state as observables, thus we get proper notifications when the state changes.

Inject the `Store` object and use the `select` operator to retrieve the Observable of the slice of state.

Pass it a string:

    store.pipe(select('counterState'));

or (Best Practice) use a selector function:

    import { createSelector } from '@ngrx/store';
    import { IAppState } from '../state';

    export const counterSelector = createSelector((state: IAppState) => state.counterState);

    ...

    this.counter$ = store.pipe(select(counterSelector));

selection functions can be composed!

**7) Dispatch Actions** to the Store

Inject the `Store` object and call the `dispatch` method:

    this.store.dispatch(new Increment());

**Best Practice - beware of Unicast / Cold Observables and Memoization**

Are ngrx observables hot ot cold ? 

Playing with the sample code you'll see that the store observables are Unicast / Cold: the selectors will be evaluated every time we subscribe to the observables.

Be careful if you have a complex chain of operators and multiple bindings or subscriptions to it.

Using pure selector functions and Memoization (provided by ngrx for free) help avoid the performance issue.

Selectors are pure functions so memoization (a sort-of caching can help reduce the potential performance hit).

Try to use the two components: <app-hot-or-cold> and <app-memoization>.

**Best Practice**

The state should be normalized: refer to [redux documentaion](https://redux.js.org/recipes/structuringreducers/normalizingstateshape) for better explanation.

## ngrx/effects

RxJS powered side effect model for @ngrx/store.

Core principles: 

- Listen for actions dispatched from @ngrx/store.
- Isolate side effects (access to external services, business logic, etc.) from components, promoting the creation of more 'pure' components that select state and dispatch actions.
- Provide new sources of actions based on external interactions such as network requests, web socket messages and time-based events.
- An Effect is an Observable<Action> that should emit non empty arrays of Actions that will (optionally) be dispatched to the Store by the library itself.

Effects are _injectable service classes_, they use the following APIs:

**Effect() decorator**

The `@Effect()` decorator provides the metadata to register the effect in the Store.

**Actions observable**

The `Actions` Service represents an observable 'endpoint' of all the actions dispatched to the store.

It emits the latest action after it has passed through all reducers.

The 'ofType()' operator let us filter for actions of a certain type, this way we can select which action to listen to and use inside the side effect.

### Setup

    npm install @ngrx/effects --save

import the EffectsModule in the AppModule

    EffectsModule.forRoot([...list of effects...])

### Basic usage of ngrx/effects

**1) declare the effect class** and mark it with the _injectable_ decorator:

    import { Injectable } from '@angular/core';
    import { Actions } from '@ngrx/effects';

    @Injectable()
    export class CounterEffects {
    
      constructor(
        private actions$: Actions
      ) { }
    }

**2) Configure the EffectsModule to accept an array of all the effects**: in the index.ts export an array of all the effects and pass it to the **EffectsModule.forRoot()** configuration function (for feature modules use EffectModule.forFeature()):

    export const effects = [ CounterEffects ];

...

    EffectsModule.forRoot(effects)

**3) implement the side effect applying operators to the actions$** observable:

    @Effect()
    fail$ = this.actions$
      .pipe(
        ofType(CounterActionTypes.RANDOM_FAILURE)
        delay(2000),
        map(() => {
          // get a number between 1 and 10
          const num = Math.floor(Math.random() * 10) + 1;
          if (num < 5) {
            return [
              new Fail()
            ];
          } else {
            return []; // warning: this will compile, but you'll get runtime errors!! see the best  
                       //          practice below!.
          }
        })
      );

**Best practices**

Side effects that do not dispatch actions at all must specify it in the decorator parameter:

    @Effect({ dispatch: false })

Side effect that might not dispatch actions under some conditions can be implemented in two ways:

1- Return / Dispatch a no-op action.

2- use the observable `filter()` operator to avoid the observable proceed if the requirements are not met.

    @Effect()
    fail$ = this.actions$
      .pipe(
        ofType(CounterActionTypes.RANDOM_FAILURE),
        tap((a) => console.log(a.type)),
        delay(2000),
        map(() => {
          // get a number between 1 and 10
          return Math.floor(Math.random() * 10) + 1;
        }),
        // tap(num => console.log(num)),
        filter(num => num < 5),
        map((num) => new Fail())
      );

## ngrx/store-devtools

Store-DevTools is an instrumentation library that enables a powerful time-travelling debugger.

    npm install @ngrx/store-devtools --save

Also install the Chrome / Firefox Extension.

Download and install the [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension/).

In your AppModule imports enable the instrumentation using **StoreDevtoolsModule.instrument({})**:

    import { StoreDevtoolsModule } from '@ngrx/store-devtools';
    import { environment } from '../environments/environment'; // Angular CLI environemnt

    @NgModule({
      imports: [
        StoreModule.forRoot(reducers),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        }),
      ],
    })
    export class AppModule {}

For a complete list of supported instrumentation options click [here](https://ngrx.io/guide/store-devtools/config).

## ngrx/router-store

The idea is to hook to Angular Router events and translate them in something that can be processed byt the Store..

See the official documentation: the module is pretty simple and much of its implementation is a 
copy/paste.

For a full implementation (with navigation actions and side effects too) head to: https://github.com/PrimordialCode/BigBrother
