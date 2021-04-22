/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren, useRef} from "react";
import "./Alert.scss";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  buttonSting: string;
};

const Alert = ({isOpen, onClose, title, desc, buttonSting}: PropsWithChildren<AlertProps>) => {
  const cancelRef = useRef() as any;

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="bg-secondary text-white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {desc}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} className="text-dark">
                Cancel
              </Button>
              <Button onClick={onClose} ml={3} className="bg-danger">
                {buttonSting}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alert;
