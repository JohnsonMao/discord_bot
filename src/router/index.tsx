import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import generateRouteConfig from './generateRouteConfig';

function Router() {
  const routeConfig = generateRouteConfig();
  const router = createBrowserRouter(routeConfig);

  return <RouterProvider router={router} />;
}

export default Router;
