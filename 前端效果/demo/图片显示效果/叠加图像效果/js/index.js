
$(function(){
	/*初始化占位符，解决兼容性*/
	function initPlaceHoder(){
		if ('placeholder' in document.createElement('input')){//如果浏览器原生支持placeholder
			return;
		}
		
		var allEle = $('input,textarea');
		for (var i=0,len=allEle.length; i<len; i++){
			var _ele = allEle.eq(i);
			if (!_ele.attr('placeholder')){
				continue;
			}
			var placeText = _ele.attr('placeholder');
			var value = _ele.val();
			if (value == '' && placeText){
				_ele.val(placeText);
			}
			_ele.click(function(){
				var _val = $(this).val();
				var _place = $(this).attr('placeholder');
				if (_val == _place){
					$(this).val('');
				}
			});
			_ele.focus(function(){
				var _val = $(this).val();
				var _place = $(this).attr('placeholder');
				if (_val == _place){
					$(this).val('');
				}
			});
			_ele.blur(function(){
				var _val = $(this).val();
				var _place = $(this).attr('placeholder');
				if (_val == ''){
					$(this).val(_place);
				}
			});
		}
	}
	
	initPlaceHoder();
	
	 $.subscribe('click_selectFile',__selectFile,false);
	
	function __selectFile(target,e,action){
		var $t = $(target);
		$($t.attr('rel')).click();
		return false;
	}
	
	
	$(document).eventrouter();
	
	
});