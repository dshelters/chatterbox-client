  // YOUR CODE HERE:
  //http://parse.sfm8.hackreactor.com
var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages.jsonp',
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,
  friends: {},
  messages: []
};

app.init = function () {
  
  // store jquery selectors
  app.username = window.location.search.substr(10);
  app.$message = $('#message');
  app.$chats = $('#chats');
  app.$roomSelect = $('#roomSelect');
  app.$send = $('#send');

  // add listeners
  app.$chats.on('click', '.username', app.handleUsernameClick).bind(this);
  app.$send.on('submit', app.handleSubmit);
  app.$roomSelect.on('change', app.handleRoomChange);

  //fetch messages
  app.startSpinner();
  app.fetch(false);

  setInterval(function() {
    app.fetch(true);
  }, 3000);
};

app.send = function (message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/jsonp',
    success: function (data) {
      app.$message.val('');
      app.fetch();
    },
    error: function (error) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', error);
    }
  });
};


app.fetch = function (animate) {
  $.ajax({

    url: app.server,
    type: 'GET',
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: function (data) {

      app.messages = data.results;
      var mostRecentMessage = data.results[data.results.length - 1];

      app.renderRooms(data.results);

      app.renderMessages(data.results, animate);

      console.log(data);
    },
    error: function (error) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', error);
    }
  });
};

app.clearMessages = function () {
  // use jquery to remove tags with chat id's
  app.$chats.html('');
};

// chat div should have a class equal to the username

app.renderMessages = function (messages, animate) {

  app.clearMessages();
  app.stopSpinner();
  if (Array.isArray(messages)) {
    // Add all fetched messages that are in our current room
    var messagesTodDisplay = messages.filter(function(message) {
      return (message.roomname === app.roomname) || (app.roomname === 'lobby' && !message.roomname);
    });

    messagesTodDisplay.forEach(app.renderMessage);
  }
  // Make it scroll to the top
  if (animate) {
    $('body').animate({scrollTop: '0px'}, 'fast');
  }


// create chat class as outer div
  var $chat = $('<div class ="chat"><br><span class="username"></span><br><span class="message"></span></div>');
  $chat.prependTo('#chats');  
  $('.message').first().text(message.text);
  $('.username').first().text(message.username);
};

app.renderMessage = function(message) {
  if (!message.roomname) {
    message.roomname = 'lobby';
  }

  // Create a div to hold the chats
  var $chat = $('<div class="chat"/>');

  // Add in the message data using DOM methods to avoid XSS
  // Store the username in the element's data attribute
  var $username = $('<span class="username"/>');
  $username.text(message.username + ': ').attr('data-roomname', message.roomname).attr('data-username', message.username).appendTo($chat);

  // Add the friend class
  if (app.friends[message.username] === true) {
    $username.addClass('friend');
  }

  var $message = $('<br><span/>');
  $message.text(message.text).appendTo($chat);

  // Add the message to the UI
  app.$chats.append($chat);

};

app.renderRooms = function (messages) {
  app.$roomSelect.html('<option value="__newRoom">New room...</option>');

  if (messages) {
    var rooms = {};
    messages.forEach(function(message) {
      var roomname = message.roomname;
      if (roomname && !rooms[roomname]) {
        // Add the room to the select menu
        app.renderRoom(roomname);

        // Store that we've added this room already
        rooms[roomname] = true;
      }
    });
  }

  // Select the menu option
  app.$roomSelect.val(app.roomname);
};


app.renderRoom = function (roomname) {
  var $option = $('<option/>').val(roomname).text(roomname);
  app.$roomSelect.append($option);
};

app.handleUsernameClick = function () {

// Get username from data attribute
  var username = $(this).data('username');

  if (username !== undefined) {
    // Toggle friend
    app.friends[username] = !app.friends[username];

    // Escape the username in case it contains a quote
    var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';

    // Add 'friend' CSS class to all of that user's messages
    var $usernames = $(selector).toggleClass('friend');
  }
};

app.handleSubmit = function(event) {
  var message = {
    username: app.username,
    text: app.$message.val(),
    roomname: app.roomname || 'lobby'
  };

  app.send(message);

  // Stop the form from submitting
  event.preventDefault();
};

app.startSpinner = function() {
  $('.spinner img').show();
  $('form input[type=submit]').attr('disabled', 'true');
};

app.stopSpinner = function() {
  $('.spinner img').fadeOut('fast');
  $('form input[type=submit]').attr('disabled', null);
};