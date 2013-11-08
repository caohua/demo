(function($){
    $.fn.extend({
        slide: function(options){
            var o = {
                    loop: '',
                    conClass: '',
                    speed: 500,
                    gap: 5000,
                    next: '',
                    prev: '',
                    control: ''
                };
                
            $.extend(o,options);
            
            var loop = $(o.loop),
            	control = $(o.control),
            	maxLen = control.children().length - 1,
            	timer = null,
                conClass = o.conClass,
                isLoop = true,
                loopsSize = [],
                tSize = [],
                cell = [],
                currentPage = 0,
                
                star = function(){
            		clearTimeout(timer);
                    timer = setTimeout(autoPlay,o.gap);
                },
                
                autoPlay = function(){
                	setCell();
                	move();
                },
                
                move = function(){
                	$('.' + conClass,control).removeClass(conClass);
                    control.children().eq(currentPage).addClass(conClass);
                    
                    loop.each(function(i,n){
                    	$(n).animate({ left: '-'+cell[i]+'px'},o.speed,'easeOutCirc',function(){
                        	if(isLoop) star();
                        });
                    });
                },
                
                setCell = function(){
                    if(currentPage < 0){
                    	currentPage = maxLen;
                    }
                    else if(currentPage < maxLen){
                    	currentPage += 1;
                    }else{
                    	currentPage = 0;
                    }
                    $.each(cell,function(i){
                    	cell[i] = currentPage * tSize[i];
                    });
                },
                
                stop = function(){
                	clearTimeout(timer);
                },
                
                jump = function(idx){
                	currentPage = idx;
                	if(idx < 0){
                		currentPage = maxLen;
                	}else if(idx > maxLen){
                		currentPage = 0;
                	}
                	$.each(cell,function(i){
                    	cell[i] = currentPage * tSize[i];
                    });
                	move();
                };
            
            loop.each(function(i,n){
        		var tt = $(this);
    			tSize[i] = tt.parent().width();
    			loopsSize[i] = tSize[i] * (maxLen + 1);
                cell[i] = 0;
        		tt.width(loopsSize[i]);
        	});
            
            star();
            
            this.hover(stop,star);
            
            control.delegate('li','mouseenter',function(){
            	clearTimeout(timer);
                var that = $(this);
                if(that.is('.' + conClass)) return;
                var index = that.index();
                loop.stop();
                isLoop = false;
                jump(index);
                
            })
            .delegate('li','mouseleave',function(){
            	isLoop = true;
            	star();
            });
            
            if(o.prev){
            	$(o.prev).live('click',function(){
            		clearTimeout(timer);
            		var idx = control.children('.'+conClass).index();
            		loop.stop();
            		jump(idx - 1);
            		return false;
            	});
            }
            
            if(o.next){
            	$(o.next).live('click',function(){
            		clearTimeout(timer);
            		var idx = control.children('.'+conClass).index();
            		loop.stop();
            		jump(idx + 1);
            		return false;
            	});
            }
        }
    })
})(jQuery);