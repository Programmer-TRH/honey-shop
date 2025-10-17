"use client";
import { refreshTokenAction } from "@/actions/refresh-token-action";
import { useEffect } from "react";

const SAFETY_MARGIN = 60;

export function useTokenHeartbeat() {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleHeartbeat = async () => {
      try {
        const refreshed = await refreshTokenAction();

        if (!refreshed.success) {
          timer = setTimeout(scheduleHeartbeat, 60 * 1000);
          return;
        }

        const now = Math.floor(Date.now() / 1000);
        let delay = refreshed.exp! - now - SAFETY_MARGIN;
        if (delay <= 0) delay = 60;
        timer = setTimeout(scheduleHeartbeat, delay * 1000);
      } catch (err) {
        console.warn("Token heartbeat failed:", err);
        // Retry in 1 min on error
        timer = setTimeout(scheduleHeartbeat, 60 * 1000);
      }
    };

    scheduleHeartbeat();

    return () => clearTimeout(timer);
  }, []);
}
