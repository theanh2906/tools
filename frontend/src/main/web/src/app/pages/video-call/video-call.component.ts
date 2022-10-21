import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message, SocketService } from '../../services/socket.service';
import { environment } from '../../../environments/environment';

const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
  // video: {width: 1280, height: 720} // 16:9
  // video: {width: 960, height: 540}  // 16:9
  // video: {width: 640, height: 480}  //  4:3
  // video: {width: 160, height: 120}  //  4:3
};

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent implements AfterViewInit {
  @ViewChild('local_video') localVideo!: ElementRef;
  @ViewChild('received_video') remoteVideo!: ElementRef;
  inCall = false;
  localVideoActive = false;
  private peerConnection!: RTCPeerConnection;
  private localStream!: MediaStream;

  constructor(private socketService: SocketService) {}

  ngAfterViewInit(): void {
    this.addIncomingMessageHandler();
    this.requestMediaDevices();
  }

  async call() {
    this.createPeerConnection();
    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    try {
      const offer: RTCSessionDescriptionInit =
        await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);
      this.inCall = true;
      this.socketService.sendMessage({ type: 'offer', data: offer });
    } catch (error: any) {
      this.handleGetUserMediaError(error);
    }
  }

  hangUp(): void {
    this.socketService.sendMessage({ type: 'hangup', data: '' });
    this.closeVideoCall();
  }

  startLocalVideo() {
    console.log('starting local stream');
    this.localStream.getTracks().forEach((track) => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.localVideoActive = true;
  }

  pauseLocalVideo() {
    console.log('pause local stream');
    this.localStream.getTracks().forEach((track) => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
    this.localVideoActive = false;
  }

  private addIncomingMessageHandler() {
    this.socketService.connect();

    this.socketService.message.subscribe({
      next: (message) => {
        switch (message.type) {
          case 'offer':
            this.handleOfferMessage(message.data);
            break;
          case 'answer':
            this.handleAnswerMessage(message.data);
            break;
          case 'hangup':
            this.handleHangupMessage(message);
            break;
          case 'ice-candidate':
            this.handleICECandidateMessage(message.data);
            break;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private async requestMediaDevices() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
      this.pauseLocalVideo();
    } catch (e) {
      console.log(e);
    }
  }

  private handleOfferMessage(message: RTCSessionDescriptionInit) {
    console.log('handle incoming offer');
    if (!this.peerConnection) {
      this.createPeerConnection();
    }

    if (!this.localStream) {
      this.startLocalVideo();
    }

    this.peerConnection
      .setRemoteDescription(new RTCSessionDescription(message))
      .then(() => {
        this.localVideo.nativeElement.srcObject = this.localStream;
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      })
      .then(() => {
        return this.peerConnection.createAnswer();
      })
      .then((answer) => {
        return this.peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        this.socketService.sendMessage({
          type: 'answer',
          data: this.peerConnection.localDescription,
        });
        this.inCall = true;
      })
      .catch(this.handleGetUserMediaError);
  }

  private handleAnswerMessage(message: RTCSessionDescriptionInit) {
    console.log('handle incoming answer');
    this.peerConnection.setRemoteDescription(message);
  }

  private handleHangupMessage(message: Message) {
    console.log(message);
    this.closeVideoCall();
  }

  private handleICECandidateMessage(event: RTCPeerConnectionIceEvent) {
    console.log(event);
    if (event.candidate) {
      this.socketService.sendMessage({
        type: 'ice-candidate',
        data: event.candidate,
      });
    }
  }

  private createPeerConnection() {
    console.log('creating PeerConnection ...');
    this.peerConnection = new RTCPeerConnection(
      environment.RTCPeerConfiguration
    );
    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    this.peerConnection.oniceconnectionstatechange =
      this.handleICEConnectionStateChangeEvent;
    this.peerConnection.onsignalingstatechange =
      this.handleSignalingStateChangeEvent;
    this.peerConnection.ontrack = this.handleTrackEvent;
  }

  private handleGetUserMediaError(e: Error) {
    switch (e.name) {
      case 'NotFoundError':
        alert(
          'Unable to open your call because no camera and/or microphone were found.'
        );
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        console.log(e);
        alert('Error opening your camera and/or microphone: ' + e.message);
        break;
    }

    this.closeVideoCall();
  }

  private closeVideoCall() {
    console.log('Closing call');

    if (this.peerConnection) {
      console.log('--> Closing the peer connection');

      this.peerConnection.ontrack = null;
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;

      // Stop all transceivers on the connection
      this.peerConnection.getTransceivers().forEach((transceiver) => {
        transceiver.stop();
      });

      // Close the peer connection
      this.peerConnection.close();
      // @ts-ignore
      this.peerConnection = null;

      this.inCall = false;
    }
  }

  private handleICECandidateEvent(event: RTCPeerConnectionIceEvent) {
    console.log(event);
    if (event.candidate) {
      console.log(event);
      if (event.candidate) {
        this.socketService.sendMessage({
          type: 'ice-candidate',
          data: event.candidate,
        });
      }
    }
  }

  private handleICEConnectionStateChangeEvent(event: Event) {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall();
        break;
    }
  }

  private handleSignalingStateChangeEvent(event: Event) {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.closeVideoCall();
        break;
    }
  }

  private handleTrackEvent(event: RTCTrackEvent) {
    console.log(event);
    this.remoteVideo.nativeElement.srcObject = event.streams[0];
  }
}
