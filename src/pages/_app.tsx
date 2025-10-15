import type { AppProps } from "next/app";
import { useEffect } from "react";
import "@/styles/globals.css";


export default function App({ Component, pageProps }:AppProps) {
  useEffect(() => {
    const loadServiceWork = async() => {
      if("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        }).then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      }
    };
    loadServiceWork();
  },[])

  return (
    <>
      <Component {...pageProps}/>
    </>
  );
}
