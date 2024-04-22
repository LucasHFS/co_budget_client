import type { AppProps } from "next/app";
import "@/modules/styles/global.scss";
import { Layout } from "@/modules/ui/Layout/Layout";
import { AuthProvider } from "@/modules/auth";
import { TransactionProvider, BudgetProvider } from "@/modules/transactions";
import { ConfirmProvider } from "material-ui-confirm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <BudgetProvider>
            <TransactionProvider>
              <ConfirmProvider>
                <Layout title={pageProps.title} isApp={pageProps.isApp} >
                  <Component {...pageProps} />
                  <ToastContainer />
                </Layout>
              </ConfirmProvider>
            </TransactionProvider>
          </BudgetProvider>
      </AuthProvider>
    </QueryClientProvider>

  );
}
