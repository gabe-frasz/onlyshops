import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { Container, Head, PageTransition } from "@/components";
import { Locale, useProductBySlugQuery } from "@/graphql/generated";
import { useCart, useLocale } from "@/hooks";

const ProductPage: NextPage = () => {
  const { slug } = useRouter().query;
  const { isInEnglish } = useLocale();
  const { data } = useProductBySlugQuery({
    variables: {
      locale: isInEnglish ? Locale.En : Locale.PtBr,
      slug: slug as string,
    },
  });
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <PageTransition>
      <Head title={data?.product?.name ?? "Products"} />

      <Container asChild>
        <main className="flex h-[calc(100vh-85px)] flex-col gap-4 py-4 md:flex-row md:items-center md:justify-evenly">
          <Image
            src={data?.product?.images[0]?.url ?? "https://github.com/guy.png"}
            alt={data?.product?.name!}
            width={300}
            height={300}
            className="mx-auto max-w-[400px] flex-1 md:mx-0"
          />

          <div className="mx-auto max-w-[700px] flex-[2] text-center font-semibold md:mx-0 md:text-start">
            <h2 className="mb-4 text-2xl md:mb-8">{data?.product?.name}</h2>

            <p className="mb-2 md:mb-8">{data?.product?.description}</p>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <span className="mb-2 block text-lg">
                {data?.product?.price.toLocaleString(
                  isInEnglish ? "en" : "pt-BR",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </span>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-4">
                <div className="flex justify-center">
                  <label htmlFor="quantity" className="mr-2">
                    Quantity:
                  </label>

                  <button
                    disabled={quantity === 1}
                    onClick={() =>
                      setQuantity((prev) => (prev <= 1 ? 1 : --prev))
                    }
                    className="mr-4 w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 disabled:opacity-50 hover:disabled:bg-violet-500 dark:hover:bg-violet-500/50 hover:disabled:dark:bg-violet-500"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(+e.target.value < 1 ? 1 : +e.target.value)
                    }
                    className="w-16 appearance-none bg-transparent px-1 outline-none focus:outline-1"
                  />
                  <button
                    onClick={() => setQuantity((prev) => ++prev)}
                    className="-ml-6 w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 dark:hover:bg-violet-500/50"
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={!data?.product?.inStock}
                  onClick={() =>
                    addToCart({
                      id: data?.product?.id!,
                      name: data?.product?.name!,
                      description: data?.product?.description!,
                      priceInCents: data?.product?.price! * 100,
                      images: data?.product?.images.map((i) => i.url) ?? [],
                      quantity,
                    })
                  }
                  className="mx-auto w-fit rounded bg-violet-500 px-2 py-1 uppercase text-violet-50 transition-colors hover:bg-violet-600 dark:hover:bg-violet-500/50 sm:mx-0"
                >
                  {data?.product?.inStock
                    ? isInEnglish
                      ? "Add to cart"
                      : "Adicionar ao carrinho"
                    : isInEnglish
                    ? "Product unavailable"
                    : "Produto indisponível"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </PageTransition>
  );
};

export default ProductPage;
