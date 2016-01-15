var COMMAND_MAP = {
	'air' : 'image/air.png',
	'earth' : 'earth.png',
	'fire' : 'fire.png',
	'water' : 'water.png',
	'halt' : 'halt.png'
};

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

function _command(command) {
	if(validateCommand(command)){
		
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