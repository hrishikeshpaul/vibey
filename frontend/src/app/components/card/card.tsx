/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from 'react';
import './card.scss'
import { Room } from 'app/models/room.model';

type CardProps = {
  room: Room;
}
    
const Card = (props: PropsWithChildren<CardProps>) => {
  const { room } = props;

  return (
    <div>
        Hello
    </div>
  )
}

export default Card;
