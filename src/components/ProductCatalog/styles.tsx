import styled, { keyframes } from 'styled-components';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const ProductCatalogContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: block;
  /* Background removido - já está no CatalogContainer pai */
  
  @media (min-width: 1024px) {
    padding-left: 18rem; /* Compensar sidebar fixa de 72 (18rem) */
  }
`;

export const ProductCatalogContent = styled.div`
  min-height: 100vh;
  position: relative;
  z-index: 10;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: transparent;
`;

export const ProductCatalogHeader = styled.div`
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(1rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  
  @media (min-width: 1024px) {
    padding: 1.25rem 1.5rem;
  }
`;
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file

export const ProductGrid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  animation: ${fadeInScale} 0.6s ease-out;
  width: 100%;
  box-sizing: border-box;
  
  /* Mobile First - 1 coluna */
  grid-template-columns: 1fr;
  
  /* Tablet - 2 colunas */
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem 1.25rem;
  }
  
  /* Desktop pequeno - 3 colunas */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    padding: 1.25rem 1.5rem;
  }
  
  /* Desktop médio - 4 colunas */
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  
  /* Desktop grande - 5 colunas */
  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }
`;

export const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
  animation: ${fadeInScale} 0.6s ease-out;
  animation-fill-mode: both;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  min-height: 12rem;
  max-height: 12rem;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  @media (min-width: 1024px) {
    height: 14rem;
    min-height: 14rem;
    max-height: 14rem;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.5rem;
  transition: transform 0.3s ease;
  max-width: 100%;
  max-height: 100%;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ProductBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #ef4444;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: ${float} 3s ease-in-out infinite;
`;

export const ProductContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
  overflow: hidden;
  min-height: 0;
`;

export const ProductCategory = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  display: inline-block;
  width: fit-content;
`;

export const ProductName = styled.h3`
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  min-height: 2.85rem;
  max-height: 2.85rem;
  flex-shrink: 0;

  ${ProductCard}:hover & {
    color: hsl(var(--primary-glow));
  }
`;

export const ProductPrices = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductPriceLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  font-weight: 500;
`;

export const ProductPriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.375rem;
`;

export const ProductPriceItem = styled.div`
  text-align: center;
`;

export const ProductPriceValue = styled.div<{ isHighlight?: boolean }>`
  color: ${({ isHighlight }) => isHighlight ? '#4ade80' : 'white'};
  font-size: 0.8125rem;
  font-weight: ${({ isHighlight }) => isHighlight ? '600' : '500'};
  word-break: break-word;
`;

export const ProductKits = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
  margin-top: 0.75rem;
`;

export const ProductKitsLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const ProductKitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ProductKitsInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  text-align: center;
`;

export const CartButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 4rem;
    height: 4rem;
  }

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const CartBadge = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: #ef4444;
  color: white;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const AdminSettingsButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    bottom: 6rem;
    right: 1.5rem;
    width: 4rem;
    height: 4rem;
  }

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  }
`;