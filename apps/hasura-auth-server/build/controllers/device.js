"use strict";var p=Object.create;var n=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,R=Object.prototype.hasOwnProperty;var k=(e,s)=>{for(var t in s)n(e,t,{get:s[t],enumerable:!0})},m=(e,s,t,r)=>{if(s&&typeof s=="object"||typeof s=="function")for(let o of u(s))!R.call(e,o)&&o!==t&&n(e,o,{get:()=>s[o],enumerable:!(r=d(s,o))||r.enumerable});return e};var q=(e,s,t)=>(t=e!=null?p(b(e)):{},m(s||!e||!e.__esModule?n(t,"default",{value:e,enumerable:!0}):t,e)),f=e=>m(n({},"__esModule",{value:!0}),e);var j={};k(j,{issue:()=>w,mock_issue:()=>g});module.exports=f(j);var a=require("celebrate"),i=q(require("joi")),c=require("../crypto/jwt");const w=[(0,a.celebrate)({[a.Segments.BODY]:i.default.object({address:i.default.string().required()})}),async(e,s)=>{const t=await(0,c.generateJWT)(e.body.address);s.status(200).send({token:t})}],g=[async(e,s)=>{const r=await(0,c.generateJWT)("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B");s.status(200).send({token:r})}];0&&(module.exports={issue,mock_issue});
//# sourceMappingURL=device.js.map
