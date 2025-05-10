import { supabase } from './apiClient';
import type { Product, ProductId } from '@/lib/types';

export type ProductCreateInput = Omit<Product, 'id'>; // ID is fixed/static
export type ProductUpdateInput = Partial<Omit<Product, 'id'>>;

export async function createProduct(product: Product): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error.message);
    return null;
  }

  return data as Product;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }

  return data as Product[];
}

export async function getProductById(id: ProductId): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error.message);
    return null;
  }

  return data as Product;
}

export async function updateProduct(
  id: ProductId,
  updates: ProductUpdateInput
): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error.message);
    return null;
  }

  return data as Product;
}

export async function deleteProduct(id: ProductId): Promise<boolean> {
  const { error } = await supabase.from('product').delete().eq('id', id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error.message);
    return false;
  }

  return true;
}
