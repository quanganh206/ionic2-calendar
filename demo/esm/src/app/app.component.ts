import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<calendar [selectedDay]="now" (onSelectedDate)="getSelectedDate($event)"></calendar>`
})
export class AppComponent {
  public header: string = 'UMD Demo';
  public now: Date;
  constructor(private ngZone: NgZone) {
    this.now = new Date();

    // this.ngZone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     console.log(this.now);
    //     this.ngZone.run(() => {
    //       let newDate = new Date();
    //       newDate.setDate(this.now.getDate() + 1);
    //       this.now = newDate;
    //     });
    //   }, 1000);
    // });
  }
  getSelectedDate(event: any) {
    console.log(event.selectedDate);
    this.now = event.selectedDate.day;
  }
}
