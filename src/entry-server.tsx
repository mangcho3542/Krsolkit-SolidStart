// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <meta
            name="author"
            content="https://github.com/mangcho3542"
          />
          <meta
            name="twitter:creator"
            content="https://github.com/mangcho3542"
          />
          <meta
            name="naver-site-verification"
            content="3cff97800409b4e18a8e88da2b6adf021e976123"
          />
          <meta name="application-name" content="Krsolkit" />
          <meta name="referrer" content="origin-when-cross-origin" />
          <link rel="canonical" href="https://krsolkit.com/" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));