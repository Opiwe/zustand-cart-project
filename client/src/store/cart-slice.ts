import type { Product } from "@/types/product";
import type { StateCreator } from "zustand";
import type { CartProduct } from "../types/cartProduct";

type CartState = {
  products: CartProduct[];
  total: number;
  checkedOut: boolean;
  lastCheckedOutProducts: CartProduct[];
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductById: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  checkout: () => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  total: 0,
  checkedOut: false,
  lastCheckedOutProducts: [],
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
    addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        state.products.push({ ...product, qty: 1 });
      }
      // Calculate total
      state.total = state.products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    }),
    removeProduct: (productId) =>
    set((state) => {
      const index = state.products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
      // Calculate total
      state.total = state.products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    }),
    incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.id === productId
      );
      if (foundProduct) {
        foundProduct.qty += 1;
      }
      // Calculate total
      state.total = state.products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    }),
    decQty: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.id === productId
      );

      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
        }
      }
      // Calculate total
      state.total = state.products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    }),
  getProductById: (productId) => {
    return get().products.find((product) => product.id === productId);
  },
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  checkout: () =>
    set((state) => {
      state.lastCheckedOutProducts = state.products; // Store products before clearing
      state.products = [];
      state.total = 0;
      state.checkedOut = true;
    }),
  reset: () => set(() => initialState),
});