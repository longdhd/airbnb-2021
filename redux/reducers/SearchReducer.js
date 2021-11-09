import {FILTER_SEARCH, GET_SEARCH} from './../types/SearchType'

const stateDefault = {
    searchOutput:[]
}

export const SearchReducer = (state=stateDefault,action) => {
    switch (action.type) {
        case GET_SEARCH:
            state.searchOutput = action.searchOutput;
            return {...state}
        case FILTER_SEARCH:
            state.searchOutput = action.filterOutput;
            return {...state}
        default:
            return {...state}
    }
}