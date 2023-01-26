import c from "clsx";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "button" | "text";
}

export const Logo = ({ size = "lg", variant = "button" }: LogoProps) => {
  return (
    <Link
      href="/"
      className={c("inline-block font-bold", {
        "text-3xl": size === "lg",
        "text-2xl": size === "md",
        "text-xl": size === "sm",
        "rounded-md p-2 transition hover:bg-gray-700/20 dark:hover:bg-gray-200/10":
          variant === "button",
      })}
    >
      Only<span className="text-violet-500">Shops</span>
    </Link>
  );
};
