/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useEffect, useState, useRef, useCallback } from "react";

import CreatableSelect from "react-select/creatable";
import { OptionsType } from "react-select";

import { Tag } from "app/models/tag.model";
import { SelectOption, NoSelectOption } from "app/components/Select/SelectOption";
import { searchTags } from "app/services/tag.service";

/**
 * @function updateTags function emitted that contains the updated tags
 */
type State = {
  updateTags: (tag: Tag) => void;
  presentTags: Tag[];
  handleError: (error: any) => void;
};

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
  const handleSelectionChange = (inputTags: OptionsType<Tag>) => {
    if (inputTags.length) {
      updateTags(inputTags[inputTags.length - 1]);
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
      // setTimeout(() => {}, 500);
    }
  };

  return (
    <div>
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
      />
    </div>
  );
};
