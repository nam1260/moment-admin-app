

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test";

const GET_RGST_STAR_STATUS = "/star/get-rgst-star-status";

const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}


const AWSManager = (function() {

    const getUrl = (url) => {
        return SERVER_URL + url;
    };

    const requestPost = (url, params) => {
        return axios.post(url, params, {headers});
    };

    const getRgstStarStatus = async (params) => {
        console.log("regUserInfo = " + JSON.stringify(params));
        return await requestPost(getUrl(GET_RGST_STAR_STATUS), params);
    };

    return {
        getRgstStarStatus
    }



}());


export default AWSManager;