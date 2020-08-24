import { factory } from './jsxFactory';
export function wrapJsx(jsx) {
    return function (...arg) {
        const result = jsx(...arg);
        return factory(result);
    };
}
