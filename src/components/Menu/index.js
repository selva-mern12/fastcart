import { useState } from 'react';
import { FiHome } from "react-icons/fi";
import { RiListUnordered, RiMenuFold2Line, RiMenuFoldLine  } from "react-icons/ri";
import { AiOutlineTag } from "react-icons/ai";
import { FaRegFolder, FaRegStar, FaRegUser   } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBarChartLine } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { FiAward } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import './index.css'

const Menu = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const [showMenu, setShowMenu] = useState(false);

    const handleMouseEnter = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition(
            window.innerWidth > 768 ? { top: rect.top + window.scrollY - 30, left: rect.left + window.scrollX + 80 } : { top: rect.top + window.scrollY - 30, left: rect.left + window.scrollX + 30}
        );
        setShowTooltip(true);
    };    

    const renderMenuItems = () => (
        <div className="menu-container">
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><FiHome /> <p className="menu">Dashboard</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><RiListUnordered /> <p className="menu">Orders</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><AiOutlineTag /> <p className="menu">Products</p></div>
            <div className="menu-item category-menu"><FaRegFolder /> <p className="menu">Categories</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><HiOutlineUsers /> <p className="menu">Customers</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><BsBarChartLine /> <p className="menu">Reports</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><FaRegStar /> <p className="menu">Coupons</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><BiCommentDetail /> <p className="menu">Inbox</p></div>
            <p className="menu-sub-head">Other Information</p>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><LuMessageCircleQuestion /> <p className="menu">Knowledge Base</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><FiAward /> <p className="menu">Product Updates</p></div>
            <p className="menu-sub-head">Settings</p>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><FaRegUser /> <p className="menu">Personal Settings</p></div>
            <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}><MdOutlineSettings /> <p className="menu">Settings</p></div>
            {showTooltip && (
                <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
                    Feature coming soon — thanks for your patience!
                </div>
            )}
        </div>
    )

    return (
        <>
            {
            window.innerWidth > 768 ? (renderMenuItems()) : (
                <div className="menu-container-mobile">
                    {showMenu && renderMenuItems()}
                    <button className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
                        {showMenu ? <RiMenuFoldLine /> : <RiMenuFold2Line />}
                        Menu
                    </button>
                </div>
                )
            }
        </>
    );
}

export default Menu;