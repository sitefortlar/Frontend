/**
 * Components Barrel Export
 * Centraliza exports de componentes do projeto
 */

// Layout Components
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Layout } from './Layout';
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as RouteLoading } from './RouteLoading';

// Templates
export { AuthLayout } from './templates/AuthLayout';

// UI Components - Re-export from ui/ for convenience
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Label } from './ui/label';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export { Badge } from './ui/badge';
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
export { Separator } from './ui/separator';
export { ScrollArea } from './ui/scroll-area';
export { Toaster } from './ui/toaster';
export { Toaster as Sonner, toast } from './ui/sonner';

// Auth Components
export { LoginForm } from './auth/LoginForm';
export { CompanyDataForm } from './companyRegistration/CompanyDataForm';
export { AddressForm } from './companyRegistration/AddressForm';
export { ContactForm } from './companyRegistration/ContactForm';
export { PasswordForm } from './companyRegistration/PasswordForm';

// Cart Components
export { default as CartDrawer } from './Cart/CartDrawer';
export { default as CartSheet } from './Cart/CartSheet';
export { CartButton } from './Cart/CartButton';
export { CartHeader } from './Cart/CartHeader';
export { CartItem } from './Cart/CartItem';
export { CartFooter } from './Cart/CartFooter';

// Product Catalog Components
export { ProductCatalog } from './ProductCatalog/ProductCatalog';
export { ProductCard } from './ProductCatalog/ProductCard';
export { ProductGrid } from './ProductCatalog/ProductGrid';
export { default as ProductModal } from './ProductCatalog/ProductModal';
export { CategorySidebar } from './ProductCatalog/CategorySidebar';
export { FilterBar } from './ProductCatalog/FilterBar';

