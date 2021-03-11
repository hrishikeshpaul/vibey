import React from 'react';
import plus from 'assets/icons/plus.svg';
import './icon.scss';

type IconProps = {
  icon: string;
}

const getIcon = (iconName: string) => {
  console.log('here', iconName)
  switch(iconName) {
    case 'plus': return plus; 
  }
}

export const Icon = (props: React.PropsWithChildren<IconProps>) => {
  const { icon } = props;
  return (
    <img className="icon" src={getIcon(icon)} alt={icon.toString()}/>
  )
}
