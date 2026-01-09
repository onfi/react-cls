import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logoDark = "/react-cls/build/client/assets/logo-dark-pX2395Y0.svg";
const logoLight = "/react-cls/build/client/assets/logo-light-CVbx2LBR.svg";
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsxs("div", { className: "w-[500px] max-w-[100vw] p-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logoLight,
          alt: "React Router",
          className: "block w-full dark:hidden"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logoDark,
          alt: "React Router",
          className: "hidden w-full dark:block"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[300px] w-full space-y-6 px-4", children: /* @__PURE__ */ jsxs("nav", { className: "rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-700 dark:text-gray-200 text-center", children: "What's next?" }),
      /* @__PURE__ */ jsx("ul", { children: resources.map(({ href, text, icon }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          className: "group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500",
          href,
          target: "_blank",
          rel: "noreferrer",
          children: [
            icon,
            text
          ]
        }
      ) }, href)) })
    ] }) })
  ] }) });
}
const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      }
    )
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 24 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z",
            strokeWidth: "1.5"
          }
        )
      }
    )
  }
];
function meta$9({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [];
}
const _1 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "1秒後にレイアウトシフト"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _1,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [];
}
const _2 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "0.001秒後にレイアウトシフト"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _2,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [];
}
const _3 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1e4);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "10秒後にレイアウトシフト"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _3,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [];
}
const _4 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "下側にホバーするとレイアウトシフト"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      onMouseEnter: () => setRender(true),
      children: "下"
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _4,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [];
}
const _5 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "下側のエリアをクリックするとレイアウトシフト"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      onClick: () => setRender(true),
      children: "下"
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _5,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [];
}
const _6 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    fetch("./1").then(() => setRender(true));
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "APIリクエストをuseEffectで実行"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _6,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [];
}
const _7 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "APIリクエストをuseEffectで実行"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow",
        marginTop: render ? "0" : "30vh"
      },
      children: "下"
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _7,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [];
}
const _8 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "lightgray"
      },
      children: "上から順番に表示する"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _8,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [];
}
const _9 = UNSAFE_withComponentProps(function() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, 1e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        height: "100vh",
        backgroundColor: "lightgray"
      },
      children: "ファーストビューにレイアウトシフトさせない"
    }), render && /* @__PURE__ */ jsx("div", {
      style: {
        height: "30vh",
        backgroundColor: "black",
        color: "white"
      },
      children: "中"
    }), /* @__PURE__ */ jsx("div", {
      style: {
        height: "50vh",
        backgroundColor: "yellow"
      },
      children: "下"
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _9,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/react-cls/build/client/assets/entry.client-BmDBpHZU.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/react-cls/build/client/assets/root-B7nlBiQH.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": ["/react-cls/build/client/assets/root-RLQRPQW-.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/home-BojHJm8_.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/1": { "id": "routes/1", "parentId": "root", "path": "1", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/1-D1LTn5Ks.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/2": { "id": "routes/2", "parentId": "root", "path": "2", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/2-BEWG1wWU.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/3": { "id": "routes/3", "parentId": "root", "path": "3", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/3-eoy3mxz5.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/4": { "id": "routes/4", "parentId": "root", "path": "4", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/4-BLmQXF_s.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/5": { "id": "routes/5", "parentId": "root", "path": "5", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/5-Mkerf_nG.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/6": { "id": "routes/6", "parentId": "root", "path": "6", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/6-B1tpbmc5.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/7": { "id": "routes/7", "parentId": "root", "path": "7", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/7-5a4qQTun.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/8": { "id": "routes/8", "parentId": "root", "path": "8", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/8-DYQybu8R.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/9": { "id": "routes/9", "parentId": "root", "path": "9", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-cls/build/client/assets/9-Dw1jgcjk.js", "imports": ["/react-cls/build/client/assets/chunk-EPOLDU6W-Wp3N_t67.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/react-cls/build/client/assets/manifest-53339ebd.js", "version": "53339ebd", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/", "/1", "/2", "/3", "/4", "/5", "/6", "/7", "/8", "/9"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/react-cls/build/client/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/1": {
    id: "routes/1",
    parentId: "root",
    path: "1",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/2": {
    id: "routes/2",
    parentId: "root",
    path: "2",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/3": {
    id: "routes/3",
    parentId: "root",
    path: "3",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/4": {
    id: "routes/4",
    parentId: "root",
    path: "4",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/5": {
    id: "routes/5",
    parentId: "root",
    path: "5",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/6": {
    id: "routes/6",
    parentId: "root",
    path: "6",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/7": {
    id: "routes/7",
    parentId: "root",
    path: "7",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/8": {
    id: "routes/8",
    parentId: "root",
    path: "8",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/9": {
    id: "routes/9",
    parentId: "root",
    path: "9",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
