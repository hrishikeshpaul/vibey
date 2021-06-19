/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren } from 'react';
import './Loading.scss';
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalCloseButton,
} from '@chakra-ui/react';
import Icon from 'app/components/Icon';
import { ReactComponent as LoadingIcon } from 'assets/icons/loading.svg';

type LoadingProps = {
 show: boolean;
};

const Loading = (props: PropsWithChildren<LoadingProps>) => {
 const { show } = props;
 const onClose = () => {};

 return (
  <div>
   <Modal
    isOpen={show}
    onClose={onClose}
    size="xs"
    autoFocus={false}
    closeOnOverlayClick={false}
    isCentered={true}
   >
    <ModalOverlay />
    <ModalContent className="bg-secondary text-white">
     <ModalHeader className="text-center">Loading...</ModalHeader>
     <ModalCloseButton className="loading-close" />
     <ModalBody className="d-flex justify-content-center pb-4 pt-2">
      <Icon Component={LoadingIcon} size={[2.5, 2.5]} color="#4aaeae"></Icon>
     </ModalBody>
    </ModalContent>
   </Modal>
  </div>
 );
};

export default Loading;
