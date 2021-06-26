/* Copyright (C) 2021 Vibey - All Rights Reserved */
import { UseToastOptions } from "@chakra-ui/react";

/**
 * Properties for a error toast 
 */
export const ERROR_TOAST = {
  id: 'toast-error',
  status: 'error',
  duration: 5000,
  position: 'bottom-right',
  title: 'Looks like something is wrong :(',
  isClosable: true
} as UseToastOptions
