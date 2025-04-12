import Index from "components/Index";
import Profile from "components/Profile";
import Login from "components/Login";
import Category from "components/Categories";
import Products from "components/Products";
import Admins from "components/Admins";
import Client from "components/Clients";
import Payments from "components/Payments";
import Orders from "components/Orders";
import Complaints from "components/Complaints";

var routes = [
  {
    path: "/index",
    name: "tableau de bord",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/admins",
    name: "Administrateur",
    icon: "fa-solid fa-users-gear text-blue",
    component: <Admins />,
    layout: "/admin",
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "fa-solid fa-users text-yellow",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-gray",
    component: <Category />,
    layout: "/admin",
  },
  {
    path: "/produits",
    name: "Produits",
    icon: "fa-solid fa-layer-group text-green",
    component: <Products />,
    layout: "/admin",
  },
  {
    path: "/payments",
    name: "Paiments",
    icon: "fa-solid fa-credit-card text-red",
    component: <Payments />,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Commandes",
    icon: "fa fa-shopping-cart text-orange",
    component: <Orders />,
    layout: "/admin",
  },
  {
    path: "/complaints",
    name: "Réclamations",
    icon: "fa-solid fa-comment-dots text-red",
    component: <Complaints />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
