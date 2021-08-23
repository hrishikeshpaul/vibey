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

import { Select } from "components/select/Select";
import { RoomForm } from "util/Room";
import { Tag } from "util/Tags";
import { useDispatch, useSelector } from "react-redux";
import { createRoomAction, updateRoomAction } from "_store/room/RoomActions";
import { SystemConstants } from "_store/system/SystemTypes";
import { State } from "_store/rootReducer";

const MAX_NAME_LENGTH = 40;

type Props = {
  open: boolean;
  handleError: (error: any) => void;
  currentRoom?: {
    _id: string;
    name: string;
    description: string;
    tags: Tag[];
  };
};

interface RoomType extends RoomForm {
  error: boolean;
}

export const RoomModal: FunctionComponent<Props> = ({ open, handleError, currentRoom }) => {
  const initialRoomValues: RoomType = {
    name: currentRoom?.name || "",
    description: currentRoom?.description || "",
    tags: currentRoom?.tags || [],
    error: false,
  };

  const dispatch = useDispatch();
  const modalType = useSelector((state: State) => state.system.roomModal.type);
  const [room, setRoom] = useState(initialRoomValues);

  let buttonText;
  let headerText;
  switch (modalType) {
    case SystemConstants.CREATE:
      buttonText = "Create";
      headerText = "Create a room";
      break;
    case SystemConstants.EDIT:
      buttonText = "Edit";
      headerText = "Edit room";
      break;
    default:
      break;
  }

  const validateForm = () => {
    if (!room.name.trim()) {
      setRoom({ ...room, error: true });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (modalType === SystemConstants.CREATE) {
        dispatch(createRoomAction(room));
      } else if (modalType === SystemConstants.EDIT && currentRoom) {
        dispatch(updateRoomAction(room, currentRoom._id));
      }
      setRoom(initialRoomValues);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "name" && value) setRoom({ ...room, error: false });
    setRoom({ ...room, [name]: value });
  };

  const handleUpdateTags = (tags: Tag[]) => {
    setRoom({ ...room, tags });
  };

  const handleClose = () => {
    dispatch({ type: SystemConstants.SET_ROOM_MODAL, payload: { isOpen: false, type: null } });
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="2xl" isCentered autoFocus={false} closeOnOverlayClick={false}>
      <ModalOverlay bgColor="blackAlpha.800" />
      <ModalContent bg="gray.800" p={{ base: "0", md: "3" }} p2="2">
        <ModalHeader display="flex" alignItems="center" w="100%" justifyContent="space-between">
          <Heading size="lg">{headerText}</Heading>
          <ModalCloseButton position="relative" top="none" right="none" />
        </ModalHeader>
        <ModalBody mt={4}>
          <form id="create-form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="name">Room name</FormLabel>
              <InputGroup display="flex" flexDir="column">
                <Input
                  isInvalid={room.error}
                  placeholder="Enter a catchy room name!"
                  onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                name="description"
                value={room.description}
                borderRadius="md"
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter mt={4}>
          <Button type="submit" form="create-form" colorScheme="primary" w="100%">
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
