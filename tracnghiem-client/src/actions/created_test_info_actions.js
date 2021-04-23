import * as Types from "../constants/TypeActions";

export const set_created_test_info = (test) => {
    return {
        type: Types.SET_CREATED_TEST_INFO,
        test
    }
}