(function($){
    var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

        // Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	//패널
	function showPanel(id) {
    const $current = $(".panel.active");
    const $next = $("#" + id);
    const $box = $(".panel-box");

    // 이미 열려 있는 패널이면 중단
    if ($current.attr("id") === id) return;

    // 현재 panel-box 높이 고정 (튀지 않게)
    $box
      .css("max-height", $box.height() + "px")
      .css("min-height", $box.height() + "px");

    // 현재 패널 비활성화
    if ($current.length) {
      $current.removeClass("active").hide();
    }

    // 새 패널 표시 준비
    $next.show();

    // 다음 프레임에서 active 추가 → opacity 1 전환
    requestAnimationFrame(() => {
      $next.addClass("active");

      // panel-box 높이를 새 패널 높이에 맞게 변경
      const nextHeight = $next.outerHeight();
    //   $box.stop(true).animate(
    //     {
    //       height: nextHeight,
    //     },
    //     500,
    //     function () {
    //       // 애니메이션 끝나면 auto로 돌려놓기
    //       $box.css({
    //         height: "",
    //         "max-height": "",
    //         "min-height": "",
    //       });
    //     }
    //   );
	 // panel-box의 max-height를 새 패널 높이로 변경 (CSS transition 적용됨)
      $box.css("max-height", nextHeight + "px");
	  $box.css("min-height", nextHeight + "px");

      // 전환이 끝나면 max-height를 풀어서 auto처럼 동작
      $box.one("transitionend", function () {
        $box.css("max-height", "");
		$box.css("min-height", '');
      });

	  
    
    });
  }

  $(document).ready(function () {
    const $firstPanel = $(".panel").first();
    const $firstNav = $("nav a").first();

    // 첫 번째 패널/메뉴 활성화
    $firstPanel.show().addClass("active");
    $firstNav.addClass("active");

    // panel-box 높이 초기화
    // $(".panel-box").css("height", $firstPanel.outerHeight());
	// panel-box 초기 높이
    $(".panel-box").css("max-height", $firstPanel.outerHeight() + "px");

    // nav 클릭 이벤트
    $("nav a").on("click", function (e) {
      e.preventDefault();
      const targetId = $(this).data("target");
      if (!targetId) return;

      $("nav a").removeClass("active");
      $(this).addClass("active");

      showPanel(targetId);
    });
  });
	

  // panel modal
		$(document).ready(function() {
    // 모달 열기
    $('.thumbnail').on('click', function() {
      const targetId = $(this).data('target');
      const modal = $('#' + targetId);
      modal.fadeIn(300).css('display', 'flex');
      // $('body').css('overflow', 'hidden'); // 배경 스크롤 차단
    });

    // 닫기 버튼 클릭
    $('.close-btn').on('click', function() {
      $(this).closest('.modal').fadeOut(300);
      $('body').css('overflow', 'auto');
    });

    // 바깥 클릭 시 닫기
    $('.modal').on('click', function(e) {
      if ($(e.target).is('.modal')) {
        $(this).fadeOut(300);
        $('body').css('overflow', 'auto');
      }
    });
    

    // $('.thumbnail').on('click', function() {
    //   const targetId = $(this).data('target');
    //   $('#' + targetId)
    //     .css('display', 'flex')
    //     .hide()
    //     .fadeIn(300);  // 300ms 동안 부드럽게 표시
    // });

    $('.close-btn, .modal').on('click', function(e) {
      if ($(e.target).is('.close-btn') || $(e.target).is('.modal')) {
        $(this).closest('.modal').fadeOut(300);
      }
    });
      });

      //panel 3 page 영역 탭메뉴
      $(function () {
        const $tabs = $(".tab-group li a");
        const $contents = $(".tab-con");

         $tabs.removeClass("active");
         $contents.removeClass("active").hide();
        
         $tabs.eq(0).addClass('active');
        $contents.eq(0).addClass('active').show();

        $tabs.on("click", function (e) {
          e.preventDefault();
          const index = $(this).parent().index();

          $tabs.removeClass("active");
          $(this).addClass("active");

          $contents.removeClass("active").hide();
          $contents.eq(index).addClass("active").show();
        });
      });
      
			
})(jQuery);