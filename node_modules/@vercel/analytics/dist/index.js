// src/queue.ts
var initQueue = () => {
  if (window.va)
    return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};

// src/utils.ts
function isBrowser() {
  return typeof window !== "undefined";
}
function isDevelopment() {
  if (typeof process === "undefined")
    return false;
  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
}
function getMode(mode = "auto") {
  if (mode === "auto") {
    return isDevelopment() ? "development" : "production";
  }
  return mode;
}

// src/generic.ts
var inject = (props = {
  debug: true
}) => {
  var _a;
  if (!isBrowser())
    return;
  const mode = getMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = mode === "development" ? "https://cdn.vercel-insights.com/v1/script.debug.js" : "/_vercel/insights/script.js";
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  if (mode === "development" && props.debug === false) {
    script.setAttribute("data-debug", "false");
  }
  document.head.appendChild(script);
};
export {
  inject
};
//# sourceMappingURL=index.js.map