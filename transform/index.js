const  jsxTransform={
  test(ctx){
    return ctx.path.match(/\.(tsx|jsx)$/)?true:false;
  },
  transform(ctx){
    const newCode =ctx.code.replace('import { jsx } from', 'import { jsx as _jsx } from')+'\nimport { wrapJsx } from "vite-jsx" \n var jsx=wrapJsx(_jsx)'; 

    
    return newCode.replace(/("v-model(?:_[^]*?"|"):)([^,\r\n}]*)(,?)/g, (code, $1, $2, $3)=>{ 
      
      return $1+$2+($3||',')+`"onUpdate:modelValue":(val)=>{${$2.trim()}=val},`;
    });
  },
};

module.exports={
  jsxTransform,
};