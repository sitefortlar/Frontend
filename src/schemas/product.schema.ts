import { z } from 'zod';

/**
 * Schema de validação para filtros de produtos
 */
export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().min(0, 'Preço mínimo deve ser maior ou igual a 0').optional(),
  maxPrice: z.number().min(0, 'Preço máximo deve ser maior ou igual a 0').optional(),
  sizes: z.array(z.string()).optional(),
  priceType: z.enum(['retail', 'wholesale', 'promotional']).optional(),
  sortBy: z.enum(['name', 'price', 'category', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1, 'Página deve ser maior que 0').optional(),
  limit: z.number().int().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').optional(),
});

/**
 * Schema de validação para item do carrinho
 */
export const cartItemSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  productId: z.string().min(1, 'ID do produto é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  image: z.string().url('URL da imagem inválida'),
  size: z.string().min(1, 'Tamanho é obrigatório'),
  priceType: z.enum(['retail', 'wholesale', 'promotional']),
  price: z.number().min(0, 'Preço deve ser maior ou igual a 0'),
  quantity: z.number().int().min(1, 'Quantidade deve ser maior que 0'),
});

/**
 * Schema de validação para dados de checkout
 */
export const checkoutDataSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato 00.000.000/0000-00'),
  whatsapp: z
    .string()
    .min(1, 'WhatsApp é obrigatório')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'WhatsApp deve estar no formato (00) 00000-0000'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, 'E-mail deve ter no máximo 255 caracteres'),
  paymentType: z.enum(['avista', 'dias30', 'dias90'], {
    errorMap: () => ({ message: 'Tipo de pagamento inválido' }),
  }),
});

/**
 * Schema de validação para produto
 */
export const productSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  images: z.array(z.string().url('URL da imagem inválida')).min(1, 'Pelo menos uma imagem é obrigatória'),
  prices: z.object({
    retail: z.number().min(0, 'Preço de varejo deve ser maior ou igual a 0'),
    wholesale: z.number().min(0, 'Preço de atacado deve ser maior ou igual a 0'),
    promotional: z.number().min(0, 'Preço promocional deve ser maior ou igual a 0'),
  }),
  sizes: z.array(z.string()).min(1, 'Pelo menos um tamanho é obrigatório'),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Schema de validação para categoria
 */
export const categorySchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Tipos inferidos dos schemas
 */
export type ProductFilters = z.infer<typeof productFiltersSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CheckoutData = z.infer<typeof checkoutDataSchema>;
export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
