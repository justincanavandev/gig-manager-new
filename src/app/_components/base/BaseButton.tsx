import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  as: "button";
}

interface LinkProps extends ComponentPropsWithRef<"a"> {
  as: "link";
  href: string;
}

type BaseButtonProps = LinkProps | ButtonProps;

const BaseButton = ({ ...props }: BaseButtonProps) => {
  const { children, as } = props;

  return as === "link" ? (
    <Link href={props.href}>{children}</Link>
  ) : (
    <button type={props.type}>{children}</button>
  );
};

export default BaseButton;
