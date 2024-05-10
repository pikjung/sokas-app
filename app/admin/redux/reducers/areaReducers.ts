import * as actionTypes from "../types";

const initialState = {
  area: [],
  loading: false,
  error: null
}

const areaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_AREAS_REQUEST:
    case actionTypes.ADD_AREAS_REQUEST:
    case actionTypes.UPDATE_AREAS_REQUEST:
    case actionTypes.DELETE_AREAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.FETCH_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas: actionTypes.payload
      }
    case actionTypes.ADD_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas: [...state.areas, action.payload]
      }
    case actionTypes.UPDATE_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas: state.areas.map(area => {
          if (area.id === action.payload.id) {
            return action.payload.updateArea
          }
          return area
        }),
        error: null
      }
    case actionTypes.DELETE_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas: state.areas.filter(area => area.id !== action.payload.id),
        error: null
      }
    case actionTypes.FETCH_AREAS_FAILURE:
    case actionTypes.ADD_AREAS_FAILURE:
    case actionTypes.UPDATE_AREAS_FAILURE:
    case actionTypes.DELETE_AREAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};

export default areaReducer