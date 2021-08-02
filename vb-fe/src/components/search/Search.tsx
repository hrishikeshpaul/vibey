import React, { FunctionComponent } from "react";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CgSearch } from "react-icons/cg";

interface Props {
  onChange: (str: string) => void;
}

export const Search: FunctionComponent<Props> = ({ onChange }): JSX.Element => {
  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CgSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search rooms..."
          variant="filled"
          onChange={(e): void => {
            onChange(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
