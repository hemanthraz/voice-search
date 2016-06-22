# Synopsis

Chrome extension to demonstrate usage of webspeech APIs

# Installation

* Clone the repo 
* Follow the steps [here](http://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system)


# How it works

* After installation, the extenstion is active only for the sites specified in the manifest
* If the user navigates to one of the specified sites, the content scripts are loaded
* These content script load the speech analysis libraries and add elements to the DOM
* After allowing the microphone access the engine starts to listen to the commands
* If the recognized command is actionable, it is executed

# Notes

This extenstion uses the excellent SpeechKITT and annyang libraries from [Tal Ater](https://github.com/TalAter/)
