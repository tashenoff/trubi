'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void;
  }
}

export default function YandexMetrika() {
  useEffect(() => {
    // @ts-ignore
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date().getTime();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

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