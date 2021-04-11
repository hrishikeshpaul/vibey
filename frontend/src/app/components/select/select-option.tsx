import React from 'react';
import { components } from "react-select";
import { Badge } from "@chakra-ui/react";
import './select.scss';

/**
 * Custom option for tags to display the label and score
 * 
 * Need to figure out the correct type for the prop to get rid of any
 * 
 * @param props options props passed by react-select
 */
export const SelectOption = (props: any) => {
  return (
    <components.Option {...props}>
      <span className="text-grey-1">#</span> <span>{props.data.label}</span>{" "}
      <Badge className="bg-primary rounded-sm ml-1 text-white">
        {props.data.score}
      </Badge>
    </components.Option>
  );
};

/**
 * Custom not found option for tags to display the label and score.
 * We don't have a 'tag not found' result as the not found
 * tags can be created. So the only time its going to be not found
 * is when the api is fetching the tags based on the input substring
 * 
 * Need to figure out the correct type for the prop to get rid of any
 * 
 * @param props options props passed by react-select
 */
export const NoSelectOption = (props: any) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Loading options...</span>
    </components.NoOptionsMessage>
  );
};

