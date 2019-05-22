const { default: SlippiGame } = require('slp-parser-js');
const path = require('path');

const testFolder = './files/';
const fs = require('fs');

var jsonCombo = {
    "mode": "queue",
    "replay": "",
    "isRealTimeMode": false,
    "queue": [] 
};


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


var object = process.argv[2] == '-c' ? 'conversions' : 'combos';
console.log('\nProcessing: ' + object);

fs.readdir(testFolder, function(err, items) {
    console.log("Reading " + items.length + " .slp files from directory\n");
    for (var i=0; i<items.length; i++) {
    	var t_path = path.resolve() + '/files/' + items[i];
    	var absolutePath = t_path.replace(/\\/g,"/");

    	const game = new SlippiGame(testFolder + items[i]);
    	console.log(i + ' - ' + items[i]);
 	
		  //const settings = game.getSettings();

		  const stats = game.getStats();
  		for (var j=0; j<stats[object].length; j++) {

  			if (stats[object][j].endPercent - stats[object][j].startPercent >= 60 
          && stats[object][j].didKill
          && banWobbling(stats[object][j].moves)) {

  				console.log(stats[object][j]);

  				comboData = {
  					startFrame : stats[object][j].startFrame,
  					endFrame : stats[object][j].endFrame,
  					path : absolutePath
  				};
  				jsonCombo.queue.push(comboData);
  			} 
  		}

    }
    fs.writeFile('./comboData.json', JSON.stringify(jsonCombo), (err) => {
    	if (!err) {
        	console.log('Done comboing! \nGenerated comboData.json');
    	}
	});

});