
import AWSManager from "../managers/AWSManager";
import RegistStar from "./registStar";

const GET_RGST_STAR_STATUS = "스타 신청 현황 조회";
const REQ_REGIST_STAR = "스타 등록 신청서 작성";
const GET_USER_LIST = "사용자 조회";
const GET_MESSAGE_INFO = "사연 조회";

const menuArr = [GET_RGST_STAR_STATUS, REQ_REGIST_STAR, GET_USER_LIST, GET_MESSAGE_INFO];

let contentView;



class registInfo {

    constructor() {
        this.userInfo = null;
    }

    setRegistUserInfo = (...userInfo) => {
        this.userInfo = userInfo
    };
    getRegistUserInfo = () =>{
        return this.userInfo;
    }

}

const mainView = () => {

   let logoTitle = $("<img/>", {class: "logoTitle"});
   let naviMenu = $("<div/>", {class: "naviMenu"});
   contentView = $("<div/>", {class: "contentView"});

   $("#App").append(
       logoTitle,naviMenu,contentView
   );

   makeNaviMenu(naviMenu);

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

const showRgstStarStatus = ()=> {

    contentView.empty();


    contentView.append($("<div/>",{class: "selectedUser"}).on("click",onSelectedUserBtnClick)
        .append(
            "<div class ='selectedInfo'>" +
            "<div id ='userId'></div>" +
            "<div id ='userComment'></div>" +
            "</div>"
            )
        .append($("<span class='answer'/>").css({"text-align": "left"}).text("관리자 답변"),$("<input/>"),$("<button class='accept'>수락</button>"),$("<button class='reject'>거절</button>")));


    function onSelectedUserBtnClick(e) {
        console.log(e);
        window.btnclick = e;

        if(e.target.className !== "accept" && e.target.className !== "reject") return ;

        let userId = $(".selectedInfo #userId").text();
        let adminComment = $(".selectedUser input")[0].value;
        let starYn = "N";
        let starRegStatus = 0;

        if(!userId || !adminComment) {
            alert("사용자가 선택되지 않았거나 관리자 답변이 등록되지 않았습니다");
            return ;
        }

        if(e.target.className === "accept") {
            starYn = "Y";
            starRegStatus = 1;
        }
        else if(e.target.className === "reject") {
            starYn = "N";
            starRegStatus = 1;
        }

        AWSManager.updateRgstStarStatus({
            userId,
            adminComment,
            starYn,
            starRegStatus

        })

    }


    contentView.append($("<div/>",{class: "searchArea"})
        .append(
            $("<span/>").text("사용자 id(email)"),
            $("<input/>",{class: "inputArea"}),
            $("<button/>",{class: "searchBtn"}).text("조회").on("click",onSearchBtnClick))
    );

    function onSearchBtnClick(e) {
        console.log(e);

        var userId = contentView.find(".searchArea .inputArea")[0].value

        console.log("userID = "+ userId);
        AWSManager.getRgstStarStatus({
            userId: userId ? userId : undefined
        }).then(setStatusTable);


        e.stopPropagation();

    }

    function setStatusTable(result) {
        console.log(result);
        if(!result || !result.data || result.data.length < 1) {
            alert("조회된 스타 등록 정보가 없습니다");
            return ;
        }

        let tableElm = $(".contentView table");
        if(tableElm) tableElm.remove();

        tableElm = getTableTitleArea();

        contentView.append(tableElm);

        if(result && result.data) {
            for(let i = 0 ; i< result.data.length; i++) {
                let selectedData = result.data[i];
                let trTag = $("<tr/>",{class: "member_ "+[i]} );
                trTag.append(
                    $("<td/>",{class: "user_id"}).text(selectedData.user_id),
                    $("<td/>",{class: "kakaoId"}).text(selectedData.kakaoId),
                    $("<td/>",{class: "instaId"}).text(selectedData.instaId),
                    $("<td/>",{class: "youtubeChNm"}).text(selectedData.youtubeChNm),
                    $("<td/>",{class: "bankNm"}).text(selectedData.bankNm),
                    $("<td/>",{class: "accountNum"}).text(selectedData.accountNum),
                    $("<td/>",{class: "accountNm"}).text(selectedData.accountNm),
                    $("<td/>",{class: "userComment"}).text(selectedData.userComment),
                    $("<td/>",{class: "adminComment"}).text(selectedData.adminComment))
                    .on("click",function(e){


                        let selectedUserId = $(".selectedInfo #userId");
                        let selectedUserComment = $(".selectedInfo #userComment");

                        selectedUserId.text(e.currentTarget.querySelector(".user_id").textContent);
                        selectedUserComment.text(e.currentTarget.querySelector(".userComment").textContent);
                        e.stopPropagation();
                });
                tableElm.append(trTag);
            }

        }
    }
}


const makeNaviMenu = (parent) => {

    let selectedMenuIdx;
    const onClickEvent = function () {

        let idx = $(this).index();
        console.log("clickedMenu " + idx);

        //TODO 해당 화면에 맡는 contentView set;
        //스타 신청 현황 조회
        if (idx === 0) {
            showRgstStarStatus();
        }
        //스타 등록 신청서 작성
        else if (idx === 1) {
            //
            RegistStar(contentView);
        } else {
            alert("현재 기능을 지원하지 않습니다");
            return;
            /*else if(idx === 1) {
                      alert("현재 기능을 지원하지 않습니다");
                      AWSManager.reqRgstStar({
                          userId: "nam1260@gmail.com",
                          snsInfo: {
                              snsType: "instagram",
                              snsId: "wookstagraam",
                              snsNm: "서골남시리즈",
                              snsUrl: "www.naver.com",
                          },
                          bankInfo: {
                              bankNm: "카카오뱅크",
                              accountNum: "3333030527508",
                              accountNm: "남성욱"
                          },

                      })
                  }else {

                  }*/

        }
    }
    for (let i = 0; i < menuArr.length; i++) {
        selectedMenuIdx = i;
        console.log(selectedMenuIdx);
        parent.append(
            $("<div/>", {class: i + " childMenu"}).text(menuArr[selectedMenuIdx]).on("click", selectedMenuIdx, onClickEvent)
        );
    }


}
export default mainView;