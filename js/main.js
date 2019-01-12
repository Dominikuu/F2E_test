$(document).ready(function(){
	var urlData1 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data1.json";
	var urlData2 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data2.json";
	var urlData3 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data3.json";
	//使用promise執行多個同步ajax request
	function ajax(url, callback){
		var p = new Promise((resolve, reject)=>{
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				async: false,
				success: (response)=>{
					callback(response)
					resolve()
				},
				error: (XMLHttpRequest, textStatus, errThrown)=>{
					alert(XMLHttpRequest.responseText);
					reject();
				}
			})
		})
		return p;
	}
	ajax(urlData1, (data)=>{
    	$('table').append($('<tbody>'));
    	//建立表格
        $.each(data, function(index, element) {
            $('table tbody').append($('<tr>'));
            var section_h = "<span class='star'></span>";
            var row = $('table tbody tr:last');
            var ob = Object.keys(this).map(key=>{
            	return this[key];	
            });
            for(var i = 0; i < 8; i++){
            	if(i==0){
            		row.append($('<td>')).find('td:last').append($("<span class='star'>"));
            		row.find('td:last').html(section_h+this.key);		
            	}else{
            		row.append($('<td>')).find('td:last').text(ob[i])
            	}
            }
    	})
    	
	}).then(
	//data2.json的key對應data1.json的key
		ajax(urlData2, function(data){
			var row = $('tbody').find('tr');
	        $.each(data, function(index, element) {
	            //key值去除第一個字，轉換成int作為index
	            var key = this.key.slice(1);
	            var index = parseInt(key);
	            row.eq(index).append($('<td>')).find('td:last').text(this.cell8);
	    	})
		})
	).then(
		ajax(urlData3, function(data){
			var row = $('tbody').find('tr');
	    	$.each(data, function(index, element) {
	            //key值去除第一個字與倒數兩個數字，轉換成int作為index
	            var key = this.cell4.slice(1,-2);
	            var index = parseInt(key);
	            row.eq(index).append($('<td>')).find('td:last').text(this.cell9);
	    	})	
		})
	)
	//點擊 tr 可產生整列背景變色效果 (上一次點選列應恢復預設)
	$('tbody').find("tr").each(function(){
		$(this).click(function(event){
        	$(this).toggleClass('selected')
        })	
	})
	//點擊星星可產生圖片變化效果 (但列背景不應變色)
	$('td').find("span").each(function(){
		$(this).click(function(event){
        	$(this).toggleClass('selected')
        	//避免row也跟著變色(上層元素不跟著變動)
        	event.stopPropagation();
        })	
	})

});