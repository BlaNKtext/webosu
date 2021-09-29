require(["osu", "underscore", "sound", "playback"],
    function (Osu, _, sound, Playback) {
            window.Osu = Osu;
            window.Playback = Playback;
            // setup compatible audio context
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
        
            // initialize global game variables
            var game = {
                window: window,
                stage: null,
                scene: null,
                updatePlayerActions: null,
        
                // note: preference values here will be overwritten by gamesettings (in settings.js)
                // display
                backgroundDimRate: 0.7,
                backgroundBlurRate: 0.0,
                cursorSize: 1.0,
                showhwmouse: false,
                snakein: true,
                snakeout: true,
        
                // audio
                masterVolume: 0.7,
                effectVolume: 1.0,
                musicVolume: 1.0,
                beatmapHitsound: true,
                globalOffset: 0,
        
                // input
                allowMouseButton: false,
                allowMouseScroll: true,
                K1keycode: 90,
                K2keycode: 88,
                ESCkeycode: 27,
                ESC2keycode: 27,
        
                // mods
                autoplay: false,
                nightcore: false,
                daycore: false,
                hardrock: false,
                easy: false,
                hidden: false,
        
                // skin mods
                hideNumbers: false,
                hideGreat: true,
                hideFollowPoints: false,
        
                // cursor info
                mouseX: 0, // in osu pixel, probably negative or exceeding 512
                mouseY: 0,
                mouse: null, // return {x,y,r} in osu pixel, probably negative or exceeding 512
                K1down: false,
                K2down: false,
                M1down: false,
                M2down: false,
                down: false,
        
                finished : false,
                sample: [{}, {}, {}, {}],
                sampleSet: 1
            };
            window.currentFrameInterval = 16;
            window.game = game;
            if (window.gamesettings)
                window.gamesettings.loadToGame();
            window.skinReady = false;
            window.soundReady = false;
            window.scriptReady = false;
            game.stage = new PIXI.Container();
            game.cursor = null;
        
        
            // load skin & game cursor
            PIXI.Loader.shared
            .add('assets/fonts/Comfortaa.woff2')
            .add("sprites.json").load(function(loader, resources) {
                window.skinReady = true;
                document.getElementById("skin-progress").classList.add("finished");
                document.body.classList.add("skin-ready");
                Skin = PIXI.Loader.shared.resources["sprites.json"].textures;
            });
        
        
            // load sounds
            // load hitsound set
            var sample = [
                'sounds/normal-hitnormal.ogg',
                'sounds/normal-hitwhistle.ogg',
                'sounds/normal-hitfinish.ogg',
                'sounds/normal-hitclap.ogg',
                'sounds/normal-slidertick.ogg',
                'sounds/soft-hitnormal.ogg',
                'sounds/soft-hitwhistle.ogg',
                'sounds/soft-hitfinish.ogg',
                'sounds/soft-hitclap.ogg',
                'sounds/soft-slidertick.ogg',
                'sounds/drum-hitnormal.ogg',
                'sounds/drum-hitwhistle.ogg',
                'sounds/drum-hitfinish.ogg',
                'sounds/drum-hitclap.ogg',
                'sounds/drum-slidertick.ogg',
                'sounds/combobreak.ogg',
            ];
            sounds.whenLoaded = function(){
                game.sample[1].hitnormal = sounds['normal-hitnormal.ogg'];
                game.sample[1].hitwhistle = sounds['normal-hitwhistle.ogg'];
                game.sample[1].hitfinish = sounds['normal-hitfinish.ogg'];
                game.sample[1].hitclap = sounds['normal-hitclap.ogg'];
                game.sample[1].slidertick = sounds['normal-slidertick.ogg'];
                game.sample[2].hitnormal = sounds['soft-hitnormal.ogg'];
                game.sample[2].hitwhistle = sounds['soft-hitwhistle.ogg'];
                game.sample[2].hitfinish = sounds['soft-hitfinish.ogg'];
                game.sample[2].hitclap = sounds['soft-hitclap.ogg'];
                game.sample[2].slidertick = sounds['soft-slidertick.ogg'];
                game.sample[3].hitnormal = sounds['drum-hitnormal.ogg'];
                game.sample[3].hitwhistle = sounds['drum-hitwhistle.ogg'];
                game.sample[3].hitfinish = sounds['drum-hitfinish.ogg'];
                game.sample[3].hitclap = sounds['drum-hitclap.ogg'];
                game.sample[3].slidertick = sounds['drum-slidertick.ogg'];
                game.sampleComboBreak = sounds['combobreak.ogg'];
                window.soundReady = true;
                document.getElementById("sound-progress").classList.add("finished");
                document.body.classList.add("sound-ready");
            };
            if (window.gamesettings.soundNames){
                sounds.cload(window.gamesettings.soundNames);
            }
            else {
                sounds.load(sample);
            }
        
            PIXI.Sprite.prototype.bringToFront = function() {
                if (this.parent) {
                    var parent = this.parent;
                    parent.removeChild(this);
                    parent.addChild(this);
                }
            }
        
            // load script done
            window.scriptReady = true;
            document.getElementById("script-progress").classList.add("finished");
            document.body.classList.add("script-ready");
        
            // load play history
            if (window.localforage) {
                localforage.getItem("playhistory1000", function(err, item) {
                    if (!err && item && item.length) {
                        window.playHistory1000 = item;
                    }
                })
            }
        
            // prevent all drag-related events
            window.addEventListener("drag", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragend", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragenter", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragexit", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragleave", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragover", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("dragstart", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
            window.addEventListener("drop", function(e){e=e||window.event; e.preventDefault(); e.stopPropagation();});
        });