export enum SocketEvents {
  Health = 'health',
  HealthSuccess = 'health-success',
  JoinRoom = 'join-room',
  JoinSuccess = 'join-room-success',
  Message = 'message',
  Error = 'socket-err',
  PauseTrack = 'pause-track',
  OnPlayTrack = 'on-play-track',
  EmitPlayTrack = 'emit-play-track',
}

export interface SocketMessageBody {
  event: string;
  data: any;
  headers: any;
}

export interface SocketMessageData {
  roomId: string;
  message: string;
}
