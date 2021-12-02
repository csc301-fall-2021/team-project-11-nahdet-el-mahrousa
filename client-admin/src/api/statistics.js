import * as http from "utils/http"

export async function fetchVisitStats(params) {
    try {
        const response = await http.get('/statistics/visit', params)
        return response
    } catch (error) {
        throw error
    }
}

export async function fetchStayTime(params) {
    try {
        const response = await http.get('/statistics/averageStayTime', params)
        return response
    } catch (error) {
        throw error
    }
}

export async function fetchPlatform(params) {
    try {
        const response = await http.get('/statistics/platform', params)
        return response
    } catch (error) {
        throw error
    }
}

export async function fetchAllReplies() {
    try {
        const response = await http.get('/admin/bot/reply')
        return response
    } catch (error) {
        throw error
    }
}