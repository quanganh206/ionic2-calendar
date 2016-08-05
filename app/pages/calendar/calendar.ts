import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CalendarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
})
export class CalendarPage {
  month: Array<number>;
  current: Date;
  today: Date;
  constructor(private nav: NavController) {
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
