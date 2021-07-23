/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren, useState, useEffect } from "react";
import "./CreateRoom.scss";
import Select from "../Select/Select";
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
  handleError: (error: any) => void;
};

const initialRoomValues = {
  name: "",
  description: "",
  tags: [],
  error: false,
};


const Create = (props: PropsWithChildren<CreateProps>) => {
  const { open, close, handleError } = props;
  const [room, setRoom] = useState(initialRoomValues);

  /**
   * Set room to initial room when create modal pops up
   */
  useEffect(() => {
    setRoom(initialRoomValues);
  }, []);

  /**
   * Submits the rom that emits an event with the room details 
   * and closes the modal
   * @param e form data - has all the details of a room
   */
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      close(room);
      setRoom(initialRoomValues);
    }
  };

  /**
   * Validates the form to see if the room name is present
   */
  const validateForm = () => {
    if (!room.name.trim()) {
      setRoom((prev) => ({
        ...prev,
        error: true,
      }));
      return false;
    }
    return true;
  };

  /**
   * Updates the room name and description on change
   * 
   * @param e event to update name and description
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Adds a tag emitted from the Select component to the 
   * room state
   * 
   * @param tag tag that has been added
   */
  const handleUpdateTags = (tag: any) => {
    const currentTags = room.tags;
    if (tag) {
      setRoom((prev) => ({
        ...prev,
        tags: currentTags.concat(tag)
      }))
    }
  };

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
                    value={room.name}
                  />
                  {room.error ? (
                    <Tooltip
                      label="Please enter a valid room name!"
                      aria-label="Please enter a valid room name!"
                      className="bg-danger"
                    >
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
                  onChange={handleChange}
                  name="description"
                  value={room.description}
                />
              </div>
              <div className="mt-3">
                <label>Tags</label>
                <Select
                  updateTags={handleUpdateTags}
                  presentTags={room.tags}
                  handleError={handleError}
                ></Select>
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
  );
};

export default Create;
