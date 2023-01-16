import React, { lazy, Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import { Spin } from "antd";
import CenterLoading from "../components/center-loading";

export interface SyncRoute {
    path: string;
    component: React.LazyExoticComponent<any>;
    children?: Array<SyncRoute>;
    meta?: {
        title?: string;
        needLogin?: boolean;
    };
}

const RouteTable: Array<SyncRoute> = [
    {
        path: "/",
        component: lazy(() => import('../pages/index')),
        children: [{
            path: 'index',
            component: lazy(() => import('../pages/index')),
        }],
    }, {
        path: "/stock", //404页面
        component: lazy(() => import('../pages/stock')),
      },
    {
      path: "*", //404页面
      component: lazy(() => import('../pages/404')),
    },
];
  
const syncRouter = (routes: Array<SyncRoute>): RouteObject[] => {
    return routes.map((route) => {
        const item: RouteObject  = {
            path: route.path,
            element: (
                <Suspense fallback={<CenterLoading />}>
                    <route.component />
                </Suspense>
            ),
            children: route.children && syncRouter(route.children),
        };
        return item;
    });
};

export default () => useRoutes(syncRouter(RouteTable));
