// delayed js loader

function loadScript(url, callback, aux) {
	let script = document.createElement("script");
	document.head.appendChild(script);
	if (callback)
		script.onload = callback;
	if (aux) {
		for (let key in aux) {
			script.setAttribute(key, aux[key]);
		}
	}
	script.src = url;
}



window.beatmaplistLoadedCallback = function () {
	window.setTimeout(function () {
		loadScript("assets/js/lib/zip.js", function () {
			window.zip.workerScriptsPath = 'assets/js/lib/';
			loadScript("assets/js/lib/zip-fs.js", checkdep);
		});
		loadScript("assets/js/lib/pixi.min.js", checkdep);
		loadScript("assets/js/lib/mp3parse.min.js", checkdep);
		loadScript("assets/js/lib/localforage.min.js", checkdep);

		function checkdep() {
			if (!window.aaaaa) window.aaaaa = 0;
			window.aaaaa += 1;
			if (window.aaaaa == 4) {
				// load scripts of game
				loadScript("assets/js/lib/require.js", function () {
					require.config({
						paths: {
							underscore: 'lib/underscore',
							sound: 'lib/sound'
						},
						shim: {
							"underscore": {
								exports: "_"
							}
						},
						// urlArgs: "bust=" +  (new Date()).getTime()
					});
				}, {
					"data-main": "assets/previewjs/initgame"
				});
			}
		}

	}, 0);
}