import{c as s,m as n,d as e,L as d,g as l,r as c,j as a}from"./index-jy6zFgoC.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=s("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]),i=n`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,r=n`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,h=n`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`,g=e.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  /* Background pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`,o=e.div`
  position: absolute;
  top: ${({top:t})=>t||"auto"};
  right: ${({right:t})=>t||"auto"};
  left: ${({left:t})=>t||"auto"};
  bottom: ${({bottom:t})=>t||"auto"};
  width: ${({width:t})=>t};
  height: ${({height:t})=>t};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${h} 8s ease-in-out infinite;
  animation-delay: ${({delay:t})=>t||"0s"};
`,p=e.div`
  text-align: center;
  position: relative;
  z-index: 10;
  max-width: 32rem;
  width: 100%;
`,u=e.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${i} 0.8s ease-out;
`,x=e.h1`
  font-size: 8rem;
  font-weight: 900;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${i} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,b=e.h2`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${r} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`,f=e.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 1.5rem 0 2rem;
  line-height: 1.6;
  animation: ${r} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`,w=e(d)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: hsl(var(--auth-button));
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  animation: ${r} 0.8s ease-out;
  animation-delay: 0.8s;
  animation-fill-mode: both;

  &:hover {
    background: hsl(var(--primary-glow));
    transform: scale(1.05);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`,v=e.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`,k=()=>{const t=l();return c.useEffect(()=>{console.error("404 Error: User attempted to access non-existent route:",t.pathname)},[t.pathname]),a.jsxs(g,{children:[a.jsx(o,{top:"10%",right:"10%",width:"8rem",height:"8rem"}),a.jsx(o,{bottom:"20%",left:"15%",width:"12rem",height:"12rem",delay:"2s"}),a.jsx(o,{top:"60%",right:"30%",width:"6rem",height:"6rem",delay:"4s"}),a.jsx(p,{children:a.jsxs(u,{children:[a.jsx(x,{children:"404"}),a.jsx(b,{children:"Oops! Página não encontrada"}),a.jsx(f,{children:"A página que você está procurando não existe ou foi movida. Que tal voltar para a página inicial?"}),a.jsxs(w,{to:"/",children:[a.jsx(v,{children:a.jsx(m,{className:"h-5 w-5"})}),"Voltar ao Início"]})]})})]})};export{k as default};
