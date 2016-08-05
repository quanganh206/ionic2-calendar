import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CalendarComponent} from '../../directive/calendar/calendar'; 

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [CalendarComponent],
})
export class HomePage {
  constructor(private navCtrl: NavController) {
    console.log('HomePage');
  }
}
