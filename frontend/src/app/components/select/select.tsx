import React, { useState } from "react";

import { Tag } from '../../models/tag.model';
import AsyncCreatableSelect from 'react-select/async-creatable';

type State = {
  inputValue: string;
  tags: Tag[]
};


const Select = (props: State) => {
  // const [state, setState] = useState({ inputValue: "" });
  const { tags } = props ;

  const filterColors = (inputValue: string) => {
    return tags.filter((i: Tag) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  const promiseOptions = (
    inputValue: string
  ): Promise<{ name: string; value: string }[]> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });
  
  const handleKeydown = (e: any) => {
    if(e.keyCode === 13) { 
      // make api request to add tag
      console.log(e.target.value)
    }
  }
  
  return (
    <AsyncCreatableSelect
      classNamePrefix="select"
      isMulti
      cacheOptions
      defaultOptions
      onKeyDown={handleKeydown}
      getOptionLabel={option => option.name}
      getOptionValue={option => option.value}
      loadOptions={promiseOptions}
      placeholder="Type to add tags..."
    />
  );
};

export default Select;
