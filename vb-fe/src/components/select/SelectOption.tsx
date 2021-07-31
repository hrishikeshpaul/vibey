/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { FunctionComponent } from "react";
import { components } from "react-select";

import { Badge, Box } from "@chakra-ui/react";

import "components/select/Select.scss";

/**
 * Custom option for tags to display the label and score
 *
 * Need to figure out the correct type for the prop to get rid of any
 *
 * @param props options props passed by react-select f
 */
export const SelectOption: FunctionComponent<any> = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <Box>
        <span className="text-grey-1">#</span> <span>{data.label}</span>
        <Badge colorScheme="teal" mx={2}>
          {data.score}
        </Badge>
      </Box>
    </components.Option>
  );
};

/**
 * Custom not found option for tags to display the label and score.
 * We don"t have a "tag not found" result as the not found
 * tags can be created. So the only time its going to be not found
 * is when the api is fetching the tags based on the input substring
 *
 * Need to figure out the correct type for the prop to get rid of any
 *
 * @param props options props passed by react-select
 */
export const NoSelectOption: FunctionComponent<any> = ({ data }) => {
  console.log(data);

  return (
    <components.NoOptionsMessage {...data}>
      <span>Start typing!</span>
    </components.NoOptionsMessage>
  );
};
