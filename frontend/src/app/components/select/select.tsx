

import React from "react";
import { Tag } from "../../models/tag.model";
import CreatableSelect from 'react-select/creatable';
import { OptionsType,  } from "react-select";
import { SelectOption, NoSelectOption } from './select-option';

/**
 * @var tags list of tags to be displayed in the option
 * @function updateTags function emitted that contains the updated tags
 */
type State = {
  tags: Tag[];
  updateTags: (tag: Tag) => void;
  presentTags: Tag[];
  getTagsFromSubstring: (substr: string) => void;
};

const Select = (props: State) => {
  const { tags, updateTags, presentTags, getTagsFromSubstring } = props;

  /**
   * When a tag is selected or created this function is called
   * To avoid duplicating previous tags, this sends back the
   * newly added tag to the parent component. 
   * 
   * @param tags list of tags from the select
   */
  const handleSelectionChange = (tags: OptionsType<Tag>) => {
    if (tags.length) {
      updateTags(tags[tags.length - 1]);
    }
  };

  /**
   * When the user types letters, the search should be updated.
   * This mocks a basic debounce of 250ms 
   * 
   * @param input typed string values
   */
  const handleInputchange = (input: string) => {
    if(input) {
      setTimeout(()=> {
        getTagsFromSubstring(input);
      }, 250)
    }
  }

  return (
    <div>
      <CreatableSelect
        isMulti
        classNamePrefix="select"
        defaultValue={presentTags}
        onChange={handleSelectionChange}
        cacheOptions
        options={tags}
        components={{ Option: SelectOption, NoOptionsMessage: NoSelectOption }}
        onInputChange={handleInputchange}
      />
    </div>
  );
};

export default Select;
