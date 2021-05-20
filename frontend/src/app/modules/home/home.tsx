import React, {useState} from "react";
import "./home.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "app/modules/navbar/navbar";
import Create from "app/components/create/CreateRoom";
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";
import { useToast } from "@chakra-ui/react";
import { ERROR_TOAST } from "../../static/toast";
import Card from 'app/components/card/Card';
import { Tag } from "app/models/tag.model";
import { Room } from "app/models/room.model";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  // dummy room object
  // TODO remove this later 
  const [room, setRoom] = useState<Room>({
    id: '1',
    name: "Paul's Rock Room",
    tags: [{label: "rock", value: "rock", score: 12 }, {label: "edm", value: "emd", score: 22 }] as Tag[],
    description: 'This is a room to listen to rock music',
    host: 'hr_paul'
  })

  const createModal = useSelector((state: any) => state.system.createOpen);

  const onCreateModalClose = (room: any | undefined) => {
    dispatch({ type: SET_CREATE_ROOM_MODAL, payload: false });
  };

  /**
   * Just a sinmple function right now. Will recator this 
   */
  const handleError = (error: any) => {
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
      {createModal ? (
        <Create
          open={createModal}
          close={onCreateModalClose}
          handleError={handleError}
        />
      ) : (
        ""
      )}
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

      <button onClick={handleError}>Toast</button>
    </div>
  );
};

export default Home;
