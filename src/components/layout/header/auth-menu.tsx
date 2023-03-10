import Link from "@components/ui/link";
import React from "react";

interface Props {
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  children: React.ReactNode;
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  btnProps,
  children,
}) => {
  return isAuthorized ? (
    <Link
      href={href}
      className="text-sm font-nunito uppercase lg:text-[12.5px] text-slate-900 text-opacity-90 font-semibold focus:outline-none ml-2 px-3 py-1.5 border rounded-sm border-emerald-700"
    >
      {children}
    </Link>
  ) : (
    <button
      className="text-sm font-nunito uppercase lg:text-[12.5px] text-slate-900 text-opacity-90 font-semibold focus:outline-none ml-2 px-3 py-1.5 border rounded-sm border-emerald-700"
      aria-label="Authentication"
      {...btnProps}
    />
  );
};

export default AuthMenu;
