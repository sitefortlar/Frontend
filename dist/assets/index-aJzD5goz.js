import{c as z,j as e,X as F,k as $,r as b,n as Z,m as U,e as j,L as X,a as K,u as ee}from"./index-hV2YQk7K.js";import{o as y,B as ae,f as te,a as re,L as ne,u as oe,A as D}from"./useFormValidation-DipxAR_m.js";import{A as B,a as M,b as V,c as I,d as L,e as se,f as H,g as _,h as Y,i as m,j as g,k as ie,l as ce,m as le,n as de,o as P,p as A}from"./styles-BLfnPQ6a.js";import{L as G}from"./loader-circle-CZWR_OwY.js";import{C as q}from"./check-BfzSPuf9.js";import{A as he}from"./arrow-left-BWaTIojA.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=z("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=z("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=z("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=z("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),xe=({cnpj:t,razaoSocial:s,fantasia:r,onCnpjChange:o,onRazaoSocialChange:d,onFantasiaChange:C,onSearchByCnpj:f,isLoadingCnpj:i=!1,errors:c})=>{const h=u=>{const w=y(u).slice(0,14);o(w)},v=()=>{y(t).length===14&&f()};return e.jsxs(B,{delay:"0.1s",children:[e.jsx(M,{children:e.jsxs(V,{children:[e.jsx(I,{children:e.jsx(me,{className:"h-4 w-4 text-white"})}),"Dados da Empresa"]})}),e.jsxs(L,{children:[e.jsxs(se,{children:[e.jsxs(H,{children:[e.jsx(_,{placeholder:"CNPJ (apenas números) *",value:t,onChange:u=>h(u.target.value),required:!0,maxLength:14,inputMode:"numeric"}),e.jsx(Y,{type:"button",onClick:v,disabled:i||y(t).length!==14,title:"Buscar dados da empresa pelo CNPJ",children:i?e.jsx(G,{className:"h-5 w-5 animate-spin"}):e.jsx(O,{className:"h-5 w-5"})})]}),c.cnpj&&e.jsx(m,{children:c.cnpj}),i&&e.jsx("p",{className:"text-blue-400 text-sm mt-1",children:"Consultando CNPJ..."})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Razão Social *",value:s,onChange:u=>d(u.target.value),required:!0}),c.razaoSocial&&e.jsx(m,{children:c.razaoSocial})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Fantasia *",value:r,onChange:u=>C(u.target.value),required:!0}),c.fantasia&&e.jsx(m,{children:c.fantasia})]})]})]})},ge=({cep:t,endereco:s,numero:r,complemento:o,bairro:d,cidade:C,uf:f,onCepChange:i,onEnderecoChange:c,onNumeroChange:h,onComplementoChange:v,onBairroChange:u,onCidadeChange:S,onUfChange:w,onSearchByCep:E,isLoadingCep:k=!1,errors:a})=>{const N=n=>{const x=y(n).slice(0,8),T=te(x);i(T)},p=()=>{y(t).length===8&&E()};return e.jsxs(B,{delay:"0.2s",children:[e.jsx(M,{children:e.jsxs(V,{children:[e.jsx(I,{children:e.jsx(ue,{className:"h-4 w-4 text-white"})}),"Endereço"]})}),e.jsxs(L,{children:[e.jsxs("div",{children:[e.jsxs(H,{children:[e.jsx(_,{placeholder:"CEP *",value:t,onChange:n=>N(n.target.value),required:!0,maxLength:9}),e.jsx(Y,{type:"button",onClick:p,disabled:k||y(t).length!==8,title:"Buscar endereço pelo CEP",children:k?e.jsx(G,{className:"h-5 w-5 animate-spin"}):e.jsx(O,{className:"h-5 w-5"})})]}),a.cep&&e.jsx(m,{children:a.cep}),k&&e.jsx("p",{className:"text-blue-400 text-sm mt-1",children:"Consultando CEP..."})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Endereço *",value:s,onChange:n=>c(n.target.value),required:!0}),a.endereco&&e.jsx(m,{children:a.endereco})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Número *",value:r,onChange:n=>h(n.target.value),required:!0}),a.numero&&e.jsx(m,{children:a.numero})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Complemento *",value:o,onChange:n=>v(n.target.value),required:!0}),a.complemento&&e.jsx(m,{children:a.complemento})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Bairro *",value:d,onChange:n=>u(n.target.value),required:!0}),a.bairro&&e.jsx(m,{children:a.bairro})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Cidade *",value:C,onChange:n=>S(n.target.value),required:!0}),a.cidade&&e.jsx(m,{children:a.cidade})]}),e.jsxs("div",{children:[e.jsxs(ie,{value:f,onChange:n=>w(n.target.value),required:!0,children:[e.jsx("option",{value:"",children:"UF *"}),ae.map(n=>e.jsx("option",{value:n,children:n},n))]}),a.uf&&e.jsx(m,{children:a.uf})]})]})]})},je=({nomeContato:t,telefone:s,email:r,whatsapp:o,onNomeContatoChange:d,onTelefoneChange:C,onEmailChange:f,onWhatsappChange:i,errors:c})=>e.jsxs(B,{delay:"0.3s",children:[e.jsx(M,{children:e.jsxs(V,{children:[e.jsx(I,{children:e.jsx(pe,{className:"h-4 w-4 text-white"})}),"Contato"]})}),e.jsxs(L,{children:[e.jsxs("div",{children:[e.jsx(g,{placeholder:"Nome *",value:t,onChange:h=>d(h.target.value),required:!0}),c.nomeContato&&e.jsx(m,{children:c.nomeContato})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"Telefone *",value:s,onChange:h=>C(h.target.value),required:!0}),c.telefone&&e.jsx(m,{children:c.telefone})]}),e.jsxs("div",{children:[e.jsx(g,{type:"email",placeholder:"E-mail *",value:r,onChange:h=>f(h.target.value),required:!0}),c.email&&e.jsx(m,{children:c.email})]}),e.jsxs("div",{children:[e.jsx(g,{placeholder:"WhatsApp *",value:o,onChange:h=>i(h.target.value),required:!0}),c.whatsapp&&e.jsx(m,{children:c.whatsapp})]})]})]}),Ce=({password:t,onPasswordChange:s,errors:r})=>{const o=re(t);return e.jsxs(B,{delay:"0.4s",children:[e.jsx(M,{children:e.jsxs(V,{children:[e.jsx(I,{children:e.jsx(ne,{className:"h-4 w-4 text-white"})}),"Senha de Acesso"]})}),e.jsxs(L,{children:[e.jsxs("div",{children:[e.jsx(g,{type:"password",placeholder:"Senha *",value:t,onChange:d=>s(d.target.value),required:!0}),r.password&&e.jsx(m,{children:r.password})]}),e.jsxs(ce,{children:[e.jsx(le,{children:"Critérios de segurança:"}),e.jsxs(de,{children:[e.jsxs(P,{isValid:o.hasMinLength,children:[e.jsx(A,{children:o.hasMinLength?e.jsx(q,{className:"h-4 w-4"}):e.jsx(F,{className:"h-4 w-4"})}),"Mínimo 8 caracteres"]}),e.jsxs(P,{isValid:o.hasUppercase,children:[e.jsx(A,{children:o.hasUppercase?e.jsx(q,{className:"h-4 w-4"}):e.jsx(F,{className:"h-4 w-4"})}),"Uma letra maiúscula"]}),e.jsxs(P,{isValid:o.hasNumber,children:[e.jsx(A,{children:o.hasNumber?e.jsx(q,{className:"h-4 w-4"}):e.jsx(F,{className:"h-4 w-4"})}),"Um número"]}),e.jsxs(P,{isValid:o.hasSpecialChar,children:[e.jsx(A,{children:o.hasSpecialChar?e.jsx(q,{className:"h-4 w-4"}):e.jsx(F,{className:"h-4 w-4"})}),"Um caractere especial (@$!%*?&)"]})]})]})]})]})};class fe{async searchByCEP(s){var r,o;try{return(await $.get(`/utils/cep/${s}`)).data}catch(d){throw new Error(((o=(r=d.response)==null?void 0:r.data)==null?void 0:o.message)||d.message||"Erro ao fazer login")}}}class be{static async searchByCNPJ(s){var r,o;try{return(await $.get(`/utils/cnpj/${s}`)).data}catch(d){throw new Error(((o=(r=d.response)==null?void 0:r.data)==null?void 0:o.message)||d.message||"Erro ao buscar CNPJ")}}}const R={razaoSocial:"",fantasia:"",cnpj:"",cep:"",endereco:"",numero:"",complemento:"",bairro:"",cidade:"",uf:"",nomeContato:"",telefone:"",email:"",whatsapp:"",senha:""},ve=()=>{const[t,s]=b.useState(R),[r,o]=b.useState(!1),[d,C]=b.useState(!1),[f,i]=b.useState(!1),{validateForm:c,errors:h,clearErrors:v}=oe(),u=b.useCallback((p,n)=>{s(l=>({...l,[p]:n}))},[]),S=b.useCallback(()=>{const n=["razaoSocial","fantasia","cep","endereco","numero","complemento","bairro","cidade","uf","cnpj","nomeContato","telefone","email","whatsapp","senha"].reduce((l,x)=>(l[x]=t[x],l),{});return c(n)},[t,c]),w=b.useCallback(()=>{s(R),v()},[v]),E=b.useCallback(async p=>{const n=y(p);if(n.length===8){o(!0);try{const x=await new fe().searchByCEP(n);s(T=>({...T,endereco:x.logradouro,bairro:x.bairro,cidade:x.cidade,uf:x.uf,complemento:x.complemento||""}))}catch(l){console.error("Erro ao buscar CEP:",l)}finally{o(!1)}}},[]),k=b.useCallback(async p=>{const n=y(p);if(n.length===14){C(!0);try{const l=await be.searchByCNPJ(n);s(x=>({...x,razaoSocial:l.razao_social,fantasia:l.fantasia,cep:l.cep,endereco:l.logradouro,numero:l.numero,complemento:l.complemento,bairro:l.bairro,cidade:l.municipio,uf:l.uf,telefone:l.telefone||"",email:l.email||""}))}catch(l){console.error("Erro ao buscar CNPJ:",l)}finally{C(!1)}}},[]),a=b.useCallback(async()=>{i(!0);try{const p={cnpj:t.cnpj,razao_social:t.razaoSocial,nome_fantasia:t.fantasia,senha:t.senha,endereco:{cep:t.cep,numero:t.numero,complemento:t.complemento||void 0,bairro:t.bairro,cidade:t.cidade,uf:t.uf,ibge:""},contato:{nome:t.nomeContato,telefone:t.telefone,celular:t.whatsapp,email:t.email}};return await Z.postCompany(p)}catch(p){throw p}finally{i(!1)}},[t]),N=Object.values(t).every(p=>p.trim().length>0)&&Object.keys(h).length===0;return{formData:t,errors:h,isLoadingCep:r,isLoadingCnpj:d,isSubmitting:f,updateField:u,validateRegistration:S,resetForm:w,searchCep:E,searchCnpj:k,postCompany:a,isFormValid:N}},W=U`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,Q=U`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,ye=U`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`,we=j.div`
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

  /* Floating elements */
  &::after {
    content: '';
    position: absolute;
    top: 8rem;
    right: 4rem;
    width: 7rem;
    height: 7rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    filter: blur(2rem);
    animation: ${ye} 6s ease-in-out infinite;
  }
`,ke=j.div`
  width: 100%;
  max-width: 64rem;
  position: relative;
  z-index: 1;
`,Se=j.div`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${W} 0.6s ease-out;
`,Ee=j.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`,Ne=j.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.125rem;
  line-height: 1.6;
`,Fe=j.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${W} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`,Pe=j.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,Ae=j.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  animation: ${Q} 0.6s ease-out;
  animation-fill-mode: both;
`,qe=j(X)`
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

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
    color: rgba(255, 255, 255, 0.8);
  }
`,ze=j.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${Q} 0.6s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
`,J=j.button`
  padding: 0 1.5rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;

  ${({variant:t="primary"})=>t==="primary"?`
        background: hsl(var(--auth-button));
        color: white;
        box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
        
        &:hover {
          background: hsl(var(--primary-glow));
          transform: scale(1.02);
          box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        }
      `:`
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(0.5rem);
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,De=()=>{const t=K(),{toast:s}=ee(),{formData:r,errors:o,isLoadingCep:d,isLoadingCnpj:C,isSubmitting:f,updateField:i,validateRegistration:c,resetForm:h,searchCep:v,searchCnpj:u,postCompany:S}=ve(),w=async()=>{if(!r.cnpj){s({title:"CNPJ necessário",description:D.CNPJ_REQUIRED,variant:"destructive"});return}try{await u(r.cnpj),s({title:"Dados encontrados!",description:"Os dados da empresa foram preenchidos automaticamente."})}catch{s({title:"Erro na busca",description:"Não foi possível encontrar os dados da empresa. Verifique o CNPJ.",variant:"destructive"})}},E=async()=>{if(!r.cep){s({title:"CEP necessário",description:"Por favor, informe o CEP para buscar o endereço.",variant:"destructive"});return}try{await v(r.cep),s({title:"Endereço encontrado!",description:"Os dados do endereço foram preenchidos automaticamente."})}catch{s({title:"Erro na busca",description:"Não foi possível encontrar o endereço. Verifique o CEP.",variant:"destructive"})}},k=async a=>{if(a.preventDefault(),!c()){s({title:"Erro",description:D.REQUIRED_FIELDS,variant:"destructive"});return}try{await S(),s({title:"Cadastro realizado!",description:D.REGISTRATION_SUCCESS}),setTimeout(()=>{t("/login")},2e3)}catch(N){s({title:"Erro no cadastro",description:N.message||"Não foi possível criar a conta. Tente novamente.",variant:"destructive"})}};return e.jsx(we,{children:e.jsxs(ke,{children:[e.jsx(Ae,{children:e.jsxs(qe,{to:"/login",children:[e.jsx(he,{className:"h-5 w-5"}),"Voltar ao Login"]})}),e.jsxs(Se,{children:[e.jsx(Ee,{children:"Cadastro de Cliente"}),e.jsx(Ne,{children:"Preencha os dados para criar sua conta no sistema"})]}),e.jsx(Fe,{children:e.jsxs(Pe,{onSubmit:k,children:[e.jsx(xe,{cnpj:r.cnpj,razaoSocial:r.razaoSocial,fantasia:r.fantasia,onCnpjChange:a=>i("cnpj",a),onRazaoSocialChange:a=>i("razaoSocial",a),onFantasiaChange:a=>i("fantasia",a),onSearchByCnpj:w,isLoadingCnpj:C,errors:o}),e.jsx(ge,{cep:r.cep,endereco:r.endereco,numero:r.numero,complemento:r.complemento,bairro:r.bairro,cidade:r.cidade,uf:r.uf,onCepChange:a=>i("cep",a),onEnderecoChange:a=>i("endereco",a),onNumeroChange:a=>i("numero",a),onComplementoChange:a=>i("complemento",a),onBairroChange:a=>i("bairro",a),onCidadeChange:a=>i("cidade",a),onUfChange:a=>i("uf",a),onSearchByCep:E,isLoadingCep:d,errors:o}),e.jsx(je,{nomeContato:r.nomeContato,telefone:r.telefone,email:r.email,whatsapp:r.whatsapp,onNomeContatoChange:a=>i("nomeContato",a),onTelefoneChange:a=>i("telefone",a),onEmailChange:a=>i("email",a),onWhatsappChange:a=>i("whatsapp",a),errors:o}),e.jsx(Ce,{password:r.senha,onPasswordChange:a=>i("senha",a),errors:o}),e.jsxs(ze,{children:[e.jsx(J,{type:"button",variant:"secondary",onClick:()=>t("/login"),children:"Cancelar"}),e.jsx(J,{type:"submit",variant:"primary",disabled:f,children:f?"Criando Conta...":"Criar Conta"})]})]})})]})})};export{De as default};
