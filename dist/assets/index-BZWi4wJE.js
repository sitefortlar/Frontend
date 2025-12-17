import{c as A,k as y,r as d,a as H,u as J,j as e,m as _,e as c,o as Q}from"./index-hV2YQk7K.js";import{C as U,v as W,w as P,x as z,y as D,z as w,A as L,B as O,D as h,i as E,E as S}from"./styles-Dq67eLp2.js";import{M as Y}from"./mail-BmKMq3Mv.js";import{K as T}from"./key-DfamD3mS.js";import{C as X}from"./circle-check-big-Cxnlq0F1.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=A("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]),M={async verifyToken(a){var t,o,s;try{return(await y.put("/emailtoken/validate",a)).data}catch(r){const l=((o=(t=r.response)==null?void 0:t.data)==null?void 0:o.message)||r.message||"Erro ao verificar conta",i=new Error(l);throw(s=r.response)!=null&&s.status&&(i.status=r.response.status),i}},async resendEmailToken(a){var t,o,s;try{return(await y.patch("/emailtoken/resend",{company_id:a})).data}catch(r){const l=((o=(t=r.response)==null?void 0:t.data)==null?void 0:o.message)||r.message||"Erro ao reenviar e-mail de verificação",i=new Error(l);throw(s=r.response)!=null&&s.status&&(i.status=r.response.status),i}},async resendEmailTokenByEmail(a){var t,o,s;try{return(await y.patch("/emailtoken/resend",{email:a})).data}catch(r){const l=((o=(t=r.response)==null?void 0:t.data)==null?void 0:o.message)||r.message||"Erro ao reenviar e-mail de verificação",i=new Error(l);throw(s=r.response)!=null&&s.status&&(i.status=r.response.status),i}}},ee=({tokenFromUrl:a,companyId:t})=>{const[o,s]=d.useState(a||""),[r,l]=d.useState(""),[i,j]=d.useState(!1),[p,k]=d.useState(!1),[$,m]=d.useState(""),[f,g]=d.useState(""),[G,le]=d.useState(!1),[x,K]=d.useState(!1),F=H(),{toast:u}=J();d.useEffect(()=>{a&&!x&&s(a)},[a,x]);const b=!!a,v=b&&!x,R=!b&&!x&&!G,q=()=>{K(!0),b&&s(""),m(""),g("")},V=async n=>{if(n.preventDefault(),m(""),!o){m("Por favor, informe o token de validação.");return}if(j(!0),!t){m("ID da empresa não encontrado. Por favor, solicite um novo token através do e-mail."),j(!1);return}try{await M.verifyToken({token:o,company_id:parseInt(t)}),u({title:"Conta verificada!",description:"Sua conta foi ativada com sucesso. Você pode fazer login agora."}),setTimeout(()=>{F("/login")},2e3)}catch(C){const N=C.message||"Token inválido ou expirado. Por favor, solicite um novo e-mail de confirmação.";m(N),u({title:"Erro",description:N,variant:"destructive"})}finally{j(!1)}},B=async()=>{k(!0),g("");try{if(t)await M.resendEmailToken(parseInt(t)),u({title:"E-mail enviado!",description:"Um token de verificação foi enviado para o seu e-mail."});else if(r){const n=await M.resendEmailTokenByEmail(r);u({title:"E-mail enviado!",description:"Um token de verificação foi enviado para o seu e-mail."}),F(`/confirmar-cadastro?token=${n.token}&companyId=${n.company_id}`)}else{g("Por favor, informe o e-mail para enviar o token."),k(!1);return}}catch(n){const C=n.message||"Erro ao enviar e-mail de verificação.";g(C),u({title:"Erro",description:C,variant:"destructive"})}finally{k(!1)}};return e.jsx(U,{onSubmit:R?n=>{n.preventDefault(),B()}:V,children:e.jsx(W,{children:R?e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsx(z,{children:e.jsx(Y,{className:"h-4 w-4"})}),e.jsx(D,{type:"email",value:r,onChange:n=>l(n.target.value),placeholder:"Seu e-mail cadastrado",required:!0})]}),f&&e.jsx(w,{children:f}),e.jsx(L,{children:"Informe seu e-mail para receber o token de validação por e-mail"}),e.jsx(O,{type:"submit",disabled:p,children:e.jsx(h,{children:p?e.jsxs(e.Fragment,{children:[e.jsx(E,{}),"Enviando..."]}):e.jsxs(e.Fragment,{children:[e.jsx(Y,{className:"h-4 w-4"}),"Enviar token por e-mail"]})})}),e.jsx(S,{type:"button",onClick:q,children:e.jsxs(h,{children:[e.jsx(T,{className:"h-4 w-4"}),"Clique aqui se já possuir o token"]})})]}):e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsx(z,{children:e.jsx(T,{className:"h-4 w-4"})}),e.jsx(D,{type:"text",value:o,onChange:n=>s(n.target.value),placeholder:"Token de validação",readOnly:v,required:!0})]}),$&&e.jsx(w,{children:$}),f&&e.jsx(w,{children:f}),e.jsx(L,{children:v?"Token identificado automaticamente pelo link. Clique em 'Confirmar cadastro' para continuar.":"Digite o token recebido no e-mail"}),e.jsx(O,{type:"submit",disabled:i,children:e.jsx(h,{children:i?e.jsxs(e.Fragment,{children:[e.jsx(E,{}),"Verificando..."]}):e.jsxs(e.Fragment,{children:[e.jsx(X,{className:"h-4 w-4"}),"Confirmar cadastro"]})})}),v&&e.jsx(S,{type:"button",onClick:q,children:e.jsxs(h,{children:[e.jsx(T,{className:"h-4 w-4"}),"Clique aqui se já possuir o token"]})}),!v&&t&&e.jsx(S,{type:"button",onClick:B,disabled:p,children:e.jsx(h,{children:p?e.jsxs(e.Fragment,{children:[e.jsx(E,{}),"Reenviando..."]}):e.jsxs(e.Fragment,{children:[e.jsx(Z,{className:"h-4 w-4"}),"Reenviar token por e-mail"]})})})]})})})},ae=_`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,re=_`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,te=c.div`
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
`,I=c.div`
  position: absolute;
  top: ${({top:a})=>a||"auto"};
  right: ${({right:a})=>a||"auto"};
  bottom: ${({bottom:a})=>a||"auto"};
  left: ${({left:a})=>a||"auto"};
  width: ${({width:a})=>a};
  height: ${({height:a})=>a};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${re} 6s ease-in-out infinite;
  animation-delay: ${({delay:a})=>a||"0s"};
`,oe=c.div`
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 1;
`,se=c.div`
  text-align: center;
  margin-bottom: 2rem;
`,ne=c.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,ie=c.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`,de=c.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${ae} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,ce=c.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`,ge=()=>{const[a]=Q(),t=a.get("token"),o=a.get("companyId"),s=()=>e.jsx(ce,{children:"Se você não se cadastrou, ignore este e-mail."});return e.jsxs(te,{children:[e.jsx(I,{top:"8rem",right:"4rem",width:"7rem",height:"7rem"}),e.jsx(I,{bottom:"10rem",left:"5rem",width:"9rem",height:"9rem",delay:"1.8s"}),e.jsx(I,{top:"30%",right:"30%",width:"5rem",height:"5rem",delay:"2.5s"}),e.jsxs(oe,{children:[e.jsxs(se,{children:[e.jsx(ne,{children:"Confirme seu cadastro"}),e.jsx(ie,{children:t?"Obrigado por se cadastrar! Seu token foi identificado automaticamente. Clique em 'Confirmar cadastro' para ativar sua conta.":"Obrigado por se cadastrar! Para ativar sua conta, informe seu e-mail para receber o token de validação ou insira o token manualmente."})]}),e.jsx(de,{children:e.jsx(ee,{tokenFromUrl:t,companyId:o})}),s()]})]})};export{ge as default};
