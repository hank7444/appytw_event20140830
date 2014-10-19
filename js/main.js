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
        },
        'all': {
            iconHeight: 97,
            mapAlt: '不分區',
            areaInput: '不分區'
        }

    };
    var memberNames = 'tasi lin wu all';
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

    // 2014.10.05新增: 開始
    var fbshare = function() {
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
              object: location.href,
          })
        }, function(response){

        });
    };
    var p3steps = $('.p3 .steps');
    var stepsLastLine = p3steps.find('.line').last();
    var stepsLastCircle = p3steps.find('.circle').last();
    // 2014.10.05新增: 結束


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

            // 2014.10.19新增: 開始
            if (href === 'all') {
                $areaInput.attr('readonly', true);
                $title.find('.slogan').html('請填寫您的聯絡方式');
                $title.find('.area').html('三區皆可幫忙<br><span>蔡正元、林鴻池、吳育昇</span>');
                $formDiv.fadeIn();
            }
            else {
                $areaInput.attr('readonly', false);
                $title.find('.slogan').html('這就是想要罷免的立委');
                $title.find('.area').html('');
                $areaInput.autocomplete({
                    source: areaData[href]
                });
            }
            // 2014.10.19新增: 結束

            // 2014.10.05新增: 開始
            stepsLastLine.remove('active');
            stepsLastCircle.remove('active');
            // 2014.10.05新增: 結束

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
            $lightboxMsg.fadeOut(function() {
                $lightboxMsgBtnShare.hide();
            });
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


        // 2014.10.05新增: 開始
        var $lightboxMsgContent = $lightboxMsg.find('.content');
        var $lightboxMsgHeader = $lightboxMsg.find('.header');
        var $lightboxMsgBtnShare = $lightboxMsg.find('.btn');
        // 2014.10.05新增: 結束


        $('#btnSubmit').on('click', function(e) {
            e.preventDefault();

            if (!$form.valid()) {
                return false;
            }

            var params = $form.serialize();

            $lightboxMsg.fadeIn();
            $lightboxMsgContent.html('儲存中，請稍後...');
            $lightboxMsgHeader.css('visibility', 'hidden');

            // 2014.10.05新增: 開始
            $lightboxMsgBtnShare.hide();
            // 2014.10.05新增: 結束

            $.post('http://xxx.xxx', params, null, 'json').done(function() {

                var member = $memberInput.val();
                $form[0].reset();
                $memberInput.val(member);
                $areaInput.val(memberDataHash[member].areaInput);

                // 2014.10.05新增: 開始
                stepsLastLine.addClass('active');
                stepsLastCircle.addClass('active');
                $lightboxMsgBtnShare.show();
                // 2014.10.05新增: 結束

                $lightboxMsg.find('.content').html('儲存成功，謝謝您的參與！');
                $lightboxMsg.find('.header').css('visibility', 'visible');

            }).fail(function() {

                $lightboxMsg.find('.content').html('伺服器沒有回應，請稍後再試');
                $lightboxMsg.find('.header').css('visibility', 'visible');

            }).always(function() {

            });
        });


        // 2014.10.05新增: 開始
        // preloader, 避免某些atag background-image在hover時才載入導致閃爍
        (function() {
            var _urlBase = '../img/';
            var imgs = [
                '../img/next.png',
                '../img/nexth.png',
                '../img/tsai.png',
                '../img/tsaih.png',
                '../img/tsaia.png',
                '../img/lin.png',
                '../img/linh.png',
                '../img/lina.png',
                '../img/wu.png',
                '../img/wuh.png',
                '../img/wua.png',
                '../img/back.png',
                '../img/backh.png'
            ];
            var i = 0;
            var image = new Image();
            image.onerror = image.onload = function() {
                setTimeout(function() {
                    return ++i, i >= imgs.length ? (image.onload = null, image.onerror = null, image = null, void(i = null)) : void(image.src = _urlBase + imgs[i]);
                }, 1);
            }, image.src = _urlBase + imgs[i];
        })();

        $('.fbshare').on('click', function(e) {
            e.preventDefault();
            fbshare();
        });
        // 2014.10.05新增: 結束

    });

    // 2014.10.05新增: 開始
    var appId = 1476121305998924;
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&appId=" + appId + "&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // 2014.10.05新增: 結束


})();
