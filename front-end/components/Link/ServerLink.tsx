import { getLocalizedRoute } from "@/services/i18n/routing";
import { getCurrentLanguage } from "@/services/i18n/server";
import { FC, ReactNode } from "react";
import NextLink from "next/link";

type ServerLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children?: ReactNode;
};
export const ServerLink: FC<ServerLinkProps> = ({
  to,
  children,
  ...anchorProps
}) => {
  const currentLanguage = getCurrentLanguage();

  if (!currentLanguage) {
    return null;
  }

  const localizedRoute = getLocalizedRoute(to, currentLanguage);

  return (
    <NextLink href={localizedRoute} {...anchorProps}>
      {children}
    </NextLink>
  );
};
