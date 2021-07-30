/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, useEffect, FunctionComponent } from "react";
import { TiWarning } from "react-icons/ti";
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
  Heading,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

import "components/create/CreateRoom.scss";
import { Select } from "components/select/Select";

type Props = {
  open: boolean;
  close: () => void;
  submit: (room: any) => void;
  handleError: (error: any) => void;
};

const initialRoomValues = {
  name: "",
  description: "",
  tags: [],
  error: false,
};

export const CreateRoom: FunctionComponent<Props> = ({ open, close, handleError, submit }) => {
  const [room, setRoom] = useState(initialRoomValues);

  /**
   * Set room to initial room when create modal pops up
   */
  useEffect(() => {
    setRoom(initialRoomValues);
  }, []);

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
   * Submits the rom that emits an event with the room details
   * and closes the modal
   * @param e form data - has all the details of a room
   */
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      submit(room);
      setRoom(initialRoomValues);
    }
  };

  /**
   * Updates the room name and description on change
   *
   * @param e event to update name and description
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "name" && value) setRoom({ ...room, error: false });

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
        tags: currentTags.concat(tag),
      }));
    }
  };

  return (
    <Modal isOpen={open} onClose={close} size="2xl" isCentered autoFocus={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="gray.800" p={{ base: "0", md: "4" }} py="3">
        <ModalHeader display="flex" alignItems="center" w="100%" justifyContent="space-between">
          <Heading size="lg">Create a room</Heading>
          <ModalCloseButton position="relative" top="none" right="none" />
        </ModalHeader>
        <ModalBody mt={4}>
          <form id="create-form" onSubmit={(e) => onSubmit(e)}>
            <FormControl>
              <FormLabel htmlFor="name">Room name</FormLabel>
              <InputGroup>
                <Input
                  isInvalid={room.error}
                  placeholder="Enter a catchy room name!"
                  onChange={handleChange}
                  type="text"
                  variant="filled"
                  name="name"
                  value={room.name}
                />
                {room.error ? (
                  <Tooltip
                    label="Please enter a valid room name!"
                    aria-label="Please enter a valid room name!"
                    className="bg-danger"
                  >
                    <InputRightElement>
                      <TiWarning className="text-danger" />
                    </InputRightElement>
                  </Tooltip>
                ) : null}
              </InputGroup>
            </FormControl>

            <FormControl pt={4}>
              <FormLabel html="tags">Tags</FormLabel>
              <Select updateTags={handleUpdateTags} presentTags={room.tags} handleError={handleError} />
            </FormControl>

            <FormControl pt={4}>
              <FormLabel htmlFor="description">Room Description</FormLabel>
              <Textarea
                variant="filled"
                type="text"
                placeholder="What type of music will you be playing in the room?"
                size="sm"
                onChange={handleChange}
                name="description"
                value={room.description}
                borderRadius="md"
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter mt={4}>
          <Button type="submit" form="create-form" colorScheme="teal" w="100%">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
