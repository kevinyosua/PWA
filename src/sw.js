import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  /https:\/\/api.football-data.org\/v2\/.+/,
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 300
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/crests.football-data.org\/.+/,
  new StaleWhileRevalidate({
    cacheName: 'api-image',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 3600
      }),
    ],
  }),
);

