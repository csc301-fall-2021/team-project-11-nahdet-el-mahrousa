import * as api from "api/statistics"
import { backToLogin } from "actions/Auth"

function formatVisit ( data ) {
    return data.map(d=> {
        return {
            date: d.date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
            location: d.location,
            visit: Number(d.visit)
        }
    })
}

export async function requestGetVisitsStats( params ) {

    params.startDate = params.startDate||"2021-11-01"
    params.endDate = params.endDate||"2021-12-03"
    
    try {
        const response = await api.fetchVisitStats( params )
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            // const workflow = _fetchVisitStats(response.entity)
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

export async function requestGetStayTimeStats( params ) {

    params.startDate = params.startDate||"2021-11-01"
    params.endDate = params.endDate||"2021-12-03"
    params.from = params.from||"Reply"
    
    try {
        const response = await api.fetchStayTime( params )
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            // const workflow = _fetchVisitStats(response.entity)
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

export async function requestGetPlatformStats( params ) {

    params.startDate = params.startDate||"2021-11-01"
    params.endDate = params.endDate||"2021-12-03"
    params.from = params.from||"Location"
    
    try {
        const response = await api.fetchPlatform( params )
        if (response.statusCode === 200) {
            // Format body, to trim characters.
            // const workflow = _fetchVisitStats(response.entity)
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