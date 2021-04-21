import React, { PropsWithChildren } from "react";
import Icon from "app/components/icon/icon";
import { IoMdArrowRoundBack as Back } from "react-icons/io";
import { IconButton } from "@chakra-ui/react";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Share } from "assets/icons/share-link.svg";
import { ReactComponent as Users } from "assets/icons/users.svg";
import { ReactComponent as Cross } from "assets/icons/cross.svg";

type RoomToolbarProps = {};

const RoomToolbar = (props: PropsWithChildren<RoomToolbarProps>) => {
  return (
    <div className="d-flex justify-content-between align-items-center text-white">
      <div className="d-flex align-items-center">
        <IconButton
          aria-label="Search database"
          className="bg-transparent icon-btn"
          size="md"
          icon={<Icon Component={Back} size={[1.5, 1.5]}></Icon>}
        />
        <IconButton
          aria-label="Search database"
          className="bg-transparent icon-btn ml-2"
          size="md"
          icon={<Icon Component={Edit} size={[1, 1]}></Icon>}
        />
        <IconButton
          aria-label="Search database"
          className="bg-transparent icon-btn ml-2"
          size="md"
          icon={<Icon Component={Share} size={[1, 1]}></Icon>}
        />
      </div>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Icon Component={Users} size={[1.5, 1.5]}></Icon>
          <span className="pl-2 font-weight-bolder">12</span>
        </div>
        <button className="btn btn-danger text-white font-weight-bold d-flex justify-content-center align-items-center ml-4">
          <Icon Component={Cross}></Icon>{" "}
          <span className="pl-2">Close Room</span>
        </button>
      </div>
    </div>
  );
};

export default RoomToolbar;
