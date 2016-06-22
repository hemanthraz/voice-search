var isActive =0;

chrome.browserAction.onClicked.addListener(function (tab) {
	// Inspect whether the place where user clicked matches with our list of URL
    if (tab.url.indexOf("http://recipe.rakuten.co.jp/") != -1) { 
        if (isActive){
	        chrome.tabs.executeScript(tab.id, {
	            "file": "js/disable.js"
	        });
	        isActive = 0;
        } else {
	        chrome.tabs.executeScript(tab.id, {
	            "file": "js/enable.js"
	        });
	        isActive = 1;
	    }
    }
    else {
        chrome.tabs.executeScript(tab.id, {
            "file": "js/disable.js"
        });
        isActive = 0;
    }
    if (isActive){
		chrome.browserAction.setIcon({path: "img/logo_19.png", tabId:tab.id});
    } else {
		chrome.browserAction.setIcon({path: "img/logo_inactive_19.png", tabId:tab.id});
    }

});