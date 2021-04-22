/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { PropsWithChildren, useRef, useState } from 'react';
import './Share.scss';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { IoCopy } from 'react-icons/io5';

type ShareProps = {
  isOpen: boolean;
  onClose: () => void;
}
    
const Share = ({isOpen, onClose}: PropsWithChildren<ShareProps>) => {
  const cancelRef = useRef() as any;
  const url = window.location.href;
  const [ttString, setTTString] = useState<string>('Click to copy');
  
  const copyToClipboard = (e: any) => {
    e.preventDefault();
    setTTString('Copied!')
    navigator.clipboard.writeText(window.location.href);
  }

  const resetTooltipString = () => {
    setTimeout(() => {
      setTTString('Click to copy')
    }, 100)
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size="xl"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="bg-secondary text-white">
            <AlertDialogHeader fontSize="xl" fontWeight="bold">
              Share Room
            </AlertDialogHeader>

            <AlertDialogBody className="pt-0">
              <div>
                Copy the link and share it to invite people to the room! 
              </div>
              <div>
                <InputGroup size="md" className="mt-3">
                  <Tooltip label={ttString} fontSize="sm">
                    <Input
                        pr="4.5rem"
                        type="text"
                        className="bg-light pointer"
                        defaultValue={url}
                        onClick={copyToClipboard}
                        onMouseLeave={resetTooltipString}
                        isReadOnly
                      >
                    </Input>
                  </Tooltip>
                  <InputRightElement>
                   <Tooltip label={ttString} fontSize="sm">
                   <IconButton
                      onClick={copyToClipboard}
                      onMouseLeave={resetTooltipString}
                      className="bg-primary"
                      aria-label="copy"
                      size="sm"
                      icon={<IoCopy></IoCopy>}
                    ></IconButton>
                   </Tooltip>
                  </InputRightElement>
                </InputGroup>
              </div>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} className="btn-primary bg-primary">
                Done
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Share;
