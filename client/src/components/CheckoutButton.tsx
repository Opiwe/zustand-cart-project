import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { useShallow } from "zustand/react/shallow";

export function CheckoutButton() {
  const { checkout, products } = useStore(
    useShallow((state) => ({
      checkout: state.checkout,
      products: state.products,
    }))
  );

  return (
    <Button onClick={checkout} disabled={products.length === 0}>
      Checkout
    </Button>
  );
}
