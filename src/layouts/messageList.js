import AWSManager from '../managers/AWSManager';


const onSelectChangeStatus = (e) => {

    let postData = {};

    postData.msgId = $(".msgInfoBox #msgId #value").text();
    postData.userId = $(".msgInfoBox #userId #value").text();
    postData.starId = $(".msgInfoBox #starId #value").text();
    postData.regDate = $(".msgInfoBox #regDate #value").text();
    postData.deliveryDate = $(".msgInfoBox #deliveryDate #value").text();
    postData.msgStatus = $(".msgInfoBox #msgStatus #value").text();

    postData.msgTitle = $(".msgInfoBox #msgTitle #value").text();
    postData.msgContents = $(".msgInfoBox #msgContents #value").text();
    postData.mediaLinkUrl = $(".msgInfoBox #mediaLinkUrl #value").text();
    postData.msgComment = $(".msgInfoBox #msgComment #value").text();


    console.log(postData);
    console.log(e.target.className);
    if(!postData.msgId) {
        alert("선택된 사연이 없습니다");
        return;
    }

    switch (e.target.className) {

        //영상 링크 검증 클릭
        //"80" 인 경우만 유효
        //전달 완료로 바꿔야 함 혹은 공급자에게 연락
        case "acceptLink":
            if(postData.msgStatus !== "80") {
                alert("링크 검증 가능한 상태가 아닙니다"); return;
            }
            postData.msgStatus = "3";
            break;

        // 입금 대기 상태
        // "90" or "91"인 경우만 유효
        case "acceptMsg":
            if(postData.msgStatus !== "90" && postData.msgStatus !== "91") {
                alert("사연 승인 가능한 상태가 아닙니다"); return;
            }
            postData.msgStatus = "0";
            break;

        // 사연 거절(취소 처리)
        // "90" or "91"인 경우만 유효
        case "rejectMsg":
            if(postData.msgStatus !== "90" && postData.msgStatus !== "91") {
                alert("사연 거절 가능한 상태가 아닙니다"); return;
            }
            postData.msgStatus = "2";
            //TODO 결제취소
            break;
        case "_80_":
            postData.msgStatus = "80";
            break;
        case "_81_":
            postData.msgStatus = "81";
            break;
        case "_0_":
            postData.msgStatus = "0";
            break;
        case "_1_":
            postData.msgStatus = "1";
            break;
        case "_2_":
            postData.msgStatus = "2";
            break;
        case "_3_":
            postData.msgStatus = "3";
            break;
        case "_4_":
            postData.msgStatus = "4";
            break;
        case "_91_":
            postData.msgStatus = "91";
            break;
        case "_90_":
            postData.msgStatus = "90";
            break;
        case "_92_":
            postData.msgStatus = "92";
            break;
        default:
            return ;
            break;
    }

    AWSManager.updateStarMsgInfo({
        postData,
        callback
    })

    function callback(result) {
        if(result) {
            alert("변경되었습니다")
        }
    }

};


