import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { delay, map, tap, filter } from 'rxjs/operators';
import { CounterActionTypes, Fail, Noop, CounterActions } from '../actions';

@Injectable()
export class CounterEffects {

  /**
   * Make the counter randomly fail:
   * it will generate a random number, if the number is less than 5
   * issue a Fail() command to the counter.
   */
  @Effect() fail$ = this.actions$
    .pipe(
      ofType(CounterActionTypes.RANDOM_FAILURE),
      tap((a) => console.log(a.type)),
      delay(2000), // add latency, simulate network call
      map(() => {
        // get a number between 1 and 10
        const num = Math.floor(Math.random() * 10) + 1;
        if (num < 5) {
          console.log('Failure');
          return new Fail();
        } else {
          console.log('All ok!');
          // dispatching null, [] or empty() will result in an error,
          // dispatch a no-op action or rewrite the observable with the .filter()
          // operator to avoid the problem
          return new Noop();
        }
      })
    );

  /*
  @Effect() fail$ = this.actions$
    .pipe(
      ofType(CounterActionTypes.RANDOM_FAILURE),
      tap((a) => console.log(a.type)),
      delay(2000), // add latency, simulate network call
      map(() => {
        // get a number between 1 and 10
        return Math.floor(Math.random() * 10) + 1;
      }),
      // tap(num => console.log(num)),
      filter(num => num < 5),
      map((num) => new Fail())
    );
  */

  constructor(
    private actions$: Actions<CounterActions>
  ) { }
}
