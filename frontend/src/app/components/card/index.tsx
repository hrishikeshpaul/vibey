/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from 'react';
import './Card.scss';
import { Room } from 'app/models/room.model';
import Icon from 'app/components/Icon';
import { ReactComponent as Users } from 'assets/icons/users.svg';
import { ReactComponent as Thumb } from 'assets/icons/thumb.svg';
import { Badge, Avatar } from '@chakra-ui/react';

type CardProps = {
 room: Room;
};

const Card = (props: PropsWithChildren<CardProps>) => {
 const { room } = props;

 return (
  <div className="card text-white bg-secondary v-card w-100 shadow-none p-4">
   <div className="card-header d-flex justify-content-between align-items-start border-0 p-0">
    <div className="names">
     <div className="h5 m-0 font-weight-bold">{room.name}</div>
     <div className="text-info d-flex align-items-center pt-1">
      <span className="dark-link">{room.host}</span>
      <Badge className="bg-primary d-flex align-items-center ml-2 rounded-lg px-2">
       <Icon Component={Thumb} size={[0.7, 0.7]}></Icon>{' '}
       <span className="text-white pl-1">104</span>{' '}
      </Badge>
     </div>
    </div>
    <div className="people-count d-flex align-items-center">
     <Icon Component={Users} size={[1.2, 1.2]}></Icon>
     <span className="font-weight-bold ml-2">12</span>
    </div>
   </div>
   <div className="card-body p-0 mt-3 v-card-body">
    {room.tags.map((tag, i) => (
     <Badge className="bg-light text-white mr-2 rounded-lg px-2" key={i}>
      {tag.label}
     </Badge>
    ))}
   </div>
   <div className="card-footer p-0 w-100 pt-3">
    <div className="d-flex justify-content-between align-items-center w-100">
     <div className="song d-flex">
      <Avatar
       src="https://picsum.photos/seed/picsum/200/300"
       alt="song-album-art"
       size="md"
      ></Avatar>
      <div className="song-details ml-3 ">
       <p className="font-weight-bold mb-0 song-name">
        This is the name of the song, and it can be long
       </p>
       <p className="mb-0 song-artist">Artist Name</p>
      </div>
     </div>
    </div>
   </div>
   <div className="join-room p-2 bg-secondary">
    <button className="btn btn-primary btn-sm font-weight-bold px-3">
     Join Room
    </button>
   </div>
  </div>
 );
};

export default Card;
