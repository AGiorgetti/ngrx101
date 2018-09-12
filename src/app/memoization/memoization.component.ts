import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { counterSelector } from '../store/selectors';
import { IAppState } from '../store/state';

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
  styleUrls: ['./memoization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
