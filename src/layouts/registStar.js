import AWSManager from "../managers/AWSManager";


const onClickBtn = (e) => {
    console.log(e)

    //TODO inputBox 내 입력 된 쿼리 값을 전부 가져와서 classObj 에 맵핑
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


    formTitleArr.forEach((item) => {
        form =  $("<div/>",{class:"form"})
        .append(
            $("<span/>",{class:"title"}).text(item),
            $("<input/>",{class:"formInput"}),
        );
        formArea.append(form);
    })

    let btnArea = $("<div/>", {class: "btnArea"}).append($("<button/>").text("등록").on("click",onClickBtn));


    parentView.append(titleArea, formArea,btnArea);


});

export default RegistStar;