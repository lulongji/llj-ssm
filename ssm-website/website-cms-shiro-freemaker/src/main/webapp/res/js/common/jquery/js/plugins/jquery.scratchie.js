(function($){
    $.fn.scratchie = function(options) {
        var settings = {
        	cursor: 'http://www.codefans.net/jscss/demoimg/201310/coin.gif', 
        	cursorHeight: 20, 
        	cursorWidth: 20,
        	target : 'target',
            img : 'http://www.codefans.net/jscss/demoimg/201310/prize.jpg',
            imgHeight : 70, 
            imgWidth : 215,
            title : 'Are you feeling lucky today?', 
            fillColor : '#cc0000', 
            fillImg : 'http://www.codefans.net/jscss/demoimg/201310/overlay.jpg', 
            fillX : 20, 
            fillY : 20,
            completion: 70, 
            uncoverOnComplete : true, 
            requireMouseClick : true,
            callback: function(){
            	alert('Congratulations!');
            },
            click :function(){
            	
            }
        };
        if(options){
            if(typeof options == 'object'){
                $.extend(settings, options);
            }else{
                settings.target = options;
            }
        }
		var mousedown = false;
		var ready = false;
		var overlaysTotal = overlaysUncovered = 0;
		var mouseUpAfterDrag = function(){
			$().one('mouseup', function(){
				mousedown = false;
				$().unbind();
				$('.scratch_overlay').bind('mousedown', mouseUpAfterDrag);
			});
			return false;
		};
		var mouseMove = function(e){
			$('#cursor').css({'left' : e.clientX - 2, 'top' : e.clientY + 2});
		};
		var mouseEnter = function(){
			$('#cursor').show();
			return false;
		};
		var mouseOut = function(){
			$('#cursor').hide();
			return false;
		};
        this.each(function (){
        	var t, target, tp, ov, spritex, spritey;
        	t = $(this);
        	target = $('#' + settings.target);
        	t.css({
        		'cursor' : 'url(blank.cur), none',
        		'height' : settings.imgHeight + 'px',
        		'width' : settings.imgWidth + 'px'
    		});
			target.attr({
				'alt' : settings.title,
				'title' : settings.title,
				'zIndex' : 1
			}).css({
				'height' : settings.imgHeight + 'px',
				'width' : settings.imgWidth + 'px',
			}).bind('mousedown', function(){
				return false;
			});
        	tp = target.position();
        	tt = tp.top;
        	tl = tp.left;
        	spritex = spritey = 0;
        	t.after('<div id="cursor" style="cursor:none;width:' + settings.cursorWidth + 'px;height:' + settings.cursorHeight + 'px;position:fixed;display:none;top:0;left:0;z-index:10000;background:url(' + settings.cursor + ') top left no-repeat;"></div>');
        	ov = '';
        	for(i=0; i < settings.imgWidth; i += settings.fillX){
        		for(j = 0; j < settings.imgHeight; j += settings.fillY){
        			++overlaysTotal;
        			ov += '<div class="scratch_overlay" style="z-index:100;height:' + settings.fillY + 'px;width:' + settings.fillX + 'px;position:absolute;border:0;overflow:hidden;top:' + (tt + j) + 'px;left:' + (tl + i) + 'px;background:';
        			if(settings.fillImg){
        				ov += ' transparent url(' + settings.fillImg + ') -' + spritex + 'px -' + spritey + 'px no-repeat;';
	        			spritey += settings.fillY;
        			}else{
        				ov += settings.fillColor;
        			}
        			ov += '"/>';
        		}
        		if(settings.fillImg){
		    		spritey = 0;
		    		spritex += settings.fillX;
		    	}
        	}
			t.after(ov);
        	target.attr('src', settings.img);
        	$('.scratch_overlay').css('cursor', 'url(blank.cur), none');
			target.bind('mouseout', function(){
				mouseOut();
			}).bind('mouseenter', function(){
				mouseEnter();
			}).bind('mousemove', function(e){
				mouseMove(e);
			});
			$('.scratch_overlay').bind('mouseout', function(){
				mouseOut();
			}).bind('mouseenter', function(){
				mouseEnter();
			}).bind('mousemove', function(e){
				mouseMove(e);
			});
			if(settings.requireMouseClick === true){
					$('.scratch_overlay').bind('mousedown', function(){
					mousedown = true;
					// fix to recognize mouseup event after moving mouse
					mouseUpAfterDrag();
					if(ready === true){
						++overlaysUncovered;
						$(this).remove();
					}
					settings.click();   
					return false;
				});
			}
			$('.scratch_overlay').bind('mouseover', function(){
				if(mousedown === true || settings.requireMouseClick === false){
					if(ready === true){
						++overlaysUncovered;
						$(this).remove();
					}
					if((overlaysUncovered / overlaysTotal) * 100 >= settings.completion){
						if(settings.uncoverOnComplete === true){
							$('.scratch_overlay').remove();
						}
						settings.callback();
					}
				}
			});
			ready = true;
        });
    return this;
	};
})(jQuery);