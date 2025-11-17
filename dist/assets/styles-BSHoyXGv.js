import{m as t,d as r}from"./index-jy6zFgoC.js";const a=t`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,e=t`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`,n=t`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;r.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${a} 0.6s ease-out;
  animation-delay: ${({delay:o})=>o||"0s"};
  animation-fill-mode: both;
`;r.div`
  padding: 1.5rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;r.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;r.div`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;r.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;r.div`
  grid-column: 1 / -1;
`;const i=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,s=r.input`
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;r(s)`
  padding-right: 3rem;
`;r.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${i}:focus-within & {
    color: white;
  }
`;r.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
`;r.select`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  background: hsl(var(--auth-input-bg));
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &:hover:not(:focus) {
    border-color: rgba(255, 255, 255, 0.3);
  }

  option {
    background: hsl(var(--auth-bg-start));
    color: white;
  }
`;r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${e} 0.3s ease-out;
`;r.div`
  margin-top: 1rem;
`;r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`;r.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({isValid:o})=>o?"#4ade80":"rgba(255, 255, 255, 0.6)"};
`;r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;const g=r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,p=r.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`,d=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,b=r.input`
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
`,u=r.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${d}:focus-within & {
    color: white;
  }
`,f=r.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    color: white;
  }
`,h=r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${e} 0.3s ease-out;
`,x=r.button`
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
`,w=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`,v=r.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${n} 1s linear infinite;
`,y=r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,k=r.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`,l=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,z=r.input`
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

  &:read-only {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`,C=r.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${l}:focus-within & {
    color: white;
  }
`,I=r.button`
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
`,R=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`,S=r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
  animation: ${e} 0.3s ease-out;
`,$=r.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
`,j=r.button`
  width: 100%;
  height: 3rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,L=r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,B=r.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,c=r.div`
  position: relative;
  display: flex;
  align-items: center;
`,G=r.input`
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
`,Y=r.div`
  position: absolute;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${c}:focus-within & {
    color: white;
  }
`,F=r.button`
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
`,P=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`,E=r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0;
  animation: ${e} 0.3s ease-out;
`,A=r.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(0.5rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;
`,D=r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`,X=r.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`,q=r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({isValid:o})=>o?"#4ade80":"rgba(255, 255, 255, 0.6)"};
`,T=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;export{$ as A,I as B,y as C,R as D,j as E,g as L,L as R,p as a,d as b,u as c,b as d,h as e,f,x as g,w as h,v as i,B as j,c as k,Y as l,G as m,A as n,D as o,X as p,q,T as r,E as s,F as t,P as u,k as v,l as w,C as x,z as y,S as z};
