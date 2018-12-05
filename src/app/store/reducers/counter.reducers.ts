import { CounterActions, CounterActionTypes } from '../actions';
import { ICounterState } from '../state';

// - a reducer "listen" to actions and it's responsible of changing a
//   'small' portion of the global state
// - a reducer MUST be a pure function
// - the state transitions should be handled in "an immutable way":
//   return a brand new state object, take advantage of the spread operator
//   to copy properties.
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
