import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state';
import { counterReducer } from './counter.reducers';

export * from './counter.reducers';

export const reducers: ActionReducerMap<IAppState> = {
  counterState: counterReducer
};
