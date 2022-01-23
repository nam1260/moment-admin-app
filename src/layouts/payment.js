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

const onClickUpdateBtn = (e)=>{

    if(e.target.id !=="update") return ;

    let userId = $(".paymentInfoBox #userId #value").text();
    let payNo = $(".paymentInfoBox #payNo #value").text();
    let payStatus = $(".paymentInfoBox input")[0].value;
    AWSManager.updatePaymentInfo({
        postData: {
            payNo: payNo,
            userId: userId,
            payStatus: payStatus,
        },
        callback: function(result) {
            if(result) {
                alert("변경되었습니다. 새로고침해주세요");
            }
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


    const makeMessageListTable= (result,response) => {

        if(!response.data || response.data.length === 0) {
            alert("조회된 메시지 리스트가 없습니다.");
            return ;
        }

        let tableElm = $(".contentView table");
        if(tableElm) tableElm.remove();

        tableElm = getTableTitleArea();

        parentView.append(tableElm);

        if(response && response.data) {
            response.data.filter(item=>item).forEach((item,idx)=>{
                let trTag = $("<tr/>",{class: "payment_ "+[idx]} );
                trTag.append(
                    $("<td/>",{id: "payNo"}).text(item.payNo),
                    $("<td/>",{id: "msgId"}).text(item.msgId),
                    $("<td/>",{id: "orderId"}).text(item.orderId),
                    $("<td/>",{id: "userId"}).text(item.userId),
                    $("<td/>",{id: "starId"}).text(item.starId),
                    $("<td/>",{id: "payType"}).text(item.payType),
                    $("<td/>",{id: "pgNm"}).text(item.pgNm),
                    $("<td/>",{id: "price"}).text(item.price),
                    $("<td/>",{id: "payStatus"}).text(item.payStatus),
                    $("<td/>",{id: "aprvNum"}).text(item.aprvNum),
                    $("<td/>",{id: "cardNm"}).html(item.cardNm),
                    $("<td/>",{id: "cardNum"}).text(item.cardNum),
                    $("<td/>",{id: "userBankNm"}).text(item.userBankNm),
                    $("<td/>",{id: "userAccountNm"}).text(item.userAccountNm),
                    $("<td/>",{id: "userAccountNum"}).text(item.userAccountNum || item.userAccountNnm),
                    $("<td/>",{id: "emPhoneNum"}).text(item.emPhoneNum))
                .on("click",function(e){
                    let selectedPayNo = $(".paymentInfoBox #payNo #value");
                    let selectedMsgId = $(".paymentInfoBox #msgId #value");
                    let selectedOrderId = $(".paymentInfoBox #orderId #value");
                    let selectedUserId = $(".paymentInfoBox #userId #value");
                    let selectedStarId = $(".paymentInfoBox #starId #value");
                    let selectedPayType = $(".paymentInfoBox #payType #value");
                    let selectedPgNm = $(".paymentInfoBox #pgNm #value");
                    let selectedPrice = $(".paymentInfoBox #price #value");
                    let selectedPayStatus = $(".paymentInfoBox #payStatus #value");
                    let selectedAprvNum = $(".paymentInfoBox #aprvNum #value");
                    let selectedCardNm = $(".paymentInfoBox #cardNm #value");
                    let selectedCardNum = $(".paymentInfoBox #cardNum #value");
                    let selectedUserBankNm = $(".paymentInfoBox #userBankNm #value");
                    let selectedUserAccountNm = $(".paymentInfoBox #userAccountNm #value");
                    let selectedUserAccountNum = $(".paymentInfoBox #userAccountNum #value");
                    let selectedEmPhoneNum = $(".paymentInfoBox #emPhoneNum #value");

                    selectedPayNo.text(e.currentTarget.querySelector("#payNo").textContent);
                    selectedMsgId.text(e.currentTarget.querySelector("#msgId").textContent);
                    selectedOrderId.text(e.currentTarget.querySelector("#orderId").textContent);
                    selectedUserId.text(e.currentTarget.querySelector("#userId").textContent);
                    selectedStarId.text(e.currentTarget.querySelector("#starId").textContent);
                    selectedPayType.text(e.currentTarget.querySelector("#payType").textContent);
                    selectedPgNm.text(e.currentTarget.querySelector("#pgNm").textContent);
                    selectedPrice.text(e.currentTarget.querySelector("#price").textContent);
                    selectedPayStatus.text(e.currentTarget.querySelector("#payStatus").innerHTML);
                    selectedAprvNum.text(e.currentTarget.querySelector("#aprvNum").textContent);
                    selectedCardNm.text(e.currentTarget.querySelector("#cardNm").textContent);
                    selectedCardNum.text(e.currentTarget.querySelector("#cardNum").textContent);
                    selectedUserBankNm.text(e.currentTarget.querySelector("#userBankNm").textContent);
                    selectedUserAccountNm.text(e.currentTarget.querySelector("#userAccountNm").textContent);
                    selectedUserAccountNum.text(e.currentTarget.querySelector("#userAccountNum").textContent);
                    selectedEmPhoneNum.text(e.currentTarget.querySelector("#selectedEmPhoneNum").textContent);



                    e.stopPropagation();
                });
                tableElm.append(trTag);
            })
        }
    };
    const onClickGetBtn =(e)=>{

        const target = e.target.parentElement;

        const key = target.id;
        const value = target.querySelector("input").value;

        if(!value) {
            alert("값을 입력해주세요");
            return ;
        }

        // //시험용
        AWSManager.getPaymentList({
            postData: {
                key: key,
                value: value
            },
            callback: makeMessageListTable

        })

    }


    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("결제 내역 조회"));
    titleArea.append($("<div/>",{class: "subTitle"}).html("<br>결제 내역을 조회 / 상태 변경 합니다<br><br>"));



    let searchArea = $("<div/>", {class: "searchArea"});

    searchArea.append(
        $("<div/>", {id: "userId"}).append(
            $("<span/>").text("보낸사람 ID로 조회"),
            $("<input/>", {type: "text", placeholder: "보낸 사람 id 입력"}),
            $("<button/>").text("조회").on("click", onClickGetBtn)
        ),
        $("<div/>", {id: "starId"}).append(
            $("<span/>").text("받은사람 ID로 조회"),
            $("<input/>", {type: "text", placeholder: "받는 사람 id 입력"}),
            $("<button/>").text("조회").on("click", onClickGetBtn)
        ),

        $("<div/>", {id: "payStatus"}).append(
            $("<span/>").text("결제 처리 상태로 조회"),
            $("<input/>", {style: "min-width: 250px",type: "text", placeholder: "0: 결제전, 1: 결제완료 2: 결제취소"}),
            $("<button/>").text("조회").on("click", onClickGetBtn),
            $("<br/>").text("조회").on("click", onClickGetBtn)
        )
    );



    const getPaymentInfoBox = () => {
        let paymentInfoBox = $("<div/>", {class: "paymentInfoBox"}).on("click",onClickUpdateBtn);

        paymentInfoBox.append(
            $("<div/>", {id: "payNo"}).append($("<span />").text("결제 번호"),$("<span />",{id:"value"})),
            $("<div/>", {id: "msgId"}).append($("<span />").text("메시지 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "orderId"}).append($("<span />").text("주 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "userId"}).append($("<span />").text("보낸 사람: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "starId"}).append($("<span />").text("받는 사람: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "payType"}).append($("<span />").text("결제 타입"),$("<span />",{id:"value"})),
            $("<div/>", {id: "pgNm"}).append($("<span />").text("결제 수단"),$("<span />",{id:"value"})),
            $("<div/>", {id: "price"}).append($("<span />").text("결제 금액: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "payStatus"}).append($("<span />").text("결제 상태: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "aprvNum"}).append($("<span />").text("승인 번호: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "cardNm"}).append($("<span />").text("카드 이름: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "cardNum"}).append($("<span />").text("카드 번호: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "userBankNm"}).append($("<span />").text("입금자 : "), $("<span />", {id: "value"})),
            $("<div/>", {id: "userAccountNm"}).append($("<span />").text("계좌 이름 : "), $("<span />", {id: "value"})),
            $("<div/>", {id: "userAccountNum"}).append($("<span />").text("계좌 번호: "), $("<span />", {id: "value"})),
            $("<div/>", {id: "emPhoneNum"}).append($("<span />").text("긴급 연락처: "), $("<span />", {id: "value"})),
            $("<br/>"),

        ).append(
            $("<span class='answer'/>")
            .css({"text-align": "left"})
            .text("상태 변경"),
            $("<input/>",{style: "min-width: 200px",type: 'number',placeholder:"0: 결제전, 1:결제완료, 2:결제취소"}),
            $("<button/>",{id:"update"}).text("업데이트"),
            $("<br/>"),
            $("<br/>")
        );

        return paymentInfoBox;

    }



    const getTableTitleArea = () => {

        const tableTitle = $(
            "<table border='1'>" +
            "<tr>" +
            "<th>결제 번호</th>" +
            "<th>사연 번호</th>" +
            "<th>주문 id</th>" +
            "<th>보낸 사람</th>" +
            "<th>받는 사람</th>" +
            "<th>결제 타입</th>" +
            "<th>결제 수단</th>" +
            "<th>결제 금액</th>" +
            "<th>결제 상태</th>" +
            "<th>승인 번호</th>" +
            "<th>카드 이름</th>" +
            "<th>카드 번호</th>" +
            "<th>입금자명</th>" +
            "<th>계좌 이름</th>" +
            "<th>계좌 번호</th>" +
            "<th>긴급 연락처</th>" +
            "</tr>" +
            "</table>");

        return tableTitle;
    }




    






     parentView.append(titleArea,getPaymentInfoBox(),searchArea);




});
export default payment;