# vite-jsx
Help use directives such as v-if in the jsx of vite
## Install
Run  `npm install vite-jsx`

or `yarn add vite-jsx`

Add to `vite.config.js`

```js
import { jsxTransform } from "vite-jsx/transform"

 module.exports={
  transforms:[jsxTransform]
  ...
}
```
## Directives
-  v-if
-  v-else-if
-  v-else
-  v-show
-  v-text
-  v-html
-  v-model
   
   modifiers : `number`,  `trim`,  `lazy`
   example : `v-model_trim_number_lazy `

## IntelliSense
### add to your *.d.ts
 ```ts
 declare namespace JSX {
  interface IntrinsicAttributes {
    ['v-if']:unknown
    ['v-else-if']:unknown
    ['v-else']:unknown
    ['v-show']:unknown
    ['v-html']:unknown
    ['v-text']:unknown
    ['v-model']:unknown
  }
  }
```
## TODO
- performance optimization
