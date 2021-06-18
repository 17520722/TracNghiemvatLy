import * as Types from "../constants/TypeActions";

export const set_current_chart = (number) => {
    return {
        type: Types.SET_CURRENT_CHART,
        number
    }
}