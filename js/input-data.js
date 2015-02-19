var nodes = {
	"node" : {
		"node1" : 1234, 
		"node2" : 1432, 
		"node3" : 999, 
		"node4" : 111, 
		"node5" : 888, 
		"node6" : 222, 
		"node7" : 777, 
		"node8" : 333, 
		"node9" : 667, 
		"node10" : 444 
	}
}; 

var files = {
	"file1" : 25, 
	"file2" : 252, 
	"file3" : 525, 
	"file4" : 363, 
	"file5" : 36, 
	"file6" : 47, 
	"file7" : 474, 
	"file8" : 907, 
	"file9" : 585, 
	"file10" : 69, 
	"file11" : 696
}; 

var distribution = {
	"entry" : {
		"file1" : "node8", 
		"file5" : "node8", 
		"file6" : "node4", 
		"file10" : "node6", 
		"file2" : "node10", 
		"file4" : "node9", 
		"file7" : "node7", 
		"file9" : "node2", 
		"file11" : "node1", 
		"file3" : "node5", 
		"file8" : "node3"
	}
};

nodes.createTable = function() {
	for(key in nodes.node) {
		$(".node-table").append(nodeTableStarter);

		var formattedNodes = nodeEntry.replace("%data%", key);
		$(".node-entry:last").append(formattedNodes); 
		var formattedNodeCapacity = nodeCapacity.replace("%data%", nodes.node[key]);
		$(".node-entry:last").append(formattedNodeCapacity);

		var fileCount = 0;
		for(fileKey in distribution.entry) {
			if(distribution.entry[fileKey] === key) {
				fileCount = fileCount + 1; 
			}
		};
		var formattedFileCount = nodeFileCount.replace("%data%", fileCount);
		$(".node-entry:last").append(formattedFileCount);

		var fileSize = 0; 
		for(fileKey in distribution.entry) {
			if(distribution.entry[fileKey] === key) {
				fileSize = fileSize + files[fileKey]; 
			}
		};
		var formattedFileSize = nodeFileSize.replace("%data%", fileSize);
		$(".node-entry:last").append(formattedFileSize);

		var percentage = fileSize / nodes.node[key];
		var formattedNodePercent = nodePercent.replace("%data%", percentage.toFixed(3) );
		$(".node-entry:last").append(formattedNodePercent);
	};
};

nodes.createTable();

distribution.tablize = function() {
	for(key in distribution.entry) {
		$(".dist-table").append(distTableStarter);

		var formattedDist = distFileEntry.replace("%data%", key);
		$(".dist-entry:last").append(formattedDist);
		var formattedNode = distNodeEntry.replace("%data%", distribution.entry[key]) 
		$(".dist-entry:last").append(formattedNode);
	};
};

distribution.tablize(); 

var ctx = document.getElementById("balanceChart").getContext("2d");
var chartData = {
	labels: ["1-300", "301-600", "601-900", "901-1200", "1201-1500"], 
	datasets: [
		{
			label: "Nodes", 
			fillColor: "rgba(151,187,205,0.5)", 
			strokeColor: "rgba(151,187,205,0.8)",
			highlightFill: "rgba(151,187,205,0.75)", 
			highlightStroke: "rgba(151,187,205,1)", 
			data: [2, 2, 3, 1, 2]
		}
	]
};

var balanceChart = new Chart(ctx).Bar(chartData, {yAxisLabel:"Nodes", xAxisLabel:"Bytes"});

