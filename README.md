# slp-json-combos
Uses slp-parser-js to generate JSONs needed to feed combo data to Dolphin

# Requirements, installation and usage

Install node – https://nodejs.org/en/download/

- Download or clone this repo
- Command line: run **"npm install"** on the directory to get the slippi parser files

- Then, create a subfolder called **"files"** and place inside all the .slp files you want to work with.

- Once you have done all that, command line run **node app.js** on the directory to execute the script, wait for it to finish and it will output a **comboData.json** file.


# Replaying all combo sections on Dolphin

You need to have the Slippi Dolphin for replays, this typically comes together with the Slippi Desktop App: 
https://slippi.gg/

- Go to the dolphin-slippi directory used for replays, typically at C:\Users\[User]\AppData\Roaming\Slippi Desktop App\dolphin
- Copy the generated **comboData.json** to this directory
- Command line run:
- _Dolphin.exe -i comboData.json -e "[full path to melee Vanilla ISO]"_


# Black Frame Remover
https://gist.github.com/Chaparro/7f8b0b9bfaf38dae469e635f51a69a9e
