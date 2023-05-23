(function(){"use strict";var r,S=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&S.decode();var m=null;function y(){return(m===null||m.byteLength===0)&&(m=new Uint8Array(r.memory.buffer)),m}function M(e,n){return e=e>>>0,S.decode(y().subarray(e,e+n))}var u=new Array(128).fill(void 0);u.push(void 0,null,!0,!1);var h=u.length;function U(e){h===u.length&&u.push(u.length+1);const n=h;return h=u[n],u[n]=e,n}function C(e){return u[e]}function R(e){e<132||(u[e]=h,h=e)}function T(e){const n=C(e);return R(e),n}var d=0;function j(e,n){const t=n(e.length*1)>>>0;return y().set(e,t/1),d=e.length,t}var k=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},I=typeof k.encodeInto=="function"?function(e,n){return k.encodeInto(e,n)}:function(e,n){const t=k.encode(e);return n.set(t),{read:e.length,written:t.length}};function b(e,n,t){if(t===void 0){const c=k.encode(e),s=n(c.length)>>>0;return y().subarray(s,s+c.length).set(c),d=c.length,s}let a=e.length,i=n(a)>>>0;const l=y();let o=0;for(;o<a;o++){const c=e.charCodeAt(o);if(c>127)break;l[i+o]=c}if(o!==a){o!==0&&(e=e.slice(o)),i=t(i,a,a=o+e.length*3)>>>0;const c=y().subarray(i+o,i+a),s=I(e,c);o+=s.written}return d=o,i}function w(e){return e==null}var F=null;function g(){return(F===null||F.byteLength===0)&&(F=new Int32Array(r.memory.buffer)),F}function D(e,n){return e=e>>>0,y().subarray(e/1,e/1+n)}var A=null;function $(){return(A===null||A.byteLength===0)&&(A=new Uint32Array(r.memory.buffer)),A}function q(e,n){e=e>>>0;const a=$().subarray(e/4,e/4+n),i=[];for(let l=0;l<a.length;l++)i.push(T(a[l]));return i}function B(e,n,t,a,i){var l=w(e)?0:b(e,r.__wbindgen_malloc,r.__wbindgen_realloc),o=d,c=w(n)?0:b(n,r.__wbindgen_malloc,r.__wbindgen_realloc),s=d,_=w(t)?0:b(t,r.__wbindgen_malloc,r.__wbindgen_realloc),E=d,v=w(a)?0:b(a,r.__wbindgen_malloc,r.__wbindgen_realloc),f=d,z=w(i)?0:b(i,r.__wbindgen_malloc,r.__wbindgen_realloc),L=d;const K=r.createConverter(l,o,c,s,_,E,v,f,z,L);return x.__wrap(K)}var x=class{static __wrap(e){e=e>>>0;const n=Object.create(x.prototype);return n.__wbg_ptr=e,n}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,e}free(){const e=this.__destroy_into_raw();r.__wbg_converter_free(e)}registerFont(e){const n=j(e,r.__wbindgen_malloc),t=d;r.converter_registerFont(this.__wbg_ptr,n,t)}convert(e,n,t,a,i){try{const f=r.__wbindgen_add_to_stack_pointer(-16),z=b(e,r.__wbindgen_malloc,r.__wbindgen_realloc),L=d;var l=w(i)?0:b(i,r.__wbindgen_malloc,r.__wbindgen_realloc),o=d;r.converter_convert(f,this.__wbg_ptr,z,L,!w(n),w(n)?0:n,!w(t),w(t)?0:t,!w(a),w(a)?0:a,l,o);var c=g()[f/4+0],s=g()[f/4+1],_=g()[f/4+2],E=g()[f/4+3];if(E)throw T(_);var v=D(c,s).slice();return r.__wbindgen_free(c,s*1),v}finally{r.__wbindgen_add_to_stack_pointer(16)}}list_fonts(){try{const a=r.__wbindgen_add_to_stack_pointer(-16);r.converter_list_fonts(a,this.__wbg_ptr);var e=g()[a/4+0],n=g()[a/4+1],t=q(e,n).slice();return r.__wbindgen_free(e,n*4),t}finally{r.__wbindgen_add_to_stack_pointer(16)}}};async function N(e,n){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(a){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",a);else throw a}const t=await e.arrayBuffer();return await WebAssembly.instantiate(t,n)}else{const t=await WebAssembly.instantiate(e,n);return t instanceof WebAssembly.Instance?{instance:t,module:e}:t}}function V(){const e={};return e.wbg={},e.wbg.__wbindgen_string_new=function(n,t){const a=M(n,t);return U(a)},e.wbg.__wbg_new_abda76e883ba8a5f=function(){const n=new Error;return U(n)},e.wbg.__wbg_stack_658279fe44541cf6=function(n,t){const a=C(t).stack,i=b(a,r.__wbindgen_malloc,r.__wbindgen_realloc),l=d;g()[n/4+1]=l,g()[n/4+0]=i},e.wbg.__wbg_error_f851667af71bcfc6=function(n,t){let a,i;try{a=n,i=t,console.error(M(n,t))}finally{r.__wbindgen_free(a,i)}},e.wbg.__wbindgen_object_drop_ref=function(n){T(n)},e.wbg.__wbindgen_throw=function(n,t){throw new Error(M(n,t))},e}function H(e,n){return r=e.exports,O.__wbindgen_wasm_module=n,F=null,A=null,m=null,r.__wbindgen_start(),r}async function O(e){if(r!==void 0)return r;typeof e>"u"&&(e=new URL("svg2png_wasm_bg.wasm",void 0));const n=V();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:t,module:a}=await N(await e,n);return H(t,a)}var J=O,W=!1,P=async e=>{if(W)throw new Error("Already initialized. The `initialize` function can be used only once.");await J(await e),W=!0},G=e=>{var a,i,l,o,c;if(!W)throw new Error("WASM has not been initialized. Call `initialize` function.");let n;n=B((a=e==null?void 0:e.defaultFontFamily)==null?void 0:a.serifFamily,(i=e==null?void 0:e.defaultFontFamily)==null?void 0:i.sansSerifFamily,(l=e==null?void 0:e.defaultFontFamily)==null?void 0:l.cursiveFamily,(o=e==null?void 0:e.defaultFontFamily)==null?void 0:o.fantasyFamily,(c=e==null?void 0:e.defaultFontFamily)==null?void 0:c.monospaceFamily);for(const s of(e==null?void 0:e.fonts)??[])n.registerFont(s);const t=(s,_)=>new Promise((E,v)=>{try{const f=n==null?void 0:n.convert(s,_==null?void 0:_.scale,_==null?void 0:_.width,_==null?void 0:_.height,_==null?void 0:_.backgroundColor);if(f)E(f);else throw new Error("Converter already disposed.")}catch(f){f instanceof Error?v(f):v(new Error(`${f}`))}});return t.dispose=()=>{n==null||n.free(),n=void 0},t.getLoadedFontFamilies=()=>(n==null?void 0:n.list_fonts())??[],t};console.log("worker initializing");let p;self.addEventListener("message",e=>{const n=e.data;if(!(typeof n!="object"||n==null))switch(console.log(`worker ${n.type}`),n.type){case"initialize":P(n.wasm).then(()=>{p=G(n.options)});break;case"svg2png":p===void 0?self.postMessage({type:"error",error:"svg2png has not been initialized."}):p(n.svg,n.options).then(t=>self.postMessage({id:n.id,type:"success",data:t})).catch(t=>self.postMessage({id:n.id,type:"error",error:`${t}`}));break}})})();
