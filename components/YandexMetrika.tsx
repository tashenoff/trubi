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

const METRIKA_ID = 101621389;

const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org');
    return await response.text();
  } catch (error) {
    console.error('Ошибка при получении IP:', error);
    return '';
  }
};

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

    window.ym(METRIKA_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });

    const sendUserIP = async () => {
      const storedIP = sessionStorage.getItem('deviceIP');
      
      if (storedIP) {
        console.log("SessionStorage IP:", storedIP);
        window.ym(METRIKA_ID, 'userParams', { IP: storedIP });
      } else {
        const ip = await getUserIP();
        if (ip) {
          console.log("IP:", ip);
          sessionStorage.setItem('deviceIP', ip);
          window.ym(METRIKA_ID, 'userParams', { IP: ip });
        }
      }
    };

    const timer = setTimeout(sendUserIP, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <noscript>
      <div>
        <img 
          src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
          style={{ position: 'absolute', left: '-9999px' }} 
          alt="" 
        />
      </div>
    </noscript>
  );
} 