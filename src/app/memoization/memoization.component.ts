import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { counterSelector } from '../store/selectors';
import { IAppState } from '../store/state';

// selectors created with the 'createSelector' function have many advantages over using plain
// functions, the most noticieable: composition and memoization.
const memoizedSelector = createSelector(
  counterSelector,
  (state) => {
    // You should see just one of these logs in the console window for every state change
    // despite the observable being cold and evaluated multiple times (one for each binding).
    console.log('memoized selector: ' + JSON.stringify(state));
    return state.count;
  });

// memoized values stays in memory indefinitely, to reset them and remove them from memory call:
// memoizedSelector.release();

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
