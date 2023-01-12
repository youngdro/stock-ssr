import React, { Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
import Layout from './layout';
import Router from './router';
import Logo from './logo';
import Menu from './menu';

import './index.css';

export default () => {
    return (
        <BrowserRouter>
            <Layout logo={<Logo />} menu={<Menu />}>
                <Router />
            </Layout>
        </BrowserRouter>
    );
};