import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link, { type LinkProps as NextLinkProps } from "next/link";

type ButtonCompProps = ComponentPropsWithoutRef<"button">;

interface ButtonProps extends ButtonCompProps {
  as: "button";
}

interface LinkProps extends NextLinkProps {
  as: "link";
  children: ReactNode;
  className?: string;
}

type BaseButtonProps = LinkProps | ButtonProps;

const BaseButton = ({ ...props }: BaseButtonProps) => {
  type RestProps = ButtonCompProps | NextLinkProps;

  const { children, as, className, ...rest } = props;
  const restProps = { ...rest };

  const isButtonProps = (rest: RestProps): rest is ButtonCompProps =>
    !rest.hasOwnProperty("href") && as === "button";

  const isLinkProps = (rest: RestProps): rest is NextLinkProps =>
    (rest as NextLinkProps).href !== undefined && as === "link";

  return as === "link" ? (
    <Link
      className={`${className ?? "w-32 text-center rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"}`}
      {...(isLinkProps(restProps) && restProps)}
      href={props.href}
    >
      {children}
    </Link>
  ) : (
    <button
      {...(isButtonProps(restProps) && restProps)}
      className={className ?? "w-32 text-center rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"}
      type={props.type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
