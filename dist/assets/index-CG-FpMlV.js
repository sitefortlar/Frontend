import{c as E,r as l,a as $,u as F,j as e,m as S,d as i,e as z}from"./index-jy6zFgoC.js";import{a as b}from"./api-BhVipoDr.js";import{C as B,v as L,w as M,x as D,y as N,z as j,A as P,B as Y,D as k,i as y,E as q}from"./styles-BSHoyXGv.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=E("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=E("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]),w={async verifyToken(r){var t,o,s;try{return(await b.put("/emailtoken/validate",r)).data}catch(a){const d=((o=(t=a.response)==null?void 0:t.data)==null?void 0:o.message)||a.message||"Erro ao verificar conta",n=new Error(d);throw(s=a.response)!=null&&s.status&&(n.status=a.response.status),n}},async resendEmailToken(r){var t,o,s;try{return(await b.patch("/emailtoken/resend",{company_id:r})).data}catch(a){const d=((o=(t=a.response)==null?void 0:t.data)==null?void 0:o.message)||a.message||"Erro ao reenviar e-mail de verificação",n=new Error(d);throw(s=a.response)!=null&&s.status&&(n.status=a.response.status),n}}},G=({tokenFromUrl:r,companyId:t})=>{const[o,s]=l.useState(r||""),[a,d]=l.useState(!1),[n,g]=l.useState(!1),[x,m]=l.useState(""),[v,u]=l.useState(""),T=$(),{toast:p}=F(),R=async c=>{if(c.preventDefault(),m(""),!o){m("Por favor, informe o token de validação.");return}if(d(!0),!t){m("ID da empresa não encontrado. Não é possível verificar o token.");return}try{await w.verifyToken({token:o,company_id:parseInt(t)}),p({title:"Conta verificada!",description:"Sua conta foi ativada com sucesso. Você pode fazer login agora."}),setTimeout(()=>{T("/login")},2e3)}catch(h){const C=h.message||"Token inválido ou expirado. Por favor, solicite um novo e-mail de confirmação.";m(C),p({title:"Erro",description:C,variant:"destructive"})}finally{d(!1)}},I=async()=>{if(!t){u("ID da empresa não encontrado. Não é possível reenviar o token.");return}g(!0),u("");try{await w.resendEmailToken(parseInt(t)),p({title:"E-mail reenviado!",description:"Um novo token de verificação foi enviado para o e-mail da empresa."})}catch(c){const h=c.message||"Erro ao reenviar e-mail de verificação.";u(h),p({title:"Erro",description:h,variant:"destructive"})}finally{g(!1)}};return e.jsxs(B,{onSubmit:R,children:[e.jsxs(L,{children:[e.jsxs(M,{children:[e.jsx(D,{children:e.jsx(V,{className:"h-4 w-4"})}),e.jsx(N,{type:"text",value:o,onChange:c=>s(c.target.value),placeholder:"Token de validação",readOnly:!!r,required:!0})]}),x&&e.jsx(j,{children:x}),v&&e.jsx(j,{children:v}),e.jsx(P,{children:r?"Token detectado automaticamente da URL":"Cole aqui o token recebido no e-mail"})]}),e.jsx(Y,{type:"submit",disabled:a,children:e.jsx(k,{children:a?e.jsxs(e.Fragment,{children:[e.jsx(y,{}),"Verificando..."]}):"Verificar Conta"})}),e.jsx(q,{type:"button",onClick:I,disabled:n||!t,children:e.jsx(k,{children:n?e.jsxs(e.Fragment,{children:[e.jsx(y,{}),"Reenviando..."]}):e.jsxs(e.Fragment,{children:[e.jsx(A,{className:"h-4 w-4"}),"Reenviar Token"]})})})]})},O=S`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,_=S`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,H=i.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  display: flex;
  flex-direction: column;
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
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`,f=i.div`
  position: absolute;
  top: ${({top:r})=>r||"auto"};
  right: ${({right:r})=>r||"auto"};
  bottom: ${({bottom:r})=>r||"auto"};
  left: ${({left:r})=>r||"auto"};
  width: ${({width:r})=>r};
  height: ${({height:r})=>r};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${_} 6s ease-in-out infinite;
  animation-delay: ${({delay:r})=>r||"0s"};
`,U=i.div`
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 1;
`,J=i.div`
  text-align: center;
  margin-bottom: 2rem;
`,K=i.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,Q=i.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`,W=i.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${O} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,X=i.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`,ae=()=>{const[r]=z(),t=r.get("token"),o=r.get("companyId"),s=()=>e.jsx(X,{children:"Se você não se cadastrou, ignore este e-mail."});return e.jsxs(H,{children:[e.jsx(f,{top:"8rem",right:"4rem",width:"7rem",height:"7rem"}),e.jsx(f,{bottom:"10rem",left:"5rem",width:"9rem",height:"9rem",delay:"1.8s"}),e.jsx(f,{top:"30%",right:"30%",width:"5rem",height:"5rem",delay:"2.5s"}),e.jsxs(U,{children:[e.jsxs(J,{children:[e.jsx(K,{children:"Confirme seu cadastro"}),e.jsx(Q,{children:"Obrigado por se cadastrar! Para ativar sua conta, informe o token de validação abaixo:"})]}),e.jsx(W,{children:e.jsx(G,{tokenFromUrl:t,companyId:o})}),s()]})]})};export{ae as default};
