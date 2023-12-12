import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles/applayout.module.scss'
import { AuthNavigateProvider } from './util/AuthNavigateProvider';
import AuthButton from './ui/components/AuthButton';

const AppLayout = () => {

    return (
        <AuthNavigateProvider>
        <main className={styles.app_layout}>
            <header>
                <h1>SimpleChatApp</h1>
                <AuthButton type="logout">Logout</AuthButton>
            </header>
            <Outlet/>
            <footer> 
                <p>{`Created with Love <3 by brx`}</p>
                {/* Github Link */}
                </footer>
           
        </main>
    </AuthNavigateProvider>);
};

export default AppLayout;
