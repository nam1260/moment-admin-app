
import AWSManager from "../managers/AWSManager";

const GET_RGST_STAR_STATUS = "스타 신청 현황 조회";
const REQ_REGIST_STAR = "스타 등록 신청서 작성";
const GET_USER_LIST = "사용자 조회";
const GET_MESSAGE_INFO = "사연 조회";

const menuArr = [GET_RGST_STAR_STATUS, REQ_REGIST_STAR, GET_USER_LIST, GET_MESSAGE_INFO];

let contentView;

const mainView = () => {

   let title = $("<img/>", {class: "title"});
   let naviMenu = $("<div/>", {class: "naviMenu"});
   contentView = $("<div/>", {class: "contentView"});

   $("#App").append(
      title,naviMenu,contentView
   );

   makeNaviMenu(naviMenu);


};

const makeRgstStarInputBox = () => {

}


//TODO 나머지 필드도 체크해서 채울 것

const updateRgstStarStatusTable = ()=> {

    contentView.empty();

    AWSManager.getRgstStarStatus().then((result)=>{
        console.log(result);

        if(!result || !result.data) {
            alert("등록 신청중인 스타가 존재하지 않습니다");
            return ;
        }

        let tableElm = $(
            "<table border='1'>" +
            "<tr>" +
            "<th>ID</th>" +
            "<th>카카오톡 ID</th>" +
            "<th>인스타그램 ID</th>" +
            "<th>Youtube 채널명</th>" +
            "<th>계좌명</th>" +
            "<th>계좌번호</th>" +
            "<th>예금주</th>" +
            "</tr>" +
            "</table>");

        contentView.append(tableElm);

        if(result && result.data) {
            for(let i = 0 ; i< result.data.length; i++) {
                let selectedData = result.data[i];
                let trTag = $("<tr/>",{class: "member_ "+[i]} );
                let tdTag = $("<td/>").text(selectedData.user_id);

                trTag.append(tdTag);
                tableElm.append(trTag);
            }

        }
    });
}


const makeNaviMenu = (parent) => {

   let selectedMenuIdx;
   const onClickEvent =function() {

       let idx = $(this).index();
       console.log("clickedMenu " + idx);

      //TODO 해당 화면에 맡는 contentView set;
       //스타 신청 현황 조회
       if(idx === 0) {
           updateRgstStarStatusTable();
       }else  alert("현재 기능을 지원하지 않습니다"); return; /*else if(idx === 1) {
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

   for(let i = 0; i < menuArr.length; i++) {
      selectedMenuIdx = i;
      console.log(selectedMenuIdx);
      parent.append(
          $("<div/>", {class: i+ " childMenu"}).text(menuArr[selectedMenuIdx]).on("click",selectedMenuIdx, onClickEvent)
      );
   }
}


export default mainView;