import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { initialAppState } from './store/state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(null, { initialState: initialAppState })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
