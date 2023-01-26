import * as Primitive from "@radix-ui/react-dropdown-menu";
import c from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CaretDown,
  Moon,
  Power,
  SignIn,
  Sun,
  UserCircle,
} from "phosphor-react";
import { useState } from "react";

import { Avatar } from "@/components/modules/Avatar/Avatar";
import { useAuth, useTheme } from "@/hooks";

export const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { locales, locale: activeLocale, pathname, query } = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <Primitive.Root open={open} onOpenChange={setOpen} modal={false}>
      <Primitive.Trigger className="flex items-center gap-1">
        {user ? (
          <Avatar
            url={user.avatarUrl}
            userInitials={`${user.name[0]}${user.name[1]}`}
          />
        ) : (
          <UserCircle size={32} />
        )}
        <CaretDown size={20} />
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Content
          sideOffset={24}
          className="w-screen max-w-[300px] rounded-md border-2 border-violet-500 bg-white p-1 font-semibold dark:bg-zinc-800 sm:w-52"
        >
          <Primitive.Item
            asChild
            className="rounded-sm px-1 py-2 transition-colors hover:bg-violet-500 hover:text-white hover:outline-none sm:py-0"
          >
            <button
              onClick={toggleTheme}
              className="flex w-full items-center justify-between gap-2"
            >
              Toggle theme
              {theme === "dark" ? (
                <Moon size={20} weight="bold" />
              ) : (
                <Sun size={20} weight="bold" />
              )}
            </button>
          </Primitive.Item>

          <Primitive.Separator className="my-1 border-b border-gray-500/50" />

          <Primitive.Group>
            {locales?.map((locale) => {
              const active = locale === activeLocale;

              return (
                <Primitive.Item
                  key={locale}
                  asChild
                  className="group rounded-sm px-1 py-2 transition-colors hover:bg-violet-500 hover:text-white hover:outline-none sm:py-0"
                >
                  <Link
                    href={
                      pathname.includes("[slug]")
                        ? {
                            pathname: pathname,
                            query: { slug: query.slug },
                          }
                        : pathname
                    }
                    locale={locale}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={c(
                        "h-[6px] w-[6px] rounded-full transition-colors",
                        {
                          "bg-violet-500 group-hover:bg-violet-50": active,
                        }
                      )}
                    />

                    {locale.toUpperCase()}
                  </Link>
                </Primitive.Item>
              );
            })}
          </Primitive.Group>

          <Primitive.Separator className="my-1 border-b border-gray-500/50" />

          <Primitive.Item
            asChild
            className="rounded-sm px-1 py-2 transition-colors hover:bg-violet-500 hover:text-white hover:outline-none sm:py-0"
          >
            {user ? (
              <button
                onClick={() => logout()}
                className="flex w-full items-center justify-between gap-2"
              >
                Logout
                <Power size={20} weight="bold" />
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-between gap-2"
              >
                Login <SignIn size={20} weight="bold" />
              </Link>
            )}
          </Primitive.Item>

          <Primitive.Arrow className="fill-violet-500" />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};
