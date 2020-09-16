# vite-jsx
Help use directives such as v-if in the jsx of vite
## Usage
Run  `npm install vite-jsx`

or `yarn add vite-jsx`

Add to `vite.config.js`

```js
import { createJsxPlugin } from "vite-jsx/plugin"

 module.exports = {
  plugins: [createJsxPlugin()],
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
   
   modifiers : `sync`, `number`,  `trim`,  `lazy`

   example : `v-model_value = v-model:value `
   
   `v-model_trim_number = v-model.trim.number `

## IntelliSense
### add to your *.d.ts
 ```ts
 declare namespace JSX {
  interface IntrinsicAttributes {
    ['v-if']?: unknown
    ['v-else-if']?: unknown
    ['v-else']?: unknown
    ['v-show']?: unknown
    ['v-html']?: unknown
    ['v-text']?: unknown
    ['v-model']?: unknown
  }
}
```
## TODO
- performance optimization
