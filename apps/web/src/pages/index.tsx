import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  Container,
  Head,
  PageTransition,
  ProductCard,
  SearchField,
} from "@/components";
import { Locale, useProductsAndCategoriesQuery } from "@/graphql/generated";
import { useLocale } from "@/hooks";
import noDataImg from "public/images/no-data.png";

const Home: NextPage = () => {
  const { isInEnglish } = useLocale();
  const { data, refetch } = useProductsAndCategoriesQuery({
    variables: {
      locale: isInEnglish ? Locale.En : Locale.PtBr,
    },
  });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [mainAnimationParent] = useAutoAnimate<HTMLDivElement>();
  const [sectionAnimationParent] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    refetch({
      locale: isInEnglish ? Locale.En : Locale.PtBr,
    });
  }, [isInEnglish, refetch]);

  const filteredProducts = useMemo(
    () =>
      data?.products.filter((p) => {
        return (
          p.categories.some((c) => c.name.toLowerCase() === categoryFilter) ||
          categoryFilter === "all"
        );
      }),
    [data, categoryFilter]
  );

  return (
    <PageTransition>
      <Head title={isInEnglish ? "Home" : "Início"} />

      <Container asChild>
        <section className="py-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mb-4 rounded bg-zinc-300 p-2 dark:bg-zinc-700"
          >
            <option value="all">{isInEnglish ? "All" : "Todos"}</option>
            {data?.categories.map((c) => (
              <option
                key={c.name}
                value={c.name.toLowerCase()}
                className="capitalize"
              >
                {c.name}
              </option>
            ))}
          </select>

          <div className="w-full sm:hidden">
            <SearchField />
          </div>
        </section>
      </Container>

      <Container asChild>
        <main
          ref={mainAnimationParent}
          className="grid w-fit grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts?.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                name: p.name,
                image: p.images[0]?.url,
                slug: p.slug,
                price: p.price,
                inStock: p.inStock,
                categories: p.categories.map((c) => c.name),
              }}
            />
          ))}
        </main>
      </Container>

      <section ref={sectionAnimationParent}>
        {filteredProducts?.length === 0 ? (
          <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4 font-semibold">
            <Image
              src={noDataImg}
              alt="No data illustration"
              className="max-w-[400px] dark:hidden"
            />

            <h2 className="text-center text-xl">
              {isInEnglish
                ? "Didn't find any products U_U"
                : "Não encontramos nenhum produto U_U"}
            </h2>
          </div>
        ) : null}
      </section>
    </PageTransition>
  );
};

export default Home;
