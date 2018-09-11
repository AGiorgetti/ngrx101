import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/state';
import { Store, createSelector, select } from '@ngrx/store';
import { counterSelector } from '../store/selectors';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const memoizedSelector = createSelector(
  counterSelector,
  (state) => {
    // this log is actually a 'side effect' something that should not be allowed in a pure function.
    console.log('memoized selector: ' + JSON.stringify(state));
    return state.count;
  });

@Component({
  selector: 'app-memoization',
  templateUrl: './memoization.component.html',
  styleUrls: ['./memoization.component.css']
})
export class MemoizationComponent implements OnInit {

  count$: Observable<number>;

  constructor(
    store: Store<IAppState>
  ) {
    this.count$ = store.pipe(
      select(memoizedSelector)
    );
  }

  ngOnInit() {
  }

}
