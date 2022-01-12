
const messageList=((parentView) => {

    if(parentView) parentView.empty();

    let titleArea = $("<div/>", {class: "titleArea"});

    titleArea.append($("<div/>",{class: "conTitle"}).text("팬 사연 관리"));
    titleArea.append($("<div/>",{class: "subTitle"}).text("팬들이 보낸 사연에 대한 유효성을 \n" +
        "검토하여 승인/거절 처리합니다"));

    parentView.append(titleArea);

});
export default messageList;