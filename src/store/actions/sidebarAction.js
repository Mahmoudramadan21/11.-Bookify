import { CLOSE_SIDEBAR, OPEN_SIDEBAR } from "../../constants/constants"

export function openSidebar() {
    return {
        type: OPEN_SIDEBAR
    }
}

export function closeSidebar() {
    return {
        type: CLOSE_SIDEBAR
    }
}