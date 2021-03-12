import React, { PropsWithChildren } from 'react';
import {ReactComponent as Plus} from 'assets/icons/plus.svg';
import './icon.scss';

/**
 * Prop types
 */
type IconProps = {
  icon: string;
  color?: string;
  size?: [number, number];
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

/**
 * Selects the icon based on the passed name
 * 
 * @param iconName Name of the icon (required)
 * @param color Color of the icon
 * @param size [width, height] of the icon
 */
const getIcon = (iconName: string, color?: string, size?: [number, number]) => {
  switch (iconName) {
    case 'plus': return <Plus style={makeStyles(color, size)}></Plus>;
  }

  return null;
}

export const Icon = (props: PropsWithChildren<IconProps>) => {
  const { icon, color, size } = props
  return (
    getIcon(icon, color, size)
  )
}

export default Icon;