import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from "../../constants/constants";

const initialState = {
    isOpen: false
};

function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {
                ...state,
                isOpen: true
            };
        case CLOSE_SIDEBAR:
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
}

export default sidebarReducer;
