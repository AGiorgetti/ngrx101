import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';

import { initialAppState } from './store/state';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { environment } from '../environments/environment';
import { MemoizationComponent } from './memoization/memoization.component';
import { HotOrColdComponent } from './hot-or-cold/hot-or-cold.component';

@NgModule({
  declarations: [
    AppComponent,
    MemoizationComponent,
    HotOrColdComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { initialState: initialAppState }),
    EffectsModule.forRoot([...effects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    , connectInZone: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
