//config command array
var COMMAND_ARRAY = {
    'air' : 'image/air.png',
    'earth' : 'image/earth.png',
    'fire' : 'image/fire.png',
    'water' : 'image/water.png',
    'halt' : 'image/halt.png'
};

var LAST_COMMAND = [];

//config command title
var NOT_FOUND = 'command not found.';
var RUNNING = 'is now running.';
var HALTED = 'is halted.';

var IS_NOT_COMMAND = 1;
var IS_COMMAND = 2;
var COMMAND_NULL = 3;

$(document).ready(function(){
    var _o = $('textarea');
    var enterKeyCode = 13;
    var pageUpKeyCode = 38;
    var i=1;
    var status = 1;
    var _countPageUp = 1;
    _o.keypress(function(event){
        var _keycode = (event.keyCode ? event.keyCode : event.which);
        if(_keycode == enterKeyCode){
            command = setCommand(_o.val()).toLowerCase().trim();
            _cmdIsRunning = $('#cmdIsRunning').val();
            if(validateCommand(command) == IS_COMMAND && command != _cmdIsRunning){
                if(_cmdIsRunning != '' ) {
                    setStatusCommnad(_cmdIsRunning,HALTED);
                }
                status = RUNNING;
                $('#cmdIsRunning').val(command);
                setImage();
            }
            
            if(validateCommand(command) == IS_COMMAND && command == _cmdIsRunning){
                status = HALTED;
                $('#cmdIsRunning').val('');
                setImage();
            }

            if(validateCommand(command) == IS_NOT_COMMAND){
                status = NOT_FOUND;
            }

            if (validateCommand(command) == COMMAND_NULL) {
                status = COMMAND_NULL;
            }
            LAST_COMMAND.push(command);
            setStatusCommnad(command,status);
            i++;
        }
    });
    var _lastCommand = ''; 
    _o.keyup(function(event){
        var _keycode = (event.keyCode ? event.keyCode : event.which);
        console.log(_keycode);
        if (_keycode == pageUpKeyCode) {
            console.log('up');
            console.log(LAST_COMMAND);
            var nowCommand = _o.val();
            var _lengthArr = LAST_COMMAND.length;
            var _lastCommand = LAST_COMMAND[_lengthArr - _countPageUp];
            _countPageUp++;
            if(_lastCommand && _lastCommand != '') {
                _o.val(nowCommand + '\n' + _lastCommand);
            }
        }
        if (_keycode == pageUpKeyCode) {
            
            console.log('down');
            console.log(LAST_COMMAND);
            var nowCommand = _o.val();
            var _lengthArr = LAST_COMMAND.length;
            var _lastCommand = LAST_COMMAND[_lengthArr - _countPageUp];
            _countPageUp--;
            if(_lastCommand && _lastCommand != '') {
                _o.val(nowCommand + '\n' + _lastCommand);
            }
        }
    });


    $('#reset').click(function(){
        _o.val('');
        $('#status').html('');
        $('#cmdIsRunning').val('');
        $('#show-image img').removeAttr('src');
    });
});

function setImage(){
    var _command = $('#cmdIsRunning').val();
    var _image = COMMAND_ARRAY[_command];
    $('#show-image img').removeAttr('src');
    $('#show-image img').attr('src',_image);
}

function setStatusCommnad(command,status){
	var _class = '';
	if(status == RUNNING){
		_class="loading";
	}
    if (status != COMMAND_NULL) {
    	if(status == RUNNING || status == HALTED){
    		$('.CMDRUNNING').each(function(){
    			$(this).removeClass('loading');
    		});
    	}
        $('#status').append('<div class="CMDRUNNING ' + _class + '">' + command.toUpperCase() + ' ' + status + '</div>');
    }
}
    
// Validate command
function validateCommand(command){
    //Biểu thức chính quy cho command
    var _reg = /[^a-z]/i;
    
    if (command.trim() == '') {
        return COMMAND_NULL
    }

    if(_reg.test(command) || !COMMAND_ARRAY[command]) {
        return IS_NOT_COMMAND;
    }

    if (COMMAND_ARRAY[command]) {
        return IS_COMMAND;
    }
}

//Set command
function setCommand(text){
    //Mảng chứa các command
    var _inputArr = text.split('\n');
    var _len = _inputArr.length;

    //Lấy command vừa gõ
    var _lastCommand = _inputArr[_len-1];
    return _lastCommand;
}