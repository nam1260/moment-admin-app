import AWSManager from "../managers/AWSManager";



class star {

    constructor() {

        this.userId = null;
        this.kakaoId = null;
        this.instaId = null;
        this.youtubeChNm = null;
        this.bankNm = null;
        this.accountNum = null;
        this.accountNm = null;

    }

    setApplyingInfo() {

    }

    getApplyingInfo() {

    }


}

const RegistStar = ((parentView) => {


    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("스타 등록 신청"));
    titleArea.append($("<div/>",{class: "subTitle"}).text("입력된 개인 SNS 채널 및 계정을\n" +
        "통해 인증을 진행합니다"));

    let formArea = $("<div/>",{class:"formArea"});
    let form;
    let formTitleArr  = ["사용자 ID(이메일)","카카오톡 ID", "instagram ID", "Youtube 채널 명", "은행명","계좌번호","예금주"];


    for(let i = 0 ; i< formTitleArr.length; i++) {
         form =  $("<div/>",{class:"form"})
            .append(
                $("<span/>",{class:"title"}).text(formTitleArr[i]),
                $("<input/>",{class:"formInput"}),
            );

        formArea.append(form);
    }

    parentView.append(titleArea, formArea);




});

export default RegistStar;