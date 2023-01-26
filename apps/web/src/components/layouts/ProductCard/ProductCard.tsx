import { useLocale } from "@/hooks";
import Image from "next/image";
import Link from "next/link";

interface ProductCartProps {
  product: {
    id?: string;
    slug: string;
    name: string;
    image?: string | null;
    price: number;
    inStock: boolean;
    categories: string[];
  };
}

export const ProductCard = ({ product }: ProductCartProps) => {
  const { isInEnglish } = useLocale();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="relative w-72 max-w-full overflow-hidden rounded-md border-2 border-violet-400 font-semibold shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-xl dark:border-violet-200 dark:bg-zinc-800 dark:text-violet-50 md:w-80"
    >
      <Image
        src={product.image ?? "https://github.com/classmate.png"}
        alt={product.name}
        width={300}
        height={200}
        className="max-h-[200px] w-full object-cover"
      />

      <div className="flex flex-col gap-4 p-4">
        <h3 className="mb-4 text-xl sm:text-2xl">{product.name}</h3>

        <div className="flex flex-wrap gap-1">
          {product.categories.map((category) => (
            <span
              key={category}
              className="rounded bg-violet-200 px-1 text-sm uppercase text-violet-800"
            >
              {category}
            </span>
          ))}
        </div>

        <span>
          {product.price.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>

      {product.inStock ? null : (
        <div className="absolute top-0 right-0 left-0 flex justify-center bg-red-500 py-3 font-bold uppercase text-white">
          {isInEnglish ? "Sold Out" : "Esgotado"}
        </div>
      )}
    </Link>
  );
};
