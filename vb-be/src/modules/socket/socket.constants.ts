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
  UpdateTrackInRoom = 'update-track-in-room',
  Refresh = 'socket-refresh',
  RefreshSuccess = 'socket-refresh-success',
  SubscribersPlay = 'subscribers-play',
  Unauthorized = 'unauthorized',
}

export interface SocketMessageBody {
  event: string;
  data: any;
  headers: any;
  decoded: any;
}

export interface SocketMessageData {
  roomId: string;
  message: string;
}
