import { ICounterState, initialCounterState } from './counter-state';

export interface IAppState {
  counterState: ICounterState;
}

export const initialAppState: IAppState = {
  counterState: initialCounterState
};
