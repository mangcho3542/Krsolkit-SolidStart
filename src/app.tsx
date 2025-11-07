import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import DefaultLayout from "@layout/DefaultLayout";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>ClassHelper</Title>

          <DefaultLayout>
            <Suspense>{props.children}</Suspense>
          </DefaultLayout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}