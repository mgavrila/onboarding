import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import { ConfigProvider, theme } from "antd";

import "../styles/globals.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session as Session | null}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#196873",
            colorTextSecondary: "#ECECEF",
            colorText: "#000000",
            colorError: "#B20000",
            colorWhite: "#ffffff",
          },
          components: {
            Spin: { colorPrimary: "#ffffff" },
          },
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
