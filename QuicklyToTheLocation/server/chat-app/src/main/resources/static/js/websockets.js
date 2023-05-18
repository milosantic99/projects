var url = 'http://localhost:10003';
var socketUrl = url + '/ws';
var msgsUrl = socketUrl + '/messages';

var privateInboxPrefix = '/users';
var groupInboxPrefix = '/chatrooms';
var privateInboxPostfix = '/queue';
var groupInboxPostfix = privateInboxPostfix;

var sendUrl = '/app/chat';

// ---

var stompClient = null;
var selectedUser = null;

var id = null;
var access_token = ""

var recipientId = null;

var that = this;
var isPrivateChat = true;
var shouldCreatePrivateRoom = true;

var chatroomId = null;
var subscribeAddress = '';
var inviteAddress = '';

function setConnected(connected) {
    if (connected) {
        $("#users").show();
        $("#msg").show();
        $("#conndata").hide();
        $("#connect").hide();
        $("#toggle").hide();
        $("#actionDiv").hide();
    } else {
        $("#users").hide();
        $("#msg").hide();
        $("#conndata").show();
        $("#connect").show();
    }
}

function connect() {
    if(!isPrivateChat)
        recipientId = chatroomId = $("#groupid").val();
    else {
        recipientId = $("#recipientid").val();
        if(createPrivateChat)
            chatroomId = recipientId;
    }

    getInviteAddress();
}

function getInviteAddress() {
    console.log("Requesting invitation address...")
        $.ajax({
            type: 'GET',
            url: '/ws' + privateInboxPrefix + '/invite',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
                xhr.setRequestHeader("X-Mobile", "false");
            },
            dataType: 'json',
            success: function(obj) {
                inviteAddress = obj.subscribeAddress;

                if(isPrivateChat && !shouldCreatePrivateRoom || !isPrivateChat && chatroomId != '')
                    getChatroomSubscribeAddress();
                else if(isPrivateChat)
                    createPrivateChat();
                else
                    createGroupChat();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("getInvAddr: Error");
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
}

function createPrivateChat() {
    console.log("Requesting creation of new private room...")
    $.ajax({
        type: 'POST',
        url: '/ws' + groupInboxPrefix + '/create/private',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.setRequestHeader("X-Mobile", "false");
        },
        dataType: 'json',
        success: function(chatroom) {
            console.log(chatroom);

            if(chatroom != null) {
                alert('Private chatroom ' + chatroom.id + ' is successfully created.');

                chatroomId = chatroom.id;
                subscribeAddress = chatroom.subscribeAddress;
                getChatroomSubscribeAddress();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("createPrivateChat: Error");
        }
    });
}

function createGroupChat() {
    console.log("Requesting creation of new group room...")
    $.ajax({
        type: 'POST',
        url: '/ws' + groupInboxPrefix + '/create/group',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.setRequestHeader("X-Mobile", "false");
        },
        dataType: 'json',
        success: function(chatroom) {
            console.log(chatroom);

            if(chatroom != null) {
                alert('Group chatroom ' + chatroom.id + ' is successfully created.');

                chatroomId = chatroom.id;
                subscribeAddress = chatroom.subscribeAddress;
                getChatroomSubscribeAddress();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("createGroupChat: Error");
        }
    });
}

function getChatroomSubscribeAddress() {
    console.log("Requesting access to chatroom...")
    $.ajax({
        type: 'GET',
        url: '/ws' + groupInboxPrefix + '/' + chatroomId + '/subscribe',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.setRequestHeader("X-Mobile", "false");
        },
        success: function(obj) {
            id = obj.memberId;
            subscribeAddress = obj.subscribeAddress;

            if(isPrivateChat && shouldCreatePrivateRoom)
                inviteRecipient();
            else
                connectAfterPreprocessing();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("getChatroomSubscribeAddress: Error");
        }
    });
}

function inviteRecipient() {
    console.log('Inviting recipient '+ recipientId + ' to the chatroom...')
    $.ajax({
        type: 'POST',
        url: '/ws' + privateInboxPrefix + '/' + recipientId + '/invite/' + chatroomId,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.setRequestHeader("X-Mobile", "false");
        },
        success: function() {
            connectAfterPreprocessing();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("inviteRecipient: Error");
        }
    });
}

