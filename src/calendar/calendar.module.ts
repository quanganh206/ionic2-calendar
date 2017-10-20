import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
// import { TickTockService } from './services';

@NgModule({
    imports: [CommonModule],
    providers: [
        // TickTockService,
    ],
    declarations: [
        CalendarComponent,
    ],
    exports: [
        CalendarComponent,
    ]
})
export class CalendarModule {
}