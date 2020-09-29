"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsxTransform = void 0;
const magic_string_1 = __importDefault(require("magic-string"));
exports.jsxTransform = {
    test(ctx) {
        return ctx.path.match(/\.(tsx|jsx)$/) ? true : false;
    },
    transform(ctx) {
        const str = new magic_string_1.default(ctx.code);
        const matchImport = ctx.code.match(/import { jsx } from/);
        if (matchImport === null || matchImport === void 0 ? void 0 : matchImport.index)
            str.overwrite(matchImport.index, matchImport.index + matchImport[0].length, 'import { jsx as _jsx } from');
        str.append('\nimport { wrapJsx } from "vite-jsx" \nvar jsx = wrapJsx(_jsx)');
        const matchs = [...ctx.code.matchAll(/("v-model(?<modifiers>_[^]*?"|"):)([^,\r\n}]*)(,?)/g)];
        matchs.map(match => {
            var _a;
            const modifiers = (_a = match.groups) === null || _a === void 0 ? void 0 : _a.modifiers;
            const modifierList = modifiers && modifiers.length > 1 ? modifiers.substring(1, modifiers.length - 1).split('_') : [];
            let customValue;
            if (modifierList === null || modifierList === void 0 ? void 0 : modifierList.length) {
                customValue = modifierList.find(item => {
                    return !['trim', 'number', 'lazy'].includes(item);
                });
            }
            if (match.index)
                str.overwrite(match.index, match.index + match[0].length, match[1] + match[3] + (match[4] || ',') + `"onUpdate:${customValue || 'modelValue'}":(val) => {${match[3].trim()} = val},`);
        });
        const map = str.generateMap();
        return { code: str.toString(), map };
    },
};
