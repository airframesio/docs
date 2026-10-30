// Reference client for the Airframes v1 planned reconnect protocol.

export function isReconnectNotice(value) {
  if (!value || typeof value !== "object") return false;
  const notice = value;
  return (
    notice.version === 1 &&
    notice.reason === "deployment" &&
    typeof notice.deploymentId === "string" &&
    notice.deploymentId.length > 0 &&
    notice.deploymentId.length <= 100 &&
    Number.isInteger(notice.retryAfterMs) &&
    notice.retryAfterMs >= 0 &&
    notice.retryAfterMs <= 10000 &&
    Number.isInteger(notice.jitterMs) &&
    notice.jitterMs >= 0 &&
    notice.jitterMs <= 10000 &&
    notice.retryAfterMs + notice.jitterMs <= 20000
  );
}

/** Adds planned handoffs without replacing Socket.IO's normal retry backoff. */
export function createPlannedReconnect(socket, random = Math.random) {
  let desired = false;
  let accessDenied = false;
  let timer;
  let lastId;
  let lastNoticeAt = -Infinity;

  function cancel() {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }

  function stop() {
    desired = false;
    cancel();
    socket.disconnect();
  }

  function onNotice(value) {
    if (
      !desired ||
      accessDenied ||
      !socket.connected ||
      timer !== undefined ||
      !isReconnectNotice(value)
    )
      return;
    if (value.deploymentId === lastId || Date.now() - lastNoticeAt < 30000)
      return;
    lastId = value.deploymentId;
    lastNoticeAt = Date.now();
    const delay =
      value.retryAfterMs + Math.floor(random() * (value.jitterMs + 1));
    timer = setTimeout(() => {
      timer = undefined;
      if (!desired || accessDenied || !socket.connected) return;
      // Connect uses the configured endpoint and the current auth callback.
      // Never accept a redirect URL or credentials from a server event.
      socket.disconnect();
      socket.connect();
    }, delay);
  }

  function onDisconnect(reason) {
    cancel();
    if (reason === "io server disconnect") accessDenied = true;
  }

  function onAuthError() {
    accessDenied = true;
    cancel();
    socket.disconnect();
  }

  function onChatError(error) {
    if (error?.message === "Invalid authentication token") onAuthError();
  }

  function onConnectError() {
    cancel();
    // Middleware denials are final; transport errors retain normal retries.
    if (!socket.active) accessDenied = true;
  }

  socket.on("server:reconnect", onNotice);
  socket.on("disconnect", onDisconnect);
  socket.on("auth:error", onAuthError);
  socket.on("chat:error", onChatError);
  socket.on("connect_error", onConnectError);

  return {
    start() {
      desired = true;
      if (!accessDenied && !socket.connected && !socket.active)
        socket.connect();
    },
    stop,
    credentialsChanged(hasToken) {
      cancel();
      accessDenied = false;
      socket.disconnect();
      if (!hasToken) desired = false;
      else if (desired) socket.connect();
    },
    dispose() {
      stop();
      socket.off("server:reconnect", onNotice);
      socket.off("disconnect", onDisconnect);
      socket.off("auth:error", onAuthError);
      socket.off("chat:error", onChatError);
      socket.off("connect_error", onConnectError);
    },
  };
}
