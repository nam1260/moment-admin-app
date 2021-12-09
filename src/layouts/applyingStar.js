import AWSManager from '../managers/AWSManager';


function onSelectedUserBtnClick(e) {
    console.log(e);
    window.btnclick = e;

    if(e.target.className !== "accept" && e.target.className !== "reject") return ;

    let userId = $(".starInfoBox #userId #value").text();
    let adminComment = $(".starInfoBox input")[0].value;
    let starYn = "N";
    let starRegStatus = 0;

    if(!userId || !adminComment) {
        alert("사용자가 선택되지 않았거나 관리자 답변이 등록되지 않았습니다");
        return ;
    }

    if(e.target.className === "accept") {
        starYn = "Y";
        starRegStatus = 2;
    }
    else if(e.target.className === "reject") {
        starYn = "N";
        starRegStatus = 1;
    }

    AWSManager.updateRgstStarStatus({
        postData: {
            userId,
            adminComment,
            starYn,
            starRegStatus
        }
    })

}

const applyingStar = ((parentView)=>{

    const getStarInfoBox = () => {
        let starInfoBox = $("<div/>", {class: "starInfoBox"}).on("click",onSelectedUserBtnClick);

        starInfoBox.append(
            $("<div/>", {id: "userId"}).append($("<span />").text("사용자 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "kakaoId"}).append($("<span />").text("카카오톡 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "instaId"}).append($("<span />").text("인스타그램 id: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "youtubeChNm"}).append($("<span />").text("유튜브 채널 명: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "bankNm"}).append($("<span />").text("은행 명: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "accountNum"}).append($("<span />").text("계좌 번호: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "accountNm"}).append($("<span />").text("예금주: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "userComment"}).append($("<span />").text("사용자 답변: "),$("<span />",{id:"value"})),
            $("<div/>", {id: "adminComment"}).append($("<span />").text("관리자 답변: "),$("<span />",{id:"value"}))
        ).append(
            $("<span class='answer'/>")
            .css({"text-align": "left"})
            .text("관리자 답변"),
            $("<input/>"),
            $("<button class='accept'>수락</button>"),
            $("<button class='reject'>거절</button>")
        );

        return starInfoBox;

    }

    const makeSearchUserBox = () => {
        let searchUserBox = $("<div/>", {class: "searchUserBox"})
        .append(
            $("<span/>").text("사용자 id(email)"),
            $("<input/>",{class: "inputArea",placeholder:"전체 조회"}),
            $("<button/>",{class: "searchBtn"}).text("조회").on("click",onSearchBtnClick));

        function onSearchBtnClick(e) {
            let userId = searchUserBox.find(".inputArea")[0].value;
            AWSManager.getRgstStarStatus({
                postData:{userId: userId ? userId : undefined},
                callback: makeApplyingUserListTable
            });

        }

        return searchUserBox;
    };



    const makeApplyingUserListTable= (result,response) => {

        if(!response.data || response.data.length === 0) {
            alert("조회된 스타 등록 정보가 없습니다");
            return ;
        }

        let tableElm = $(".contentView table");
        if(tableElm) tableElm.remove();

        tableElm = getTableTitleArea();

        parentView.append(tableElm);

        if(response && response.data) {
            response.data.filter(item=>item.starYn !=="Y").forEach((item,idx)=>{
                let trTag = $("<tr/>",{class: "member_ "+[idx]} );
                trTag.append(
                    $("<td/>",{id: "userId"}).text(item.userId),
                    $("<td/>",{id: "kakaoId"}).text(item.kakaoId),
                    $("<td/>",{id: "instaId"}).text(item.instaId),
                    $("<td/>",{id: "youtubeChNm"}).text(item.youtubeChNm),
                    $("<td/>",{id: "bankNm"}).text(item.bankNm),
                    $("<td/>",{id: "accountNum"}).text(item.accountNum),
                    $("<td/>",{id: "accountNm"}).text(item.accountNm),
                    $("<td/>",{id: "userComment"}).text(item.userComment),
                    $("<td/>",{id: "adminComment"}).text(item.adminComment))
                .on("click",function(e){
                    let selectedUserId = $(".starInfoBox #userId #value");
                    let selectedKakaoId = $(".starInfoBox #kakaoId #value");
                    let selectedInstaId = $(".starInfoBox #instaId #value");
                    let selectedYoutubeChNm = $(".starInfoBox #youtubeChNm #value");
                    let selectedbankNm = $(".starInfoBox #bankNm #value");
                    let selectedAccountNum = $(".starInfoBox #accountNum #value");
                    let selectedAccountNm = $(".starInfoBox #accountNm #value");
                    let selectedUserComment = $(".starInfoBox #userComment #value");
                    let selectedAdminComment = $(".starInfoBox #adminComment #value");


                    selectedUserId.text(e.currentTarget.querySelector("#userId").textContent);
                    selectedKakaoId.text(e.currentTarget.querySelector("#kakaoId").textContent);
                    selectedInstaId.text(e.currentTarget.querySelector("#instaId").textContent);
                    selectedYoutubeChNm.text(e.currentTarget.querySelector("#youtubeChNm").textContent);
                    selectedbankNm.text(e.currentTarget.querySelector("#bankNm").textContent);
                    selectedAccountNum.text(e.currentTarget.querySelector("#accountNum").textContent);
                    selectedAccountNm.text(e.currentTarget.querySelector("#accountNm").textContent);
                    selectedUserComment.text(e.currentTarget.querySelector("#userComment").textContent);
                    selectedAdminComment.text(e.currentTarget.querySelector("#adminComment").textContent);
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
            "<th>ID</th>" +
            "<th>카카오톡 ID</th>" +
            "<th>인스타그램 ID</th>" +
            "<th>Youtube 채널명</th>" +
            "<th>계좌명</th>" +
            "<th>계좌번호</th>" +
            "<th>예금주</th>" +
            "<th>요청자 답변</th>" +
            "<th>관리자 답변</th>" +
            "</tr>" +
            "</table>");

        return tableTitle;
    }



    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("스타 신청 현황 조회"));
    titleArea.append($("<div/>",{class: "subTitle"}).html("<br>스타 등록 신청 현황을 조회 합니다. 수락 혹은 거절을 통해 스타 등록 처리를 할 수 있습니다.<br><br>"));

    parentView.append(titleArea,getStarInfoBox(),makeSearchUserBox());



});


export default applyingStar;