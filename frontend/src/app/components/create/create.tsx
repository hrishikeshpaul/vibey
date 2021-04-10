/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren, useState, useEffect } from "react";
import "./create.scss";
import Select from "../select/select";
import { Tag } from "app/models/tag.model";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { TiWarning } from "react-icons/ti";

type CreateProps = {
  open: boolean;
  close: any;
};

const initialRoomValues = {
  name: "",
  description: "",
  tags: [],
  error: false,
};

const Create = (props: PropsWithChildren<CreateProps>) => {
  const { open, close } = props;
  const [room, setRoom] = useState(initialRoomValues);

  useEffect(() => {
    setRoom(initialRoomValues);
  }, []);

  useEffect(() => {
  }, [room.name]);

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

  const handleUpdateTags = (tags: any) => {
    console.log('taggs, ', tags)
  }

  const tagOptions: Tag[] = [
    { label: "edm", value: "edm", score: 12 },
    { label: "rock", value: "rock", score: 2 },
  ];

  return (
    <div>
      <Modal
        isOpen={open}
        onClose={close}
        size="xl"
        isCentered={true}
        autoFocus={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className="bg-secondary text-white rounded-modal py-2">
          <ModalHeader>
            <span className="h4 m-0 font-weight-bolder">Create a room</span>
            <ModalCloseButton className="mt-3" />
          </ModalHeader>

          <ModalBody>
            <form id="create-form" onSubmit={(e) => onSubmit(e)}>
              <div>
                <label>Room Name</label>
                <InputGroup>
                  <Input
                    isInvalid={room.error}
                    placeholder="Enter a catchy room name!"
                    onChange={handleChange}
                    type="text"
                    variant="filled"
                    className="bg-light input-field rounded-lg"
                    name="name"
                  />
                  {room.error ? (
                    <Tooltip label="Please enter a valid room name!" aria-label="Please enter a valid room name!" className="bg-danger">
                      <InputRightElement
                        children={<TiWarning className="text-danger" />}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </InputGroup>
              </div>

              <div className="mt-4">
                <label>Room Description</label>
                <Textarea
                  className="bg-light input-field rounded-lg"
                  variant="filled"
                  type="text"
                  placeholder="What type of music will you be playing in the room?"
                  size="sm"
                />
              </div>
              <div className="mt-3">
                <label>Tags</label>
                <Select inputValue="" tags={tagOptions} updateTags={handleUpdateTags} presentTags={tagOptions}></Select>
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <div className="text-right mt-3">
              <button
                className="btn btn-primary font-weight-bold"
                type="submit"
                form="create-form"
              >
                Create Room
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
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
