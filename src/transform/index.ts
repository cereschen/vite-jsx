import s from 'magic-string';
import { Transform } from 'vite/dist/node/transform';

export const jsxTransform: Transform = {
  test (ctx) {
    return ctx.path.match(/\.(tsx|jsx)$/) ? true : false;
  },
  transform (ctx) {
    const str = new s(ctx.code);

    const matchImport = ctx.code.match(/import { jsx } from/);

    if (matchImport?.index) str.overwrite(matchImport.index, matchImport.index + matchImport[0].length, 'import { jsx as _jsx } from');
    str.append('\nimport { wrapJsx } from "vite-jsx" \nvar jsx = wrapJsx(_jsx)');

    const matchs = [...ctx.code.matchAll(/("v-model(?<modifiers>_[^]*?"|"):)([^,\r\n}]*)(,?)/g)];

    matchs.map(match => {
      const modifiers = match.groups?.modifiers;
      const modifierList = modifiers && modifiers.length > 1 ? modifiers.substring(1, modifiers.length - 1).split('_') : [];
      let customValue: string | undefined;

      if (modifierList?.length) {
        customValue = modifierList.find(item => {
          return !['trim', 'number', 'lazy'].includes(item);
        });
      }

      if (match.index) str.overwrite(match.index, match.index + match[0].length, match[1] + match[3] + (match[4] || ',') + `"onUpdate:${customValue || 'modelValue'}":(val) => {${match[3].trim()} = val},`);
    });

    const map = str.generateMap();

    return { code: str.toString(), map };
  },
};
