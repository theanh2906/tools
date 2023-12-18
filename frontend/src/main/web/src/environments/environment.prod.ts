export const environment = {
  production: true,
  apiUrl: 'http://127.0.0.1/tools/api',
  wsEndpoint: 'ws://127.0.0.1/tools/socket',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
    ],
  },
};
