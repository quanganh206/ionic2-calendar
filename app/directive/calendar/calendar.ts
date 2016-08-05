import { Component } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';
/*
  Calendar Component 
*/
@Component({
  selector: 'ionic2-calendar',
  template: `
    <!-- Start Calendar -->
      <ion-grid class="calendar-border">
          <ion-row>
              <ion-col width-15>
                  <button small clear (click)="previousMonth()">
                    <ion-icon name="ios-arrow-back"></ion-icon>
                  </button>
              </ion-col>
              <ion-col class="center" width-70>
                  <button small clear>
                    {{current | date: 'MMM yyyy'}}
                  </button>
              </ion-col>
              <ion-col width-15 class="right-arrow">
                  <button small clear (click)="nextMonth()">
                    <ion-icon name="ios-arrow-forward"></ion-icon>
                  </button>
              </ion-col>
          </ion-row>
          <ion-row class="calendar-row">
              <ion-col class="center" width-15>
                  Sun
              </ion-col>
              <ion-col class="center" width-14>
                  Mon
              </ion-col>
              <ion-col class="center" width-14>
                  Tue
              </ion-col>
              <ion-col class="center" width-14>
                  Wed
              </ion-col>
              <ion-col class="center" width-14>
                  Thu
              </ion-col>
              <ion-col class="center" width-14>
                  Fri
              </ion-col>
              <ion-col class="center" width-15>
                  Sat
              </ion-col>
          </ion-row>
          <ion-row class="calendar-row" *ngFor="let week of month">
              <ion-col class="center" width-14 *ngFor="let day of week" [class.today]="today.getDate()===day.getDate() && today.getMonth() === day.getMonth()">
                  {{day.getDate()}}
              </ion-col>
          </ion-row>
      </ion-grid>
    <!-- End Calendar -->
  `,
  styles: [`
      .right-arrow {
          text-align: right;
      }
      .center {
          text-align: center;
      }
      .calendar-border {
          border: 1px solid #cccccf;
      }
      .calendar-row {
          border-top: 1px solid #cccccf;
      }
      .today {
          background-color: green;
      }
  `],
  directives: [IONIC_DIRECTIVES]
})
export class CalendarComponent {
  month: Array<number>;
  current: Date;
  today: Date;
  constructor() {
    console.log('CalendarComponent');
    this.today = new Date();
    this.current = new Date();
    this.current.setTime(this.today.getTime());
    this.monthRender(this.today.toISOString());
  }

  monthRender(date: string) {
    var month = new Array();
    var firstDay = new Date(date);
    firstDay.setDate(1);
    var firstDayNextMonth = new Date(date);
    if (firstDay.getMonth() < 11) {
      firstDayNextMonth.setMonth(firstDay.getMonth() + 1);
      firstDayNextMonth.setDate(1);
    } else {
      firstDayNextMonth.setMonth(1);
      firstDayNextMonth.setDate(1);
    }
    var lastDay = new Date(date); 
    lastDay.setTime(firstDayNextMonth.getTime() - (1 * 24 * 3600000));
    var iw = firstDay.getDay();
    var dayCount = 0; 
    // build week in month
    for (let i = 0; i <= 5; i++) {
      var weekDay = new Array();
      for (var j = 0; j <= 6; j++) {
        if (i === 0 && j < iw) {
          // previous month date
          var day = new Date();
          day.setTime(firstDay.getTime() - ((iw - j) * 24 * 3600000));
          weekDay.push(day);
        } else {
          if (dayCount < lastDay.getDate()) {
            var day = new Date();
            day.setTime(firstDay.getTime() + (dayCount * 24 * 3600000));
            weekDay.push(day);
            dayCount++;
          } else {
            // next month date
            dayCount++;
            var day = new Date();
            day.setTime(lastDay.getTime() + ((dayCount - lastDay.getDate()) * 24 * 3600000));
            weekDay.push(day);
          }
        }
      }
      month.push(weekDay);
    }
    this.month = month;
  }

  previousMonth() {
    let previous = new Date();
    let currentMonth = this.current.getMonth();
    if (currentMonth > 1) {
      previous.setMonth(currentMonth - 1);
    } else {
      previous.setMonth(12);
      previous.setFullYear(this.current.getFullYear() - 1);
    }
    this.current = new Date();
    this.current.setTime(previous.getTime());
    this.monthRender(this.current.toISOString());
  }

  nextMonth() {
    let next = new Date(); 
    let currentMonth = this.current.getMonth();
    if (currentMonth < 11) {
      next.setMonth(currentMonth + 1);
    } else {
      next.setMonth(1);
      next.setFullYear(this.current.getFullYear() + 1);
    }
    this.current = new Date();
    this.current.setTime(next.getTime());
    this.monthRender(this.current.toISOString());
  }
}
