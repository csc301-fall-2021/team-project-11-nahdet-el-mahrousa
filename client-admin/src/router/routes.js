// import MultiLevelRouter from "./MultiLevelRouter";
import HomePage from "pages/Home";
import BotPage from "pages/Database/Bot";
import SummaryPage from "pages/Summary";
import LoginPage from "pages/Login";


const ROUTES = [
    // { path: "/", key: "LOGIN", exact: true, component: LoginPage},
    // { path: "/", key: "HOME", exact: true, component: HomePage },
    { path: "/", key: "Summary", exact: true, component: SummaryPage},
    { path: "/database/bot", key: "DB_BOT", exact: true, component: BotPage },
];

export default ROUTES;
