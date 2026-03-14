import{a as o}from"./vendor-react-DeNKufUl.js";const n=(e,t=300)=>{const[r,s]=o.useState(e);return o.useEffect(()=>{const u=setTimeout(()=>s(e),t);return()=>clearTimeout(u)},[e,t]),r};export{n as u};
