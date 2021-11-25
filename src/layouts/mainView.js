
import AWSManager from "../managers/AWSManager";

const GET_RGST_STAR_STATUS = "스타 신청 현황 조회";
const REQ_REGIST_STAR = "스타 등록 하기";
const GET_USER_LIST = "사용자 조회";
const GET_MESSAGE_INFO = "사연 조회";

const menuArr = [GET_RGST_STAR_STATUS, REQ_REGIST_STAR, GET_USER_LIST, GET_MESSAGE_INFO];


const mainView = () => {

   let title = $("<img/>", {class: "title"});
   let naviMenu = $("<div/>", {class: "naviMenu"});
   let contents = $("<div/>", {class: "contents"});

   $("#App").append(
      title,naviMenu,contents
   );

   makeNaviMenu(naviMenu);


};

const makeNaviMenu = (parent) => {

   let selectedMenuIdx;
   const onClickEvent =function() {

       let idx = $(this).index();
       console.log("clickedMenu " + idx);

      //TODO 해당 화면에 맡는 contentView set;
       //스타 신청 현황 조회
       if(idx === 0) {
          AWSManager.getRgstStarStatus();

       }else if(idx === 1) {
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
       }

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