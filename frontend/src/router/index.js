import {
createRouter,
createWebHistory
} from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Search from "../pages/Search.vue";
import Notifications from "../pages/Notifications.vue";

const router = createRouter({
history: createWebHistory(),
routes: [
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
]
});

export default router;
