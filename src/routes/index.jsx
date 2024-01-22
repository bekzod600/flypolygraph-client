import { createBrowserRouter } from "react-router-dom";

import HomeView from "../views/HomeView";
import OrderView from "../views/OrderView";
import ContactView from "../views/ContactView";
import CheckoutView from "../views/CheckoutView";

const router = createBrowserRouter([
  {
    path: "/",
    name: "home",
    element: <HomeView />,
  },
  {
    path: "/order",
    name: "order",
    element: <OrderView />,
  },
  {
    path: "/contact",
    name: "contact",
    element: <ContactView />,
  },
  {
    path: "/checkout",
    name: "checkout",
    element: <CheckoutView />,
  },
]);

export default router;
