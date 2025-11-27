import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PRODUCTS_DATA } from "@/lib/mockData";
import { useStore } from "@/store/store";
import { Button } from "./components/ui/button";
import { ChangeQtyButton } from "./components/ChaQtyButtons";
import { CheckoutButton } from "./components/CheckoutButton";
import { useShallow } from "zustand/react/shallow";
import { CartIconBadge } from "./components/CartIconBadge";

export default function App() {
  const { addProduct, cartProducts, total, checkedOut, reset, lastCheckedOutProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
      total: state.total,
      checkedOut: state.checkedOut,
      reset: state.reset,
      lastCheckedOutProducts: state.lastCheckedOutProducts,
    }))
  );

  const itemCount = cartProducts.reduce((sum, product) => sum + product.qty, 0);
  const lastCheckedOutTotal = lastCheckedOutProducts.reduce((sum, p) => sum + (p.price * p.qty), 0);


  if (checkedOut) {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-2xl">Thank you for your purchase!</h1>
        <h2 className="text-xl mt-4">Order Summary:</h2>
        <div className="mt-2 space-y-2">
          {lastCheckedOutProducts.map((product) => (
            <div key={product.id} className="flex justify-between items-center w-64">
              <span>{product.title} (x{product.qty})</span>
              <span>R{(product.price * product.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="text-xl font-bold p-4 bg-primary text-primary-foreground rounded-lg mt-4 w-64 text-center">
          Total: R{lastCheckedOutTotal.toFixed(2)}
        </div>
        <Button onClick={reset} className="mt-4">
          Shop again
        </Button>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <main className="space-y-2 max-w-sm mx-auto pt-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Product:</h1>
          <CartIconBadge itemCount={itemCount} />
        </div>
        <div className="text-xl font-bold p-4 bg-primary text-primary-foreground rounded-lg flex justify-between items-center">
          <span>Cart Total: R{total.toFixed(2)}</span>
          <CheckoutButton />
        </div>
        <div className="space-y-2">
          {PRODUCTS_DATA.map((product) => (
            <Card key={product.id}>
              <CardHeader>{product.title}</CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                {cartProducts.find((item) => item.id === product.id) ? (
                  <ChangeQtyButton productId={product.id} />
                ) : (
                  <Button onClick={() => addProduct(product)} variant={"default"}>
                    Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}