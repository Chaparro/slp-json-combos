const { default: SlippiGame } = require('slp-parser-js');
const path = require('path');

const testFolder = './files/';
const fs = require('fs');

combos = {};

jsonCombo = {
    "mode": "queue",
    "replay": "",
    "isRealTimeMode": false,
    "queue": [] 
};

jsonString = '';

fs.readdir(testFolder, function(err, items) {
    for (var i=0; i<items.length; i++) {
    	var t_path = path.resolve() + '/files/' + items[i];
    	var absolutePath = t_path.replace(/\\/g,"/");

    	const game = new SlippiGame(testFolder + items[i]);
    	console.log(i + ' ' + items[i]);
 	
		const settings = game.getSettings();

		const stats = game.getStats();
		for (var j=0; j<stats.combos.length; j++) {
			if (stats.combos[j].endPercent - stats.combos[j].startPercent >= 60 && stats.combos[j].didKill == true){
				console.log(stats.combos[j])
				comboData = {
					startFrame : stats.combos[j].startFrame,
					endFrame : stats.combos[j].endFrame,
					path : absolutePath
				};
				jsonCombo.queue.push(comboData);
			} 
		};

    }
    fs.writeFile('./comboData.json', JSON.stringify(jsonCombo), (err) => {
    	if (!err) {
        	console.log('done comboing!');
    	}
	});

});