const messageList=((parentView) => {


    const getMsgInfoBox = () => {
        let msgInfoBox = $("<div/>", {class: "msgInfoBox"});

        msgInfoBox.append(
            $("<div/>", {id: "msgId"}).append($("<span />").text("메시지 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "userId"}).append($("<span />").text("보낸 사람: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "starId"}).append($("<span />").text("받는 사람: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "regDate"}).append($("<span />").text("등록일 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "deliveryDate"}).append($("<span />").text("배송희망일: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "msgStatus"}).append($("<span />").text("메시지 상태: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "msgTitle"}).append($("<span />").text("메시지 제목: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "msgContents"}).append($("<span />").text("메시지내용: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "mediaLinkUrl"}).append($("<span />").text("영상 링크: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "msgComment"}).append($("<span />").text("축하 소감: "),$("<span />",{id:"value"}))
        ).append(
            $("<span class='answer'/>")
            .css({"text-align": "left"})
            .text("상태 변경"),
            $("<button class='acceptLink'>영상 승인(3) 처리</button>").on("click",onSelectChangeStatus),
            $("<button class='acceptMsg'>정상 사연(0) 처리</button>").on("click",onSelectChangeStatus),
            $("<button class='rejectMsg'>사연 거절(취소) (2) 처리</button>").on("click",onSelectChangeStatus),
            $("<br/>"),
            $("<br/>"),
            $("<button class='_81_'>영상 부적합(81)</button>").on("click",onSelectChangeStatus),
            $("<button class='_80_'>영상 검증 필요(80)</button>").on("click",onSelectChangeStatus),
            $("<button class='_0_'>정상 사연 처리(0)</button>").on("click",onSelectChangeStatus),
            $("<button class='_1_'>사연 수락 처리(1)</button>").on("click",onSelectChangeStatus),
            $("<button class='_2_'>사연 거절 처리(2)</button>").on("click",onSelectChangeStatus),
            $("<button class='_3_'>배송 완료 처리(3)</button>").on("click",onSelectChangeStatus),
            $("<button class='_4_'>영상 취소 처리(4)</button>").on("click",onSelectChangeStatus),
            $("<button class='_90_'>입금 대기 처리(90)</button>").on("click",onSelectChangeStatus),
            $("<button class='_91_'>결제 완료 처리(91)</button>").on("click",onSelectChangeStatus),
            $("<button class='_92_'>결제 취소 처리(92)</button>").on("click",onSelectChangeStatus),
            $("<br/>"),

        );

        return msgInfoBox;

    }



    const makeGetMsgListBox = () => {
        let msgListBox = $("<div/>", {class: "msgListBox"})
        .append(
            $("<span/>").text("메시지 상태로 조회 "),
            $("<input/>",{style: "width: 300px",class: "inputArea",placeholder: "80(링크 검증 필요 사연),90(결제 대기 사연), 91(결제 완료사연)"}),
            $("<button/>",{class: "searchBtn"}).text("조회").on("click",onClickGetStatus))
        .append(
            $("<br/>"),
            $("<span/>").text("보낸사람 id로 조회 "),
            $("<input/>",{style: "width: 300px",class: "inputArea",placeholder: "유저 id 입력"}),
            $("<button/>",{class: "searchBtn"}).text("조회").on("click",onClickGetUser))
        .append(
            $("<br/>"),
            $("<span/>").text("받은사람 id로 조회"),
            $("<input/>",{style: "width: 300px",class: "inputArea",placeholder: "스타 id 입력"}),
            $("<button/>",{class: "searchBtn"}).text("조회").on("click",onClickGetStar)
        )



        function onClickGetStatus(e) {
            let key = msgListBox.find(".inputArea")[0].value;
            AWSManager.getMsgList({
                postData: {
                    key: "msgStatus",
                    value: key,
                },
                callback: makeMessageListTable
            });

        }

        function onClickGetUser(e) {
            let key = msgListBox.find(".inputArea")[1].value;
            AWSManager.getMsgList({
                postData: {
                    key: "userId",
                    value: key,
                },
                callback: makeMessageListTable
            });

        }


        function onClickGetStar(e) {
            let key = msgListBox.find(".inputArea")[2].value;
            AWSManager.getMsgList({
                postData: {
                    key: "starId",
                    value: key,
                },
                callback: makeMessageListTable
            });

        }


        return msgListBox;
    };


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
                let trTag = $("<tr/>",{class: "msg_ "+[idx]} );
                trTag.append(
                    $("<td/>",{id: "msgId"}).text(item.msgId),
                    $("<td/>",{id: "userId"}).text(item.userId),
                    $("<td/>",{id: "starId"}).text(item.starId),
                    $("<td/>",{id: "regDate"}).text(item.regDate),
                    $("<td/>",{id: "deliveryDate"}).text(item.deliveryDate),
                    $("<td/>",{id: "msgStatus"}).text(item.msgStatus),
                    $("<td/>",{id: "msgTitle"}).text(item.msgTitle),
                    $("<td/>",{id: "msgContents"}).html(item.msgContents),
                    $("<td/>",{id: "mediaLinkUrl"}).text(item.mediaLinkUrl),
                    $("<td/>",{id: "msgComment"}).text(item.msgComment))
                .on("click",function(e){
                    let selectedMsgId = $(".msgInfoBox #msgId #value");
                    let selectedUserId = $(".msgInfoBox #userId #value");
                    let selectedStarId = $(".msgInfoBox #starId #value");
                    let selectedRegDate = $(".msgInfoBox #regDate #value");
                    let selectedDeliveryDate = $(".msgInfoBox #deliveryDate #value");
                    let selectedMsgStatus = $(".msgInfoBox #msgStatus #value");

                    let selectedMsgTitle = $(".msgInfoBox #msgTitle #value");
                    let selectedMsgContents = $(".msgInfoBox #msgContents #value");
                    let selectedMediaLinkUrl = $(".msgInfoBox #mediaLinkUrl #value");
                    let selectedMsgComment = $(".msgInfoBox #msgComment #value");


                    selectedMsgId.text(e.currentTarget.querySelector("#msgId").textContent);
                    selectedUserId.text(e.currentTarget.querySelector("#userId").textContent);
                    selectedStarId.text(e.currentTarget.querySelector("#starId").textContent);
                    selectedRegDate.text(e.currentTarget.querySelector("#regDate").textContent);
                    selectedDeliveryDate.text(e.currentTarget.querySelector("#deliveryDate").textContent);
                    selectedMsgStatus.text(e.currentTarget.querySelector("#msgStatus").textContent);
                    selectedMsgTitle.text(e.currentTarget.querySelector("#msgTitle").textContent);
                    selectedMsgContents.text(e.currentTarget.querySelector("#msgContents").innerHTML);
                    selectedMediaLinkUrl.text(e.currentTarget.querySelector("#mediaLinkUrl").textContent);
                    selectedMsgComment.text(e.currentTarget.querySelector("#msgComment").textContent);
                    e.stopPropagation();
                });
                tableElm.append(trTag);
            })
        }
    };

    const getTableTitleArea = () => {

        const tableTitle = $(
            "<table border='1'>" +
            "<tr>" +
            "<th>MSG ID</th>" +
            "<th>보낸사람</th>" +
            "<th>받는 사람</th>" +
            "<th>등록일 </th>" +
            "<th>배송희망일</th>" +
            "<th>메시지 상태</th>" +
            "<th>메시지 제목</th>" +
            "<th>메시지 내용</th>" +
            "<th>영상 링크</th>" +
            "<th>축하 소감</th>" +
            "</tr>" +
            "</table>");

        return tableTitle;
    }



    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("팬 사연 관리"));
    titleArea.append($("<div/>",{class: "subTitle"}).text("팬들이 보낸 사연에 대한 유효성을 \n" +
        "검토하여 승인/거절 처리합니다"));

    parentView.append(titleArea,getMsgInfoBox(),makeGetMsgListBox());

});
export default messageList;