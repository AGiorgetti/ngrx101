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

### The Basic ngrx building blocks and workflow

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






