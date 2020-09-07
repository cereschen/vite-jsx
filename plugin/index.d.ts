import { jsxTransform } from './../transform';
export function createJsxPlugin (): () => { transforms: typeof jsxTransform }