function connectAfterPreprocessing() {
    var socket = new SockJS(socketUrl);
    stompClient = Stomp.over(socket);
    stompClient.connect({access_token: accessToken}, function () {
        // subscribe to invites of other users
        that.stompClient.subscribe(
            `${privateInboxPrefix}/${inviteAddress}${privateInboxPostfix}/invite`,
            function (invitation) {
                let senderId = invitation.senderId;
                let senderName = invitation.senderName;
                let chatroomId = invitation.chatroomId;

                alert(`User ${senderName}(${senderId}) has invited you to the room: ${chatroomId}`);
            },
            {access_token: accessToken}
        );

        // subscribe to new messages of other users
        that.stompClient.subscribe(
            `${groupInboxPrefix}/${subscribeAddress}${groupInboxPostfix}`,
            function (output) {
                console.log("*===============")
                console.log(JSON.parse(output.body));
                console.log("===============*")

                showMessage(createTextNode(JSON.parse(output.body)));
            },
            {access_token: accessToken}
        );
    });

    setConnected(true);
    loadChat();
}

function disconnect() {
}

function send() {
    var payload = {
        content : $("#message").val()
    };

    var payloadStr = JSON.stringify(payload);
    this.stompClient.send(sendUrl + "/" + chatroomId, {access_token: accessToken}, payloadStr);

    console.log("sent:" + payloadStr)
}

function clearMessages() {
}

function loadChat() {
    $.ajax({
        type: 'GET',
        url: '/ws' + '/messages/' + chatroomId,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
            xhr.setRequestHeader("X-Mobile", "false");
        },
        dataType: 'json',
        success: function(messages) {
            console.log(messages);
            if(messages == null || messages.length == 0)
                alert("Your inbox is empty");
            else
                messages.forEach(m => showMessage(createTextNode(m)));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Request for fetching chat messages was unsuccessful.")
        }
    });
}

function showMessage(message) {
    $("#content").html($("#content").html() + message);
    // $("#clear").show();
}

function createTextNode(messageObj) {
    var classAlert = 'alert-info';
    var senderName = messageObj.sender.name + '{' + messageObj.sender.id + '}';
    var content = messageObj.content;
    var date = new Date(messageObj.creationDate).toUTCString();

    if(id == messageObj.sender.id)
        classAlert = "alert-warning";

    let recName = "from: " + senderName;

    return '<div class="row alert '
                + classAlert +
            '"><div class="col-md-8">' +
            content +
            '</div><div class="col-md-4 text-right"><small>[<b>' +
            recName +
            '</b> ' +
            date +
            ']</small>' +
            '</div></div>';
}

function toggle() {
    if(isPrivateChat) {
        $("#actionDiv").hide();
        $("#privateChatData").hide();
        $("#groupChatData").show();
        $("#toggle").html("Switch to private chat");
    }
    else {
        $("#actionDiv").show();
        $("#groupChatData").hide();
        $("#privateChatData").show();
        $("#toggle").html("Switch to group chat");
    }

    isPrivateChat = !isPrivateChat;
}

function toggleAction() {
    if(shouldCreatePrivateRoom)
        $("#action").html("Join existing room");
    else
        $("#action").html("Create new room");
    shouldCreatePrivateRoom = !shouldCreatePrivateRoom;
}


function next() {
    $("#accessTokenDiv").hide();
    $("#actionDiv").show();
    $("#chatTypeDiv").show();
    $("#sendmessage").show();
    $("#connect").show();

    accessToken = $("#my_access_token").val();
}