import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state';
import { counterReducer } from './counter.reducers';

export * from './counter.reducers';

// Configure which 'portion' of the global application state is
// managed by each reducer.
// Reducers can be combined (using combineReducers()).
export const reducers: ActionReducerMap<IAppState> = {
  counterState: counterReducer
};
