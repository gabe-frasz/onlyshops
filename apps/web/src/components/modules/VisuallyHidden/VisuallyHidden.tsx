import * as Primitive from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

export const VisuallyHidden = ({ children }: { children: ReactNode }) => {
  return <Primitive.Root>{children}</Primitive.Root>;
};
