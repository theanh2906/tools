export const environment = {
  production: true,
  apiUrl: 'https://theanh2906.ddns.net/tools/api',
  wsEndpoint: 'ws://theanh2906.ddns.net/tools/socket',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
    ],
  },
};
