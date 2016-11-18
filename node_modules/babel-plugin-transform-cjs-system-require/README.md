# babel-plugin-transform-cjs-system-require

Transforms all calls of `require` into calls of the SystemJS internal `$__require`.

## Example

**In**

```js
require('test/');
```

**Out**

```js
$__require('test');
```

## Installation

```sh
$ npm install babel-plugin-transform-cjs-system-require
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "plugins": [
    ["transform-cjs-system-require", {}]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-cjs-system-require script.js
```

### Via Node API (Recommended)

```javascript
require("babel-core").transform("code", {
  plugins: [
    ["transform-cjs-system-require", {
      requireName: "require", // optional
      mappedRequireName: "$__require", // optional
      map: function(name) { // optional
        return normalize(name);
      }
    }]
  ]
});
```
