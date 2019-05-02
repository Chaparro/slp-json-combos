# slp-json-combos
Uses slp-parser-js to generate JSONs needed to feed combo data to Dolphin


# Requirements, installation and usage

Install node – https://nodejs.org/en/download/

- Download or clone this repo
- Command line: run **"npm install"** on the directory

- Then, create a subfolder called **"files"** and place inside all the .slp files you want to work with.

- Once you have done all that, command line run **node app.js** on the directory to execute the script, wait for it to finish and it will output a **comboData.json** file.

_Note: It is configured to get only combos that inflict +60% and end the stock_


# Replaying all combo sections on Dolphin

For the following, you need to have the Slippi Dolphin for replays, this typically comes together with the Slippi Desktop App: 
https://slippi.gg/

- Go to the dolphin-slippi directory used for replays, typically at **C:\Users\[User]\AppData\Roaming\Slippi Desktop App\dolphin**
- [Optional] configure the Graphic settings/Gecko codes in this Dolphin instance to what you prefer. Personally i turn **Game Music OFF** since it doesn't go well with the nature of this recording effort. 

- Copy the generated **comboData.json** to this directory
- Then, command line run:

- _Dolphin.exe -i comboData.json -e "[full path to melee Vanilla ISO]"_

A dolphin screen should open, and after a little bit the gameplay sections described in comboData.json should start playing one after another. When it goes through all combos, it defaults to the "waiting for game..." screen.

While it's playing in Dolphin, you can capture the footage with **OBS** or any other recording tool.


# Extras: black frame remover

After playing and recording, you might notice there's a lot of black screen time in between replays, and it's all in the recording. It's a pain to edit this out manually if there's a lot of footage. One kind soul on the Project Slippi Discord provided a **Python** script to go through the video file and automatically remove those pesky black screens:

**Requirements**
Install Python 3.x: https://www.python.org/
ffmpeg for Windows: https://ffmpeg.zeranoe.com/builds/

blackFrameRemover.py:
https://gist.github.com/Chaparro/7f8b0b9bfaf38dae469e635f51a69a9e

Get this script to where your video files are, edit the input and output names to your liking, then run **Python blackFrameRemover**



# And there you have it, you should have a raw video file of all the combo footage with almost no interruptions. 
Any other edit you want is on you, get comboing! 
