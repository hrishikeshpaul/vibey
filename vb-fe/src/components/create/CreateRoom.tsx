/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useState, FunctionComponent } from "react";
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
  Text,
} from "@chakra-ui/react";

import "components/create/CreateRoom.scss";
import { Select } from "components/select/Select";
import { RoomForm } from "util/Room";
import { Tag } from "util/Tags";
import { useDispatch } from "react-redux";
import { createRoomAction } from "_store/room/RoomActions";
import { SystemConstants } from "_store/system/SystemTypes";

const MAX_NAME_LENGTH = 40;

type Props = {
  open: boolean;
  handleError: (error: any) => void;
};

interface RoomType extends RoomForm {
  error: boolean;
}

const initialRoomValues: RoomType = {
  name: "",
  description: "",
  tags: [],
  error: false,
};

export const CreateRoom: FunctionComponent<Props> = ({ open, handleError }) => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState(initialRoomValues);

  /**
   * Validates the form to see if the room name is present
   */
  const validateForm = () => {
    if (!room.name.trim()) {
      setRoom({ ...room, error: true });
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
      // dispatch(createRoomAction(room));
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

    setRoom({ ...room, [name]: value });
  };

  /**
   * Adds a tag emitted from the Select component to the
   * room state
   *
   * @param tag tag that has been added
   */
  const handleUpdateTags = (tags: Tag[]) => {
    setRoom({ ...room, tags });
  };

  const onClose = () => {
    dispatch({ type: SystemConstants.CREATE_ROOM_MODAL, payload: false });
  };

  return (
    <Modal isOpen={open} onClose={onClose} size="2xl" isCentered autoFocus={false} closeOnOverlayClick={false}>
      <ModalOverlay bgColor="blackAlpha.800" />
      <ModalContent bg="gray.800" p={{ base: "0", md: "3" }} py="2">
        <ModalHeader display="flex" alignItems="center" w="100%" justifyContent="space-between">
          <Heading size="lg">Create a room</Heading>
          <ModalCloseButton position="relative" top="none" right="none" />
        </ModalHeader>
        <ModalBody mt={4}>
          <form id="create-form" onSubmit={onSubmit}>
            <FormControl>
              <FormLabel htmlFor="name">Room name</FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  isInvalid={room.error}
                  placeholder="Enter a catchy room name!"
                  onChange={handleChange}
                  type="text"
                  variant="filled"
                  name="name"
                  value={room.name}
                  maxLength={MAX_NAME_LENGTH}
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
                <Text fontSize="xs" color="gray.100" textAlign="right" pt="1">
                  {room.name.length}/{MAX_NAME_LENGTH} chars
                </Text>
              </InputGroup>
            </FormControl>

            <FormControl pt={4}>
              <FormLabel html="tags">Tags</FormLabel>
              <Select onChange={handleUpdateTags} presentTags={room.tags} handleError={handleError} />
            </FormControl>

            <FormControl pt={8}>
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
          <Button type="submit" form="create-form" colorScheme="primary" w="100%">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
