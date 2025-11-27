import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "@/store/user-slice";
import type { Store } from "@/types/store";
import { createCartSlice } from "./cart-slice";
import { devtools, persist } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    devtools(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createCartSlice(...a),
      }))
    ),
    {
      name: "cart-store",
    }
  )
);
