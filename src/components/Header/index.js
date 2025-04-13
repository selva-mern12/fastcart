import { useState } from 'react';
import Cookies from 'js-cookie';
import cart from '../../assets/image/cart.png';
import { FaAngleDown, FaAngleUp, FaRegUserCircle  } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import './index.css';

const Header = ({searchValue, setSearchValue}) => {
  const name = Cookies.get('name');
  const [enterSearch, setEnterSearch] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={cart} alt='logoimg' className="logo-img" />
        <h1 className="logo-text" >fastcart</h1>
      </div>
      <div 
        className={enterSearch ? "search-container search-container-active" : "search-container"} 
        onClick={() => setEnterSearch(true)} 
        onBlur={() => setEnterSearch(false)}
      >
        <GoSearch className="search-icon" />
        <input 
          type="search" 
          className="search-bar" 
          placeholder="Search..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} 
        />
      </div>
      <div className='user-container'> 
        <BiCommentDetail />
        <div className='notification'><MdNotificationsNone /><p className='notify-count'>5</p></div>
        <p className={`alt-profile letter-${name ? name[0].toLocaleLowerCase() : 's'}`}>{name ? name[0].toLocaleUpperCase() : <FaRegUserCircle />}</p>
        <p className='username'>{name}</p>
        <div className='logout-container' >
          <button onClick={() => setShowLogout(prev => !prev)} className='logout-arrow'>
            {showLogout ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {showLogout && (
            <button type='button' className='logout-button'
            onClick={
              () => {
                Cookies.remove('name', { path: '/' });
                Cookies.remove('user_id', { path: '/' });
                Cookies.remove('jwt_token', { path: '/' });
                window.location.reload();
              }
            }>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;