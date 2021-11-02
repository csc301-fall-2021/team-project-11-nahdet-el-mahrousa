// import MultiLevelRouter from "./MultiLevelRouter";
import HomePage from "pages/Home";
import JourneyPage from "pages/Database/Bot";
import LoginPage from "pages/Login";


const ROUTES = [
    { path: "/", key: "LOGIN", exact: true, component: LoginPage},
    { path: "/", key: "HOME", exact: true, component: HomePage },
    { path: "/database/bot", key: "DB_BOT", exact: true, component: JourneyPage },
];

export default ROUTES;
