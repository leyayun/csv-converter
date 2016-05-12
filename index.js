//Converter Class 
var fs = require("fs");
var util = require('util');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function(citys) {
	var cityConstants = {
		CITYDICT: {},
		CITYLIST: []
	};

	citys.forEach(function(city) {
		cityConstants.CITYDICT[city.id] = city.name;
		cityConstants.CITYLIST.push({
			id: city.id,
			name: city.name
		});
	});

	fs.writeFile('city.json', util.format('%j', cityConstants), (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	});
});

//read from file 
fs.createReadStream("./city.csv").pipe(converter);
