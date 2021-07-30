import React, { FunctionComponent } from "react";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Icon } from "@chakra-ui/react";

import { ReactComponent as LoadingIcon } from "assets/icons/loading.svg";

import "components/loading/Loading.scss";

interface Props {
  show: boolean;
}

export const Loading: FunctionComponent<Props> = ({ show }) => {
  const onClose = () => {
    console.log("Loading closed");
  };

  return (
    <div>
      <Modal isOpen={show} onClose={onClose} size="xs" autoFocus={false} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent className="bg-secondary text-white">
          <ModalHeader className="text-center">Loading...</ModalHeader>
          <ModalBody className="d-flex justify-content-center pb-4 pt-2">
            <Icon viewBox="0 0 55 80" boxSize={25}>
              <LoadingIcon />
            </Icon>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
