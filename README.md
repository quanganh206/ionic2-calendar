# `ionic2-calendar2` 
# (x)Cross Mobile Engine: Ionic2 Calendar Component

> [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=quanganh%40aiti%2ecom%2evn&lc=VN&item_name=Ionic2%20Calendar&item_number=ionic2calendar&no_note=0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)

- That project support base calendar directive with Month, Week, Day views that can easy to integrate with your mobile app.

- It's just for fun and expose a part my research on calendar processing with Google Calendar, Apple Calendar, iCalendar, etc.

- Some source in that library should be easy to apply but maybe hard to extends to adapt on what you need. It's a message for user want developer extend that library and think about it does 80% work. The rest, 20% hardest things for your developer so should play nice. :D 

> [Read more](https://quanganh206.github.io/ionic2-calendar/) about **source code**, **class** used in this repository.

# Getting Started

## Installing
```bash
# Clone the repository into xmobe/ui folder
npm install ionic2-calendar2 --save
```

## Using
```typescript

# app.module.ts
import { CalendarModule } from 'ionic2-calendar2';
imports: [
    CalendarModule,
]
```

```html
# *.html
<calendar></calendar>
```

## Calendar Month View 
- Flex base UI (not table).
- Expose date object directly for later use.
- You can config moment locale from outside to localize calendar information.

## Calendar Week View
- will update with (50 stars)

## Calendar Day View 
- will update with (150 stars)

# Todo List
- [x] ~~Not directive or reusable component yet.~~ (updated 5th Aug 2016)
- [x] Configuration
- [x] Swipe to change Month, Week, Day view
- [x] npm install and use directly  

# Environment
cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.15.2
    ionic (Ionic CLI) : 3.15.2

System:

    Node : v8.4.0
    npm  : 5.4.2 
    OS   : macOS Sierra

Misc:

    backend : pro

# Common Error
```bash
# lack moment
npm install moment --save
# lack next previous month buttons
npm install font-awaresome --save
# Oganize font-awaresome resources in your ionic2 project to meet your desire.
```


# Contributors
- Quang Anh LE (Arkay Lee)

# Update 
- 17th Nov 2017:    update dependencies Common Errors
- 31th Oct 2017:    update dependencies angular 4.4.4, ionic 3.8
- 23th Oct 2017:    update dependencies log4js, angular 4.3.1
- 20th Oct 2017:    update new source base 0.1.3, new UI look n feel
- 18th Nov 2016:    update npm version 0.0.1
- 6th Aug 2016:     update template. 

Thank Kenneth Hou for an inspired calendar style https://dribbble.com/shots/1269664-Calendar-Screen.