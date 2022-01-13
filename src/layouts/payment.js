import AWSManager from '../managers/AWSManager';



const testParams = {
    "userId" : "6541520@naver.com",
    "starId" : "leebona@gmail.com",
    "payType" : "0",
    "price" : 10000,
    "payStatus" : "0",
    "aprvNum" : "014234",
    "pgNm" : "kakao",
    "cardNm" : "shinhan",
    "cardNum" : "0101-0101-0101-0101"

}


const onClickGetBtn =()=>{

    //시험용
    AWSManager.getPaymentList({
        postData: {
            key: "all",
            value: ""
        }

    })

}


const onClickRegBtn =()=>{

    AWSManager.regPaymentInfo({
        postData: {
            userId: "nam1260@gmail.com",
            starId: "leebona@gmail.com",
            payType: "0",
            price: 20000,
            payStatus: "0",
            aprvNum: "",
            pgNm: "normal",
            carNm: "",
            carNum: "",
            userBankNm : "김두환",
            userAccountNm: "종로은행",
            userAccountNum: "110220330402"
        }
    })
}

const onClickUpdateBtn = ()=>{
    AWSManager.updatePaymentInfo({
        postData: {
            payNo: "2",
            userId: "6541520@naver.com",
            payStatus: "1",
        }
    })
}

const onClickDeleteBtn = () => {
    AWSManager.deletePaymentInfo({
        postData: {
            payNo: "2",
            userId: "6541520@naver.com"
        }
    })
}



const payment = ((parentView)=>{

    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("결제 내역 조회"));
    titleArea.append($("<div/>",{class: "subTitle"}).html("<br>결제 내역을 조회 / 상태 변경 합니다<br><br>"));


    let buttonArea = $("<div/>", {class: "buttonArea"});

    buttonArea.append($("<button/>",{id:"get"}).text("조회").on("click",onClickGetBtn));
    buttonArea.append($("<button/>",{id:"reg"}).text("등록").on("click",onClickRegBtn));
    buttonArea.append($("<button/>",{id:"update"}).text("업데이트").on("click",onClickUpdateBtn));
    buttonArea.append($("<button/>",{id:"delete"}).text("삭제").on("click",onClickDeleteBtn));

    parentView.append(titleArea,buttonArea);




});
export default payment;