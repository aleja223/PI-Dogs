import axios from "axios";

export const GET_DOGS = "GET_DOGS";

export const getDogs = () => {
    return async function (dispatch) {
        const apiData = await axios.get("https://api.thedogapi.com/v1/breeds"
        );
        const dogs = apiData.data;
        dispatch({type:GET_DOGS, payload: dogs });
    };
};
 


