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
    var $formDiv = $('.form');
    var $form = $('#form');
    var $lightboxMsg = $('#lightboxMsg');
    var $area = $('map area');
    var $puzzle = $('.puzzle');
    var $areaInput = $('#area');
    var $memberInput = $('#member');

    var memberDataHash = {
    	'tsai': {
    		iconHeight: 119,
    		mapAlt: '台北市第4選區',
    		areaInput: '台北市/'
    	},
    	'lin': {
    		iconHeight: 110,
    		mapAlt: '新北市第6選區',
    		areaInput: '新北市/板橋區/'
    	},
    	'wu': {
    		iconHeight: 108,
    		mapAlt: '新北市第1選區',
    		areaInput: '新北市/'
    	}

    };
    var memberNames = 'tasi lin wu';
    var mapHighlightOption = {
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
	};
	$map.find('img').maphilight(mapHighlightOption);

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
    		$title.find('.aread').html('');

    		$map.hide();
    		$map.filter('.' + href).show();

    		$memberInput.val(href);
    		$areaInput.val(memberData.areaInput);
    		$areaInput.autocomplete({
    			source: areaData[href]
    		});

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
		$area.on('mouseover', function(e) {
    		e.preventDefault();

    		var alt = $(this).attr('alt');
    		$title.find('.aread').html(alt);
    	});

    	$area.on('click', function(e) {
    		e.preventDefault();
 
    		var alt = $(this).attr('alt');
    		$areaInput.val(alt);
    		$formDiv.fadeIn();
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

        $('#area').rules('add', {
        	required: true,
        	maxlength: 15
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

        	if (!$form.valid()) {
        		return false;
        	}

        	var params = $form.serialize();

        	$lightboxMsg.fadeIn();
        	$lightboxMsg.find('.content').html('儲存中，請稍後...');
        	$lightboxMsg.find('.header').css('visibility', 'hidden');

        	$.post('http://xxx.xxx', params, null, 'json').done(function() {

        		var member = $memberInput.val();
        		$form[0].reset();
        		$memberInput.val(member);
        		$areaInput.val(memberDataHash[member].areaInput);

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