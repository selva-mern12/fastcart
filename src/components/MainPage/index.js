import React, { useState } from "react";
import Header from "../Header";
import Menu from "../Menu";
import Categories from "../Categories";

const MainPage = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="app-container">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="main-container">
                <Menu />
                <Categories searchValue={searchValue} />
            </div>
        </div>
    );
}

export default MainPage;