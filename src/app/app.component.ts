import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Decrement, Fail, Increment, RandomFailure, Reset } from './store/actions';
import { counterSelector } from './store/selectors';
import { IAppState, ICounterState } from './store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = 'ngrx101';

  public counter$: Observable<ICounterState>;

  constructor(
    private store: Store<IAppState>
  ) {
    // this.counter = store.pipe(select('counterState'));
    this.counter$ = store.pipe(select(counterSelector));
  }

  public increment() {
    this.store.dispatch(new Increment());
  }

  public decrement() {
    this.store.dispatch(new Decrement());
  }

  public fail() {
    this.store.dispatch(new Fail());
  }

  public reset() {
    this.store.dispatch(new Reset(0));
  }

  public randomFailure() {
    this.store.dispatch(new RandomFailure());
  }
}
