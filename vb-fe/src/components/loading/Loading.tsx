import React, { FunctionComponent } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Icon, Text, Box } from "@chakra-ui/react";

import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";

import "components/loading/Loading.scss";
import { useSelector } from "react-redux";
import { State } from "_store/rootReducer";

interface Props {
  show: boolean;
}

export const Loading: FunctionComponent<Props> = ({ show }) => {
  const loadingText = useSelector((state: State) => state.system.loadingText);
  const onClose = () => {
    console.log("Loading closed");
  };

  return (
    <div>
      <Modal isOpen={show} onClose={onClose} size="xs" autoFocus={false} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent className="bg-secondary text-white">
          <ModalHeader className="text-center">Getting reading to vibe!</ModalHeader>
          <ModalBody className="d-flex justify-content-center pb-4 pt-2">
            <Box textAlign="center">
              <Icon viewBox="0 0 55 80" boxSize={25}>
                <LoadingIcon />
              </Icon>
              <Text pt="3" color="gray.100">
                {loadingText}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
