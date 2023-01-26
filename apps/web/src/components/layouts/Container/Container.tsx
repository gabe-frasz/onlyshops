import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

interface ContainerProps {
  asChild?: boolean;
  className?: string;
  children: ReactNode;
}

export const Container = ({
  asChild = false,
  className = "",
  children,
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={"mx-auto w-[95%] max-w-[1920px] px-4 sm:px-6 " + className}
    >
      {children}
    </Comp>
  );
};
