import { createSelector } from '@ngrx/store';
import { IAppState, ICounterState } from '../state';

// a selector expose a slice of the state to be consumed by components
export const counterSelector = createSelector((state: IAppState) => state.counterState);

// selectors can be composed
export const counterCountSelector = createSelector(
  counterSelector,
  state => state.count
);

export const counterFaultySelector = createSelector(
  counterSelector,
  state => state.faulty
);

// selectors created with the 'createSelector' function have many advantages over using plain
// functions, the most noticieable: composition and memoization.
