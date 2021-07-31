/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useEffect, useState, useRef, useCallback } from "react";

import CreatableSelect from "react-select/creatable";

import { Tag } from "util/Tags";
import { SelectOption, NoSelectOption } from "components/select/SelectOption";
import { searchTags } from "services/Tag";
import { customStyles } from "components/select/SelectStyles";

import "components/select/Select.scss";

/**
 * @function updateTags function emitted that contains the updated tags
 */
interface State {
  updateTags: (tag: Tag) => void;
  presentTags: Tag[];
  handleError: (error: any) => void;
}

export const Select = (props: State) => {
  const { updateTags, presentTags, handleError } = props;
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const selectInputRef = useRef<any>();

  /**
   * Function to get the tags based on the typed letters
   * and update the options
   *
   * @param substr input value
   */
  const getTagsFromSubstring = useCallback(
    async (substr = "") => {
      try {
        const response = await searchTags(substr);
        setTags(response.data);
      } catch (err) {
        console.log(err);
        handleError(err);
      }
    },
    [handleError],
  );

  /**
   * Get the most popular tags when the component loads
   */
  useEffect(() => {
    getTagsFromSubstring();
  }, [getTagsFromSubstring]);

  /**
   * When a tag is selected or created this function is called
   * To avoid duplicating previous tags, this sends back the
   * newly added tag to the parent component.
   *
   * @param tags list of tags from the select
   */
  const handleSelectionChange = (inputTags: any) => {
    if (inputTags.length) {
      updateTags(inputTags);
      setInputValue("");
      setTags([]);
      getTagsFromSubstring();
    }
  };

  /**
   * When the user types letters, the search should be updated.
   * This mocks a basic debounce of 250ms
   *
   * @param input typed string values
   */
  const handleInputchange = (value: string) => {
    setInputValue(value);
    if (value) {
      getTagsFromSubstring(value);
    }
  };

  return (
    <CreatableSelect
      ref={selectInputRef}
      isMulti
      inputValue={inputValue}
      classNamePrefix="select"
      defaultValue={presentTags}
      onChange={handleSelectionChange}
      options={tags}
      components={{ Option: SelectOption, NoOptionsMessage: NoSelectOption }}
      onInputChange={handleInputchange}
      placeholder="Type to add tags..."
      styles={customStyles}
    />
  );
};
