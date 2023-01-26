import { useContext } from "react";

import { CartContext } from "@/contexts";

export const useCart = () => {
  return useContext(CartContext);
};
