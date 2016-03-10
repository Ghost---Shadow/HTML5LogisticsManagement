$(document).ready(function(){
	
	$("#bGo").click(function(){	
		// Load data from text fields
		
		var supply = $("#tSupply").val().split(",");
		var demand = $("#tDemand").val().split(",");
		var expenditure = $("#tExpenditure").val().split(",");			
		
		$("#errorMsg").text("");

		try{
			var revenue = parseInt($("#tRevenue").val());	

			for(var i = 0; i < supply.length; i++)
				supply[i] = parseInt(supply[i].trim());				
			
			for(var i = 0; i < demand.length; i++)
				demand[i] = parseInt(demand[i].trim());			
				
			for(var i = 0; i < expenditure.length; i++)
				expenditure[i] = parseInt(expenditure[i].trim()) - revenue;	
			
		} catch(e){
			$("#errorMsg").text(e);
			return;
		}

		
		supply = [100,100];
		demand = [20,50,70];
		expenditure = [4,2,3,1,3,2];
		revenue = 50;		

		// Merge in a single vector	
		var b = [];
		$.merge(b,supply);
		$.merge(b,demand);
		
		// Reserve space for a m x n matrix
		var n = demand.length + supply.length;
		var m = demand.length * supply.length;
		var a = new Array(m);
		for(var i = 0; i < n; i++)
			a[i] = new Array(m);
		
		for(var i = 0; i < n; i++)
			for(var j = 0; j < m; j++)
				a[i][j] = 0;
		
			
		// Initialize A
		i = 0
		a[0][0] = 1
		for (var j = 1; j < m; j++){   
			if (j % supply.length == 0)
				i++;
			a[i][j] = 1;
		}
		for (var i = demand.length; i < n ; i++){
			offset = i-demand.length;
			for (var j = offset; j < m; j+=supply.length)				
				a[i][j] = 1;     
		}		
	});
});
