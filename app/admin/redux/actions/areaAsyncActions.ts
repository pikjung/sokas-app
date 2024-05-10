import * as areaActions from "./areaActions";
import axios from "axios";
import apiUrl from "@/app/config";
import { getToken } from "../../utils/getToken";

export const fetchAreas = () => {
  return async (dispatch: any) => {
    dispatch(areaActions.fetchAreasRequest());
    try {
      const response = await axios.get(`${apiUrl}/admin/area`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      dispatch(areaActions.fetchAreasSuccess(response.data.data))
    } catch (error: any) {
      dispatch(areaActions.fetchAreasFailure(error.message))
    }
  }
}

export const addArea = (areaData: any) => {
  return async (dispatch: any) => {
    dispatch(areaActions.addAreaRequest())
    try {
      const response = await axios.post(`${apiUrl}/admin/area`, areaData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      dispatch(areaActions.addAreaSuccess(response.data.data))
    } catch (error: any) {
      dispatch(areaActions.addAreaFailure(error.message))
    }
  }
}

export const updateArea = (id: string, updateAreaData: any) => {
  return async (dispatch: any) => {
    dispatch(areaActions.updateAreaRequest())
    try {
      const response = await axios.put(`${apiUrl}/admin/area/${id}`, updateAreaData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      dispatch(areaActions.updateAreaSuccess(id, response.data.dat))
    } catch (error: any) {
      dispatch(areaActions.updateAreaFailure(error.message))
    }
  }
}

export const deleteArea = (id: string) => {
  return async (dispatch: any) => {
    dispatch(areaActions.deleteAreaRequest())
    try {
      const response = await axios.delete(`${apiUrl}/admin/area/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      dispatch(areaActions.deleteAreaSuccess(id))
    } catch (error: any) {
      dispatch(areaActions.deleteAreaFailure(error.message))
    }
  }
}