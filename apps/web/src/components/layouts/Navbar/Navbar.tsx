import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingCartSimple } from "phosphor-react";

import { Container, Logo, SearchField, VisuallyHidden } from "@/components";
import { useCart } from "@/hooks";
import { DropdownMenu } from "./components/DropdownMenu";

export const Navbar = () => {
  const showSearchBar = useRouter().pathname === "/";
  const { cartItemsLength } = useCart();

  return (
    <nav className="border-b-2 py-4 dark:border-gray-100/20">
      <Container className="flex items-center justify-between">
        <VisuallyHidden>
          <h1>OnlyShops</h1>
        </VisuallyHidden>

        <Logo />

        {showSearchBar && (
          <div className="mx-auto hidden sm:block">
            <SearchField />
          </div>
        )}

        <div className="flex gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCartSimple size={28} />

            <div className="absolute -top-1 -right-1 rounded-full bg-violet-500 px-1 py-0.5 text-xs text-violet-50">
              {cartItemsLength}
            </div>
          </Link>

          <DropdownMenu />
        </div>
      </Container>
    </nav>
  );
};
