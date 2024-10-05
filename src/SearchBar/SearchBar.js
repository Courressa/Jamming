import React from "react";
import styles from "./SearchBar.module.css";
import "../Song&Icon Styles/ButtonIcons.css";

function SearchBar() {
    return (
    <div>
        <form>
            <input
                name="Search"
                className={`${styles.searchSection} ${styles.bar}`}
                type="text"
                aria-label="Search"
                placeholder="Search..."
            />
            <input
                className={`${styles.searchSection} ${styles.button} material-symbols-outlined`}
                type="submit"
                value="Search"
            />
        </form>
    </div>);
};

export {SearchBar};