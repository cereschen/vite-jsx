/// <reference no-default-lib="true"/>


declare global{

  declare namespace JSX {
    interface IntrinsicAttributes {
      ['v-if']:unknown
      ['v-else-if']:unknown
      ['v-else']:boolean
      ['v-show']:unknown
      ['v-html']:unknown
      ['v-text']:unknown
      ['v-model']:unknown
    }
  
    }

}

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


