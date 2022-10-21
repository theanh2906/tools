export const environment = {
  production: true,
  apiUrl: 'https://benna.info:8443/tools/api',
  wsEndpoint: 'ws://benna.info:8443/tools/socket',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302',
      },
    ],
  },
};
