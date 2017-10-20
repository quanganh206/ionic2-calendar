import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { CalendarModule } from '@xmobe/ui-calendar';

@NgModule({
  imports: [ BrowserModule, CalendarModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
