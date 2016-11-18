# ionic2-calendar

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=quanganh%40aiti%2ecom%2evn&lc=VN&item_name=Ionic2%20Calendar&item_number=ionic2calendar&no_note=0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)

- That project support base calendar directive with Month, Week, Day views that can easy to integrate with your mobile app.

- It's just for fun and expose a part my research on calendar processing with Google Calendar, Apple Calendar, iCalendar, etc.

- Some source in that library should be easy to apply but maybe hard to extends to adapt on what you need. It's a message for user want developer extend that library and think about it does 80% work. The rest, 20% hardest things for your developer so should play nice. :D

<img src="http://i1320.photobucket.com/albums/u521/quanganh206/Screen%20Shot%202016-08-06%20at%202.23.53%20PM_zpsgzcpcusf.png" align="left" width="25%"/>

# Setup and Running 
- npm install -g ionic
- git clone https://github.com/quanganh206/ionic2-calendar
- npm install 
- npm build 

# Using 
- npm install ionic2-calendar2 --save (in ionic project folder)
- in app.module.ts
  ```
  import { Ionic2Calendar } from 'ionic2-calendar2';
  @NgModule({
    declarations: [
      ...
      Ionic2Calendar,
      ...
    ],
    providers: [
      ...
      Ionic2Calendar,
      ...
    ]
  })
  ```
- Push component to anywhere you want to display it
  ```
  <ionic2-calendar></ionic2-calendar>
  ```

## Calendar Month View 
- Grid base UI (not table)
- Expose date object directly for later use.

## Calendar Week View
- will update soon

## Calendar Day View 
- will update soon

# Todo List
- [x] ~~Not directive or reusable component yet.~~ (updated 5th Aug 2016)
- [ ] Calendar Week View
- [ ] Calendar Day View
- [ ] Configuration
- [ ] Swipe to change Month, Week, Day view
- [x] npm install and use directly  

# Environment 
```
Cordova CLI: 6.3.0
Gulp version:  CLI version 1.2.1
Gulp local:   Local version 3.9.1
Ionic Framework Version: 2.0.0-beta.10
Ionic CLI Version: 2.0.0-beta.32
Ionic App Lib Version: 2.0.0-beta.18
ios-deploy version: 1.8.6 
ios-sim version: 5.0.8 
OS: Mac OS X El Capitan
Node Version: v6.2.0
Xcode version: Xcode 7.3.1 Build version 7D1014
```

#Update 
- 6th Aug 2016:   update template. Thank Kenneth Hou for an inspired calendar style https://dribbble.com/shots/1269664-Calendar-Screen.
- 18th Nov 2016:  update npm version 0.0.1


