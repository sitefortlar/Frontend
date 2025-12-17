import{m as e,e as r}from"./index-hV2YQk7K.js";const a=e`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`,t=e`
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`,i=e`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,c=r.div`
  background: hsl(var(--auth-form-bg));
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${a} 0.6s ease-out;
  animation-delay: ${({delay:o})=>o||"0s"};
  animation-fill-mode: both;
`,m=r.div`
  padding: 1.5rem 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`,p=r.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`,u=r.div`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`,g=r.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,b=r.div`
  grid-column: 1 / -1;
`,n=r.div`
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
`,h=r(s)`
  padding-right: 3rem;
`;r.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  z-index: 1;

  ${n}:focus-within & {
    color: white;
  }
`;const f=r.button`
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
`,x=r.select`
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
`,w=r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${t} 0.3s ease-out;
`,v=r.div`
  margin-top: 1rem;
`,y=r.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
`,A=r.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`,k=r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.3s ease;
  color: ${({isValid:o})=>o?"#4ade80":"rgba(255, 255, 255, 0.6)"};
`,z=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;r.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;const l=r.div`
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

  ${l}:focus-within & {
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
  }
`;r.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
  animation: ${t} 0.3s ease-out;
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
`;r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;r.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${i} 1s linear infinite;
`;export{c as A,m as a,p as b,u as c,g as d,b as e,n as f,h as g,f as h,w as i,s as j,x as k,v as l,y as m,A as n,k as o,z as p};
