(() => {
  "use strict";

  const CACHE_NAME = "alvarezjose-shell-v1";
  const elements = {
    status: document.getElementById("system-status"),
    statusLabel: document.getElementById("status-label"),
    networkCard: document.getElementById("network-card"),
    networkValue: document.getElementById("network-value"),
    networkDetail: document.getElementById("network-detail"),
    networkIndicator: document.getElementById("network-indicator"),
    cacheCard: document.getElementById("cache-card"),
    cacheValue: document.getElementById("cache-value"),
    cacheDetail: document.getElementById("cache-detail"),
    cacheIndicator: document.getElementById("cache-indicator"),
    lastCheck: document.getElementById("last-check"),
    checkButton: document.getElementById("check-button"),
    runtimeError: document.getElementById("runtime-error"),
    runtimeErrorMessage: document.getElementById("runtime-error-message"),
    runtimeErrorDismiss: document.getElementById("runtime-error-dismiss"),
  };

  const formatTime = (date) =>
    new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

  const setLastCheck = () => {
    const now = new Date();
    elements.lastCheck.textContent = formatTime(now);
    elements.lastCheck.dateTime = now.toISOString();
  };

  const setNetworkState = (isOnline) => {
    elements.status.dataset.state = isOnline ? "online" : "offline";
    elements.statusLabel.textContent = isOnline
      ? "Sistema en Mantenimiento"
      : "Fuera de Red";
    elements.networkCard.dataset.state = isOnline ? "online" : "offline";
    elements.networkValue.textContent = isOnline ? "Conectado" : "Sin conexión";
    elements.networkDetail.textContent = isOnline
      ? "La red está disponible."
      : "Se usará la versión local disponible.";
    elements.networkIndicator.setAttribute(
      "aria-label",
      isOnline ? "Conexión disponible" : "Conexión no disponible",
    );
  };

  const setCacheState = (state) => {
    const copy = {
      ready: ["Disponible", "La interfaz puede funcionar sin conexión."],
      pending: ["Verificando", "Comprobando disponibilidad offline."],
      unavailable: ["No disponible", "El navegador no permite caché local."],
    }[state] || ["No disponible", "No se pudo comprobar la caché local."];

    elements.cacheCard.dataset.state = state;
    elements.cacheValue.textContent = copy[0];
    elements.cacheDetail.textContent = copy[1];
    elements.cacheIndicator.setAttribute(
      "aria-label",
      `Caché local: ${copy[0].toLowerCase()}`,
    );
  };

  const inspectCache = async () => {
    if (!("caches" in window)) {
      setCacheState("unavailable");
      return false;
    }

    try {
      const hasShellCache = await caches.has(CACHE_NAME);
      setCacheState(hasShellCache ? "ready" : "pending");
      return hasShellCache;
    } catch (error) {
      setCacheState("unavailable");
      reportRuntimeError(error, "cache-inspection");
      return false;
    }
  };

  const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      setCacheState("unavailable");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: "./",
      });
      if (registration.active) await inspectCache();
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (worker) {
          worker.addEventListener("statechange", () => {
            if (worker.state === "activated") inspectCache();
          });
        }
      });
    } catch (error) {
      setCacheState("unavailable");
      reportRuntimeError(error, "service-worker-registration");
    }
  };

  const verifyConnection = async () => {
    elements.checkButton.setAttribute("aria-busy", "true");
    elements.checkButton.disabled = true;
    setNetworkState(navigator.onLine);
    await inspectCache();

    if (navigator.onLine) {
      try {
        await fetch(`./?health=${Date.now()}`, {
          method: "HEAD",
          cache: "no-store",
        });
      } catch (error) {
        // navigator.onLine is still the source of truth for local connectivity.
        console.debug("Health check fallback:", error);
      }
    }

    setLastCheck();
    window.setTimeout(() => {
      elements.checkButton.removeAttribute("aria-busy");
      elements.checkButton.disabled = false;
    }, 260);
  };

  const reportRuntimeError = (error, source = "runtime") => {
    const message =
      error instanceof Error
        ? error.message
        : String(error || "Fallo inesperado");
    const safeMessage =
      message.length > 140 ? `${message.slice(0, 137)}…` : message;
    elements.runtimeErrorMessage.textContent = `${source}: ${safeMessage}`;
    elements.runtimeError.hidden = false;
    console.error(`[${source}]`, error);
  };

  const handleWindowError = (message, source, line, column, error) => {
    reportRuntimeError(
      error || `${message} (${source}:${line}:${column})`,
      "window.onerror",
    );
    return false;
  };

  window.onerror = handleWindowError;
  window.addEventListener("unhandledrejection", (event) => {
    reportRuntimeError(event.reason, "unhandledrejection");
  });

  window.addEventListener("online", () => {
    setNetworkState(true);
    inspectCache();
    setLastCheck();
  });
  window.addEventListener("offline", () => {
    setNetworkState(false);
    setLastCheck();
  });
  navigator.serviceWorker?.addEventListener("controllerchange", () =>
    inspectCache(),
  );
  elements.checkButton.addEventListener("click", verifyConnection);
  elements.runtimeErrorDismiss.addEventListener("click", () => {
    elements.runtimeError.hidden = true;
  });

  setNetworkState(navigator.onLine);
  setCacheState("pending");
  setLastCheck();
  registerServiceWorker();
})();
