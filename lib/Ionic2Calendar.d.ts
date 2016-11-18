/// <reference types="core-js" />
export declare class Ionic2Calendar {
    slideOption: {
        loop: boolean;
    };
    currentSlide: number;
    events: any[];
    month: Array<number>;
    current: Date;
    today: Date;
    wHeadShort: string[];
    wHeadMed: string[];
    previousDay: any;
    selectedDay: any;
    constructor();
    isToday(day: any): boolean;
    diffMonth(day: any): boolean;
    toDate(day: any): any;
    ngOnChanges(): void;
    monthRender(date: string): void;
    previousMonth(): void;
    nextMonth(): void;
    selectDay(day: any): void;
    eventsChange(events: any): void;
}
