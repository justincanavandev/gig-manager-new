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
      className={`${className ?? ""} w-24 border border-black text-center`}
      {...(isLinkProps(restProps) && restProps)}
      href={props.href}
    >
      {children}
    </Link>
  ) : (
    <button
      {...(isButtonProps(restProps) && restProps)}
      className="w-24 border border-black"
      type={props.type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
