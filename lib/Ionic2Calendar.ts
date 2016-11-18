import { Component, Input, Renderer, ViewChild, ElementRef } from '@angular/core';

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
                    [class.today]="isToday(day)" 
                    [class.diff-month]="diffMonth(day)">
                    {{ toDate(day) }}
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
})
export class Ionic2Calendar {
    slideOption = {
        loop: true
    }
    currentSlide = 0;
    @Input() events = new Array<any>();
    month: Array<number>;
    current: Date;
    today: Date;
    wHeadShort: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    wHeadMed: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    previousDay: any;
    selectedDay: any;
    constructor() {
        console.log('CalendarComponent');
        this.today = new Date();
        this.current = new Date();
        this.current.setTime(this.today.getTime());
        this.monthRender(this.today.toISOString());
    }

    isToday(day) {
        if (this.today.getDate() === day.day.getDate() && this.today.getMonth() === day.day.getMonth()) {
            return true;
        } else {
            return false;
        }
    }
    diffMonth(day) {
        if (this.current.getMonth() !== day.day.getMonth()) {
            return true;
        } else {
            return false;
        }
    }
    toDate(day) {
        return day.day.getDate();
    }

    ngOnChanges() {
        console.log(this.events);
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
                    weekDay.push({ day: day });
                } else {
                    if (dayCount < lastDay.getDate()) {
                        var day = new Date();
                        day.setTime(firstDay.getTime() + (dayCount * 24 * 3600000));
                        let oEvents: any;
                        if (this.events) {
                            oEvents = this.events.filter(event => {
                                let eventDate = new Date(event.start);
                                console.log(eventDate.getDate(), day.getDate());
                                return eventDate.getDate() === day.getDate()
                                    && eventDate.getMonth() === day.getMonth()
                                    && eventDate.getFullYear() === day.getFullYear();
                            });
                        }
                        if (this.today.getDate() === day.getDate() && this.today.getMonth() === day.getMonth()) {
                            let oDay = { day: day, events: oEvents, selected: true };
                            weekDay.push(oDay);
                            this.selectedDay = oDay;
                        } else {
                            weekDay.push({ day: day, events: oEvents, selected: false });
                        }
                        dayCount++;
                    } else {
                        // next month date
                        dayCount++;
                        var day = new Date();
                        day.setTime(lastDay.getTime() + ((dayCount - lastDay.getDate()) * 24 * 3600000));
                        weekDay.push({ day: day });
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

    selectDay(day: any) {
        day.selected = true;
        this.selectedDay = day;
        if (this.previousDay) this.previousDay.selected = false;
        this.previousDay = day;
        console.log(day.events);
    }

    eventsChange(events) {
        this.events = events;
        this.monthRender(this.today.toISOString());
    }
    /*onSlideChanged() {
        let currentIndex = 0;
        //currentIndex = this.slider.slider.activeIndex;
        if (currentIndex === 0 && this.currentSlide === 1) {
            this.previousMonth();
        } else if (currentIndex === 0 && this.currentSlide === 2) {
            this.nextMonth();
        } else if (currentIndex > this.currentSlide) {
            this.nextMonth();
        } else if (currentIndex < this.currentSlide) {
            this.previousMonth();
        }
    }*/
}