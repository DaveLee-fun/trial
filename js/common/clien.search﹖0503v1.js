function Search() {
	var _this = this;
	
	/**
	 * 통합 검색
	 */
	_this.initTotalSearch = function() {
		var scope = $('*[data-role=total-search]');
		scope.find('*[data-role=total-submit]').on('click', function() {
			var keyword = scope.find('*[data-role=total-input-keyword]').val();
			var isEmpty = keyword.trim() == '' ? true : false;

			if (isEmpty) {
				alert('검색어를 입력하세요.');
				scope.find('*[data-role=total-input-keyword]').focus();
				return false;
			}

			var url = BASE_URL + "/search?q="+encodeURI(keyword, "UTF-8");
			location.href = url;
		});

		scope.find('*[data-role=total-input-keyword]').on('keydown', function(e) {
			if (e.keyCode == 13) {
				scope.find('*[data-role=total-submit]').trigger('click');
			}
		});

		scope.find('*[data-role=total-submit2]').on('click', function() {
			scope.find('*[data-role=total-submit]').trigger('click');
		});
	};

	/**
	 * View 페이지 검색
	 */
	_this.initViewSearch = function() {
		var scope = $('*[data-role=view-search]');
		var url;

		scope.find('*[data-role=total-submit]').on('click', function() {
			var searchCheck = scope.find('*[data-role=total-select-filter]').val();
			var groupCd = $('#groupCd').val();
			var boardCd = $('#boardCd').val();
			var parameter = '';
			var combineCheck = true;

			if(groupCd != ''&& groupCd != undefined) {
				url = BASE_URL + '/search/group/' + groupCd;
			} else {
				url = BASE_URL + '/search/board/' + boardCd;
			}

			// 검색 파라미터 생성
			if (searchCheck == "search_title"){
				parameter = '?sk=title&sv=';
			} else if (searchCheck == "search_content"){
				parameter = '?sk=content&sv=';
			} else if (searchCheck == "search_comment"){
				parameter = '?sk=comment&sv=';
				combineCheck = false;
			} else if (searchCheck == "search_writer"){
				parameter = '?sk=id&sv=';
				combineCheck = false;
			} else if (searchCheck == "search_commenter"){
				parameter = '?sk=commenter&sv=';
				combineCheck = false;
			} else if(searchCheck == "search_board") {
				url = BASE_URL + "/search?q=";
			}

			url = url + parameter;

			var keyword = scope.find('*[data-role=total-input-keyword]').val();

			var isEmpty = keyword.trim() == '' ? true : false;
			if (isEmpty) {
				alert('검색어를 입력하세요.');
				scope.find('*[data-role=total-input-keyword]').focus();
				return false;
			}

			// 특수문자 찾기
			var regSpc = /[&\#\(\)\+\<\>/?\']/gi;
			if(regSpc.test(keyword.trim())) {
				alert('검색할 수 없는 특수문자가 있습니다.');
				return false;
			}

			if(combineCheck && (keyword.trim()).search(/\s/) != -1) {
				if(boardCd != ''&& boardCd != undefined) {
					url = BASE_URL + "/search?boardCd="+boardCd+"&isBoard=true&q=";
				} else { 
					url = BASE_URL + "/search?q=";
				}
			}

			location.href = url + encodeURI(keyword, "UTF-8");
		});

		scope.find('*[data-role=total-input-keyword]').on('keydown', function(e) {
			if (e.keyCode == 13) {
				scope.find('*[data-role=total-submit]').trigger('click');
			}
		});

		scope.find('*[data-role=total-submit2]').on('click', function() {
			scope.find('*[data-role=total-submit]').trigger('click');
		});
	};
	
	/**
	 * Init
	 */
	_this.init = function() {
		_this.initTotalSearch(); // 통합 검색
		_this.initViewSearch(); // 단일 검색
	}();
	
}
var search = new Search();