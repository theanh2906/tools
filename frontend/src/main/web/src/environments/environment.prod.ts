export const environment = {
  production: true,
  apiUrl: 'http://theanh2906.ddns.net:8000/tools/api',
  wsEndpoint: 'ws://theanh2906.ddns.net/tools/socket',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
    ],
  },
};
