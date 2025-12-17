import{o as V,r as o,a as A,u as E,j as e,X as l,m as p,e as r,L as k}from"./index-hV2YQk7K.js";import{a as U,L as N}from"./useFormValidation-DipxAR_m.js";import{p as q}from"./password-Hc_UumGN.js";import{R as M,j as T,k as g,l as f,m as x,n as B,o as G,p as Y,q as c,r as h,s as X,t as _,u as K,i as D}from"./styles-Dq67eLp2.js";import{K as H}from"./key-DfamD3mS.js";import{C as m}from"./check-BfzSPuf9.js";import{A as O}from"./arrow-left-BWaTIojA.js";const J=()=>{const[a]=V(),v=a.get("token"),[u,C]=o.useState(""),[s,$]=o.useState(""),[d,L]=o.useState(""),[j,w]=o.useState(!1),[S,n]=o.useState(""),I=A(),{toast:y}=E();a.get("token");const z=a.get("companyId"),i=U(s),P=async t=>{if(t.preventDefault(),n(""),!u||!s||!d){n("Por favor, preencha todos os campos.");return}if(s!==d){n("As senhas não coincidem.");return}if(!i.hasMinLength){n("A senha deve ter no mínimo 8 caracteres.");return}if(!i.hasUppercase){n("A senha deve conter pelo menos uma letra maiúscula.");return}if(!i.hasNumber){n("A senha deve conter pelo menos um número.");return}if(!i.hasSpecialChar){n("A senha deve conter pelo menos um caractere especial (@$!%*?&).");return}w(!0);try{await q.resetPassword({token:v||u,company_id:parseInt(z),new_password:s,confirm_password:d}),y({title:"Senha redefinida!",description:"Sua senha foi alterada com sucesso. Faça login com sua nova senha."}),setTimeout(()=>{I("/login")},2e3)}catch(F){const R=F.message||"Ocorreu um erro ao redefinir a senha. Verifique o código e tente novamente.";n(R),y({title:"Erro",description:R,variant:"destructive"})}finally{w(!1)}};return e.jsxs(M,{onSubmit:P,children:[e.jsxs(T,{children:[!v&&e.jsxs(g,{children:[e.jsx(f,{children:e.jsx(H,{className:"h-4 w-4"})}),e.jsx(x,{type:"text",value:u,onChange:t=>C(t.target.value),placeholder:"Código de verificação",required:!0})]}),e.jsxs(g,{children:[e.jsx(f,{children:e.jsx(N,{className:"h-4 w-4"})}),e.jsx(x,{type:"password",value:s,onChange:t=>$(t.target.value),placeholder:"Nova senha",required:!0})]}),s&&e.jsxs(B,{children:[e.jsx(G,{children:"Critérios de segurança:"}),e.jsxs(Y,{children:[e.jsxs(c,{isValid:i.hasMinLength,children:[e.jsx(h,{children:i.hasMinLength?e.jsx(m,{className:"h-4 w-4"}):e.jsx(l,{className:"h-4 w-4"})}),"Mínimo 8 caracteres"]}),e.jsxs(c,{isValid:i.hasUppercase,children:[e.jsx(h,{children:i.hasUppercase?e.jsx(m,{className:"h-4 w-4"}):e.jsx(l,{className:"h-4 w-4"})}),"Uma letra maiúscula"]}),e.jsxs(c,{isValid:i.hasNumber,children:[e.jsx(h,{children:i.hasNumber?e.jsx(m,{className:"h-4 w-4"}):e.jsx(l,{className:"h-4 w-4"})}),"Um número"]}),e.jsxs(c,{isValid:i.hasSpecialChar,children:[e.jsx(h,{children:i.hasSpecialChar?e.jsx(m,{className:"h-4 w-4"}):e.jsx(l,{className:"h-4 w-4"})}),"Um caractere especial (@$!%*?&)"]})]})]}),e.jsxs(g,{children:[e.jsx(f,{children:e.jsx(N,{className:"h-4 w-4"})}),e.jsx(x,{type:"password",value:d,onChange:t=>L(t.target.value),placeholder:"Confirmar nova senha",required:!0})]}),S&&e.jsx(X,{children:S})]}),e.jsx(_,{type:"submit",disabled:j,children:e.jsx(K,{children:j?e.jsxs(e.Fragment,{children:[e.jsx(D,{}),"Redefinindo..."]}):"Redefinir Senha"})})]})},Q=p`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,W=p`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`,Z=p`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,ee=p`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,re=r.div`
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
`,b=r.div`
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
  animation: ${ee} 6s ease-in-out infinite;
  animation-delay: ${({delay:a})=>a||"0s"};
`,ae=r.div`
  width: 100%;
  max-width: 30rem;
  position: relative;
  z-index: 1;
`,ie=r.div`
  text-align: center;
  margin-bottom: 2rem;
`,ne=r.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;r.div`
  display: inline-flex;
  align-items: center;
  color: white;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transform: scale(1);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
  }
`;const te=r.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`,se=r.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,oe=r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
`,de=r.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${Q} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,le=r.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;r.div`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: underline;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;const ce=r.div`
  position: relative;
  display: flex;
  align-items: center;
`;r.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 3rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;r.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${ce}:focus-within & {
    color: white;
  }
`;r.button`
  width: 100%;
  height: 3.5rem;
  background: hsl(var(--auth-button));
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: hsl(var(--primary-glow));
    transform: scale(1.02);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
  animation: ${W} 0.3s ease-out;
`;r.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;
`;r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`;r.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({isValid:a})=>a?"#4ade80":"rgba(255, 255, 255, 0.6)"};
`;r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;r.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${Z} 1s linear infinite;
`;const be=()=>{const a=()=>e.jsxs(le,{children:["Lembrou da senha?"," ",e.jsx(k,{to:"/login",className:"text-white hover:text-[hsl(var(--primary-glow))] transition-all duration-300 font-medium underline underline-offset-4",children:"Fazer Login"})]});return e.jsxs(re,{children:[e.jsx(b,{top:"8rem",right:"4rem",width:"7rem",height:"7rem"}),e.jsx(b,{bottom:"10rem",left:"5rem",width:"9rem",height:"9rem",delay:"1.8s"}),e.jsx(b,{top:"30%",right:"30%",width:"5rem",height:"5rem",delay:"2.5s"}),e.jsxs(ae,{children:[e.jsxs(ie,{children:[e.jsx(ne,{children:e.jsxs(k,{to:"/login",className:"inline-flex items-center text-white hover:text-white/80 transition-all duration-300",children:[e.jsx(O,{className:"h-5 w-5 mr-2"}),"Voltar ao Login"]})}),e.jsxs(te,{children:[e.jsx(se,{children:"Redefinir Senha"}),e.jsx(oe,{children:"Informe o código recebido por e-mail e crie sua nova senha."})]})]}),e.jsx(de,{children:e.jsx(J,{})}),a()]})]})};export{be as default};
