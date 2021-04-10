import React, { useState } from "react";
import { Tag } from "../../models/tag.model";
import AsyncCreatableSelect from "react-select/async-creatable";
import { components } from "react-select";
import { Badge } from "@chakra-ui/react";


type State = {
  inputValue: string;
  tags: Tag[];
  updateTags: (tags: any) => void;
  presentTags: Tag[];
};

const Select = (props: State) => {
  const { tags, updateTags, presentTags } = props;

  const filterTags = (inputValue: string) => {
    return tags.filter((i: Tag) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (
    inputValue: string
  ): Promise<{ label: string; value: string }[]> =>
  // make axios call and return the results
    new Promise((resolve) => {
      setTimeout(() => {
        const json = filterTags(inputValue);
        resolve(json);
      }, 1000);
    });

  const handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
    }
  };

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <span>{props.data.label}</span>{" "}
        <Badge className="bg-primary rounded-sm ml-1 text-white">
          {props.data.score}
        </Badge>
      </components.Option>
    );
  };

  const handleSelectionChange = (tags: any) => {
    if (tags.length) {
      updateTags(tags);
    }
  };

  return (
    <div>
      <AsyncCreatableSelect
        classNamePrefix="select"
        isMulti
        cacheOptions
        defaultValue={presentTags}
        defaultOptions={presentTags}
        onKeyDown={handleKeydown}
        loadOptions={promiseOptions}
        components={{ Option: Option }}
        placeholder="Type to add tags..."
        onChange={handleSelectionChange}
      />
    </div>
  );
};

export default Select;
