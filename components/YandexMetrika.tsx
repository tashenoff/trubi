'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void;
  }
}

type YandexMetrikaWindow = Window & {
  [key: string]: any;
}

export default function YandexMetrika() {
  useEffect(() => {
    (function(m: YandexMetrikaWindow, e: Document, t: string, r: string, i: string, k: any, a: any) {
      (m[i] as any) = (m[i] as any) || function() {
        ((m[i] as any).a = (m[i] as any).a || []).push(arguments);
      };
      (m[i] as any).l = 1 * new Date().getTime();
      
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      if (a && a.parentNode) {
        a.parentNode.insertBefore(k, a);
      }
    })(window as YandexMetrikaWindow, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym", undefined, undefined);

    window.ym(101621389, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }, []);

  return (
    <noscript>
      <div>
        <img 
          src="https://mc.yandex.ru/watch/101621389" 
          style={{ position: 'absolute', left: '-9999px' }} 
          alt="" 
        />
      </div>
    </noscript>
  );
} 