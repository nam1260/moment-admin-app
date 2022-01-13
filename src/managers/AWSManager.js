

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test";

const GET_RGST_STAR_STATUS = "/star/get-rgst-star-status";
const UPDATE_RGST_STAR_STATUS = "/star/update-rgst-star-status";
const REQ_RGST_STAR = "/star/req-rgst-star";
const CHECK_DUPL_ID  =  "/user/check-dupl-id";
const SEND_MESSAGE_TO_STAR = "/msg/send-msg-to-star";
const GET_MSG_LIST = "/msg/get-msg-list-test";
const UPDATE_STAR_MSG_INFO = "/msg/update-star-msg-info";

//payment 관련
const GET_PAYMENT_LIST = "/pay/get-payment-list";
const REG_PAYMENT_INFO = "/pay/reg-payment-info";
const UPDATE_PAYMENT_INFO = "/pay/update-payment-info";
const DELETE_PAYMENT_INFO = "/pay/delete-payment-info";


const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}


const AWSManager = (function() {

    const getUrl = (url) => {
        return SERVER_URL + url;
    };

    const requestPost = (url, params) => {

        axios({
            method: 'post',
            url: url,
            headers: headers,
            data: params.postData
        }).then(handleResponse)
        .catch(handleError);

        function handleResponse(response) {
            console.log("handleResponse");
            console.log(response);
            if(params.callback) params.callback(true,response);
        }
        function handleError(error) {
            console.log("handleError");
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
            }
            else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
            }
            console.log(error.config);
            if(params.callback) params.callback(false)
        }
    };

    const getRgstStarStatus = (params) => {
        console.log("getRgstStarStatus");
        requestPost(getUrl(GET_RGST_STAR_STATUS), params);
    };


    const reqRgstStar = (params) => {
        console.log("reqRgstStar = " + JSON.stringify(params));
        requestPost(getUrl(REQ_RGST_STAR), params);
    };

    const updateRgstStarStatus = (params) => {
        console.log("updateRgstStarStatus = " + JSON.stringify(params));
        requestPost(getUrl(UPDATE_RGST_STAR_STATUS), params);
    };
    const checkDuplId = (params) => {
        console.log("checkDuplId = " + JSON.stringify(params));
        requestPost(getUrl(CHECK_DUPL_ID), params);
    };
    const sendMessageToStar = (params) => {
        console.log("sendMessageToStar = " + JSON.stringify(params));
        requestPost(getUrl(SEND_MESSAGE_TO_STAR), params);
    };


    const getMsgList = (params) => {
        console.log("getMsgList = " +JSON.stringify(params));
        requestPost(getUrl(GET_MSG_LIST), params);
    }

    const updateStarMsgInfo = (params) => {
        console.log("updateStarMsgInfo = " +JSON.stringify(params));
        requestPost(getUrl(UPDATE_STAR_MSG_INFO), params);
    };


    const getPaymentList = (params) => {
        console.log("getPaymentList =" + JSON.stringify(params));
        requestPost(getUrl(GET_PAYMENT_LIST), params);
    }

    const updatePaymentInfo = (params) => {
        console.log("updatePaymentInfo =" + JSON.stringify(params));
        requestPost(getUrl(UPDATE_PAYMENT_INFO), params);
    }
    const regPaymentInfo = (params) => {
        console.log("regPaymentInfo =" + JSON.stringify(params));
        requestPost(getUrl(REG_PAYMENT_INFO), params);
    }
    const deletePaymentInfo = (params) => {
        console.log("deletePaymentInfo =" + JSON.stringify(params));
        requestPost(getUrl(DELETE_PAYMENT_INFO), params);
    }




    return {
        getRgstStarStatus,
        updateRgstStarStatus,
        reqRgstStar,
        checkDuplId,
        sendMessageToStar,
        getMsgList,
        updateStarMsgInfo,

        getPaymentList,
        updatePaymentInfo,
        regPaymentInfo,
        deletePaymentInfo
    }



}());


export default AWSManager;