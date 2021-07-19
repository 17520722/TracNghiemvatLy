import * as Types from "../constants/TypeActions";

export const choose_class_homepage = (classing) => {
    return {
        type: Types.CHOOSE_CLASS_HOMEPAGE,
        classing
    }
}