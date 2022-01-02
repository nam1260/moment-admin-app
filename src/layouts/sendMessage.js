import AWSManager from '../managers/AWSManager';

const sendMessage = ((parentView)=>{

    if(parentView) parentView.empty();

    console.log("sendMessage");
    const sender = $("<div/>",{class: "sender"}).append(
        $("<span/>").text("보내는 사람"),
        $("<input>",{placeHolder: "발신자 id"})
    );

    const receiver = $("<div/>",{class: "receiver"}).append(
        $("<span/>").text("받는 사람"),
        $("<input>",{placeHolder: "수신 스타 id"})
    );

    const messageText = $("<div/>",{class: "message"}).append(
        $("<span/>").text("메시지 내용"),
        $("<input>",{placeHolder: "사연을 입력하세요"})

    );


    const onClickSendBtn = (e) => {
        console.log("onClickSendBtn");

        const receiverId = receiver.find("input")[0].value;
        const senderId = sender.find("input")[0].value;
        const message = messageText.find("input")[0].value;

        if(!receiverId || !senderId || !message) alert("빈 값을 채우세요");

        AWSManager.sendMessageToStar({
            postData:{
                receiverId,
                senderId,
                deliveryDate : "2022/12/31",
                message
            },
            callback: (result,response)=>{
                if(result) {

                }else {

                }
            }

        })

    }
    const button = $("<div/>",{class: "button"}).on("click",onClickSendBtn).append(
        $("<button/>").text("전송")
    );




    console.log(sender);
    console.log(receiver);
    parentView.append(sender,receiver,messageText,button);


});

export default sendMessage;