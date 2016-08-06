import { Component } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular';
/*
  Calendar Component 
*/
@Component({
  selector: 'ionic2-calendar',
  template: `
    <!-- Start Calendar -->
      <ion-grid class="calendar">
          <ion-row class="calendar-header-row">
              <ion-col class="center calendar-header-col" width-14 *ngFor="let head of wHeadShort">
                  <b>{{head}}</b>
              </ion-col>
          </ion-row>
          <ion-row class="calendar-row" *ngFor="let week of month; let i = index;">
              <ion-col class="center calendar-col" width-14 *ngFor="let day of week"
                [class.today]="today.getDate()===day.getDate() && today.getMonth() === day.getMonth()" 
                [class.diff-month]="current.getMonth() !== day.getMonth()">
                  {{day.getDate()}}
              </ion-col>
          </ion-row>
          <ion-row class="calendar-last-row">
              <ion-col width-80>
                  {{current | date: 'EEEE, MMM dd yyyy'}}
              </ion-col>
              <ion-col width-10 (click)="previousMonth()">
                  <ion-icon name="ios-arrow-back"></ion-icon>
              </ion-col>
              <ion-col width-10 class="right-arrow"  (click)="nextMonth()">
                  <ion-icon name="ios-arrow-forward"></ion-icon>
              </ion-col>
          </ion-row>
      </ion-grid>
    <!-- End Calendar -->
  `,
  styles: [`
      .calendar {
        font-size: calc(0.65em + 1vmin);
        color: #585D5A;
      }
      .right-arrow {
          text-align: right;
      }
      .center {
          text-align: center;
      }
      .calendar-header-row {
          background-color: #575758;
          color: #FFFFFF;
      }
      .calendar-row {
          border-top: 1px solid #BCC2C6;
          border-left: 1px solid #BCC2C6;
      }
      .calendar-header-col {
          font-size: calc(0.55em + 1vmin);
      }
      .calendar-col {
          border-right: 1px solid #BCC2C6;
      }
      .calendar-last-row {
          border: 1px solid #BCC2C6;
          font-size: calc(0.75em + 1vmin);
          font-weight: bold;
      }
      .today {
          background-color: #E89F9D;
          color: #FFFFFF;
      } 
      .diff-month {
          background-color: #E1E1E1;
          color: #BCC2C6;
      } 
  `],
  directives: [IONIC_DIRECTIVES]
})
export class CalendarComponent {
  month: Array<number>;
  current: Date;
  today: Date;
  wHeadShort: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  wHeadMed: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
