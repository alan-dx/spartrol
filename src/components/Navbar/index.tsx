import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import { SideNavbar } from './SideNavbar';
import { TabNavbar } from './TabNavbar';

export function Navbar() {

  const window = useWindowDimensions()

  if (window.width < 769) {
    return (
      <TabNavbar />
    )
  }

  return (
    <SideNavbar />
 );
}