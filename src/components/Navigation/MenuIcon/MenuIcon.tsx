import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface Props {
  toggleHandler: (e: React.MouseEvent) => void;
}

const MenuIcon: React.FC<Props> = ({ toggleHandler }) => (
  <>
    <FontAwesomeIcon icon={faBars} onClick={toggleHandler} />
  </>
);

export default MenuIcon;
