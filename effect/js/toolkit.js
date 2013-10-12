/**
 * @fileoverview 常用函数
 * @requires /public/js/jquery.js 
 */
 
 (function($){
    if(!$) return;
    
    $.toolkit = $.toolkit || {};
    
    $.extend($.toolkit, {
        /**
        * 用于html模板替换
        * @return {String} 返回替换后的html字符串
        * @param {String} str 目标字符串，替换规则为 /(%(.+?)%)/
        * @param {Object} cfg 用于替换的映射表
        * @example 
            $.toolkit.tpl('<h3 class="%className%">%text%</h3>', {
                className: 'title', 
                text: '标题'
            });
        */
        tpl: function(str, cfg) {
            var re = /(%(.+?)%)/g;
            
            return str.replace(re, function() {
                var val = cfg[arguments[2]]+'';
                if(typeof val == 'undefined') {
                    val = '';
                }
                return val;
            });
        },
        /**
        * 用于获取输入框剩余可输入汉字
        * @return {Number} 返回剩余字数
        * @param {HTML Object | jQuery Object} input 目标输入框
        * @param {Number} limit 字数限制
        */
        textRemain: function(input, limit) {
            var limit = limit || 30;
            var remain = limit;
            var text = '', cLen=0;
            text = $.trim($(input).val());
            try{
                var matcher = text.match(/[^\x00-\xff]/g);
                cLen  = (matcher && matcher.length || 0);
            }catch(err){}
            remain = Math.floor((limit*2 - text.length - cLen)/2); 
            return remain;
        },
		/**
        * 得到url上的参数的值
        * @param 要得到的参数的名称(name)
        * @example getUrlParam('keyWord');
        */
		getUrlParam: function(name){
			var name = name + '=';
			var regStr = '(?:'+name+')([^\?&#]+)';
			var reg = new RegExp(regStr);
			var str = window.location.search;
			var match = str.match(reg);
			if (match != null){
				try{
					return decodeURIComponent(match[1]);
				}catch(e){
					return match[1];
				}
			}else{
				return null;
			}
		},
		/**
        * 得到一个随机数值
        * @param 可以在随机数添加一个前缀（name）
		* @example getRandomNum('random');
        */
		getRandomNum: function(name){
			var date = new Date();
			var times = date.getTime();
			var timeStr = date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
			var random = times*timeStr;
			if (arguments.length == 1){
				return arguments[0] + '' + random;
			}else {
				return random;
			}
		},
		/**
        * 数组去重
        * @param 数组
		* @example delRepeat(arry);
        */	
		delRepeat:function(arry){
			if (!arry) return [];
			var tmpArry = [];
			var tmpObj = {};
			for (var i=0,item; (item=arry[i])!=null; i++){
				if (!tmpObj[item]){
					tmpArry.push(item);
					tmpObj[item] = true;
				}
			}
			return tmpArry;
		}
    });
    
    //tab控制器
    $.extend($.fn, {
        /**
        * tab切换控制器
        * @return {jQuery Object} 返回JQ对象 (绑定点击事件的对象)
        * @param {Object} cfg 用于配置控制器
        * @example 
            $('#tabParentNode').tabCtrler({
                activeCls: 'current', //[String] 激活tab附加的class name
                tab: $('#tab1, #tab2'), //[jQuery Object | DOM Object | String] tab对象或选择器
                content: $('#content1, #content2'), //[jQuery Object | DOM Object | String] 内容对象或选择器和tab一一对应
                callback: function(target, tab, content) { //切换tab之后的回调
                    console.log(arguments);
                }
            });
        */
        tabCtrler: function(cfg) {
            var 
                _cls = cfg.activeCls || 'current',
                _tab = $(cfg.tab),
                _content = $(cfg.content);
                
            if(!_tab.length) return;
            
            $(this).click(function(e) {
                var _index=-1, $target = $(e.target);
                while($target[0] != this && (_index=_tab.index($target))==-1) {
                    $target = $target.parent();
                }
                
                if(_index > -1 && _content[0]) {
                    _content.hide();
                    _content.eq(_index).show();
                    _tab.removeClass(_cls);
                    _tab.eq(_index).addClass(_cls);

                    cfg.callback && cfg.callback.call($target, _tab.eq(_index), _content.eq(_index));
                }  

                e.preventDefault();
            });
            
            return this;
        },
        /**
        * 简单添加oninput事件 oninput在非IE下不支持js改变输入框的值
        * @return {jQuery Object} 返回JQ对象
        * @param {Function} callback 事件回调函数
        */
        inputChange: function(callback) {
            var 
                isStandard = !!document.addEventListener,
                isIe = !!document.attachEvent;
                
            this.each(function(i, item) {
                if(isStandard) {
                    item.addEventListener('input', callback, false);
                }else if(isIe) {
                    item.attachEvent('onpropertychange', callback);
                }
            });
            
            return this;
        },
		/**
        * 得到url上的参数的值
        * @param 要得到的参数的名称(name)
        * @example getUrlParam('keyWord');
        */
		getUrlParam: function(name){
			var name = name + '=';
			var regStr = '(?:'+name+')([^\?&#]+)';
			var reg = new RegExp(regStr);
			var str = window.location.search;
			var match = str.match(reg);
			if (match != null){
				try{
					return decodeURIComponent(match[1]);
				}catch(e){
					return match[1];
				}
			}else{
				return null;
			}
		}
    });
    
 })(jQuery);
