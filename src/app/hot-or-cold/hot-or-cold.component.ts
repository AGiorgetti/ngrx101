import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState } from '../store/state';

@Component({
  selector: 'app-hot-or-cold',
  templateUrl: './hot-or-cold.component.html',
  styleUrls: ['./hot-or-cold.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotOrColdComponent implements OnInit {

  count$: Observable<number>;

  constructor(
    store: Store<IAppState>
  ) {
    this.count$ = store.pipe(
      select(state => state.counterState.count),
      tap(() => console.log('hot or cold ?'))
    );
  }

  ngOnInit() {
  }

}
