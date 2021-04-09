import React from "react";
import './home.scss';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "app/modules/navbar/navbar";
import Create from "app/components/create/create";
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const createModal = useSelector((state: any) => state.system.createOpen)

  const onCreateModalClose = (room: any | undefined) => {
    console.log(room)
    dispatch({type: SET_CREATE_ROOM_MODAL, payload: false})
  }

  return (
    <div className="text-white">
      <Navbar />
      <Create open={createModal} close={onCreateModalClose} />
      
    </div>
  );
}

export default Home;