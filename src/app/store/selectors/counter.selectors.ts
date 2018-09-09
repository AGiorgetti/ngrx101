import { createSelector } from '@ngrx/store';
import { IAppState, ICounterState } from '../state';

export const counterSelector = createSelector((state: IAppState) => state.counterState);

export const counterCountSelector = createSelector(
  counterSelector,
  state => state.count
);

export const counterFaultySelector = createSelector(
  counterSelector,
  state => state.faulty
);
