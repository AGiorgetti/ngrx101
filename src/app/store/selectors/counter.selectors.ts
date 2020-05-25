
import { IAppState } from '../state';
import { createSelector } from '@ngrx/store';

// a selector exposes a slice of the state to be consumed by components
export const counterSelector = (state: IAppState) => state.counterState;

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
// functions, the most important: composition and memoization.
