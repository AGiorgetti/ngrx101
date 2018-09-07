# ngrx

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

### Setup

    npm install @ngrx/store --save

Then import the `StoreModule` in the AppModule.

    StoreModule.forRoot({}, { initialState: {} })

### Usage

1) Start defining the State:

    export interface ICounterState {
      count: number;
    }

2) Good practice: provide an initial value to initialize state:
