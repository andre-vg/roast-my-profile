import { NextIntlClientProvider } from "next-intl";

type Props = {};

export default function Providers({
  children,
}: React.PropsWithChildren<Props>) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
