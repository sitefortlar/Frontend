/**
 * Centralized exports for all Zod schemas
 * Following the barrel export pattern for better organization
 */

// Auth schemas
export * from './auth.schema';

// Product schemas
export * from './product.schema';

// Common validation utilities
export { z } from 'zod';
