"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Ionic2Calendar = (function () {
    function Ionic2Calendar() {
        this.slideOption = {
            loop: true
        };
        this.currentSlide = 0;
        this.events = new Array();
        this.wHeadShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.wHeadMed = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        console.log('CalendarComponent');
        this.today = new Date();
        this.current = new Date();
        this.current.setTime(this.today.getTime());
        this.monthRender(this.today.toISOString());
    }
    Ionic2Calendar.prototype.isToday = function (day) {
        if (this.today.getDate() === day.day.getDate() && this.today.getMonth() === day.day.getMonth()) {
            return true;
        }
        else {
            return false;
        }
    };
    Ionic2Calendar.prototype.diffMonth = function (day) {
        if (this.current.getMonth() !== day.day.getMonth()) {
            return true;
        }
        else {
            return false;
        }
    };
    Ionic2Calendar.prototype.toDate = function (day) {
        return day.day.getDate();
    };
    Ionic2Calendar.prototype.ngOnChanges = function () {
        console.log(this.events);
        this.monthRender(this.today.toISOString());
    };
    Ionic2Calendar.prototype.monthRender = function (date) {
        var month = new Array();
        var firstDay = new Date(date);
        firstDay.setDate(1);
        var firstDayNextMonth = new Date(date);
        if (firstDay.getMonth() < 11) {
            firstDayNextMonth.setMonth(firstDay.getMonth() + 1);
            firstDayNextMonth.setDate(1);
        }
        else {
            firstDayNextMonth.setMonth(1);
            firstDayNextMonth.setDate(1);
        }
        var lastDay = new Date(date);
        lastDay.setTime(firstDayNextMonth.getTime() - (1 * 24 * 3600000));
        var iw = firstDay.getDay();
        var dayCount = 0;
        // build week in month
        for (var i = 0; i <= 5; i++) {
            var weekDay = new Array();
            for (var j = 0; j <= 6; j++) {
                if (i === 0 && j < iw) {
                    // previous month date
                    var day = new Date();
                    day.setTime(firstDay.getTime() - ((iw - j) * 24 * 3600000));
                    weekDay.push({ day: day });
                }
                else {
                    if (dayCount < lastDay.getDate()) {
                        var day = new Date();
                        day.setTime(firstDay.getTime() + (dayCount * 24 * 3600000));
                        var oEvents = void 0;
                        if (this.events) {
                            oEvents = this.events.filter(function (event) {
                                var eventDate = new Date(event.start);
                                console.log(eventDate.getDate(), day.getDate());
                                return eventDate.getDate() === day.getDate()
                                    && eventDate.getMonth() === day.getMonth()
                                    && eventDate.getFullYear() === day.getFullYear();
                            });
                        }
                        if (this.today.getDate() === day.getDate() && this.today.getMonth() === day.getMonth()) {
                            var oDay = { day: day, events: oEvents, selected: true };
                            weekDay.push(oDay);
                            this.selectedDay = oDay;
                        }
                        else {
                            weekDay.push({ day: day, events: oEvents, selected: false });
                        }
                        dayCount++;
                    }
                    else {
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
    };
    Ionic2Calendar.prototype.previousMonth = function () {
        var previous = new Date();
        var currentMonth = this.current.getMonth();
        if (currentMonth > 1) {
            previous.setMonth(currentMonth - 1);
        }
        else {
            previous.setMonth(12);
            previous.setFullYear(this.current.getFullYear() - 1);
        }
        this.current = new Date();
        this.current.setTime(previous.getTime());
        this.monthRender(this.current.toISOString());
    };
    Ionic2Calendar.prototype.nextMonth = function () {
        var next = new Date();
        var currentMonth = this.current.getMonth();
        if (currentMonth < 11) {
            next.setMonth(currentMonth + 1);
        }
        else {
            next.setMonth(1);
            next.setFullYear(this.current.getFullYear() + 1);
        }
        this.current = new Date();
        this.current.setTime(next.getTime());
        this.monthRender(this.current.toISOString());
    };
    Ionic2Calendar.prototype.selectDay = function (day) {
        day.selected = true;
        this.selectedDay = day;
        if (this.previousDay)
            this.previousDay.selected = false;
        this.previousDay = day;
        console.log(day.events);
    };
    Ionic2Calendar.prototype.eventsChange = function (events) {
        this.events = events;
        this.monthRender(this.today.toISOString());
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ionic2Calendar.prototype, "events", void 0);
    Ionic2Calendar = __decorate([
        core_1.Component({
            selector: 'ionic2-calendar',
            template: "\n    <!-- Start Calendar -->\n        <ion-grid class=\"calendar\">\n            <ion-row class=\"calendar-header-row\">\n                <ion-col class=\"center calendar-header-col\" width-14 *ngFor=\"let head of wHeadShort\">\n                    <b>{{head}}</b>\n                </ion-col>\n            </ion-row>\n            <ion-row class=\"calendar-row\" *ngFor=\"let week of month; let i = index;\">\n                <ion-col class=\"center calendar-col\" width-14 *ngFor=\"let day of week\"\n                    [class.today]=\"isToday(day)\" \n                    [class.diff-month]=\"diffMonth(day)\">\n                    {{ toDate(day) }}\n                </ion-col>\n            </ion-row>\n            <ion-row class=\"calendar-last-row\">\n                <ion-col width-80>\n                    {{current | date: 'EEEE, MMM dd yyyy'}}\n                </ion-col>\n                <ion-col width-10 (click)=\"previousMonth()\">\n                    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n                </ion-col>\n                <ion-col width-10 class=\"right-arrow\"  (click)=\"nextMonth()\">\n                    <ion-icon name=\"ios-arrow-forward\"></ion-icon>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    <!-- End Calendar -->\n  ",
            styles: ["\n      .calendar {\n        font-size: calc(0.65em + 1vmin);\n        color: #585D5A;\n      }\n      .right-arrow {\n          text-align: right;\n      }\n      .center {\n          text-align: center;\n      }\n      .calendar-header-row {\n          background-color: #575758;\n          color: #FFFFFF;\n      }\n      .calendar-row {\n          border-top: 1px solid #BCC2C6;\n          border-left: 1px solid #BCC2C6;\n      }\n      .calendar-header-col {\n          font-size: calc(0.55em + 1vmin);\n      }\n      .calendar-col {\n          border-right: 1px solid #BCC2C6;\n      }\n      .calendar-last-row {\n          border: 1px solid #BCC2C6;\n          font-size: calc(0.75em + 1vmin);\n          font-weight: bold;\n      }\n      .today {\n          background-color: #E89F9D;\n          color: #FFFFFF;\n      } \n      .diff-month {\n          background-color: #E1E1E1;\n          color: #BCC2C6;\n      } \n  "],
        }), 
        __metadata('design:paramtypes', [])
    ], Ionic2Calendar);
    return Ionic2Calendar;
}());
exports.Ionic2Calendar = Ionic2Calendar;
//# sourceMappingURL=Ionic2Calendar.js.map