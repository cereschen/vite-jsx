import { withDirectives, vShow, vModelText, vModelDynamic, vModelCheckbox, vModelSelect, vModelRadio, ObjectDirective, DirectiveArguments, VNode, isVNode, Directive } from 'vue';

export function factory (node: VNode): VNode {

  const { props, children } = node;

  if (children instanceof Array) {
    let vIfChain: boolean[] = [];

    children.forEach((item, index) => {
      if (isVNode(item) && item.props) {
        const hasVIf = Reflect.has(item.props, 'v-if');
        const hasVElseIf = Reflect.has(item.props, 'v-else-if');
        const hasVElse = Reflect.has(item.props, 'v-else');
        let type: number | undefined;

        if ([hasVIf, hasVElseIf, hasVElse].filter(item => item).length > 1) {
          throw new Error('\'v-if\',\'v-else-if\',\'v-else\'. Don\'t use them together');
        }
        if (hasVIf) vIfChain = [], vIfChain.push(item.props['v-if']), type = 1;
        else if (hasVElseIf) vIfChain.push(item.props['v-else-if']), type = 2;
        else if (hasVElse) vIfChain.push(true), type = 3;
        else vIfChain = [];
        if (type) children[index] = transformVif(item, index, vIfChain, type);
      } else {
        vIfChain = [];
      }

    });
  }

  if (!props) return node;
  const directives: DirectiveArguments = [];
  const dynamicProps: Array<string> = [];
  const propKeys = Reflect.ownKeys(props)
  const onlyOne = propKeys.length === 1
  propKeys.map((key) => {
    if (typeof key !== 'string') return
    const val = props[key];
    switch (key) {
      case 'style':
        onlyOne ? node.patchFlag = 4 : dynamicProps.push('style');
        break;

      case 'class':
        onlyOne ? node.patchFlag = 2 : dynamicProps.push('class');
        break;

      case "v-text":
        props['textContent'] = val;
        dynamicProps.push('textContent');
        Reflect.deleteProperty(props, 'v-text');
        break;

      case "v-html":
        props['innerHTML'] = val;
        dynamicProps.push('innerHTML');
        Reflect.deleteProperty(props, 'v-html');
        break;

      case 'v-show':
        Reflect.deleteProperty(props, 'v-show');
        directives.push([vShow, val]);
        break;

      default:
        if (key.match(/^v-model[^]*/)) {
          const val = props[key];
          const result = transformVmodel(node, key);

          if (result) {
            if (typeof result !== 'string') directives.push(result);
            else Reflect.set(props, result, val);
          }
        }
        break;
    }
  })

  if (dynamicProps.length) {
    node.dynamicProps = dynamicProps;
    if (dynamicProps.length !== propKeys.length) {
      node.patchFlag = 16;
    } else {
      node.patchFlag = 8;
    }
  }

  return directives.length ? withDirectives(node, directives) : node;
}

function transformVmodel (node: VNode, kind: string): [Directive, any, string, Record<string, boolean>] | [Directive, any] | string | null {
  const { props } = node;

  if (!props) return null;
  const val = props[kind];

  Reflect.deleteProperty(props, kind);
  let directive: ObjectDirective;

  switch (node.type) {
    case 'input':
      directive = vModelText;
      break;
    case 'textarea':
      directive = vModelText;
      break;
    case 'checkbox':
      directive = vModelCheckbox;
      break;
    case 'select':
      directive = vModelSelect;
      break;
    case 'radio':
      directive = vModelRadio;
      break;
    default:
      directive = vModelDynamic;
      break;
  }
  const result = kind.split('_');
  let modifiers: Array<string> | undefined;

  if (result.length > 1) modifiers = result.slice(1);
  const obj: Record<string, boolean> = {};
  let isCustom = false;
  let customProp = '';

  modifiers && modifiers.map(item => {
    if (['trim', 'number', 'lazy'].includes(item))
      obj[item] = true;
    else
      isCustom = true;
    customProp = item;
  });

  return isCustom ? customProp : modifiers ? [directive, val, '', obj] : [directive, val];
}

function transformVif (node: VNode, index: number, vIfChain: Array<unknown>, type: number): VNode | null {
  const { props } = node;

  if (!props) return null;
  if (type === 1) {
    const val = props['v-if'];

    Reflect.deleteProperty(props, 'v-if');
    if (!val) return null;
  }
  if (type === 2) {

    const val = props['v-else-if'];

    Reflect.deleteProperty(props, 'v-else-if');
    if (index === 0) {
      throw new Error('Make sure the element which bind \'v-else-if\' dircetive is not the first element.');
    } else {
      if (vIfChain.length === 1) {
        throw new Error('Please keep \'v-if\',\'v-else-if\',\'v-else\' together forever');
      }
      if (vIfChain.some((item, index) => item && index !== vIfChain.length - 1)) {
        return null;
      } else {
        if (!val) return null;
      }
    }

  }
  if (type === 3) {
    Reflect.deleteProperty(props, 'v-else');
    if (index === 0) {
      throw new Error('Make sure the element which bind \'v-else\' dircetive is not the first element.');
    } else {
      if (vIfChain.length === 1) {
        throw new Error('Please keep \'v-if\',\'v-else-if\',\'v-else\' together forever');
      }
      if (vIfChain.some((item, index) => item && index !== vIfChain.length - 1)) {
        return null;
      }
    }

  }

  return node;
}