import "@assets/css/main.css";
import "@assets/css/custom.css";
import "@assets/css/swiper-carousel.css";
import "@assets/css/scrollbar.css";

import "react-toastify/dist/ReactToastify.css";
import "overlayscrollbars/css/OverlayScrollbars.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { AuthProvider } from "@contexts/user.context";
import React, { useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from "react-query";
import * as gtag from "@utils/ga";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/seo/default-seo";
import { getDirection } from "@utils/get-direction";
import PrivateRoute from "@utils/private-route";

type ExtendedAppProps<P = {}> = {
  dehydratedState?: DehydratedState;
} & AppProps<P>;

type Props = {
  children?: React.ReactNode;
};

const Noop: React.FC<Props> = ({ children }) => <>{children}</>;

const CustomApp = ({
  Component,
  pageProps,
  dehydratedState,
}: ExtendedAppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, dir]);

  const Layout = (Component as any).Layout || Noop;
  const authenticationRequired =
    (Component as any).authenticationRequired ?? false;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <AuthProvider>
            <ManagedUIContext>
              <>
                <DefaultSeo />
                {authenticationRequired ? (
                  <PrivateRoute>
                    <Layout pageProps={pageProps}>
                      <Component {...pageProps} key={router.route} />
                    </Layout>
                  </PrivateRoute>
                ) : (
                  <Layout pageProps={pageProps}>
                    <Component {...pageProps} key={router.route} />
                  </Layout>
                )}
                <ToastContainer />
                <ManagedModal />
                <ManagedDrawer />
              </>
            </ManagedUIContext>
          </AuthProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
