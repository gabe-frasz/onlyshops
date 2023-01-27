import * as Primitive from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass } from "phosphor-react";
import { Highlight, Hits, SearchBox } from "react-instantsearch-hooks-web";

import { VisuallyHidden } from "@/components";
import { useLocale } from "@/hooks";

export const SearchField = () => {
  const { isInEnglish } = useLocale();

  return (
    <Primitive.Root>
      <Primitive.Trigger className="flex min-w-[200px] items-center gap-2 rounded border border-zinc-300/50 p-2 text-zinc-500/70 shadow dark:bg-zinc-700 dark:text-zinc-200/50">
        <MagnifyingGlass />

        {isInEnglish ? "Search products" : "Procurar produtos"}
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Overlay className="absolute inset-0 bg-zinc-800/90" />

        <Primitive.Content className="absolute inset-0">
          <VisuallyHidden>
            <Primitive.Title>
              {isInEnglish ? "Search for products" : "Procurar por produtos"}
            </Primitive.Title>
          </VisuallyHidden>

          <header className="flex">
            <SearchBox
              placeholder={
                isInEnglish ? "Search for products" : "Procurar por produtos"
              }
              classNames={{
                root: "w-full outline-none",
                input: "w-full p-3 outline-none dark:bg-zinc-700",
                reset: "hidden",
                submit: "hidden",
                submitIcon: "hidden",
              }}
            />

            <Primitive.Close className="bg-violet-800 px-5 py-3 text-violet-50">
              {isInEnglish ? "Cancel" : "Cancelar"}
            </Primitive.Close>
          </header>

          <section>
            <Hits hitComponent={Hit} />
          </section>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};

const Hit = ({ hit }: { hit: any }) => {
  return (
    <Link
      href={`/products/${hit.slug}`}
      className="my-2 flex items-center gap-4 rounded border-4 border-zinc-500 bg-white p-2 font-semibold dark:bg-zinc-700"
    >
      <Image
        src={hit.image}
        alt={hit.name}
        width={100}
        height={100}
        className="rounded"
      />

      <div>
        <p className="w-fit rounded bg-violet-300 px-2 text-sm uppercase text-violet-500">
          {hit.categories[0]}
        </p>

        <h2>
          <Highlight attribute="name" hit={hit} />
        </h2>

        {hit.inStock ? (
          <p>${hit.price}</p>
        ) : (
          <p className="w-fit rounded bg-red-500 px-2 text-sm uppercase text-red-50">
            sold out
          </p>
        )}
      </div>
    </Link>
  );
};
