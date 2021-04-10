/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren, useState, useEffect } from "react";
import "./create.scss";
import Select from '../select/select';
import { Tag } from "app/models/tag.model";

type CreateProps = {
  open: boolean;
  close: any;
};

const initialRoomValues = {
  name: "",
  description: "",
  tags: [],
  error: false,
}

const Create = (props: PropsWithChildren<CreateProps>) => {
  const { open, close } = props;
  const [room, setRoom] = useState(initialRoomValues);

  useEffect(() => {
    setRoom(initialRoomValues);
  }, []);

  useEffect(() => {
    console.log('h')
  }, [room.name])

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      close(room);
    }
  };

  const validateForm = () => {
    if (!room.name) {
      setRoom((prev) => ({
        ...prev,
        error: true,
      }));
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tagOptions: Tag[] = [
    {name: "edm", value: "edm", score: 0},
    {name: "rock", value: "rock", score: 0}
  ];

  return (
    <></>
    // <Modal
    //   show={open}
    //   size="lg"
    //   centered
    //   onHide={close}
    //   animation={true}
    //   backdrop="static"
    //   dialogClassName="text-white"
    // >
    //   <Modal.Header
    //     className="text-white bg-secondary border-0 p-4"
    //     closeButton
    //   >
    //     <span className="h4 m-0">Create a room</span>
    //   </Modal.Header>
    //   <Modal.Body className="bg-secondary text-white p-4">
    //     <form id="create-form" onSubmit={(e) => onSubmit(e)}>
    //       <div>
    //         <label>Room Name</label>
    //         <input
    //           className="form-control bg-light border-0 text-white rounded-lg"
    //           placeholder="Enter a catchy room name!"
    //           onChange={handleChange}
    //           type="text"
    //           name="name"
    //         />
    //         <small className={`err text-warning ${room.error ? "" : "hidden"}`}>
    //           Please enter a room name!
    //         </small>
    //       </div>

    //       <div className="mt-1">
    //         <label>Room Description</label>
    //         <textarea
    //           rows={3}
    //           className="form-control bg-light border-0 text-white rounded-lg"
    //           placeholder="What type of music will you be playing in the room?"
    //           onChange={handleChange}
    //           name="description"
    //         />
    //       </div>
    //       <div className="mt-4">
    //         <label>Tags</label>
    //         <Select inputValue="" tags={tagOptions}></Select>
    //       </div>
    //     </form>
    //   </Modal.Body>
    //   <Modal.Footer className="border-0 mb-3 mt-2">
    //     <div className="text-right">
    //       <button
    //         className="btn btn-primary font-weight-bold"
    //         type="submit"
    //         form="create-form"
    //       >
    //         Create Room
    //       </button>
    //     </div>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default Create;
