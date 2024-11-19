import { getPageTranslator } from "@/services/i18n/server";
import { Container } from "./components/Container/Container";

export default async function Home() {
  const t = await getPageTranslator();
  return <Container>{t("greeting")}</Container>;
}
