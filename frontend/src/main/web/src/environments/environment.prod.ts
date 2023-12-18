export const environment = {
  production: true,
  apiUrl: 'http://localhost:8000/tools/api',
  wsEndpoint: 'ws://localhost:8000/tools/socket',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
    ],
  },
};
