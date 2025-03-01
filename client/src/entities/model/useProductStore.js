import { create } from 'zustand';
import ProductService from '../../features/api/productService';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

export const useProductStore = create(devtools((set, get) => ({
    products: [],
    product: null,
    isLoading: false,
    error: null,

    setProducts: (products) => {
        console.log('setProducts called with:', products);
        set({ products });
    },
    
    setProduct: (product) => {
        console.log('setProduct called with:', product);
        set({ product });
    },
    
    setLoading: (bool) => {
        console.log('setLoading called with:', bool);
        set({ isLoading: bool });
    },
    
    setError: (error) => {
        console.log('setError called with:', error);
        set({ error });
    },

    fetchProducts: async () => {
        console.log('fetchProducts called, setting isLoading to true');
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.getAll();
            console.log('Fetch products response:', response);
            
            set({ products: response.data });
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при получении товаров';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при получении товаров' });
            }
            throw e;
        } finally {
            console.log('Finally block in fetchProducts, setting isLoading to false');
            set({ isLoading: false });
        }
    },

    fetchProductById: async (id) => {
        console.log(`fetchProductById called with id: ${id}, setting isLoading to true`);
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.getById(id);
            console.log('Fetch product by id response:', response);
            
            set({ product: response.data });
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при получении товара';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при получении товара' });
            }
            throw e;
        } finally {
            console.log('Finally block in fetchProductById, setting isLoading to false');
            set({ isLoading: false });
        }
    },

    fetchProductsByCategory: async (category) => {
        console.log(`fetchProductsByCategory called with category: ${category}, setting isLoading to true`);
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.getByCategory(category);
            console.log('Fetch products by category response:', response);
            
            set({ products: response.data });
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при получении товаров по категории';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при получении товаров по категории' });
            }
            throw e;
        } finally {
            console.log('Finally block in fetchProductsByCategory, setting isLoading to false');
            set({ isLoading: false });
        }
    },

    clearProduct: () => {
        console.log('clearProduct called');
        set({ product: null });
    },
    
    createProduct: async (productData) => {
        console.log('createProduct called with:', productData);
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.createProduct(productData);
            console.log('Create product response:', response);
            
            // Добавляем новый товар в список товаров
            const newProducts = [...get().products, response.data];
            set({ products: newProducts });
            
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при создании товара';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при создании товара' });
            }
            throw e;
        } finally {
            console.log('Finally block in createProduct, setting isLoading to false');
            set({ isLoading: false });
        }
    },
    
    updateProduct: async (id, productData) => {
        console.log(`updateProduct called with id: ${id}, data:`, productData);
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.updateProduct(id, productData);
            console.log('Update product response:', response);
            
            // Обновляем товар в списке товаров
            const updatedProducts = get().products.map(product => 
                product.id === id ? response.data : product
            );
            
            set({ 
                products: updatedProducts,
                product: response.data
            });
            
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при обновлении товара';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при обновлении товара' });
            }
            throw e;
        } finally {
            console.log('Finally block in updateProduct, setting isLoading to false');
            set({ isLoading: false });
        }
    },
    
    deleteProduct: async (id) => {
        console.log(`deleteProduct called with id: ${id}`);
        set({ isLoading: true, error: null });
        
        try {
            const response = await ProductService.deleteProduct(id);
            console.log('Delete product response:', response);
            
            // Удаляем товар из списка товаров
            const filteredProducts = get().products.filter(product => product.id !== id);
            set({ products: filteredProducts });
            
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при удалении товара';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при удалении товара' });
            }
            throw e;
        } finally {
            console.log('Finally block in deleteProduct, setting isLoading to false');
            set({ isLoading: false });
        }
    }
})));
