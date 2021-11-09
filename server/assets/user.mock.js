
const admin1 = {
    username: "admin1",
    password: "******",
    name: "Admin 1",
    email: "admin1@gmail.com",
    privilege: {
        active: true,        // Account is active
        admin: true,         // Can log into admin dashboard
        accessData: true,    // Can view statistic data
        modifyData: true,    // Can modify statistic data
        accessBot: true,     // Can view Bot messages and replies
        modifyBot: true      // Can modify Bot messages and replies
    }
}

const admin2 = {
    username: "admin2",
    password: "******",
    name: "Admin 2",
    email: "admin2@gmail.com",
    privilege: {
        active: true,        // Account is active
        admin: true,         // Can log into admin dashboard
        accessData: true,    // Can view statistic data
        modifyData: false,    // Can modify statistic data
        accessBot: true,     // Can view Bot messages and replies
        modifyBot: false      // Can modify Bot messages and replies
    }
}

const admin3 = {
    username: "admin3",
    password: "******",
    name: "Admin 3",
    email: "admin3@gmail.com",
    privilege: {
        active: false,        // Account is active
        admin: false,         // Can log into admin dashboard
        accessData: false,    // Can view statistic data
        modifyData: false,    // Can modify statistic data
        accessBot: false,     // Can view Bot messages and replies
        modifyBot: false      // Can modify Bot messages and replies
    }
}

module.exports = {
    admin1, admin2, admin3
}
