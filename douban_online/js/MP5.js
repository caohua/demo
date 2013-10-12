 	
var tools = {
	//模版映射
	createTpl:  function(str, cfg){
		var re = /(%(.+?)%)/g;
		
		return str.replace(re, function() {
			var val = cfg[arguments[2]]+'';
			if(typeof val == 'undefined') {
				val = '';
			}
			return val;
		});
	},
	
	//判断是否为数组
	isArry: function(v){
		return typeof v === 'object' && typeof v.slice ==='function' && !(v.propertyIsEnumerable('length'));	
	},	
	
	//格式化时间
	formatTime: function(time){
		time = time/1000>>0;
		var _minute = time/60>>0 ;
		_minute = _minute<10 ? "0"+_minute:_minute;
		var _second = time%60<10? "0"+time%60 : time%60;
		return _minute+":"+_second;
	}

}

function MP5(setting){

	 //配置
	var setting = $.extend({
		//音乐信息模版		 
		musicInfoTpl: '',
		autoPlay: true,//是否加载完后自动播放
		musicList: $('#musicBox'),//音乐列表
		musicBox:$('#mini-player'),//整个播放器
		player:$('#musicPlayer')[0],//音乐播放器
		musicInfoBox: $('.playing-info'),//
		barProgressBox: $('#barProgress'),
		totalTimeBox: $('#totalTime'),
		curMark:'playing',//当前播放标志
		volume: 0.7,//声音0~1
		playModel:'order'//播放模式：single , order , circulation , and random 

	},setting);
	
	var _player = setting.player;
	var _musicIndex = 0;
	var _totalTime = 0;
	var _progressLine = 0;
	var _playTime = 0;
	
	return {
		musics: [],//保存music对象
		autoPlay: setting.autoPlay,
		musicTpl: setting.musicTpl,
		musicInfoTpl: setting.musicInfoTpl,
		musicBox: setting.musicBox,
		musicInfoBox: setting.musicInfoBox,
		curMark: setting.curMark,
		barProgress: setting.barProgressBox,
		totalTimeBox: setting.totalTimeBox,
		playModel: setting.playModel,
		player: setting.player,
		volume: setting.volume,
		//显示音乐DOM
		showMusicUI: function(callback){
			/* var len = this.musics.length;
			if (!len) return;
			this.musicList.empty();
			for (var i=0; i<len; i++){
				var music = this.musics[i];
				music.index = i;
				var tpl = tools.createTpl(this.musicTpl,music);
				var node = $(tpl);
				node.data('musicData',music);
				node.appendTo(this.musicList);
			} */
			callback && callback();
		},
		//当准备或播放音乐时，显示具体的播放信息
		showInfoUI: function(m){
			var tpl = tools.createTpl(this.musicInfoTpl,m);
			$('#cover_img').attr('src',m.picture);
			this.musicInfoBox.html(tpl)
		},
		//添加音乐
		addMusic: function(m){
			this.musics.push(m);
		},
		//预先加载音乐
		load: function(m,callback){
			if (m){
				_player.src = m.musicUrl;
			}
			callback && callback();
		},
		//通过索引簿预先加载音乐
		loadByIndex: function(index,callback){
			if (index<0){
				index = 0;
			}
		
			var musicData = this.musics[index];
			_player.src = musicData.url;
			this.showInfoUI(musicData);
					//判断是否自动播放音乐
			if (this.autoPlay){
				this.play();
			}
		},
		//播放音乐，参数(m:音乐对象，callback:回调函数)
		play: function(m,callback){
			var that = this;
			_player.play();
			$(_player).bind('playing',function(){
				console.log('playing');
				_totalTime = _player.duration;
				console.log(_totalTime);
				
			}).bind('ended',function(){
				//播放模式：single , order , circulation , and random 
				switch(that.playModel){
					case 'order': that.playNext(); break;
					case 'single': that.paly(); break;
					//case 'circulation': that.playNext(); break;
				}
			});
			clearInterval(_progressLine);
			this.showProgress();
			callback && callback();
			
		},
		//暂停音乐
		pause: function(){
			_player.pause();
			clearInterval(_progressLine);
			console.log('pause');
		},
		//通过索引来找到音乐并播放，主要是关连到具体的dom的结构
		playByIndex: function(index,callback){
			var maxIndex = this.musics.length-1;
			if (index < 0 ){
				index = maxIndex; 
			}else if (index > maxIndex){
				index = 0;
			}
			_musicIndex = index;
			var musicData = this.musics[index];
			_player.src = musicData.url;
			this.showInfoUI(musicData);
			//判断是否自动播放音乐
			if (this.autoPlay){
				this.play();
			}
			//callback && callback(music);
			
		},
		//播放上一首音乐
		playPrev: function(){
			var that =  this;
			var prevIndex = _musicIndex-1;
			this.playByIndex(prevIndex);
		},
		//播放下一首音乐  	
		playNext: function(){
			var that =  this;
			var nextIndex = _musicIndex+1;
			this.playByIndex(nextIndex);
		},
		//判断播放是否暂停了
		isPause: function(){
			return _player.paused;
		},
		reload: function(){
			_player.reload();
		},
		//设置音量
		setVolume: function(vol){
			if (typeof vol == 'number'){
				_player.volume = vol;
				this.musicBox.find('#btnVol').css('width',vol*100+'%');
			}else{
				_player.volume = this.volume;
				this.musicBox.find('#btnVol').css('width',this.volume*100+'%');
			}
		},
		getVolume: function(){
			return _player.volume;
		},
		//设置静音
		setMute: function(bool){
			if (typeof bool == 'boolean'){
				_player.muted = bool;
			}else {
				alert('数据类型不正确');
			}
		},
		//获取当前播放时间
		getCurTime: function(){
			return _player.currentTime;
		},
		//获取当前总的时间
		getTotalTime: function(curTime){
			//curTime && _player.currentTime = curTime;
		},
		//显示播放进度条
		showProgress: function(){
			var that = this;

			_progressLine = setInterval(function(){
				var curTime = _player.currentTime;
				var relaveTime = _totalTime - curTime;
				var tTime = relaveTime? tools.formatTime(relaveTime*1000):'00:00';
				var progress = curTime/_totalTime*100;
				console.log(progress);
				$('#totalTime').text(tTime);
				$('#progress').css({width: progress + '%'});
				console.log('progress');
			},1000);
			console.log(_progressLine);
		}		
	}
}
 




