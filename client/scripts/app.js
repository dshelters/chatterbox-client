  // YOUR CODE HERE:
  //http://parse.sfm8.hackreactor.com
$( document ).ready( function() {
  window.app = {};

  app.init = function () {

  };

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

      url: this.server,
      type: 'POST',
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

  // chat div should have a class equal to the username

  app.renderMessage = function (message) {


// create chat class as outer div
    var $chat = $('<div class ="chat"><span class="message"></span><br><span class="username"></span></div>');
    $('.message').text(message.text);
    $('.username').text(message.username);

// create div with room class
//     var $chatroom = $('<span class="chatroom"</span>');
// // add room  text to room span
//     $chatroom.text(message.roomname); 

// // create span with username class
//     var $users = $('<span class="username"></span>');
//     //add the username to the username span
//     $users.text(message.username);

// // create span for the text with message class
//     var $message = $('<span class="message"></span>');
//     $message.text(message.text);
    
//     $message.wrap($chat);
//     $users.appendTo($message);
//     $chatroom.appendTo($message);

    $chat.appendTo('#chats');  

  };

  app.renderRoom = function (name) {
    $('<div>' + name + '</div>').appendTo('#roomSelect');
  };

  app.handleUsernameClick = function () {

    $('#main').on('click', '.username', function () {

      $(this).css('background-color', 'yellow');

    });
  };

  app.server = 'http://parse.sfm8.hackreactor.com';


});