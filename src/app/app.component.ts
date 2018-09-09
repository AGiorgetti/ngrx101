import { Component } from '@angular/core';
import { ICounterState, IAppState } from './store/state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { counterSelector } from './store/selectors';
import { CounterActions, Increment, Decrement, Reset, Fail } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ngrx101';

  public counter: Observable<ICounterState>;

  constructor(
    private store: Store<IAppState>
  ) {
    // this.counter = store.pipe(select('counterState'));
    this.counter = store.pipe(select(counterSelector));
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
}
