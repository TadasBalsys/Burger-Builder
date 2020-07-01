import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export interface MenuIconProps {
  toggleHandler: (e: React.MouseEvent) => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({toggleHandler}) => (
  <>
    <FontAwesomeIcon icon={faBars} onClick={toggleHandler}/>
  </>
);

export default MenuIcon;
