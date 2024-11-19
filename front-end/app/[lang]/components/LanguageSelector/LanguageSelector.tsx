"use client";
import { Locale } from "@/services/i18n";
import { useI18n } from "@/services/i18n/client";
import { getLocalizedRoute, getRouteName } from "@/services/i18n/routing";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LanguageIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

export const LanguageSelector: FC = () => {
  const { t, currentLanguage } = useI18n();
  const path = usePathname();
  const router = useRouter();

  const changeLanguage = (newLanguage: Locale) => {
    if (newLanguage !== currentLanguage) {
      let currentRoute = `/${(path?.split("/").slice(2) || []).join("/")}`;
      if (currentRoute.endsWith("/") && currentRoute !== "/") {
        currentRoute = currentRoute.slice(0, currentRoute.length - 1);
      }
      const routeName = getRouteName(currentRoute, currentLanguage);
      const newPathname = getLocalizedRoute(routeName ?? "root", newLanguage);
      if (newPathname) {
        router.push(newPathname);
      }
    }
  };
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">{t("language")}</span>
          <LanguageIcon aria-hidden="true" className="size-6" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <button
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left"
            onClick={() => changeLanguage("es")}
          >
            {t("languages.es")}
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full text-left"
            onClick={() => changeLanguage("en")}
          >
            {t("languages.en")}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
