import type { UserSlice } from '@/store/user-slice';
import type { CartSlice } from '@/store/cart-slice';

export type Store = UserSlice & CartSlice;