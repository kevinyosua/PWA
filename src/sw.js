import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

console.log(JSON.stringify(self.__WB_MANIFEST))
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /https:\/\/api.football-data.org\/v2\/.+/,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 300
      }),
    ],
  }),
);

