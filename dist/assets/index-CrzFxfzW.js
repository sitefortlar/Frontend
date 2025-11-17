import{m as n,d as r,L as c,r as d,a as f,u as x,j as e}from"./index-jy6zFgoC.js";import{p as v}from"./password-B6PpjIo4.js";import{A as w}from"./arrow-left-CZsR-znc.js";import{M as j}from"./mail-0eHwFPpU.js";import"./api-BhVipoDr.js";const m=n`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,E=n`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,y=n`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,S=r.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    hsl(var(--auth-bg-start)) 0%,
    hsl(var(--auth-bg-end)) 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

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
`,o=r.div`
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
  animation: ${y} 6s ease-in-out infinite;
  animation-delay: ${({delay:t})=>t||"0s"};
`,q=r.div`
  width: 100%;
  max-width: 28rem;
  position: relative;
  z-index: 10;
`,k=r.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${m} 0.6s ease-out;
`,$=r(c)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
  }
`,L=r.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`,z=r.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,F=r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
`,I=r.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${m} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,Y=r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,h=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,C=r.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 3rem;
  background: hsl(var(--auth-input-bg));
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
`,T=r.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${h}:focus-within & {
    color: white;
  }
`,B=r.button`
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
  gap: 0.5rem;

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
`,N=r.div`
  text-align: center;
  margin-top: 1.5rem;
  animation: ${E} 0.6s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`,A=r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`,D=r(c)`
  color: white;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: hsl(var(--primary-glow));
  }
`,M=r.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,R=()=>{const[t,u]=d.useState(""),[s,l]=d.useState(!1),g=f(),{toast:a}=x(),p=async i=>{if(i.preventDefault(),!t){a({title:"Erro",description:"Por favor, informe seu e-mail.",variant:"destructive"});return}l(!0);try{await v.forgotPassword({email:t}),a({title:"E-mail enviado!",description:"Verifique sua caixa de entrada e siga as instruções para redefinir sua senha."}),setTimeout(()=>{g("/login")},2e3)}catch(b){a({title:"Erro",description:b.message||"Ocorreu um erro ao enviar o e-mail. Tente novamente.",variant:"destructive"})}finally{l(!1)}};return e.jsxs(S,{children:[e.jsx(o,{top:"8rem",right:"4rem",width:"7rem",height:"7rem"}),e.jsx(o,{bottom:"10rem",left:"5rem",width:"9rem",height:"9rem",delay:"1.8s"}),e.jsx(o,{top:"33%",right:"33%",width:"5rem",height:"5rem",delay:"2.5s"}),e.jsxs(q,{children:[e.jsxs(k,{children:[e.jsxs($,{to:"/login",children:[e.jsx(w,{className:"h-5 w-5"}),"Voltar ao Login"]}),e.jsxs(L,{children:[e.jsx(z,{children:"Esqueci minha senha"}),e.jsx(F,{children:"Informe seu e-mail cadastrado e enviaremos instruções para redefinir sua senha."})]})]}),e.jsx(I,{children:e.jsxs(Y,{onSubmit:p,children:[e.jsxs(h,{children:[e.jsx(T,{children:e.jsx(j,{className:"h-5 w-5"})}),e.jsx(C,{type:"email",placeholder:"Seu e-mail cadastrado",value:t,onChange:i=>u(i.target.value),required:!0})]}),e.jsx(B,{type:"submit",disabled:s,children:s?e.jsxs(e.Fragment,{children:[e.jsx(M,{}),"Enviando..."]}):"Enviar Instruções"})]})}),e.jsx(N,{children:e.jsxs(A,{children:["Lembrou da senha?"," ",e.jsx(D,{to:"/login",children:"Fazer Login"})]})})]})]})};export{R as default};
