import { VNode } from 'vue';
import { factory } from './jsxFactory';

type args= Array<unknown> 

export function wrapJsx (jsx:(...arg:args)=>VNode) {
  return function (...arg:args):VNode {
    const result = jsx(...arg);

    return factory(result);
  };
}