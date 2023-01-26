import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingCartSimple } from "phosphor-react";

import { Container, Logo, VisuallyHidden } from "@/components";
import { DropdownMenu } from "./components/DropdownMenu";

export const Navbar = () => {
  const showSearchBar = useRouter().pathname === "/";

  return (
    <Container asChild>
      <nav className="flex h-fit items-center justify-between border-b-2 py-4 dark:border-gray-100/20">
        <VisuallyHidden>
          <h1>OnlyShops</h1>
        </VisuallyHidden>

        <Logo />

        {showSearchBar && (
          <div className="mx-auto hidden sm:block">searchbar</div>
        )}

        <div className="flex gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCartSimple size={28} />

            <div className="absolute -top-1 -right-1 rounded-full bg-violet-500 px-1 py-0.5 text-xs text-violet-50">
              13
            </div>
          </Link>

          <DropdownMenu />
        </div>
      </nav>
    </Container>
  );
};
