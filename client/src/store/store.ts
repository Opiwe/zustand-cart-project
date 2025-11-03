import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createUserSlice } from "@/store/user-slice";
import { Store } from "@/types/store";

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createUserSlice(...a),
  }))
);