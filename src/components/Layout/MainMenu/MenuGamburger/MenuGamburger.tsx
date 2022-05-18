import React, {useRef} from 'react'
import { IMenuGamburgerProps } from './IMenuGamburger.props'
import styles from './MenuGamburger.module.scss'
import {IconButton, useDisclosure} from '@chakra-ui/react'
import {MdMenu} from 'react-icons/md'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import {pages} from '../../../../mock/pages'

const MenuGamburger = (): JSX.Element => {
  const btnRef = useRef()
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
        <>
          <IconButton onClick={onOpen}  variant="unstyled" display={{base: 'flex', md: 'none'}} aria-label="Открыть меню"
                      icon={<MdMenu size={50}/>}/>
          <MenuDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} pages={pages}/>
        </>
  );
};

export default MenuGamburger
