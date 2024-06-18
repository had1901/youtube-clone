import React from 'react'
import './Navbar.css'

import menuIcon from '../../assets/images/menu.png'
import logoIcon from '../../assets/images/logo.png'
import searchIcon from '../../assets/images/search.png'
import uploadIcon from '../../assets/images/upload.png'
import moreIcon from '../../assets/images/more.png'
import notificationIcon from '../../assets/images/notification.png'
import profileIcon from '../../assets/images/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu-icon' src={menuIcon} alt='' onClick={() => setSidebar(prev => prev === false ? true : false)} />
        <Link to='/'><img className='logo' src={logoIcon} alt='' /></Link>
      </div>

      <div className='nav-middle flex-div'>
        <div className='search-box flex-div'>
          <input type='text' placeholder='Search' />
          <img src={searchIcon} alt='' />
        </div>
      </div>

      <div className='nav-right flex-div'>
        <img src={uploadIcon} alt='' />
        <img src={moreIcon} alt='' />
        <img src={notificationIcon} alt='' />
        <img src={profileIcon} className='user-icon' alt='' />
      </div>
    </nav>
  )
}

export default Navbar