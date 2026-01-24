import styled from 'styled-components';

export const AdminCategoriasContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LoadingContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

export const LoadingContent = styled.div`
  text-align: center;
`;

export const LoadingSpinner = styled.div`
  height: 2rem;
  width: 2rem;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  color: hsl(var(--primary));

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: hsl(var(--muted-foreground));
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BackButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
`;

export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderIcon = styled.div`
  height: 2rem;
  width: 2rem;
`;

export const HeaderDescription = styled.p`
  color: hsl(var(--muted-foreground));
  margin-top: 0.5rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  color: hsl(var(--muted-foreground));
`;

export const SearchInput = styled.input`
  padding-left: 2.5rem;
`;

export const LoadingSpinnerSmall = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  animation: spin 1s linear infinite;
  color: hsl(var(--primary));

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const EmptyStateIcon = styled.div`
  height: 3rem;
  width: 3rem;
  margin: 0 auto 1rem;
  color: hsl(var(--muted-foreground));
`;

export const EmptyStateText = styled.p`
  color: hsl(var(--muted-foreground));
`;

export const CategoriesGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

export const CategoryCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.25rem;
`;

export const CategoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SubcategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SubcategoriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SubcategoriesLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

export const SubcategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
`;

export const SubcategoryName = styled.span`
  font-size: 0.875rem;
`;

export const SubcategoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SubcategoryForm = styled.div`
  display: flex;
  gap: 0.5rem;
`;


export const DialogFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

export const DialogFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DialogFormSubcategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const DialogFormSubcategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
`;

export const DialogFormSubcategoryName = styled.span`
  font-size: 0.875rem;
`;

export const DialogFormSubcategoryInput = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ButtonWithIcon = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonIcon = styled.div`
  height: 1rem;
  width: 1rem;
`;

export const ButtonIconSmall = styled.div`
  height: 0.75rem;
  width: 0.75rem;
`;

export const SpinnerButton = styled.div`
  height: 1rem;
  width: 1rem;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

