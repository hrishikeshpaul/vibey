/* Copyright (C) 2021 Vibey - All Rights Reserved */

import React, { useEffect, useState, useCallback, FunctionComponent } from "react";

import CreatableSelect from "react-select/creatable";

import { Tag } from "util/Tags";
import { SelectOption, NoSelectOption } from "components/select/SelectOption";
import { searchTags } from "services/Tag";
import { customStyles } from "components/select/SelectStyles";

import "components/select/Select.scss";

/**
 * @function updateTags function emitted that contains the updated tags
 */
interface Props {
  onChange: (tag: Tag[]) => void;
  presentTags: Tag[];
  handleError: (error: any) => void;
}

export const Select: FunctionComponent<Props> = ({ onChange, presentTags, handleError }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selected, setSelected] = useState<Tag[]>(presentTags);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setSelected(presentTags);
  }, [presentTags]);

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
  }, []); // eslint-disable-line

  /**
   * When a tag is selected or created this function is called
   * To avoid duplicating previous tags, this sends back the
   * newly added tag to the parent component.
   *
   * @param tags list of tags from the select
   */
  const handleSelectionChange = (inputTags: any) => {
    onChange(inputTags as Tag[]);
    setInputValue("");
    setTags([]);
  };

  /**
   * When the user types letters, the search should be updated.
   * This mocks a basic debounce of 250ms
   *
   * @param input typed string values
   */
  const handleInputChange = (value: string) => {
    console.log("input changed");
    setInputValue(value);
    getTagsFromSubstring(value);
  };

  return (
    <>
      <CreatableSelect
        isMulti
        inputValue={inputValue}
        classNamePrefix="select"
        value={selected}
        onChange={handleSelectionChange}
        options={tags}
        components={{ Option: SelectOption, NoOptionsMessage: NoSelectOption }}
        onInputChange={handleInputChange}
        placeholder="Type to add tags..."
        styles={customStyles}
      />
    </>
  );
};
