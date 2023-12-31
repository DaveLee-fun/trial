function ClienSetting() {
	var _this = this;
	
	_this.setting = {};
	_this.setting.theme = PAGE_SETTING_THEME;
	_this.setting.fontSize = PAGE_SETTING_FONT_SIZE;
	_this.setting.kindOfFont = PAGE_SETTING_KIND_OF_FONT;
	_this.setting.shortCut = PAGE_SETTING_SHORT_CUT;
	_this.setting.listSize = PAGE_SETTING_LIST_SIZE;

	/**
	 * 단축키 / 배경반전 / 폰트 설정
	 */
	_this.pageSetting = function() {
		if(_this.setting.listSize == "small"){
			$('.list-small').toggleClass('active');
		}
		// 단축키 설정
		if(_this.setting.shortCut == "on"){
			$('.button-key').toggleClass('active');
		} else {
			$('.button-key').toggleClass('');
		}
		// 배경반전 사용
		var bodyCheck = $('body').hasClass('bg'); // 메모나 팝업같은 경우는 적용하면 안되기때문에 bg클래스 있는지 여부 check
		if(!bodyCheck){
			if(_this.setting.theme == "white"){
			} else {
				$('.button-dark').toggleClass('active');
			}
		}
		// 글자 크게보기
		if(_this.setting.fontSize == "large"){
			$('.text-large').toggleClass('active');
		}

		// 리스트 뷰에서 메모 버튼
		var memoView_yn = localStorage.getItem('MEMO_LIST_VIEW_YN');
		if(memoView_yn == "true"){
			$('.memo-view').addClass('active');
		} else {
			$('.memo-view').removeClass('active');
		}

		// 모바일 메뉴 고정하기 | Mobile에서만 사용
		var menuFixed = localStorage.getItem('CLIEN_MEMU_FIXED');
		if(menuFixed == "false"){
			$('.button-off-menu').removeClass('active');
		} else {
			$('.button-off-menu').addClass('active');
		}

		// 폰트 설정 | PC에서만 사용
		var defaultName = "";
		if(_this.setting.kindOfFont == 'fontNanum') {
			defaultName = "나눔고딕";
		} else if(_this.setting.kindOfFont == 'fontMg') {
			defaultName = "맑은고딕";
		} else if(_this.setting.kindOfFont == 'fontGulim') {
			defaultName = "굴림";
		} else if(_this.setting.kindOfFont == 'apple') {
			defaultName = "애플고딕";
		} else {
			defaultName = "본고딕";
		}
		$('.font_style .filter-option').text(defaultName);
		$("#fontSetting").val(_this.setting.kindOfFont).prop("selected", true);
	};

	// 페이지 설정 버튼
	_this.eventBind = function() {
		// 목록 간격 변경
		$('.list-small').click(function(){
			// value값이 true이면 이미 작은 목록이 활성화 되어 있으므로 일반으로 변경.
			var value = $('.list-small').hasClass('active');
			var result = "small";
			if(value) {
				result = "normal";
			}
			$('.list-small').toggleClass('active');
			_this.saveSetting('listSize', result)
		});
		// 글자크기 변경
		$('.text-large').click(function(){
			// value값이 true이면 이미 large이므로, 일반으로 변경
			var value = $('.text-large').hasClass('active');
			var result = "large";
			if(value) {
				result = "normal";
			}
			$('.text-large').toggleClass('active');
			_this.saveSetting('fontSize', result)
		});
		// 테마 변경
		$('.button-dark').click(function(){
			var value = $('.button-dark').hasClass('active');
			var result = "black";
			if(value) {
				result = "white";
			}
			$('.button-dark').toggleClass('active');
			_this.saveSetting('theme', result)
		});
		// 단축키 사용 여부 적용
		$('.button-key').click(function(){
			var value = $('.button-key').hasClass('active');
			var result = "on";
			if(value) {
				result = "off";
			}
			$('.button-key').toggleClass('active');
			_this.saveSetting('shortCut', result)
		});
		// Font 설정 | PC에서만 사용
		$('#fontSetting').change(function() {
			var result = $('#fontSetting').val();
			_this.saveSetting('kindOfFont', result)
		});
	}

	/**
	 * 페이지 설정 쿠키 저장
	 */
	_this.saveSetting = function(type, value) {
		// Default Setting
		var pageSetting = {
			theme : _this.setting.theme, // white & balck
			fontSize : _this.setting.fontSize, // normal, large
			kindOfFont : _this.setting.kindOfFont, // basic, apple, fontNanum, fontMg, fontGulim
			shortCut : _this.setting.shortCut, // on, off
			listSize : _this.setting.listSize // normal, small
		}

		if(type == "listSize") {
			pageSetting.listSize = value;
		} else if(type == "fontSize") {
			pageSetting.fontSize = value;
		} else if(type == "theme") {
			pageSetting.theme = value;
		} else if(type == "kindOfFont") {
			pageSetting.kindOfFont = value;
		} else if(type == "shortCut") {
			pageSetting.shortCut = value;
		}

		storage.saveMyPage(pageSetting);
		// 저장후 항상 리로드
		location.reload();
	};

	// Init
	_this.init = function() {
		_this.pageSetting();
		_this.eventBind();
	}();
	
};

var clienSetting = new ClienSetting();