import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

import { Navbar } from "app/modules/Navbar/Navbar";
import { Create } from "app/components/CreateRoom/CreateRoom";
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";

import { ERROR_TOAST } from "app/static/toast";
import { Card } from "app/components/Card/Card";
import { Tag } from "app/models/tag.model";
import { Room } from "app/models/room.model";

import "app/modules/Home/Home.scss";

export const Home = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  // dummy room object
  // TODO remove this later
  const [room] = useState<Room>({
    id: "1",
    name: "Paul's Rock Room",
    tags: [
      { label: "rock", value: "rock", score: 12 },
      { label: "edm", value: "emd", score: 22 },
    ] as Tag[],
    description: "This is a room to listen to rock music",
    host: "hr_paul",
  });

  const createModal = useSelector((state: any) => state.system.createOpen);

  const onCreateModalClose = (modalRoom: any | undefined) => {
    console.log(modalRoom);
    dispatch({ type: SET_CREATE_ROOM_MODAL, payload: false });
  };

  /**
   * Just a simple function right now. Will refactor   this
   */
  const handleError = (error: any) => {
    console.log(error);
    if (!toast.isActive(ERROR_TOAST.id || "")) {
      toast({
        ...ERROR_TOAST,
        description: "Something that you were trying do didn't work out",
      });
    }
  };

  return (
    <div className="text-white">
      <Navbar />
      {createModal ? <Create open={createModal} close={onCreateModalClose} handleError={handleError} /> : ""}
      <div className="container pt-5">
        <div className="row">
          <div className="col-xl-4 col-lg-4 co-md-4 col-sm-12 col-12 my-4">
            <Card room={room} />
          </div>
          <div className="col-xl-4 col-lg-4 co-md-4 col-sm-12 col-12 my-4">
            <Card room={room} />
          </div>
        </div>
      </div>

      <button onClick={handleError} type="button">
        Toast
      </button>
    </div>
  );
};
