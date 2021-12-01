import * as http from "utils/http"

export async function fetchVisitStats ( params = {startDate:"2021-11-01", endDate:"2021-12-03"} ) {
   try {
      const response = await http.get('/statistics/visit', params)
      return response
  } catch (error) {
      throw error
  }
}

export async function fetchStayTime ( params = {startDate:"2021-11-01", endDate:"2021-12-03", from:"Reply"} ) {
   try {
      const response = await http.get('/statistics/averageStayTime', params)
      return response
  } catch (error) {
      throw error
  }
}

export async function fetchPlatform ( params = {startDate:"2021-11-01", endDate:"2021-12-03", from:"Reply"} ) {
   try {
      const response = await http.get('/statistics/platform', params)
      return response
  } catch (error) {
      throw error
  }
}