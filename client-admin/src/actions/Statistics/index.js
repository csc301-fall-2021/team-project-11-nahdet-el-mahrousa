import * as api from "api/statistics"
import { backToLogin } from "actions/Auth"



export async function requestGetVisitsStats(params) {
    function formatVisit(data) {
        return data.map(d => {
            return {
                date: d.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
                location: d.location,
                visit: Number(d.visit)
            }
        })
    }
    params.startDate = params.startDate || "2021-11-01"
    params.endDate = params.endDate || "2021-12-03"

    try {
        const response = await api.fetchVisitStats(params)
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const data = formatVisit(response.entity.data)
            return data
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function requestGetVisitReplyStats(params) {
    function formatVisit(data) {
        return data.map(d => {
            return {
                reply: d.reply,
                location: d.location,
                visit: Number(d.visit)
            }
        })
    }

    params.startDate = params.startDate || "2021-11-01"
    params.endDate = params.endDate || "2021-12-03"
    params['ridArr'] = params.ridArr || ["619eccb110b1965f4b94719e", "619ef869871baaa33b8da9f9", "619efbf9871baaa33b8daaa4"]

    try {
        const response = await api.fetchVisitStats(params)
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const data = formatVisit(response.entity.data)
            return data
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function requestGetReplies() {
    try {
        const response = await api.fetchAllReplies()
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            return response.entity
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function requestPlatformStat(params) {
    function formatVisit(data) {
        const capitalize = (word) => {
            const lower = word.toLowerCase();
            return word.charAt(0).toUpperCase() + lower.slice(1);
        }
        return data.map(d => {
            return {
                platform: capitalize(d.platform),
                user: Number(d.user)
            }
        })
    }

    // params.startDate = params.startDate || "2021-11-01"
    // params.endDate = params.endDate || "2021-12-03"
    console.log(params)

    try {
        const response = await api.fetchPlatform(params)
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const data = formatVisit(response.entity.data)
            return data
        } else if (response.statusCode === 401) {
            // Login expire or not valid, return to login
            backToLogin()
        } else {
            throw new Error(response.msg)
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}


// export async function requestGetStayTimeStats( params ) {

//     params.startDate = params.startDate||"2021-11-01"
//     params.endDate = params.endDate||"2021-12-03"
//     params.from = params.from||"Reply"

//     try {
//         const response = await api.fetchStayTime( params )
//         if (response.statusCode === 200) {
//             // Format body, to trim characters.
//             // const workflow = _fetchVisitStats(response.entity)
//             const data = formatVisit(response.entity.data)
//             return data
//         } else if (response.statusCode === 401) {
//             // Login expire or not valid, return to login
//             backToLogin()
//         } else {
//             throw new Error(response.msg)
//         }
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// }

// export async function requestGetPlatformStats( params ) {

//     params.startDate = params.startDate||"2021-11-01"
//     params.endDate = params.endDate||"2021-12-03"
//     params.from = params.from||"Location"

//     try {
//         const response = await api.fetchPlatform( params )
//         if (response.statusCode === 200) {
//             // Format body, to trim characters.
//             // const workflow = _fetchVisitStats(response.entity)
//             const data = formatVisit(response.entity.data)
//             return data
//         } else if (response.statusCode === 401) {
//             // Login expire or not valid, return to login
//             backToLogin()
//         } else {
//             throw new Error(response.msg)
//         }
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// }