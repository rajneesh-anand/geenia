import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type ExtendedLinkProps<P = {}> = {
  children?: React.ReactNode;
  target?: string;
  rel?: string;
} & NextLinkProps;

const Link: React.FC<ExtendedLinkProps & { className?: string }> = ({
  href,
  children,
  target,
  rel,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props} target={target} rel={rel}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
