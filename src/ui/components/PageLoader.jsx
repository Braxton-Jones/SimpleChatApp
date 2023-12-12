import React from 'react';
import styles from "../../styles/pageloader.module.scss";

export const PageLoader = () => {
    return (
        <div className={styles.page_loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default PageLoader;
