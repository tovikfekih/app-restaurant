/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: "",
    view: "Index",
    name: "index"
  },
  {
    path: "/restaurant/:id",
    view: "Restaurant",
    name: "restaurant"
  },
  {
    path: "/admin/login",
    name: "Connexion Administration",
    view: "admin/Login",
    meta: { layout: "default" }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    view: "admin/Login",
    meta: { layout: "admin" }
  },
  {
    path: "/admin",
    name: "Administration",
    view: "admin/Dashboard",
    meta: { layout: "admin" }
  },
  {
    path: "/admin/restaurants",
    name: "Gestion des restaurants",
    view: "admin/Restaurants",
    meta: { layout: "admin" }
  },
  {
    path: "/admin/commandes",
    name: "Gestion des commandes",
    view: "admin/Commandes",
    meta: { layout: "admin" }
  }
];
