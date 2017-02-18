// YOUR CODE HERE:
//http://parse.sfm8.hackreactor.com

var app = {};

app.init = function () {};

app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function () {
  $.ajax({

    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function () {
  // use jquery to remove tags with chat id's
  $('#chats').empty();
};


app.renderMessage = function (message) {
  // var $chat = $('<div>Chat</div>');
  // $chat.addClass('chats');
  // $chat.text('message');
  $('<div id="chats">' + message.text + '</div>').appendTo('#chats');
};