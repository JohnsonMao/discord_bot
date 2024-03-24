import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import generateRouteConfig from './generateRouteConfig';

const routeConfig = generateRouteConfig();
const router = createBrowserRouter(routeConfig);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
