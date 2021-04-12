import React from "react";
import "./home.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "app/modules/navbar/navbar";
import Create from "app/components/create/create";
import { SET_CREATE_ROOM_MODAL } from "app/store/system/systemActionTypes";
import { Error } from "app/models/system.model";
import { useToast } from "@chakra-ui/react";
import { ERROR_TOAST } from "../../static/toast";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

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

      <button onClick={handleError}>Toast</button>
    </div>
  );
};

export default Home;
