'use strict';
angular.module('FileSync')
.factory('SocketIOService', ['io', '_', '$timeout', function(io, _, $timeout) {
    var socket = io();
    var _onFileChanged = _.noop;
    var _onVisibilityStatesChanged = _.noop;
    var login;

    socket.on('connect', function() {
        console.log('connected');
        login = prompt('Nickname?');
        socket.emit('viewer:new', login);
    });

    socket.on('message', function(data) {
        console.log('message received');
        notifyMe(data.pseudo, data.message);
        insereMessage(data.pseudo, data.message)
    });

    socket.on('file:changed', function(filename, timestamp, content) {
        $timeout(function() {
            _onFileChanged(filename, timestamp, content);
        });
    });

    socket.on('users:visibility-states', function(states) {
        $timeout(function() {
            _onVisibilityStatesChanged(states);
        });
    });

    socket.on('error:auth', function(err) {
        // @todo yeurk
        alert(err);
    });

    $('#envoi_message').on('click', function () {
        var message = $('#message').val();
        console.log('send message');
        socket.emit('message', message);
        insereMessage(login, message);
        $('#message').val('').focus();
    });

    return {
        onViewersUpdated: function(f) {
            socket.on('viewers:updated', f);
        },

        onFileChanged: function(f) {
            _onFileChanged = f;
        },

        onVisibilityStatesChanged: function(f) {
            _onVisibilityStatesChanged = f;
        },

        userChangedState: function(state) {
            socket.emit('user-visibility:changed', state);
        }
    };
}]);
