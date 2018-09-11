import { Component, OnInit } from '@angular/core';
import { IAppState } from '../store/state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { counterCountSelector } from '../store/selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hot-or-cold',
  templateUrl: './hot-or-cold.component.html',
  styleUrls: ['./hot-or-cold.component.css']
})
export class HotOrColdComponent implements OnInit {

  count$: Observable<number>;

  constructor(
    store: Store<IAppState>
  ) {
    this.count$ = store.pipe(
      tap(() => console.log('hot or cold ?')),
      select(counterCountSelector)
    );
  }

  ngOnInit() {
  }

}
