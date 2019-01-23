$(document).ready(function(){
	var urlData1 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data1.json";
	var urlData2 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data2.json";
	var urlData3 = "https://raw.githubusercontent.com/Dominikuu/F2E_test/master/data/data3.json";
	const timeDiffer = startTime => (new Date() - startTime) / 1000;
  
	function ajax(url, callback){
		var p = new Promise((resolve, reject)=>{
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: (response)=>{
					resolve(response)
				},
				error: (XMLHttpRequest, textStatus, errThrown)=>{
					alert(XMLHttpRequest.responseText);
					reject();
				}
			})
		})
		return p;
	}
	//ajax
	Promise.all([
		ajax(urlData1),
		ajax(urlData2),
		ajax(urlData3),
	]).then(([data1, data2, data3])=>{
		const startTime = new Date();
		$('table').append($('<tbody>'));
		//data1
		for(var index= 0; index < data1.length; index++){
            var section_h = "<span class='star'></span>";
            var ob = Object.keys(data1[index]).map(key=>{
            	return data1[index][key];	
			});
			
			trHTML = '<tr>';
			for(var i = 0; i < 8 ; i++){
				trHTML += '<td>'
				if(i==0){
					trHTML += section_h +data1[index].key
				}else{
					trHTML += ob[i]
				}
				trHTML += '</td>'
			}
			trHTML +='</tr>'
			$('table tbody').append(trHTML);
		}
		
		//data2
		var row = $('tbody').find('tr');
		//data2的key移除第一個字元後就是data1的key
		for(var index=0; index<data2.length;index++){
			var key = data2[index].key.slice(1);
			var _index = parseInt(key);
			var contentHTML ="<td>"+data2[index].cell8+"</td>"
			row.eq(_index).append(contentHTML)
		}

		//data3
		keyOfData = Object.keys(data3)
		keyOfData.some((_key)=>{
			//data3的cell4移除第一個和末兩個字元後就是data1的key
			var key = data3[_key].cell4.slice(1,-2);
			var index = parseInt(key);
			var contentHTML ="<td>"+data3[_key].cell9+"</td>"
			row.eq(index).append(contentHTML)
		})
		//事件註冊
		$('tbody').find("tr").each(function(){
			$(this).click(function(event){
				$(this).toggleClass('selected')
			})	
		})
		$('td').find("span").each(function(){
			$(this).click(function(event){
				$(this).toggleClass('selected')
				//避免向上觸發tr
				event.stopPropagation();
			})	
		})
		console.log(timeDiffer(startTime))
		$(".usuage").html(timeDiffer(startTime));
	})
});