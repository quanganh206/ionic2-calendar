# `ionic2-calendar2` 
# (x)Cross Mobile Engine: Ionic2 Calendar Component

> All related information and structure about users and user types.

This public project contains UI Calendar library. The library itself is a small piece and general to help extend with other projects. 

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
- will update soon

## Calendar Day View 
- will update soon

# Todo List
- [x] ~~Not directive or reusable component yet.~~ (updated 5th Aug 2016)
- [ ] Calendar Week View
- [ ] Calendar Day View
- [x] Configuration
- [x] Swipe to change Month, Week, Day view
- [x] npm install and use directly  

# Environment
cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.12.0
    ionic (Ionic CLI) : 3.12.0

System:

    Node : v8.4.0
    npm  : 5.4.2 
    OS   : macOS Sierra

Misc:

    backend : legacy

# Contributors
- Quang Anh LE (Arkay Lee)

#Update 
- 20th Oct 2017: update new source base 0.1.3
- 18th Nov 2016:  update npm version 0.0.1
- 6th Aug 2016:   update template. Thank Kenneth Hou for an inspired calendar style https://dribbble.com/shots/1269664-Calendar-Screen.