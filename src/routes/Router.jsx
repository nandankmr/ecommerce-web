import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";

/** **Layouts*****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const Dashboard = Loadable(lazy(() => import('../views/Dashboard')));
const CreateOrder = Loadable(lazy(() => import('../views/CreateOrder')));
const NotFound = Loadable(lazy(() => import('../views/NotFound')));


/** ***Routes******/
const ThemeRoutes = [
	{
		path: "/",
		element: <FullLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/dashboard" replace />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/create-order",
				element: <CreateOrder />,
			},
			{
				path: "/edit-order/:id",
				element: <CreateOrder />,
			},
			{
				path: "/404",
				element: <NotFound />,
			},
			{path: '*', element: <Navigate to="/404" replace/>}
		],
	},
];

export default ThemeRoutes;
