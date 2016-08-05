import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import * as Moment from 'moment';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;
   
  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    let a = Moment('2016-08-01');
    let b = a.add(1, 'week');
    console.log(a.format('DD/MM/YYYY'));
    console.log(b.format('DD/MM/YYYY'));

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
