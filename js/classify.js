$(function(){	
	var classify = {
		init: function(){			
			this.sortAbout();
		},		
		sortAbout: function(){
			$.ajax({
	            type: "get",
	            url: glob+"/v1.0/goods/queryCatalog",
	            dataType: "json",
	            contentType: 'application/json;charset=UTF-8',
	            success:funcrion(data){
	            	console.log(data);
	            }
		    });
		}
		
	}
	classify.init();
})
