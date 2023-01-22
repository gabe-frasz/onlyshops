import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

interface ContainerProps {
  asChild?: boolean;
  children: ReactNode;
}

export const Container = ({ asChild = false, children }: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className="mx-auto w-full max-w-[1920px] px-4 sm:px-6">
      {children}
    </Comp>
  );
};
