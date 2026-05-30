import { createRouter } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Search from "../pages/Search.vue";
import Notifications from "../pages/Notifications.vue";

const routes = [
{
path: "/",
component: Home
},
{
path: "/login",
component: Login
},
{
path: "/register",
component: Register
},
{
path: "/profile/:id",
component: Profile
},
{
path: "/search",
component: Search
},
{
path: "/notifications",
component: Notifications
}
];

export default createRouter({
history:
createWebHistory(),
routes
});

function createWebHistory() {
return (
await import("vue-router")
).createWebHistory();
}
