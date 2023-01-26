import { useLocale } from "@/hooks";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  images: string[];
  quantity: number;
};

type CartProviderData = {
  cart: CartItem[];
  cartItemsLength: number;
  totalPrice: number;
  addToCart: (newItem: CartItem) => void;
  addOne: (itemId: string) => void;
  removeOne: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
};

export const CartContext = createContext({} as CartProviderData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isInEnglish } = useLocale();

  const cartItemsLength = useMemo(() => {
    return cart
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return (
      cart
        .map((item) => item.quantity * item.priceInCents)
        .reduce((acc, curr) => acc + curr, 0) / 100
    );
  }, [cart]);

  useEffect(() => {
    const { "onlyshops.cart": localCart } = parseCookies();
    const initialValue = localCart ? JSON.parse(localCart) : [];

    setCart(initialValue);
  }, []);

  function addToCart(newItem: CartItem) {
    toast.success(isInEnglish ? "Added to cart" : "Adicionado ao carrinho");

    const isInCart = !!cart.find((item) => item.id === newItem.id);

    if (!isInCart) {
      setCookie(
        undefined,
        "onlyshops.cart",
        JSON.stringify([...cart, newItem])
      );
      setCart([...cart, newItem]);
      return;
    }

    const updatedCart = cart.map((item) => {
      return item.id === newItem.id
        ? {
            ...item,
            quantity: item.quantity + newItem.quantity,
          }
        : item;
    });

    setCookie(undefined, "onlyshops.cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  function addOne(itemId: string) {
    const updatedCart = cart.map((item) => {
      return item.id === itemId ? { ...item, quantity: ++item.quantity } : item;
    });

    setCookie(undefined, "onlyshops.cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  function removeOne(itemId: string) {
    const item = cart.find((item) => item.id === itemId);

    if (item?.quantity === 1) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map((item) => {
      return item.id === itemId ? { ...item, quantity: --item.quantity } : item;
    });

    setCookie(undefined, "onlyshops.cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  function removeFromCart(itemId: string) {
    const filteredCart = cart.filter((item) => item.id !== itemId);

    setCookie(undefined, "onlyshops.cart", JSON.stringify(filteredCart));
    setCart(filteredCart);
  }

  const contextValue = {
    cart,
    cartItemsLength,
    totalPrice,
    addToCart,
    addOne,
    removeOne,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
