import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { initialAppState } from './store/state';
import { reducers } from './store/reducers';
import { effects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { initialState: initialAppState }),
    EffectsModule.forRoot([...effects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
