/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import "./RoomEvents.scss";
import { ReactComponent as EventTab } from "assets/icons/event-tab.svg";
import Icon from "app/components/icon/icon";

type RoomEventsProps = {};

const RoomEvents = (props: PropsWithChildren<RoomEventsProps>) => {
  return (
    <div className="bg-secondary w-100 radius">
      <div className="card shadow-none bg-transparent border-0 radius px-2 py-2">
        <div className="card-header d-flex justify-content-between align-items-center py-3 border-0">
          <div className="d-flex align-items-center">
            <Icon Component={EventTab}></Icon>
            <span className="pl-2 h5 m-0 font-weight-bold">Events</span>
          </div>
        </div>
        <div className="mb-3 px-3"></div>
      </div>
    </div>
  );
};

export default RoomEvents;
