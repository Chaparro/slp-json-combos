const { default: SlippiGame } = require('slp-parser-js');
const path = require('path');

const testFolder = './files/';
const renamedFolder = './renamedFiles/';
const fs = require('fs');

var jsonCombo = {
    "mode": "queue",
    "replay": "",
    "isRealTimeMode": false,
    "queue": [] 
};

combos = {};

jsonAllMatches = {
    "mode": "queue",
    "replay": "",
    "isRealTimeMode": false,
    "queue": [] 
};

/* Configurable parameters */
shouldKill = true;
wobblingBanned = true;
comboPercentaje = 60;

/* Non configurable parameters (DO NOT MOVE) */
jsonString = '';
frameOffset1 = 60;
frameOffset2 = 60;
comboCounter = 0;

var object = process.argv[2] == '-c' ? 'conversions' : 'combos';
console.log('\nProcessing: ' + object);

fs.readdir(testFolder, function(err, items) {
  console.log('Renaming Files with following template on renamedFiles/');
  console.log('\t - DATE_P1(Char1)_vs_P2(Char2)_(Stage) \n');

  if (!fs.existsSync("renamedFiles")){
      fs.mkdirSync("renamedFiles");
  }
  if (!fs.existsSync("generatedJSONs")){
      fs.mkdirSync("generatedJSONs");
  }

  for (var i=0; i<items.length; i++) {
    var t_path = path.resolve() + '/files/' + items[i];
    var absolutePath = t_path.replace(/\\/g,"/");

    const game = new SlippiGame(testFolder + items[i]);
    const settings = game.getSettings();
    const players = settings.players;

    const gameName = (players[0].nametag?players[0].nametag:"#")+"("+getChar(players[0].characterId)+"-"+players[0].characterColor+")_vs_"+(players[1].nametag?players[1].nametag:"#")+"("+getChar(players[1].characterId)+"-"+players[1].characterColor+")_("+getStage(settings.stageId)+")";

    var x = createdDate(testFolder+items[i]);
    var fileName = 'renamedFiles/'+x+"_"+gameName+".slp";
    fs.copyFile(testFolder+items[i],fileName,(err) => {
      if (err) throw err;
    }); 
  }

  console.log("Files renamed! \n ********************");
  fs.readdir(renamedFolder, function(err, items) {
    console.log('Looking for combos with this parameters:');
    console.log('\t - Should kill:' + shouldKill);
    console.log('\t - Wobbling banned:' + wobblingBanned);
    console.log('\t - Combo of ' + comboPercentaje+'% or more');
    console.log('Looking in '+items.length+' clips... \n');

    for (var i=0; i<items.length; i++) {
      var t_path = path.resolve() + '/renamedFiles/' + items[i];
      var absolutePath = t_path.replace(/\\/g,"/");

      const game = new SlippiGame(renamedFolder + items[i]);
      const stats = game.getStats();

      for (var j=0; j<stats[object].length; j++) {
        if (stats[object][j].endPercent - stats[object][j].startPercent >= comboPercentaje && (shouldKill?stats[object][j].didKill:true) && (wobblingBanned?isNotAWobble(stats[object][j].moves):true)){
          comboCounter++;
          comboData = {
            startFrame : stats[object][j].startFrame - frameOffset1,
            endFrame : stats[object][j].endFrame + frameOffset2,
            path : absolutePath
          };
          jsonCombo.queue.push(comboData);
        } 
      }
      process.stdout.write((i/items.length*100).toFixed(2)+"% complete... ("+comboCounter+" combos found)\r")

      matchData = {
        startFrame : -100,
        endFrame : stats.lastFrame,
        path : absolutePath
      };
      jsonAllMatches.queue.push(matchData);
    }
    fs.writeFile('generatedJSONs/comboData.json', JSON.stringify(jsonCombo), (err) => {
      if (!err) {
        console.log('Done! Total of '+comboCounter+' combos recorded at generatedJSONs/comboData.json!');
      }
    });

    fs.writeFile('generatedJSONs/allMatches.json', JSON.stringify(jsonAllMatches), (err) => {
      if (!err) {
        console.log("Done! All "+ items.length+" matches in generatedJSONs/allMatches.json");
      }
    });
  });
});

function isNotAWobble(movesArray) { // checks if there are more than 8 grab pummels in combo
  if(!wobblingBanned){
    return true;
  }
  // TO DO:
  // Check if either character is ICs before loop
  var pummel = 0;
  for (var move in movesArray) {
      if (movesArray[move].moveId == 52){
        pummel++;
        if(pummel >= 8){
          return false;
        }
      }
  }
  return true;
}

function createdDate (path) {  
    const stats = fs.statSync(path)
    var x = (stats.mtime+" ").split(' ');
    return ((x[2]+"_"+x[4].replace(':', '_').replace(':', '_')));
}

function getStage(x){
  switch(x){
    case 2:
      return "FoD";
    case 3:
      return "PS";
    case 8:
      return "YS";
    case 28:
      return "DL";
    case 31:
      return "Battlefield";
    case 32:
      return "FD";
    default:
      return x;
  }
}

function getChar(x) {
  switch(x){
    case 0:
      return "Captain_Falcon";
    case 1:
      return "DK";
    case 2:
      return "Fox";
    case 3:
      return "Game_Watch";
    case 4:
      return "Kirby";
    case 5:
      return "Bowser";
    case 6:
      return "Link";
    case 7:
      return "Luigi";
    case 8:
      return "Mario";
    case 9:
      return "Marth";
    case 10:
      return "Mewtwo";
    case 11:
      return "Ness";
    case 12:
      return "Peach";
    case 13:
      return "Pikachu";
    case 14:
      return "ICs";
    case 15:
      return "Puff";
    case 16:
      return "Samus";
    case 17:
      return "Yoshi";
    case 18:
      return "Zelda";
    case 19:
      return "Sheik";
    case 20:
      return "Falco";
    case 21:
      return "Y_Link";
    case 22:
      return "Dr_Mario";
    case 23:
      return "Roy";
    case 24:
      return "Pichu";
    case 24:
      return "Ganondorf";
    default:
      return x;
  }
}