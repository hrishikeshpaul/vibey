

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
  {'label': 'pop-0', 'value': 'pop-0', 'score': 90},
  {'label': 'pop-4', 'value': 'pop-4', 'score': 81},
  {'label': 'pop-5', 'value': 'pop-5', 'score': 77},
  {'label': 'pop-6', 'value': 'pop-6', 'score': 77},
  {'label': 'pop-9', 'value': 'pop-9', 'score': 75},
  {'label': 'pop-7', 'value': 'pop-7', 'score': 74},
  {'label': 'pop-17', 'value': 'pop-17', 'score': 69},
  {'label': 'pop-2', 'value': 'pop-2', 'score': 68},
  {'label': 'rock-11', 'value': 'rock-11', 'score': 61},
  {'label': 'country-8', 'value': 'country-8', 'score': 59},
  {'label': 'edm-18', 'value': 'edm-18', 'score': 52},
  {'label': 'country-14', 'value': 'country-14', 'score': 49},
  {'label': 'rock-13', 'value': 'rock-13', 'score': 32},
  {'label': 'pop-1', 'value': 'pop-1', 'score': 28},
  {'label': 'country-19', 'value': 'country-19', 'score': 28},
  {'label': 'pop-15', 'value': 'pop-15', 'score': 21},
  {'label': 'pop-12', 'value': 'pop-12', 'score': 14},
  {'label': 'edm-16', 'value': 'edm-16', 'score': 5},
  {'label': 'pop-3', 'value': 'pop-3', 'score': 3},
  {'label': 'pop-10', 'value': 'pop-10', 'score': 3},
  ]


const Select = (props: State) => {
  const { updateTags, presentTags } = props;
  const [ tags, setTags ] = useState<Tag[]>([]);

  useEffect(() => {
    getTagsFromSubstring();
  }, [])

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

  const getTagsFromSubstring = (substr?: string) => {
    // make api call here and populate tags
    // setTags(response)
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
