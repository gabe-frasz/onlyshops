import * as Primitive from "@radix-ui/react-avatar";

interface AvatarProps {
  url?: string;
  userInitials?: string;
}

export const Avatar = ({ url, userInitials }: AvatarProps) => {
  return (
    <Primitive.Root>
      <Primitive.Image src={url} className="h-8 w-8 rounded-full" />

      <Primitive.Fallback className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 font-semibold text-violet-500">
        {userInitials}
      </Primitive.Fallback>
    </Primitive.Root>
  );
};
