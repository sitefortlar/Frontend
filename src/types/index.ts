// Re-export all types from individual files
export * from './Product';
export * from './Cart';
export * from './Auth';

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

// Form field types
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
