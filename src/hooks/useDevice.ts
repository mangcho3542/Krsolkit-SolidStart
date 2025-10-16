import { onMount } from "solid-js";
import { createStore } from "solid-js/store";

type DeviceType = "Mobile" | "Tablet" | "Desktop" | "Unknown";
type OSType = "Android" | "IOS" | "Windows" | "MacOS" | "Linux" | "Unknown";
type BroswerType =
  | "Chrome"
  | "Safari"
  | "Edge"
  | "Firefox"
  | "Opera"
  | "Unknown";

interface DeviceI {
  device: DeviceType;
  os: OSType;
  browser: BroswerType;
}

export default function useDevice() {
  const [Device, setDevice] = createStore<DeviceI>({
    device: "Unknown",
    os: "Unknown",
    browser: "Unknown",
  });

  const ua = navigator.userAgent;
  const mp = navigator.maxTouchPoints;
  const platform = navigator.platform;

  function checkDevice() {
    const w = window.screen.width;
    if (w <= 767) setDevice({ device: "Mobile" });
    else if (w >= 768 && w <= 1024) setDevice({ device: "Tablet" });
    else if (w >= 1025) setDevice({ device: "Desktop" });
  }

  function checkOS() {
    const isIPadOS = platform === "MacIntel" && mp > 1;
    if (/Android/.test(ua)) setDevice({ os: "Android" });
    else if (/iPhone|iPad|iPod/.test(ua) || isIPadOS) setDevice({ os: "IOS" });
    else if (/Win(dows )?NT/.test(ua)) setDevice({ os: "Windows" });
    else if (/Macintosh|Mac OS X/.test(ua)) setDevice({ os: "MacOS" });
    else if (/Linux/.test(ua) && !/Android/.test(ua))
      setDevice({ os: "Linux" });
  }

  function checkBrowser() {
    if (/OPR|Opera/i.test(ua)) {
      setDevice({ browser: "Opera" });
      return;
    }

    if (/EdgA?|EdgiOS/i.test(ua)) {
      setDevice({ browser: "Edge" });
      return;
    }

    if (/Chrome/i.test(ua) && !/Edg|OPR|Opera/i.test(ua)) {
      setDevice({ browser: "Chrome" });
      return;
    }

    if (/Safari/i.test(ua) && !/Chrome|Chromium|OPR|Edg/i.test(ua)) {
      setDevice({ browser: "Safari" });
    }

    if (/Firefox/i.test(ua)) {
      setDevice({ browser: "Firefox" });
      return;
    }
  }

  onMount(() => {
    checkDevice();
    checkOS();
    checkBrowser();
  });

  return Device;
}