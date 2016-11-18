import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { Ionic2Calendar } from '../index';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, Ionic2Calendar ],
  providers:    [ Ionic2Calendar ],
  bootstrap:    [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }