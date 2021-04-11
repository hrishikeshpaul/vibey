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
    console.log('here')
    setRoom(initialRoomValues);
    console.log({room})
  }, []);

  useEffect(() => {}, [room.name]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('em')
      close(room);
      setRoom(initialRoomValues);
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
