
import RegistStar from "./registStar";
import applyingStar from "./applyingStar";
import sendMessage from "./sendMessage";
import messageList from "./messageList";
import payment from "./payment";

const GET_RGST_STAR_STATUS = "스타 신청 현황 조회";
const REQ_REGIST_STAR = "스타 등록 신청서 작성";
const SEND_MESSAGE = "사연 전송 테스트";
const CHECK_MSG = '사연 관리';
const CHECK_PAYMENT_TABLE = '결제내역 조회';


const menuArr = [GET_RGST_STAR_STATUS, REQ_REGIST_STAR, SEND_MESSAGE, CHECK_MSG, CHECK_PAYMENT_TABLE];

let contentView;


const mainView = () => {

   let logoTitle = $("<img/>", {class: "logoTitle"});
   let naviMenu = $("<div/>", {class: "naviMenu"});
   contentView = $("<div/>", {class: "contentView"});

   $("#App").append(
       logoTitle,naviMenu,contentView
   );

   makeNaviMenu(naviMenu);

};


const makeNaviMenu = (parent) => {

    let selectedMenuIdx;
    const onClickEvent = function () {

        let idx = $(this).index();
        console.log("clickedMenu " + idx);

        //TODO 해당 화면에 맡는 contentView set;
        //스타 신청 현황 조회
        if (idx === 0) {
            applyingStar(contentView);
        }
        //스타 등록 신청서 작성
        else if (idx === 1) {
            //
            RegistStar(contentView);
        } else if(idx ===2){
            //메시지 전송 테스트
            sendMessage(contentView);
        }else if(idx === 3){
            messageList(contentView);
        }else if(idx ===4) {
            payment(contentView);
        }else {
            alert("현재 기능을 지원하지 않습니다");
            return;
        }
    };
    for (let i = 0; i < menuArr.length; i++) {
        selectedMenuIdx = i;
        console.log(selectedMenuIdx);
        parent.append(
            $("<div/>", {class: i + " childMenu"}).text(menuArr[selectedMenuIdx]).on("click", selectedMenuIdx, onClickEvent)
        );
    }


}
export default mainView;