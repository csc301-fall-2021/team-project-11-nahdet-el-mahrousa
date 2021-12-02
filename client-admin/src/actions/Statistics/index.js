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
        console.error(err)
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
        console.error(err)
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
        console.error(err)
        throw err
    }
}

export async function requestWeeklyVisitStat() {
    function getLastWeek() {
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        return lastWeek;
    }

    function sumVisit(data) {
        const locationVisits = {}
        let maxLocation = ""
        let maxLocationVisits = 0
        let sum = 0
        data.forEach(d => {
            let visit = Number(d.visit)
            sum += visit
            locationVisits[d.location] = locationVisits[d.location] ? locationVisits[d.location] + visit : visit
            if (locationVisits[d.location] > maxLocationVisits){
                maxLocationVisits = locationVisits[d.location]
                maxLocation = d.location
            }
        })
        return {
            maxLocation,
            maxLocationVisits,
            sum
        }
    }

    const startDate = getLastWeek().toISOString().split('T')[0]
    const endDate = (new Date()).toISOString().split('T')[0]

    try {
        const response = await api.fetchVisitStats({ startDate, endDate })

        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const data = sumVisit(response.entity.data)
            return data
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


export async function requestGetAvgStayTime(params) {
    function format(data) {
        return data.map(d => {
            return {
                location: d.location,
                averagePageDuration: Number(d.averagePageDuration)
            }
        })
    }

    params.startDate = params.startDate || "2021-11-01"
    params.endDate = params.endDate || "2021-12-03"

    try {
        const response = await api.fetchStayTime(params)
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            const data = format(response.entity.averagePageDuration.data)
            return data
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