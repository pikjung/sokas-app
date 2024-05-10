import * as actionTypes from "../types";

export const fetchAreasRequest = () => ({
  type: actionTypes.FETCH_AREAS_REQUEST
})

export const fetchAreasSuccess = (area: any) => ({
  type: actionTypes.FETCH_AREAS_SUCCESS,
  payload: area
})

export const fetchAreasFailure = (error: any) => ({
  type: actionTypes.FETCH_AREAS_FAILURE,
  package: error
})

export const addAreaRequest = () => ({
  type: actionTypes.ADD_AREAS_REQUEST,
})

export const addAreaSuccess = (area: any) => ({
  type: actionTypes.ADD_AREAS_SUCCESS,
  payload: area
})

export const addAreaFailure = (error: any) => ({
  type: actionTypes.ADD_AREAS_FAILURE,
  payload: error
})

export const updateAreaRequest = () => ({
  type: actionTypes.UPDATE_AREAS_REQUEST,
})

export const updateAreaSuccess = (id: string, area: any) => ({
  type: actionTypes.UPDATE_AREAS_SUCCESS,
  payload: { id, area }
})

export const updateAreaFailure = (error: string) => ({
  type: actionTypes.UPDATE_AREAS_FAILURE,
  payload: error
})

export const deleteAreaRequest = () => ({
  type: actionTypes.DELETE_AREAS_REQUEST,
})

export const deleteAreaSuccess = (id: string) => ({
  type: actionTypes.DELETE_AREAS_SUCCESS,
  packageId: id
})

export const deleteAreaFailure = (error: string) => ({
  type: actionTypes.DELETE_AREAS_FAILURE,
  packageId: error
})