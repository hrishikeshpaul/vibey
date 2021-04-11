

import React, { useEffect, useState } from "react";
import { Tag } from "../../models/tag.model";
import CreatableSelect from 'react-select/creatable';
import { OptionsType,  } from "react-select";
import { SelectOption, NoSelectOption } from './select-option';

/**
 * @function updateTags function emitted that contains the updated tags
 */
type State = {
  updateTags: (tag: Tag) => void;
  presentTags: Tag[];
};

const tagOptions: Tag[] = [
  { label: "edm", value: "edm", score: 12 },
  { label: "rock2", value: "rock2", score: 2 },
  { label: "rock3", value: "rock3", score: 22 },
  { label: "rock4", value: "rock4", score: 52 },
  { label: "rock5", value: "rock5", score: 16 },
  { label: "rock6", value: "rock6", score: 7 },
  { label: "rock7", value: "rock7", score: 7 },
  { label: "rock8", value: "rock8", score: 7 },

];


const Select = (props: State) => {
  const { updateTags, presentTags } = props;
  const [ tags, setTags ] = useState<Tag[]>(tagOptions);

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

  const getTagsFromSubstring = (substr: string) => {
    // make api call here and populate tags
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
