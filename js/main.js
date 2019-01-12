$(document).ready(function(){
	var urlData1 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data1.json";
	var urlData2 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data2.json";
	var urlData3 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data3.json";
	//ʹ��promise���ж���ͬ��ajax request
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
    	//�������
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
	//data2.json��key����data1.json��key
		ajax(urlData2, function(data){
			var row = $('tbody').find('tr');
	        $.each(data, function(index, element) {
	            //keyֵȥ����һ���֣��D�Q��int����index
	            var key = this.key.slice(1);
	            var index = parseInt(key);
	            row.eq(index).append($('<td>')).find('td:last').text(this.cell8);
	    	})
		})
	).then(
		ajax(urlData3, function(data){
			var row = $('tbody').find('tr');
	    	$.each(data, function(index, element) {
	            //keyֵȥ����һ�����c�����ɂ����֣��D�Q��int����index
	            var key = this.cell4.slice(1,-2);
	            var index = parseInt(key);
	            row.eq(index).append($('<td>')).find('td:last').text(this.cell9);
	    	})	
		})
	)
	//�c�� tr �ɮa�����б���׃ɫЧ�� (��һ���c�x�Б��֏��A�O)
	$('tbody').find("tr").each(function(){
		$(this).click(function(event){
        	$(this).toggleClass('selected')
        })	
	})
	//�c�����ǿɮa���DƬ׃��Ч�� (���б�������׃ɫ)
	$('td').find("span").each(function(){
		$(this).click(function(event){
        	$(this).toggleClass('selected')
        	//����rowҲ����׃ɫ(�ό�Ԫ�ز�����׃��)
        	event.stopPropagation();
        })	
	})

});