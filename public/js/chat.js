// import userList from "./../components/userList";
var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");
    // Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", () => {
    console.log("Connected to server");
    var params = $.deparam(window.location.search);
    socket.emit("join", params, err => {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No error");
        }
    });
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

// This section has been switched to use react
// socket.on("updateUserList", users => {
// var ol = $("<ol></ol>");
// users.forEach(user => {
//     ol.append($("<li></li>").text(user));
// });
// $("#users").html(ol);
// });

socket.on("newMessage", message => {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", message => {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on("submit", e => {
    e.preventDefault();

    var messageTextbox = $("[name=message]");

    socket.emit(
        "createMessage",
        {
            text: messageTextbox.val()
        },
        () => {
            messageTextbox.val("");
        }
    );
});

var locationButton = $("#send-location");
locationButton.on("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(
        position => {
            locationButton.removeAttr("disabled").text("Send location");
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        () => {
            locationButton.removeAttr("disabled").text("Send location");
            alert("Unable to fetch location");
        }
    );
});

const updateUserList = callback => {
    socket.on("updateUserList", users => {
        callback(null, users);
    });
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
    module.exports = updateUserList;
else window.updateUserList = updateUserList;
