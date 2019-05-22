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

function banWobbling(movesArray) { // checks if there are more than 8 grab pummels in combo
  var pummel = 0;
  for (var move in movesArray) {
      if (movesArray[move].moveId == 52){
        pummel++;
      }
  }

  var banned = pummel <= 8 ? true : false;
  return banned;
}

//console.log(process.argv[2]);

fs.readdir(testFolder, function(err, items) {
    console.log("Reading " + items.length + " .slp files from directory\n");
    for (var i=0; i<items.length; i++) {
    	var t_path = path.resolve() + '/files/' + items[i];
    	var absolutePath = t_path.replace(/\\/g,"/");

    	const game = new SlippiGame(testFolder + items[i]);
    	console.log(i + ' - ' + items[i]);
 	
		  const settings = game.getSettings();

		  const stats = game.getStats();
  		for (var j=0; j<stats.combos.length; j++) {
  			if (stats.combos[j].endPercent - stats.combos[j].startPercent >= 60 
          && stats.combos[j].didKill
          && banWobbling(stats.combos[j].moves)) {

  				console.log(stats.combos[j]);
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
        	console.log('Done comboing! \nGenerated comboData.json');
    	}
	});

});