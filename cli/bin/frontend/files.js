/**
 * Copyright statement
 */
const copyright = `/* Copyright (C) 2021 Vibey - All Rights Reserved */`;

/**
 * Capiralize the first letter for React
 * 
 * @param {string} name name of file
 */
const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

/**
 * Create a react component
 * @param {string} name name of file
 */
const component = (name) => {
  const cName = capitalize(name);

  return (`${copyright}

import React, { PropsWithChildren } from "react";
import "./${name}.scss"

type ${cName}Props = {

}
    
const ${cName} = (props: PropsWithChildren<${cName}Props>) => {
  return (
    <div>
        
    </div>
  )
}

export default ${cName};
`
  )
}

/**
 * Create a react module
 * @param {string} name name of file
 */
const mod = (name) => {
  const cName = capitalize(name);
  return (`${copyright}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./${name}.scss";

const ${cName} = () => {
  const dispatch = useDispatch();

  return (
    <div>

    </div>
  )
}

export default ${cName};
`
  ) 
}

/**
 * Create an empty ts file as hook
 */
const hook = 
`${copyright}
`

/**
 * Create an empty ts file as service
 */
const service = 
`${copyright}

import axois from "app/hooks/useAxios";
import { } from "app/static/url";

`

const scss = 
`
`

/**
 * Create action types for redux state
 * 
 * @param {string} name name of file
 */
const actionTypes = (name) => {
  const cName = capitalize(name);

  return (`${copyright}

export interface ${cName}State {

}

export type ${cName}ActionTypes = null;
`
  )
}

/**
 * Create reducer for redux state
 * 
 * @param {string} name name of file
 */
const reducer = (name) => {
  const cName = capitalize(name);

  return (`${copyright}
    
import { ${cName}State, ${cName}ActionTypes } from "./${name}ActionTypes";

/**
 * Initial values of the ${cName} State
 */
const initialState: ${cName}State = {

};

export const ${name}Reducer = (
  statae: ${cName}State = initialState,
  action: ${cName}ActionTypes
): ${cName}State => {
  switch (action.type) {

  }
};
`
  )
}

/**
 * Create action for redux state
 * 
 * @param {string} name name of file
 */
const action = (name) => {
  return(`${copyright}

import { Dispatch } from "redux";
import { } from "app/store/${name}/${name}ActionTypes";

`
  )
}

module.exports = {
  component, 
  mod,
  hook,
  service,
  scss,
  actionTypes,
  reducer,
  action
}