import { CounterActions, CounterActionTypes } from '../actions';
import { ICounterState } from '../state';

export function counterReducer(state: ICounterState, action: CounterActions): ICounterState {
  switch (action.type) {
    case CounterActionTypes.INCREMENT: {
      return {
        ...state,
        count: state.count + 1
      };
    }

    case CounterActionTypes.DECREMENT: {
      return {
        ...state,
        count: state.count - 1
      };
    }

    case CounterActionTypes.FAIL: {
      return {
        ...state,
        faulty: true
      };
    }

    case CounterActionTypes.RESET: {
      return {
        count: action.payload,
        faulty: false
      };
    }

    default: {
      return state;
    }
  }
}
