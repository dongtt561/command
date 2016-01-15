var COMMAND_MAP = {
	'air' : 'image/air.png',
	'earth' : 'earth.png',
	'fire' : 'fire.png',
	'water' : 'water.png',
	'halt' : 'halt.png'
};

var NOT_FOUND = 'command not found...';
var RUNNING = 'is now running...';
var HALTED = 'is halted...'

$(document).ready(function(){
	var _o = $('textarea');
	var enterKeyCode = 13;
	_o.keypress(function(event){
		var _keycode = (event.keyCode ? event.keyCode : event.which);
		if(_keycode == enterKeyCode){
			_command(_o.val());
		}
	});
});

var i=1;

function _command(command) {
	if(validateCommand(command)){
		if(COMMAND_MAP[command]){
			$('#status'+i).append('<div id="status' + Number(i+1) + '">' + command.toUpperCase() + '  ' + RUNNING + '</div>')
		i++;
		}
		$('#status').html();
	}
}

function validateCommand(text){
	//Mảng chứa các command
	var _inputArr = text.split('\n');
	var _len = _inputArr.length;

	//Lấy command vừa gõ
	var _lastCommand = _inputArr[_len-1];

	//Khai báo Regex
	var _reg = /[^a-z]/i;

	//Nếu command vừa gõ có kí tự khác các kí tự từ A-Z và a-z thì kết thúc
	//Ngược lại thực hiện command
	if(_reg.test(_lastCommand)){
		return false;
	}
	return true;
}