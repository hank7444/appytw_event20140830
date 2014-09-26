;
(function() {

    'use strict';

    var $body = $('html, body');
    var $doc = $(document);
    var $p1 = $('.p1');
    var $p2 = $('.p2');
    var $p3 = $('.p3');
    var $title = $p3.find('.title');
    var $map = $p3.find('.map');
    var $form = $('#form');
    var $lightboxMsg = $('#lightboxMsg');
    var $area = $('map area');
    var $puzzle = $('.puzzle');

    var memberDataHash = {
    	'tsai': {
    		iconHeight: 119,
    		mapAlt: '台北市第4選區'
    	},
    	'lin': {
    		iconHeight: 110,
    		mapAlt: '新北市第6選區'
    	},
    	'wu': {
    		iconHeight: 108,
    		mapAlt: '新北市第1選區'
    	}

    };
    var memberNames = 'tasi lin wu';

    $(function() {

    	$('#next').on('click', function(e) {
    		e.preventDefault();

    		$p2.fadeIn(300, function() {
    			
	    		$body.animate({
	                queue: false,
	                scrollTop: $p2.offset().top,
	            }, {
	                duration: 1000,
	                step: function(now, fx) {

	                },
	                start: function() {
	                    $doc.disablescroll();
	                },
	                done: function() {
	                    $doc.disablescroll('undo');
	                }
	            });
    		});
    	});

    	$('.icon').on('click', function(e) {
    		e.preventDefault();
    		var href = $(this).attr('href');
    		var memberData = memberDataHash[href];

    		$title.removeClass(memberNames).addClass(href);
    		$title.find('img').attr('src', '../img/' + href + '.png')
    						  .attr('height', memberData.iconHeight);
    		$map.removeClass(memberNames).addClass(href);
    		$map.find('img').attr('src', '../img/map-' + href + '.png')
    						.attr('usemap', '#map-' + href);

    		$p3.fadeIn(300, function() {

	    		$body.animate({
	                queue: false,
	                scrollTop: 619 * 2,
	            }, {
	                duration: 1000,
	                step: function(now, fx) {

	       
	                },
	                start: function() {
	                    $doc.disablescroll();
	                },
	                done: function() {
	                    $doc.disablescroll('undo');
	                }
	            });
    		});
    	});

    	$('#back').on('click', function(e) {
    		e.preventDefault();
			$body.animate({
                queue: false,
                scrollTop: $p2.offset().top,
            }, {
                duration: 1000,
                step: function(now, fx) {

       
                },
                start: function() {
                    $doc.disablescroll();
                },
                done: function() {
                    $doc.disablescroll('undo');
                }
            });
    	});
/*
    	$map.find('img').on('mouseover', function(e) {
    		console.log(e.relatedTarget);
    	});*/
/*
    	$area.on('mouseover', function(e) {
    		e.preventDefault();
    		console.log($(this).attr('alt'));

    		var alt = $(this).attr('alt');

    		$puzzle.filter('[title="' + alt + '"]').fadeIn();
    	});


    	$puzzle.on('mouseover', function(e) {
    		e.preventDefault();
    		
    		console.log(e.relatedTarget);
    	});

    	$puzzle.on('mouseleave', function(e) {
    		e.preventDefault();
    		$(this).fadeOut();
    	});
*/

		$area.on('mouseover', function(e) {
    		e.preventDefault();
    		console.log($(this).attr('alt'));

    		var alt = $(this).attr('alt');

    		//$puzzle.filter('[title="' + alt + '"]').fadeIn();
    	});

    	$area.on('click', function(e) {
    		e.preventDefault();
    		console.log($(this).attr('alt'));

    		var alt = $(this).attr('alt');

    		//$puzzle.filter('[title="' + alt + '"]').fadeIn();
    		$puzzle.filter('[title="' + alt + '"]').fadeIn();
    	});

		$map.find('img').maphilight({
			fill: true,
			fillColor: 'ff0000',
			fillOpacity: 1,
			stroke: true,
			strokeColor: 'ffffff',
			strokeOpacity: 1,
			strokeWidth: 1,
			fade: true,
			shadow: false,
			shadowPosition: 'outside',
			shadowFrom: 'fill',
			shadowX: 10,
			shadowY: 10,
			shadowRadius: 1,
			shadowColor: '0000ff',
			shadowOpacity: 0.5
		});






    	$lightboxMsg.find('.header a').on('click', function(e) {
    		e.preventDefault();
    		$lightboxMsg.fadeOut();
    	});

    	// 驗證錯誤訊息
        $.validator.messages = {
            required: '尚未填寫',
            email: '電子郵件信箱格式錯誤',
            digits: '僅限輸入數字',
            maxlength: $.format('最多 {0} 個字'),
        };
        $form.validate({
            errorElement: 'div',
            errorClass: 'error',
            success: 'valid',
            rules: {},
            messages: {},
            errorPlacement: function(error, element) {
                return $(error).appendTo($(element).closest('.form-group'));
            }
        });

        $('#name').rules('add', {
            required: true,
            maxlength: 15
        });
        $('#mail').rules('add', {
            required: true,
            email: true,
            maxlength: 100
        });
        $('#phone').rules('add', {
            required: true,
            digits: true,
            maxlength: 20
        });
        $('#ability').rules('add', {
            required: true,
            maxlength: 30
        });

        $('#btnSubmit').on('click', function(e) {
        	e.preventDefault();
/*
        	if (!$form.valid()) {
        		return false;
        	}*/

        	var params = $form.serialize();

        	$lightboxMsg.fadeIn();
        	$lightboxMsg.find('.content').html('儲存中，請稍後...');
        	$lightboxMsg.find('.header').css('visibility', 'hidden');

        	$.post('http://xxx.xxx', params, null, 'json').done(function() {

        		$form[0].reset();
        		$lightboxMsg.find('.content').html('儲存成功，謝謝您的參與！');
        		$lightboxMsg.find('.header').css('visibility', 'visible');

        	}).fail(function() {
        		$lightboxMsg.find('.content').html('伺服器沒有回應，請稍後再試');
        		$lightboxMsg.find('.header').css('visibility', 'visible');

        	}).always(function() {

        	});
        });

    });


})();