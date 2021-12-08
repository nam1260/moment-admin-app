import AWSManager from "../managers/AWSManager";


const handleCompleteRegist = (_result) => {
    console.log(_result);
    if(_result && _result.status === 200) {
        alert("스타 등록 신청이 완료되었습니다");
    }else {
        alert("서버 에러 ");
    }
}

const onClickBtn = (e) => {
    console.log(e)
    let formArea = $(".formArea");
  //  let formArea = document.getElementsByClassName("formArea");
   // let userId = formArea.getElementById("userId").value

    let userId = formArea.find("#userId")[0].value;
    let kakaoId = formArea.find("#kakaoId")[0].value;
    let instaId = formArea.find("#instaId")[0].value;
    let youtubeChNm = formArea.find("#youtubeChNm")[0].value;
    let bankNm = formArea.find("#bankNm")[0].value;
    let accountNum = formArea.find("#accountNum")[0].value;
    let accountNm = formArea.find("#accountNm")[0].value;

    //빈 값 체크
    if(!userId || (!kakaoId && !instaId && !youtubeChNm) || !bankNm || !accountNm || !accountNum ) {
        alert("빈칸을 채우세요");
        return;
    }

    //1.먼저 사용자가 존재하는지 확인
    console.log(userId);

    //

    AWSManager.checkDuplId({
        userId: userId
    }).then(function(result){
        if(result && result.status === 200) {
            if(!result.data.isDupl) alert("모먼트 가입 유저만 사용자만 스타 등록이 가능합니다.");
            else {
                AWSManager.reqRgstStar({
                    userId,
                    kakaoId,
                    instaId,
                    youtubeChNm,
                    bankNm,
                    accountNum,
                    accountNm
                }).then(handleCompleteRegist)
            }
        }else {
            alert("서버 에러 ");
        }
    })

}

const RegistStar = ((parentView) => {


    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("스타 등록 신청"));
    titleArea.append($("<div/>",{class: "subTitle"}).text("입력된 개인 SNS 채널 및 계정을\n" +
        "통해 인증을 진행합니다"));

    let formArea = $("<div/>",{class:"formArea"});
    let form;
    let formTitleArr  = [
        {id: "userId", name:"사용자 ID(이메일)"},
        {id: "kakaoId", name:"카카오톡 ID"},
        {id: "instaId", name:"instagram ID"},
        {id: "youtubeChNm", name:"Youtube 채널 명"},
        {id: "bankNm", name:"은행명"},
        {id: "accountNum", name:"계좌번호"},
        {id: "accountNm", name:"예금주"}];



    formTitleArr.forEach((item) => {
        form =  $("<div/>",{class:"form"})
        .append(
            $("<span/>",{class:"title"}).text(item.name),
            $("<input/>",{class:"formInput",id:item.id}),
        );
        formArea.append(form);
    })

    let btnArea = $("<div/>", {class: "btnArea"}).append($("<button/>").text("등록").on("click",onClickBtn));


    parentView.append(titleArea, formArea,btnArea);


});

export default RegistStar;