import React, { PropsWithChildren } from 'react';
import './icon.scss';

/**
 * Prop types
 */
type IconProps = {
  color?: string;
  size?: [number, number];
  Component: any;
}

/**
 * Returns the style object if the icon
 * 
 * @param color Color of the icon
 * @param size [width, height] of icon
 */
const makeStyles = (color = 'white', size = [1, 1]) => {
  return {
    color: color,
    height: `${size[1]}rem`,
    width: `${size[0]}rem`
  }
}

export const Icon = (props: PropsWithChildren<IconProps>) => {
  const { color, size, Component } = props;
  return (
    <>
      {
        Component !== undefined ? <Component style={makeStyles(color, size)} fill={color || 'white'}></Component> : ""
      }
    </>
    
  )
}

export default Icon;