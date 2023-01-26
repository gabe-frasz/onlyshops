import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

import { Container, PageTransition, Separator } from "@/components";
import { useAuth, useCart, useLocale } from "@/hooks";
import { api } from "@/libs";
import emptyCartImg from "public/images/empty-cart.png";

const CartPage: NextPage = () => {
  const { user } = useAuth();
  const { cart, addOne, removeOne, removeFromCart, totalPrice } = useCart();
  const { isInEnglish } = useLocale();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  async function handleCheckout() {
    const { "onlyshops.token": token } = parseCookies();

    if (!token)
      return toast.error(
        isInEnglish ? "User not logged in" : "Usuário não está logado"
      );

    const { data } = await api.post<{ url: string }>(
      "/checkouts",
      {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          priceInCents: item.priceInCents,
          images: item.images,
          quantity: item.quantity,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Router.push(data.url);
  }

  return (
    <PageTransition>
      <Container asChild>
        <main
          ref={animationParent}
          className="flex min-h-[calc(100vh-85px)] flex-col justify-center"
        >
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="mb-2 flex items-center justify-between rounded-md border-2 border-violet-200 p-4 font-semibold shadow-md dark:border-violet-200/50"
              >
                <div className="mr-auto flex flex-col gap-2 sm:mr-0 md:flex-row md:items-center">
                  <Image
                    src={item?.images[0] ?? "https://github.com/girl.png"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="h-16 w-16 rounded"
                  />

                  <div>
                    <h3>{item.name}</h3>

                    <span>
                      {(item.priceInCents / 100).toLocaleString(
                        isInEnglish ? "en" : "pt-BR",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className="hidden items-center justify-center sm:flex">
                  <button
                    onClick={() => removeOne(item.id)}
                    className="w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 disabled:opacity-50 hover:disabled:bg-violet-500 dark:hover:bg-violet-500/50 hover:disabled:dark:bg-violet-500"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => addOne(item.id)}
                    className="w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 dark:hover:bg-violet-500/50"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex items-center justify-center sm:hidden">
                    <button
                      onClick={() => removeOne(item.id)}
                      className="w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 disabled:opacity-50 hover:disabled:bg-violet-500 dark:hover:bg-violet-500/50 hover:disabled:dark:bg-violet-500"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => addOne(item.id)}
                      className="w-8 rounded bg-violet-500 py-1 text-violet-50 transition-colors hover:bg-violet-600 dark:hover:bg-violet-500/50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full border-2 px-1 capitalize opacity-50 transition duration-200 hover:border-red-500 hover:text-red-500 hover:opacity-100 dark:opacity-30"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 font-semibold">
              <Image
                src={emptyCartImg}
                alt="Empty cart illustration"
                className="max-w-[400px] dark:hidden"
              />

              <h2 className="text-center text-xl">
                {isInEnglish
                  ? "Looks like your cart is empty U_U"
                  : "Parece que seu carrinho está vazio U_U"}
              </h2>

              <Link
                href="/"
                className="rounded bg-violet-500 px-2 py-1 uppercase text-violet-50 transition-colors hover:bg-violet-600"
              >
                {isInEnglish ? "Go buy something" : "Vá comprar"}
              </Link>
            </div>
          )}

          {cart.length > 0 ? (
            <>
              <Separator />

              <div className="flex justify-between font-semibold">
                <h2>Total</h2>

                <span>
                  {totalPrice.toLocaleString(isInEnglish ? "en" : "pt-BR", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>

              <div className="mt-3 flex justify-between font-semibold">
                {user ? null : (
                  <p>
                    {isInEnglish
                      ? "You must be logged in to go to checkout**"
                      : "Você deve estar logado para continuar**"}
                  </p>
                )}

                <button
                  disabled={!user}
                  onClick={handleCheckout}
                  className="ml-auto rounded bg-green-500 px-2 py-1 uppercase text-green-50 transition-colors hover:bg-green-600 disabled:opacity-50 disabled:hover:bg-green-500"
                >
                  {isInEnglish ? "Buy" : "Comprar"}
                </button>
              </div>
            </>
          ) : null}
        </main>
      </Container>
    </PageTransition>
  );
};

export default CartPage;
