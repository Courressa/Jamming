import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import "../Song&Icon Styles/ButtonIcons.css";

function SearchBar(props) {
    const [userSearch, setUserSearch] = useState("");
    const handleUserSearchChange = (event) => {
        setUserSearch(event.target.value);
    };

    const handleSendingUserSearch = (event) => {
        event.preventDefault();
        props.collectSearchInput(userSearch);
    }
    return (
    <div>
        <form>
            <input
                name="Search"
                className={`${styles.searchSection} ${styles.bar}`}
                type="text"
                value={userSearch}
                onChange={handleUserSearchChange}
                aria-label="Search"
                placeholder="Search..."
            />
            <input
                aria-label="Submit"
                name="SearchButton"
                className={`${styles.searchSection} ${styles.button} material-symbols-outlined`}
                type="submit"
                value="Search"
                onClick={handleSendingUserSearch}
            />
        </form>
    </div>);
};

export {SearchBar};