/*

 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20110706
*/
var a;
(function (b) {
    function d(f, g) {
        function i(y) {
            return function (m) {
                if (!this._t || !this._t._a) {
                    this._t && this._t.sID ? c._wD(l + "ignoring " + m.type + ": " + this._t.sID) : c._wD(l + "ignoring " + m.type);
                    return null
                } else return y.call(this, m)
            }
        }
        function j() {
            if (c.debugURLParam.test(z)) c.debugMode = true;
            if (p(c.debugID)) return false;
            var y, m, V, aa;
            if (c.debugMode && !p(c.debugID) && (!Cb || !c.useConsole || c.useConsole && Cb && !c.consoleOnly)) {
                y = x.createElement("div");
                y.id = c.debugID + "-toggle";
                m = {
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    width: "1.2em",
                    height: "1.2em",
                    lineHeight: "1.2em",
                    margin: "2px",
                    textAlign: "center",
                    border: "1px solid #999",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#333",
                    zIndex: 10001
                };
                y.appendChild(x.createTextNode("-"));
                y.onclick = cb;
                y.title = "Toggle SM2 debug console";
                if (w.match(/msie 6/i)) {
                    y.style.position = "absolute";
                    y.style.cursor = "hand"
                }
                for (aa in m) if (m.hasOwnProperty(aa)) y.style[aa] = m[aa];
                m = x.createElement("div");
                m.id = c.debugID;
                m.style.display = c.debugMode ? "block" : "none";
                if (c.debugMode && !p(y.id)) {
                    try {
                        V = Xa();
                        V.appendChild(y)
                    } catch (O) {
                        throw new Error(ua("appXHTML"));
                    }
                    V.appendChild(m)
                }
            }
        }
        this.flashVersion = 8;
        this.debugMode = true;
        this.debugFlash = false;
        this.useConsole = true;
        this.waitForWindowLoad = this.consoleOnly = false;
        this.nullURL = "about:blank";
        this.allowPolling = true;
        this.useFastPolling = false;
        this.useMovieStar = true;
        this.bgColor = "#ffffff";
        this.useHighPerformance = false;
        this.flashPollingInterval = null;
        this.flashLoadTimeout = 1E3;
        this.wmode = null;
        this.allowScriptAccess = "always";
        this.useHTML5Audio = this.useFlashBlock = false;
        this.html5Test = /^probably$/i;
        this.preferFlash = this.useGlobalHTML5Audio = true;
        this.requireFlash = false;
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: true
            },
            mp4: {
                related: ["aac", "m4a"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: true
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: false
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: false
            }
        };
        this.defaultOptions = {
            autoLoad: false,
            stream: true,
            autoPlay: false,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            onbeforefinish: null,
            onbeforefinishtime: 5E3,
            onbeforefinishcomplete: null,
            onjustbeforefinish: null,
            onjustbeforefinishtime: 200,
            multiShot: true,
            multiShotEvents: false,
            position: null,
            pan: 0,
            type: null,
            usePolicyFile: false,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: false,
            useWaveformData: false,
            useEQData: false,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        };
        this.version = null;
        this.versionNumber = "V2.97a.20110706";
        this.movieURL = null;
        this.url = f || null;
        this.altURL = null;
        this.enabled = this.swfLoaded = false;
        this.o = null;
        this.movieID = "sm2-container";
        this.id = g || "sm2movie";
        this.swfCSS = {
            swfBox: "sm2-object-box",
            swfDefault: "movieContainer",
            swfError: "swf_error",
            swfTimedout: "swf_timedout",
            swfLoaded: "swf_loaded",
            swfUnblocked: "swf_unblocked",
            sm2Debug: "sm2_debug",
            highPerf: "high_performance",
            flashDebug: "flash_debug"
        };
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.muted = false;
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.didFlashBlock = this.specialWmodeCase = false;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.baseMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.netStreamTypes = ["aac", "flv", "mov", "mp4", "m4v", "f4v", "m4a", "mp4v", "3gp", "3g2"];
        this.netStreamPattern = new RegExp("\\.(" + this.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = this.baseMimeTypes;
        this.features = {
            buffering: false,
            peakData: false,
            waveformData: false,
            eqData: false,
            movieStar: false
        };
        this.sandbox = {
            type: null,
            types: {
                remote: "remote (domain-based) rules",
                localWithFile: "local with file access (no internet access)",
                localWithNetwork: "local with network (internet access only, no local access)",
                localTrusted: "local, trusted (local+internet access)"
            },
            description: null,
            noRemote: null,
            noLocal: null
        };
        this.hasHTML5 = null;
        this.html5 = {
            usingFlash: null
        };
        this.flash = {};
        this.ignoreFlash = false;
        var n, c = this,
            l = "HTML5::",
            p, w = navigator.userAgent,
            B = b,
            z = B.location.href.toString(),
            r = this.flashVersion,
            x = document,
            E, H, X = [],
            P = true,
            W, Y = false,
            la = false,
            ca = false,
            ra = false,
            Ja = false,
            sa, xa = 0,
            oa, Ba, Ya, Da, Ca, ba, Ra, db, k, Ga, Pa, za, $a, Ma, Za, Xa, ja, M, T, ea = ["log", "info", "warn", "error"],
            ka, ia, wa, ta = null,
            Ea = null,
            ua, hb, eb, cb, Va, gb, ab, Qa, mb = false,
            rb = false,
            Hb, Ib, nb = null,
            Jb, vb, pb, jb, Db, wb, Wa, Eb = Array.prototype.slice,
            sb = false,
            xb, ob, Fb;
        f = w.match(/pre\//i);
        g = w.match(/(ipad|iphone|ipod)/i);
        w.match(/mobile/i);
        var ib = w.match(/msie/i),
            Pb = w.match(/webkit/i),
            Sa = w.match(/safari/i) && !w.match(/chrome/i),
            Kb = w.match(/opera/i),
            Gb = !z.match(/usehtml5audio/i) && !z.match(/sm2\-ignorebadua/i) && Sa && w.match(/OS X 10_6_([3-7])/i),
            Cb = typeof console !== "undefined" && typeof console.log !== "undefined",
            yb = typeof x.hasFocus !== "undefined" ? x.hasFocus() : null,
            qb = typeof x.hasFocus === "undefined" && Sa,
            Lb = !qb,
            Mb = /(mp3|mp4|mpa)/i;
        this.html5Only = false;
        this._use_maybe = z.match(/sm2\-useHTML5Maybe\=1/i);
        this._overHTTP = x.location ? x.location.protocol.match(/http/i) : null;
        this._http = !this._overHTTP ? "http:" : "";
        this.useAltURL = !this._overHTTP;
        this._global_a = null;
        if (g || f) {
            c.useHTML5Audio = true;
            c.ignoreFlash = true;
            sb = c.useGlobalHTML5Audio = true
        }
        if (f || this._use_maybe) c.html5Test = /^(probably|maybe)$/i;
        (function () {
            var y = z,
                m = null;
            if (y.indexOf("#sm2-usehtml5audio=") !== -1) {
                m = y.charAt(y.indexOf("#sm2-usehtml5audio=") + 19) === "1";
                if (typeof console !== "undefined" && typeof console.log !== "undefined") console.log((m ? "Enabling " : "Disabling ") + "useHTML5Audio via URL parameter");
                c.useHTML5Audio = m
            }
        })();
        this.supported = this.ok = function () {
            return nb ? ca && !ra : c.useHTML5Audio && c.hasHTML5
        };
        this.getMovie = function (y) {
            return ib ? B[y] : Sa ? p(y) || x[y] : p(y)
        };
        this.createSound = function (y) {
            function m() {
                V = Va(V);
                c.sounds[O.id] = new n(O);
                c.soundIDs.push(O.id);
                return c.sounds[O.id]
            }
            var V = null,
                aa = null,
                O = null;
            if (!ca || !c.ok()) {
                ab("soundManager.createSound(): " + ua(!ca ? "notReady" : "notOK"));
                return false
            }
            if (arguments.length === 2) y = {
                id: arguments[0],
                url: arguments[1]
            };
            O = V = Ba(y);
            O.id.toString().charAt(0).match(/^[0-9]$/) && c._wD("soundManager.createSound(): " + ua("badID", O.id), 2);
            c._wD("soundManager.createSound(): " + O.id + " (" + O.url + ")", 1);
            if (Qa(O.id, true)) {
                c._wD("soundManager.createSound(): " + O.id + " exists", 1);
                return c.sounds[O.id]
            }
            if (vb(O)) {
                aa = m();
                c._wD("Loading sound " + O.id + " via HTML5");
                aa._setup_html5(O)
            } else {
                if (r > 8 && c.useMovieStar) {
                    if (O.isMovieStar === null) O.isMovieStar = O.serverURL || (O.type ? O.type.match(c.netStreamPattern) : false) || O.url.match(c.netStreamPattern) ? true : false;
                    O.isMovieStar && c._wD("soundManager.createSound(): using MovieStar handling");
                    if (O.isMovieStar) {
                        if (O.usePeakData) {
                            sa("noPeak");
                            O.usePeakData = false
                        }
                        O.loops > 1 && sa("noNSLoop")
                    }
                }
                O = gb(O, "soundManager.createSound(): ");
                aa = m();
                if (r === 8) c.o._createSound(O.id, O.onjustbeforefinishtime, O.loops || 1, O.usePolicyFile);
                else {
                    c.o._createSound(O.id, O.url, O.onjustbeforefinishtime, O.usePeakData, O.useWaveformData, O.useEQData, O.isMovieStar, O.isMovieStar ? O.bufferTime : false, O.loops || 1, O.serverURL, O.duration || null, O.autoPlay, true, O.autoLoad, O.usePolicyFile);
                    if (!O.serverURL) {
                        aa.connected = true;
                        O.onconnect && O.onconnect.apply(aa)
                    }
                }
                if ((O.autoLoad || O.autoPlay) && !O.serverURL) aa.load(O)
            }
            O.autoPlay && !O.serverURL && aa.play();
            return aa
        };
        this.destroySound = function (y, m) {
            if (!Qa(y)) return false;
            var V = c.sounds[y],
                aa;
            V._iO = {};
            V.stop();
            V.unload();
            for (aa = 0; aa < c.soundIDs.length; aa++) if (c.soundIDs[aa] === y) {
                c.soundIDs.splice(aa, 1);
                break
            }
            m || V.destruct(true);
            delete c.sounds[y];
            return true
        };
        this.load = function (y, m) {
            if (!Qa(y)) return false;
            return c.sounds[y].load(m)
        };
        this.unload = function (y) {
            if (!Qa(y)) return false;
            return c.sounds[y].unload()
        };
        this.start = this.play = function (y, m) {
            if (!ca || !c.ok()) {
                ab("soundManager.play(): " + ua(!ca ? "notReady" : "notOK"));
                return false
            }
            if (!Qa(y)) {
                m instanceof Object || (m = {
                    url: m
                });
                if (m && m.url) {
                    c._wD('soundManager.play(): attempting to create "' + y + '"', 1);
                    m.id = y;
                    return c.createSound(m).play()
                } else return false
            }
            return c.sounds[y].play(m)
        };
        this.setPosition = function (y, m) {
            if (!Qa(y)) return false;
            return c.sounds[y].setPosition(m)
        };
        this.stop = function (y) {
            if (!Qa(y)) return false;
            c._wD("soundManager.stop(" + y + ")", 1);
            return c.sounds[y].stop()
        };
        this.stopAll = function () {
            c._wD("soundManager.stopAll()", 1);
            for (var y in c.sounds) c.sounds[y] instanceof n && c.sounds[y].stop()
        };
        this.pause = function (y) {
            if (!Qa(y)) return false;
            return c.sounds[y].pause()
        };
        this.pauseAll = function () {
            for (var y = c.soundIDs.length; y--;) c.sounds[c.soundIDs[y]].pause()
        };
        this.resume = function (y) {
            if (!Qa(y)) return false;
            return c.sounds[y].resume()
        };
        this.resumeAll = function () {
            for (var y = c.soundIDs.length; y--;) c.sounds[c.soundIDs[y]].resume()
        };
        this.togglePause = function (y) {
            if (!Qa(y)) return false;
            return c.sounds[y].togglePause()
        };
        this.setPan = function (y, m) {
            if (!Qa(y)) return false;
            return c.sounds[y].setPan(m)
        };
        this.setVolume = function (y, m) {
            if (!Qa(y)) return false;
            return c.sounds[y].setVolume(m)
        };
        this.mute = function (y) {
            var m = 0;
            if (typeof y !== "string") y = null;
            if (y) {
                if (!Qa(y)) return false;
                c._wD('soundManager.mute(): Muting "' + y + '"');
                return c.sounds[y].mute()
            } else {
                c._wD("soundManager.mute(): Muting all sounds");
                for (m = c.soundIDs.length; m--;) c.sounds[c.soundIDs[m]].mute();
                c.muted = true
            }
            return true
        };
        this.muteAll = function () {
            c.mute()
        };
        this.unmute = function (y) {
            if (typeof y !== "string") y = null;
            if (y) {
                if (!Qa(y)) return false;
                c._wD('soundManager.unmute(): Unmuting "' + y + '"');
                return c.sounds[y].unmute()
            } else {
                c._wD("soundManager.unmute(): Unmuting all sounds");
                for (y = c.soundIDs.length; y--;) c.sounds[c.soundIDs[y]].unmute();
                c.muted = false
            }
            return true
        };
        this.unmuteAll = function () {
            c.unmute()
        };
        this.toggleMute = function (y) {
            if (!Qa(y)) return false;
            return c.sounds[y].toggleMute()
        };
        this.getMemoryUse = function () {
            if (r === 8) return 0;
            if (c.o) return parseInt(c.o._getMemoryUse(), 10)
        };
        this.disable = function (y) {
            if (typeof y === "undefined") y = false;
            if (ra) return false;
            ra = true;
            sa("shutdown", 1);
            for (var m = c.soundIDs.length; m--;) ka(c.sounds[c.soundIDs[m]]);
            oa(y);
            Wa.remove(B, "load", Ca);
            return true
        };
        this.canPlayMIME = function (y) {
            var m;
            if (c.hasHTML5) m = pb({
                type: y
            });
            return !nb || m ? m : y ? y.match(c.mimePattern) ? true : false : null
        };
        this.canPlayURL = function (y) {
            var m;
            if (c.hasHTML5) m = pb({
                url: y
            });
            return !nb || m ? m : y ? y.match(c.filePattern) ? true : false : null
        };
        this.canPlayLink = function (y) {
            if (typeof y.type !== "undefined" && y.type) if (c.canPlayMIME(y.type)) return true;
            return c.canPlayURL(y.href)
        };
        this.getSoundById = function (y, m) {
            if (!y) throw new Error("soundManager.getSoundById(): sID is null/undefined");
            var V = c.sounds[y];
            !V && !m && c._wD('"' + y + '" is an invalid sound ID.', 2);
            return V
        };
        this.onready = function (y, m) {
            if (y && y instanceof Function) {
                ca && c._wD(ua("queue", "onready"));
                m || (m = B);
                Ya("onready", y, m);
                Da();
                return true
            } else throw ua("needFunction", "onready");
        };
        this.ontimeout = function (y, m) {
            if (y && y instanceof Function) {
                ca && c._wD(ua("queue", "ontimeout"));
                m || (m = B);
                Ya("ontimeout", y, m);
                Da({
                    type: "ontimeout"
                });
                return true
            } else throw ua("needFunction", "ontimeout");
        };
        this.getMoviePercent = function () {
            return c.o && typeof c.o.PercentLoaded !== "undefined" ? c.o.PercentLoaded() : null
        };
        this._wD = this._writeDebug = function (y, m, V) {
            var aa, O;
            if (!c.debugMode) return false;
            if (typeof V !== "undefined" && V) y = y + " | " + (new Date).getTime();
            if (Cb && c.useConsole) {
                V = ea[m];
                typeof console[V] !== "undefined" ? console[V](y) : console.log(y);
                if (c.useConsoleOnly) return true
            }
            try {
                aa = p("soundmanager-debug");
                if (!aa) return false;
                O = x.createElement("div");
                if (++xa % 2 === 0) O.className = "sm2-alt";
                m = typeof m === "undefined" ? 0 : parseInt(m, 10);
                O.appendChild(x.createTextNode(y));
                if (m) {
                    if (m >= 2) O.style.fontWeight = "bold";
                    if (m === 3) O.style.color = "#ff3333"
                }
                aa.insertBefore(O, aa.firstChild)
            } catch (J) {}
            return true
        };
        this._debug = function () {
            sa("currentObj", 1);
            for (var y = 0, m = c.soundIDs.length; y < m; y++) c.sounds[c.soundIDs[y]]._debug()
        };
        this.reboot = function () {
            c._wD("soundManager.reboot()");
            c.soundIDs.length && c._wD("Destroying " + c.soundIDs.length + " SMSound objects...");
            var y, m;
            for (y = c.soundIDs.length; y--;) c.sounds[c.soundIDs[y]].destruct();
            try {
                if (ib) Ea = c.o.innerHTML;
                ta = c.o.parentNode.removeChild(c.o);
                c._wD("Flash movie removed.")
            } catch (V) {
                sa("badRemove", 2)
            }
            Ea = ta = null;
            c.enabled = ca = mb = rb = Y = la = ra = c.swfLoaded = false;
            c.soundIDs = c.sounds = [];
            c.o = null;
            for (y in X) if (X.hasOwnProperty(y)) for (m = X[y].length; m--;) X[y][m].fired = false;
            c._wD("soundManager: Rebooting...");
            B.setTimeout(function () {
                c.beginDelayedInit()
            }, 20)
        };
        this.destruct = function () {
            c._wD("soundManager.destruct()");
            c.disable(true)
        };
        this.beginDelayedInit = function () {
            Ja = true;
            Ma();
            setTimeout(Pa, 20);
            Ra()
        };
        this._html5_events = {
            abort: i(function () {
                c._wD(l + "abort: " + this._t.sID)
            }),
            canplay: i(function () {
                if (this._t._html5_canplay) return true;
                this._t._html5_canplay = true;
                c._wD(l + "canplay: " + this._t.sID + ", " + this._t.url);
                this._t._onbufferchange(0);
                var y = !isNaN(this._t.position) ? this._t.position / 1E3 : null;
                if (this._t.position && this.currentTime !== y) {
                    c._wD(l + "canplay: setting position to " + y + "");
                    try {
                        this.currentTime = y
                    } catch (m) {
                        c._wD(l + "setting position failed: " + m.message, 2)
                    }
                }
            }),
            load: i(function () {
                if (!this._t.loaded) {
                    this._t._onbufferchange(0);
                    this._t._whileloading(this._t.bytesTotal, this._t.bytesTotal, this._t._get_html5_duration());
                    this._t._onload(true)
                }
            }),
            emptied: i(function () {
                c._wD(l + "emptied: " + this._t.sID)
            }),
            ended: i(function () {
                c._wD(l + "ended: " + this._t.sID);
                this._t._onfinish()
            }),
            error: i(function () {
                c._wD(l + "error: " + this.error.code);
                this._t._onload(false)
            }),
            loadeddata: i(function () {
                c._wD(l + "loadeddata: " + this._t.sID)
            }),
            loadedmetadata: i(function () {
                c._wD(l + "loadedmetadata: " + this._t.sID)
            }),
            loadstart: i(function () {
                c._wD(l + "loadstart: " + this._t.sID);
                this._t._onbufferchange(1)
            }),
            play: i(function () {
                c._wD(l + "play: " + this._t.sID + ", " + this._t.url);
                this._t._onbufferchange(0)
            }),
            playing: i(function () {
                c._wD(l + "playing: " + this._t.sID + ", " + this._t.url);
                this._t._onbufferchange(0)
            }),
            progress: i(function (y) {
                if (this._t.loaded) return false;
                var m, V, aa;
                aa = 0;
                var O = y.type === "progress";
                V = y.target.buffered;
                var J = y.loaded || 0,
                    R = y.total || 1;
                if (V && V.length) {
                    for (m = V.length; m--;) aa = V.end(m) - V.start(m);
                    J = aa / y.target.duration;
                    if (O && V.length > 1) {
                        aa = [];
                        V = V.length;
                        for (m = 0; m < V; m++) aa.push(y.target.buffered.start(m) + "-" + y.target.buffered.end(m));
                        c._wD(l + "progress: timeRanges: " + aa.join(", "))
                    }
                    O && !isNaN(J) && c._wD(l + "progress: " + this._t.sID + ": " + Math.floor(J * 100) + "% loaded")
                }
                if (!isNaN(J)) {
                    this._t._onbufferchange(0);
                    this._t._whileloading(J, R, this._t._get_html5_duration());
                    J && R && J === R && c._html5_events.load.call(this, y)
                }
            }),
            ratechange: i(function () {
                c._wD(l + "ratechange: " + this._t.sID)
            }),
            suspend: i(function (y) {
                c._wD(l + "suspend: " + this._t.sID);
                c._html5_events.progress.call(this, y)
            }),
            stalled: i(function () {
                c._wD(l + "stalled: " + this._t.sID)
            }),
            timeupdate: i(function () {
                this._t._onTimer()
            }),
            waiting: i(function () {
                c._wD(l + "waiting: " + this._t.sID);
                this._t._onbufferchange(1)
            })
        };
        n = function (y) {
            var m = this,
                V, aa, O;
            this.sID = y.id;
            this.url = y.url;
            this._iO = this.instanceOptions = this.options = Ba(y);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this._lastURL = null;
            this.isHTML5 = false;
            this._a = null;
            this.id3 = {};
            this._debug = function () {
                if (c.debugMode) {
                    var J = null,
                        R = [],
                        ma, ya;
                    for (J in m.options) if (m.options[J] !== null) if (m.options[J] instanceof Function) {
                        ma = m.options[J].toString();
                        ma = ma.replace(/\s\s+/g, " ");
                        ya = ma.indexOf("{");
                        R.push(" " + J + ": {" + ma.substr(ya + 1, Math.min(Math.max(ma.indexOf("\n") - 1, 64), 64)).replace(/\n/g, "") + "... }")
                    } else R.push(" " + J + ": " + m.options[J]);
                    c._wD("SMSound() merged options: {\n" + R.join(", \n") + "\n}")
                }
            };
            this._debug();
            this.load = function (J) {
                var R = null;
                if (typeof J !== "undefined") {
                    m._iO = Ba(J, m.options);
                    m.instanceOptions = m._iO
                } else {
                    J = m.options;
                    m._iO = J;
                    m.instanceOptions = m._iO;
                    if (m._lastURL && m._lastURL !== m.url) {
                        sa("manURL");
                        m._iO.url = m.url;
                        m.url = null
                    }
                }
                if (!m._iO.url) m._iO.url = m.url;
                c._wD("SMSound.load(): " + m._iO.url, 1);
                if (m._iO.url === m.url && m.readyState !== 0 && m.readyState !== 2) {
                    sa("onURL", 1);
                    return m
                }
                m._lastURL = m.url;
                m.loaded = false;
                m.readyState = 1;
                m.playState = 0;
                if (vb(m._iO)) {
                    R = m._setup_html5(m._iO);
                    if (R._called_load) c._wD("HTML5 ignoring request to load again: " + m.sID);
                    else {
                        c._wD(l + "load: " + m.sID);
                        m._html5_canplay = false;
                        R.load();
                        R._called_load = true;
                        m._iO.autoPlay && m.play()
                    }
                } else try {
                    m.isHTML5 = false;
                    m._iO = gb(Va(m._iO));
                    r === 8 ? c.o._load(m.sID, m._iO.url, m._iO.stream, m._iO.autoPlay, m._iO.whileloading ? 1 : 0, m._iO.loops || 1, m._iO.usePolicyFile) : c.o._load(m.sID, m._iO.url, m._iO.stream ? true : false, m._iO.autoPlay ? true : false, m._iO.loops || 1, m._iO.autoLoad ? true : false, m._iO.usePolicyFile)
                } catch (ma) {
                    sa("smError", 2);
                    W("onload", false);
                    M()
                }
                return m
            };
            this.unload = function () {
                if (m.readyState !== 0) {
                    c._wD('SMSound.unload(): "' + m.sID + '"');
                    if (m.isHTML5) {
                        aa();
                        if (m._a) {
                            m._a.pause();
                            m._a.src = ""
                        }
                    } else r === 8 ? c.o._unload(m.sID, c.nullURL) : c.o._unload(m.sID);
                    V()
                }
                return m
            };
            this.destruct = function (J) {
                c._wD('SMSound.destruct(): "' + m.sID + '"');
                if (m.isHTML5) {
                    aa();
                    if (m._a) {
                        m._a.pause();
                        m._a.src = "";
                        sb || m._remove_html5_events()
                    }
                } else {
                    m._iO.onfailure = null;
                    c.o._destroySound(m.sID)
                }
                J || c.destroySound(m.sID, true)
            };
            this.start = this.play = function (J, R) {
                R = R === undefined ? true : R;
                J || (J = {});
                m._iO = Ba(J, m._iO);
                m._iO = Ba(m._iO, m.options);
                m.instanceOptions = m._iO;
                if (m._iO.serverURL) if (!m.connected) {
                    if (!m.getAutoPlay()) {
                        c._wD("SMSound.play():  Netstream not connected yet - setting autoPlay");
                        m.setAutoPlay(true)
                    }
                    return m
                }
                if (vb(m._iO)) {
                    m._setup_html5(m._iO);
                    O()
                }
                if (m.playState === 1 && !m.paused) if (J = m._iO.multiShot) c._wD('SMSound.play(): "' + m.sID + '" already playing (multi-shot)', 1);
                else {
                    c._wD('SMSound.play(): "' + m.sID + '" already playing (one-shot)', 1);
                    return m
                }
                if (m.loaded) c._wD('SMSound.play(): "' + m.sID + '"');
                else if (m.readyState === 0) {
                    c._wD('SMSound.play(): Attempting to load "' + m.sID + '"', 1);
                    if (!m.isHTML5) m._iO.autoPlay = true;
                    m.load(m._iO)
                } else if (m.readyState === 2) {
                    c._wD('SMSound.play(): Could not load "' + m.sID + '" - exiting', 2);
                    return m
                } else c._wD('SMSound.play(): "' + m.sID + '" is loading - attempting to play..', 1);
                if (m.paused && m.position && m.position > 0) {
                    c._wD('SMSound.play(): "' + m.sID + '" is resuming from paused state', 1);
                    m.resume()
                } else {
                    c._wD('SMSound.play(): "' + m.sID + '" is starting to play');
                    m.playState = 1;
                    m.paused = false;
                    if (!m.instanceCount || m._iO.multiShotEvents || r > 8 && !m.isHTML5 && !m.getAutoPlay()) m.instanceCount++;
                    m.position = typeof m._iO.position !== "undefined" && !isNaN(m._iO.position) ? m._iO.position : 0;
                    if (!m.isHTML5) m._iO = gb(Va(m._iO));
                    if (m._iO.onplay && R) {
                        m._iO.onplay.apply(m);
                        m._onplay_called = true
                    }
                    m.setVolume(m._iO.volume, true);
                    m.setPan(m._iO.pan, true);
                    if (m.isHTML5) {
                        O();
                        R = m._setup_html5();
                        m.setPosition(m.position);
                        R.play()
                    } else c.o._start(m.sID, m._iO.loops || 1, r === 9 ? m.position : m.position / 1E3)
                }
                return m
            };
            this.stop = function (J) {
                if (m.playState === 1) {
                    m._onbufferchange(0);
                    m.resetOnPosition(0);
                    if (!m.isHTML5) m.playState = 0;
                    m.paused = false;
                    m._iO.onstop && m._iO.onstop.apply(m);
                    if (m.isHTML5) {
                        if (m._a) {
                            m.setPosition(0);
                            m._a.pause();
                            m.playState = 0;
                            m._onTimer();
                            aa();
                            m.unload()
                        }
                    } else {
                        c.o._stop(m.sID, J);
                        m._iO.serverURL && m.unload()
                    }
                    m.instanceCount = 0;
                    m._iO = {}
                }
                return m
            };
            this.setAutoPlay = function (J) {
                c._wD("sound " + m.sID + " turned autoplay " + (J ? "on" : "off"));
                m._iO.autoPlay = J;
                if (m.isHTML5) m._a && J && m.play();
                else c.o._setAutoPlay(m.sID, J);
                if (J) if (!m.instanceCount && m.readyState === 1) {
                    m.instanceCount++;
                    c._wD("sound " + m.sID + " incremented instance count to " + m.instanceCount)
                }
            };
            this.getAutoPlay = function () {
                return m._iO.autoPlay
            };
            this.setPosition = function (J) {
                if (J === undefined) J = 0;
                var R = m.isHTML5 ? Math.max(J, 0) : Math.min(m.duration || m._iO.duration, Math.max(J, 0));
                m.position = R;
                J = m.position / 1E3;
                m.resetOnPosition(m.position);
                m._iO.position = R;
                if (m.isHTML5) {
                    if (m._a) if (m._html5_canplay) {
                        if (m._a.currentTime !== J) {
                            c._wD("setPosition(" + J + "): setting position");
                            try {
                                m._a.currentTime = J;
                                if (m.playState === 0 || m.paused) m._a.pause()
                            } catch (ma) {
                                c._wD("setPosition(" + J + "): setting position failed: " + ma.message, 2)
                            }
                        }
                    } else c._wD("setPosition(" + J + "): delaying, sound not ready")
                } else {
                    J = r === 9 ? m.position : J;
                    if (m.readyState && m.readyState !== 2) c.o._setPosition(m.sID, J, m.paused || !m.playState)
                }
                m.isHTML5 && m.paused && m._onTimer(true);
                return m
            };
            this.pause = function (J) {
                if (m.paused || m.playState === 0 && m.readyState !== 1) return m;
                c._wD("SMSound.pause()");
                m.paused = true;
                if (m.isHTML5) {
                    m._setup_html5().pause();
                    aa()
                } else if (J || J === undefined) c.o._pause(m.sID);
                m._iO.onpause && m._iO.onpause.apply(m);
                return m
            };
            this.resume = function () {
                if (!m.paused) return m;
                c._wD("SMSound.resume()");
                m.paused = false;
                m.playState = 1;
                if (m.isHTML5) {
                    m._setup_html5().play();
                    O()
                } else {
                    m._iO.isMovieStar && m.setPosition(m.position);
                    c.o._pause(m.sID)
                }
                if (!m._onplay_called && m._iO.onplay) {
                    m._iO.onplay.apply(m);
                    m._onplay_called = true
                } else m._iO.onresume && m._iO.onresume.apply(m);
                return m
            };
            this.togglePause = function () {
                c._wD("SMSound.togglePause()");
                if (m.playState === 0) {
                    m.play({
                        position: r === 9 && !m.isHTML5 ? m.position : m.position / 1E3
                    });
                    return m
                }
                m.paused ? m.resume() : m.pause();
                return m
            };
            this.setPan = function (J, R) {
                if (typeof J === "undefined") J = 0;
                if (typeof R === "undefined") R = false;
                m.isHTML5 || c.o._setPan(m.sID, J);
                m._iO.pan = J;
                if (!R) {
                    m.pan = J;
                    m.options.pan = J
                }
                return m
            };
            this.setVolume = function (J, R) {
                if (typeof J === "undefined") J = 100;
                if (typeof R === "undefined") R = false;
                if (m.isHTML5) {
                    if (m._a) m._a.volume = Math.max(0, Math.min(1, J / 100))
                } else c.o._setVolume(m.sID, c.muted && !m.muted || m.muted ? 0 : J);
                m._iO.volume = J;
                if (!R) {
                    m.volume = J;
                    m.options.volume = J
                }
                return m
            };
            this.mute = function () {
                m.muted = true;
                if (m.isHTML5) {
                    if (m._a) m._a.muted = true
                } else c.o._setVolume(m.sID, 0);
                return m
            };
            this.unmute = function () {
                m.muted = false;
                var J = typeof m._iO.volume !== "undefined";
                if (m.isHTML5) {
                    if (m._a) m._a.muted = false
                } else c.o._setVolume(m.sID, J ? m._iO.volume : m.options.volume);
                return m
            };
            this.toggleMute = function () {
                return m.muted ? m.unmute() : m.mute()
            };
            this.onposition = function (J, R, ma) {
                m._onPositionItems.push({
                    position: J,
                    method: R,
                    scope: typeof ma !== "undefined" ? ma : m,
                    fired: false
                });
                return m
            };
            this.processOnPosition = function () {
                var J, R;
                J = m._onPositionItems.length;
                if (!J || !m.playState || m._onPositionFired >= J) return false;
                for (J = J; J--;) {
                    R = m._onPositionItems[J];
                    if (!R.fired && m.position >= R.position) {
                        R.method.apply(R.scope, [R.position]);
                        R.fired = true;
                        c._onPositionFired++
                    }
                }
                return true
            };
            this.resetOnPosition = function (J) {
                var R, ma;
                R = m._onPositionItems.length;
                if (!R) return false;
                for (R = R; R--;) {
                    ma = m._onPositionItems[R];
                    if (ma.fired && J <= ma.position) {
                        ma.fired = false;
                        c._onPositionFired--
                    }
                }
                return true
            };
            this._onTimer = function (J) {
                var R = {};
                if (m._hasTimer || J) if (m._a && (J || (m.playState > 0 || m.readyState === 1) && !m.paused)) {
                    m.duration = m._get_html5_duration();
                    m.durationEstimate = m.duration;
                    J = m._a.currentTime ? m._a.currentTime * 1E3 : 0;
                    m._whileplaying(J, R, R, R, R);
                    return true
                } else {
                    c._wD('_onTimer: Warn for "' + m.sID + '": ' + (!m._a ? "Could not find element. " : "") + (m.playState === 0 ? "playState bad, 0?" : "playState = " + m.playState + ", OK"));
                    return false
                }
            };
            this._get_html5_duration = function () {
                var J = m._a ? m._a.duration * 1E3 : m._iO ? m._iO.duration : undefined;
                return J && !isNaN(J) && J !== Infinity ? J : m._iO ? m._iO.duration : null
            };
            O = function () {
                m.isHTML5 && Hb(m)
            };
            aa = function () {
                m.isHTML5 && Ib(m)
            };
            V = function () {
                m._onPositionItems = [];
                m._onPositionFired = 0;
                m._hasTimer = null;
                m._onplay_called = false;
                m._a = null;
                m._html5_canplay = false;
                m.bytesLoaded = null;
                m.bytesTotal = null;
                m.position = null;
                m.duration = m._iO && m._iO.duration ? m._iO.duration : null;
                m.durationEstimate = null;
                m.failures = 0;
                m.loaded = false;
                m.playState = 0;
                m.paused = false;
                m.readyState = 0;
                m.muted = false;
                m.didBeforeFinish = false;
                m.didJustBeforeFinish = false;
                m.isBuffering = false;
                m.instanceOptions = {};
                m.instanceCount = 0;
                m.peakData = {
                    left: 0,
                    right: 0
                };
                m.waveformData = {
                    left: [],
                    right: []
                };
                m.eqData = [];
                m.eqData.left = [];
                m.eqData.right = []
            };
            V();
            this._setup_html5 = function (J) {
                J = Ba(m._iO, J);
                var R = sb ? c._global_a : m._a,
                    ma = decodeURI(J.url),
                    ya = R && R._t ? R._t.instanceOptions : null;
                if (R) {
                    if (R._t && ya.url === J.url && (!m._lastURL || m._lastURL === ya.url)) return R;
                    c._wD("setting new URL on existing object: " + ma + (m._lastURL ? ", old URL: " + m._lastURL : ""));
                    sb && R._t && R._t.playState && J.url !== ya.url && R._t.stop();
                    V();
                    R.src = J.url;
                    m.url = J.url;
                    m._lastURL = J.url;
                    R._called_load = false
                } else {
                    c._wD("creating HTML5 Audio() element with URL: " + ma);
                    R = new Audio(J.url);
                    R._called_load = false;
                    if (sb) c._global_a = R
                }
                m.isHTML5 = true;
                m._a = R;
                R._t = m;
                m._add_html5_events();
                R.loop = J.loops > 1 ? "loop" : "";
                if (J.autoLoad || J.autoPlay) {
                    R.autobuffer = "auto";
                    R.preload = "auto";
                    m.load();
                    R._called_load = true
                } else {
                    R.autobuffer = false;
                    R.preload = "none"
                }
                R.loop = J.loops > 1 ? "loop" : "";
                return R
            };
            this._add_html5_events = function () {
                function J(ma, ya, Ha) {
                    return m._a ? m._a.addEventListener(ma, ya, Ha || false) : null
                }
                if (m._a._added_events) return false;
                var R;
                c._wD(l + "adding event listeners: " + m.sID);
                m._a._added_events = true;
                for (R in c._html5_events) c._html5_events.hasOwnProperty(R) && J(R, c._html5_events[R]);
                return true
            };
            this._remove_html5_events = function () {
                function J(ma, ya, Ha) {
                    return m._a ? m._a.removeEventListener(ma, ya, Ha || false) : null
                }
                c._wD(l + "removing event listeners: " + m.sID);
                m._a._added_events = false;
                for (var R in c._html5_events) c._html5_events.hasOwnProperty(R) && J(R, c._html5_events[R])
            };
            this._whileloading = function (J, R, ma, ya) {
                m.bytesLoaded = J;
                m.bytesTotal = R;
                m.duration = Math.floor(ma);
                m.bufferLength = ya;
                if (m._iO.isMovieStar) m.durationEstimate = m.duration;
                else {
                    m.durationEstimate = m._iO.duration ? m.duration > m._iO.duration ? m.duration : m._iO.duration : parseInt(m.bytesTotal / m.bytesLoaded * m.duration, 10);
                    if (m.durationEstimate === undefined) m.durationEstimate = m.duration
                }
                m.readyState !== 3 && m._iO.whileloading && m._iO.whileloading.apply(m)
            };
            this._onid3 = function (J, R) {
                c._wD('SMSound._onid3(): "' + this.sID + '" ID3 data received.');
                var ma = [],
                    ya, Ha;
                ya = 0;
                for (Ha = J.length; ya < Ha; ya++) ma[J[ya]] = R[ya];
                m.id3 = Ba(m.id3, ma);
                m._iO.onid3 && m._iO.onid3.apply(m)
            };
            this._whileplaying = function (J, R, ma, ya, Ha) {
                if (isNaN(J) || J === null) return false;
                if (m.playState === 0 && J > 0) J = 0;
                m.position = J;
                m.processOnPosition();
                if (r > 8 && !m.isHTML5) {
                    if (m._iO.usePeakData && typeof R !== "undefined" && R) m.peakData = {
                        left: R.leftPeak,
                        right: R.rightPeak
                    };
                    if (m._iO.useWaveformData && typeof ma !== "undefined" && ma) m.waveformData = {
                        left: ma.split(","),
                        right: ya.split(",")
                    };
                    if (m._iO.useEQData) if (typeof Ha !== "undefined" && Ha && Ha.leftEQ) {
                        J = Ha.leftEQ.split(",");
                        m.eqData = J;
                        m.eqData.left = J;
                        if (typeof Ha.rightEQ !== "undefined" && Ha.rightEQ) m.eqData.right = Ha.rightEQ.split(",")
                    }
                }
                if (m.playState === 1) {
                    !m.isHTML5 && c.flashVersion === 8 && !m.position && m.isBuffering && m._onbufferchange(0);
                    m._iO.whileplaying && m._iO.whileplaying.apply(m);
                    if ((m.loaded || !m.loaded && m._iO.isMovieStar) && m._iO.onbeforefinish && m._iO.onbeforefinishtime && !m.didBeforeFinish && m.duration - m.position <= m._iO.onbeforefinishtime) m._onbeforefinish()
                }
                return true
            };
            this._onconnect = function (J) {
                J = J === 1;
                c._wD('SMSound._onconnect(): "' + m.sID + '"' + (J ? " connected." : " failed to connect? - " + m.url), J ? 1 : 2);
                if (m.connected = J) {
                    m.failures = 0;
                    if (Qa(m.sID)) if (m.getAutoPlay()) m.play(undefined, m.getAutoPlay());
                    else m._iO.autoLoad && m.load();
                    m._iO.onconnect && m._iO.onconnect.apply(m, [J])
                }
            };
            this._onload = function (J) {
                J = J ? true : false;
                c._wD('SMSound._onload(): "' + m.sID + '"' + (J ? " loaded." : " failed to load? - " + m.url), J ? 1 : 2);
                if (!J && !m.isHTML5) {
                    c.sandbox.noRemote === true && c._wD("SMSound._onload(): " + ua("noNet"), 1);
                    c.sandbox.noLocal === true && c._wD("SMSound._onload(): " + ua("noLocal"), 1)
                }
                m.loaded = J;
                m.readyState = J ? 3 : 2;
                m._onbufferchange(0);
                m._iO.onload && m._iO.onload.apply(m, [J]);
                return true
            };
            this._onfailure = function (J, R, ma) {
                m.failures++;
                c._wD('SMSound._onfailure(): "' + m.sID + '" count ' + m.failures);
                m._iO.onfailure && m.failures === 1 ? m._iO.onfailure(m, J, R, ma) : c._wD("SMSound._onfailure(): ignoring")
            };
            this._onbeforefinish = function () {
                if (!m.didBeforeFinish) {
                    m.didBeforeFinish = true;
                    if (m._iO.onbeforefinish) {
                        c._wD('SMSound._onbeforefinish(): "' + m.sID + '"');
                        m._iO.onbeforefinish.apply(m)
                    }
                }
            };
            this._onjustbeforefinish = function () {
                if (!m.didJustBeforeFinish) {
                    m.didJustBeforeFinish = true;
                    if (m._iO.onjustbeforefinish) {
                        c._wD('SMSound._onjustbeforefinish(): "' + m.sID + '"');
                        m._iO.onjustbeforefinish.apply(m)
                    }
                }
            };
            this._onfinish = function () {
                var J = m._iO.onfinish;
                m._onbufferchange(0);
                m.resetOnPosition(0);
                m._iO.onbeforefinishcomplete && m._iO.onbeforefinishcomplete.apply(m);
                m.didBeforeFinish = false;
                m.didJustBeforeFinish = false;
                if (m.instanceCount) {
                    m.instanceCount--;
                    if (!m.instanceCount) {
                        m.playState = 0;
                        m.paused = false;
                        m.instanceCount = 0;
                        m.instanceOptions = {};
                        m._iO = {};
                        aa()
                    }
                    if (!m.instanceCount || m._iO.multiShotEvents) if (J) {
                        c._wD('SMSound._onfinish(): "' + m.sID + '"');
                        J.apply(m)
                    }
                }
            };
            this._onbufferchange = function (J) {
                if (m.playState === 0) return false;
                if (J && m.isBuffering || !J && !m.isBuffering) return false;
                m.isBuffering = J === 1;
                if (m._iO.onbufferchange) {
                    c._wD("SMSound._onbufferchange(): " + J);
                    m._iO.onbufferchange.apply(m)
                }
                return true
            };
            this._ondataerror = function (J) {
                if (m.playState > 0) {
                    c._wD("SMSound._ondataerror(): " + J);
                    m._iO.ondataerror && m._iO.ondataerror.apply(m)
                }
            }
        };
        Xa = function () {
            return x.body ? x.body : x._docElement ? x.documentElement : x.getElementsByTagName("div")[0]
        };
        p = function (y) {
            return x.getElementById(y)
        };
        Ba = function (y, m) {
            var V = {},
                aa, O;
            for (aa in y) if (y.hasOwnProperty(aa)) V[aa] = y[aa];
            y = typeof m === "undefined" ? c.defaultOptions : m;
            for (O in y) if (y.hasOwnProperty(O) && typeof V[O] === "undefined") V[O] = y[O];
            return V
        };
        Wa = function () {
            function y(R) {
                R = Eb.call(R);
                var ma = R.length;
                if (O) {
                    R[1] = "on" + R[1];
                    ma > 3 && R.pop()
                } else ma === 3 && R.push(false);
                return R
            }
            function m(R, ma) {
                var ya = R.shift();
                ma = [J[ma]];
                O ? ya[ma](R[0], R[1]) : ya[ma].apply(ya, R)
            }
            function V() {
                m(y(arguments), "add")
            }
            function aa() {
                m(y(arguments), "remove")
            }
            var O = B.attachEvent,
                J = {
                    add: O ? "attachEvent" : "addEventListener",
                    remove: O ? "detachEvent" : "removeEventListener"
                };
            return {
                add: V,
                remove: aa
            }
        }();
        vb = function (y) {
            return !y.serverURL && (y.type ? pb({
                type: y.type
            }) : pb({
                url: y.url
            }) || c.html5Only)
        };
        pb = function (y) {
            function m(J) {
                return c.preferFlash && !c.ignoreFlash && typeof c.flash[J] !== "undefined" && c.flash[J]
            }
            if (!c.useHTML5Audio || !c.hasHTML5) return false;
            var V = y.url || null;
            y = y.type || null;
            var aa = c.audioFormats,
                O;
            if (y && c.html5[y] !== "undefined") return c.html5[y] && !m(y);
            if (!jb) {
                jb = [];
                for (O in aa) if (aa.hasOwnProperty(O)) {
                    jb.push(O);
                    if (aa[O].related) jb = jb.concat(aa[O].related)
                }
                jb = new RegExp("\\.(" + jb.join("|") + ")", "i")
            }
            O = V ? V.toLowerCase().match(jb) : null;
            if (!O || !O.length) if (y) {
                V = y.indexOf(";");
                O = (V !== -1 ? y.substr(0, V) : y).substr(6)
            } else return false;
            else O = O[0].substr(1);
            if (O && typeof c.html5[O] !== "undefined") return c.html5[O] && !m(O);
            else {
                y = "audio/" + O;
                V = c.html5.canPlayType({
                    type: y
                });
                return (c.html5[O] = V) && c.html5[y] && !m(y)
            }
        };
        wb = function () {
            function y(R) {
                var ma, ya, Ha = false;
                if (!m || typeof m.canPlayType !== "function") return false;
                if (R instanceof Array) {
                    ma = 0;
                    for (ya = R.length; ma < ya && !Ha; ma++) if (c.html5[R[ma]] || m.canPlayType(R[ma]).match(c.html5Test)) {
                        Ha = true;
                        c.html5[R[ma]] = true;
                        c.flash[R[ma]] = !! (c.preferFlash && R[ma].match(Mb))
                    }
                    return Ha
                } else {
                    R = m && typeof m.canPlayType === "function" ? m.canPlayType(R) : false;
                    return !!(R && R.match(c.html5Test))
                }
            }
            if (!c.useHTML5Audio || typeof Audio === "undefined") return false;
            var m = typeof Audio !== "undefined" ? Kb ? new Audio(null) : new Audio : null,
                V, aa = {},
                O, J;
            ob();
            O = c.audioFormats;
            for (V in O) if (O.hasOwnProperty(V)) {
                aa[V] = y(O[V].type);
                aa["audio/" + V] = aa[V];
                c.flash[V] = c.preferFlash && !c.ignoreFlash && V.match(Mb) ? true : false;
                if (O[V] && O[V].related) for (J = O[V].related.length; J--;) {
                    aa["audio/" + O[V].related[J]] = aa[V];
                    c.html5[O[V].related[J]] = aa[V];
                    c.flash[O[V].related[J]] = aa[V]
                }
            }
            aa.canPlayType = m ? y : null;
            c.html5 = Ba(c.html5, aa);
            return true
        };
        za = {
            notReady: "Not loaded yet - wait for soundManager.onload()/onready()",
            notOK: "Audio support is not available.",
            appXHTML: "soundManager::createMovie(): appendChild/innerHTML set failed. May be app/xhtml+xml DOM-related.",
            spcWmode: "soundManager::createMovie(): Removing wmode, preventing known SWF loading issue(s)",
            swf404: "soundManager: Verify that %s is a valid path.",
            tryDebug: "Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
            checkSWF: "See SWF output for more debug info.",
            localFail: "soundManager: Non-HTTP page (" + x.location.protocol + " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
            waitFocus: "soundManager: Special case: Waiting for focus-related event..",
            waitImpatient: "soundManager: Getting impatient, still waiting for Flash%s...",
            waitForever: "soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
            needFunction: "soundManager: Function object expected for %s",
            badID: 'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',
            noMS: "MovieStar mode not enabled. Exiting.",
            currentObj: "--- soundManager._debug(): Current sound objects ---",
            waitEI: "soundManager::initMovie(): Waiting for ExternalInterface call from Flash..",
            waitOnload: "soundManager: Waiting for window.onload()",
            docLoaded: "soundManager: Document already loaded",
            onload: "soundManager::initComplete(): calling soundManager.onload()",
            onloadOK: "soundManager.onload() complete",
            init: "soundManager::init()",
            didInit: "soundManager::init(): Already called?",
            flashJS: "soundManager: Attempting to call Flash from JS..",
            noPolling: "soundManager: Polling (whileloading()/whileplaying() support) is disabled.",
            secNote: "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
            badRemove: "Warning: Failed to remove flash movie.",
            noPeak: "Warning: peakData features unsupported for movieStar formats",
            shutdown: "soundManager.disable(): Shutting down",
            queue: "soundManager: Queueing %s handler",
            smFail: "soundManager: Failed to initialise.",
            smError: "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
            fbTimeout: "No flash response, applying ." + c.swfCSS.swfTimedout + " CSS..",
            fbLoaded: "Flash loaded",
            fbHandler: "soundManager::flashBlockHandler()",
            manURL: "SMSound.load(): Using manually-assigned URL",
            onURL: "soundManager.load(): current URL already assigned.",
            badFV: 'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
            as2loop: "Note: Setting stream:false so looping can work (flash 8 limitation)",
            noNSLoop: "Note: Looping not implemented for MovieStar formats",
            needfl9: "Note: Switching to flash 9, required for MP4 formats.",
            mfTimeout: "Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
            mfOn: "mobileFlash::enabling on-screen flash repositioning",
            policy: "Enabling usePolicyFile for data access"
        };
        ua = function () {
            var y = Eb.call(arguments),
                m = y.shift();
            m = za && za[m] ? za[m] : "";
            var V, aa;
            if (m && y && y.length) {
                V = 0;
                for (aa = y.length; V < aa; V++) m = m.replace("%s", y[V])
            }
            return m
        };
        Va = function (y) {
            if (r === 8 && y.loops > 1 && y.stream) {
                sa("as2loop");
                y.stream = false
            }
            return y
        };
        gb = function (y, m) {
            if (y && !y.usePolicyFile && (y.onid3 || y.usePeakData || y.useWaveformData || y.useEQData)) {
                c._wD((m ? m + ":" : "") + ua("policy"));
                y.usePolicyFile = true
            }
            return y
        };
        ab = function (y) {
            typeof console !== "undefined" && typeof console.warn !== "undefined" ? console.warn(y) : c._wD(y)
        };
        E = function () {
            return false
        };
        ka = function (y) {
            for (var m in y) if (y.hasOwnProperty(m) && typeof y[m] === "function") y[m] = E
        };
        ia = function (y) {
            if (typeof y === "undefined") y = false;
            if (ra || y) {
                sa("smFail", 2);
                c.disable(y)
            }
        };
        wa = function (y) {
            var m = null;
            if (y) if (y.match(/\.swf(\?.*)?$/i)) {
                if (m = y.substr(y.toLowerCase().lastIndexOf(".swf?") + 4)) return y
            } else if (y.lastIndexOf("/") !== y.length - 1) y += "/";
            return (y && y.lastIndexOf("/") !== -1 ? y.substr(0, y.lastIndexOf("/") + 1) : "./") + c.movieURL
        };
        k = function () {
            if (r !== 8 && r !== 9) {
                c._wD(ua("badFV", r, 8));
                c.flashVersion = 8
            }
            var y = c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
            if (c.useHTML5Audio && !c.html5Only && c.audioFormats.mp4.required && c.flashVersion < 9) {
                c._wD(ua("needfl9"));
                c.flashVersion = 9
            }
            r = c.flashVersion;
            c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : r === 9 ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            if (r > 8) {
                c.defaultOptions = Ba(c.defaultOptions, c.flash9Options);
                c.features.buffering = true
            }
            if (r > 8 && c.useMovieStar) {
                c.defaultOptions = Ba(c.defaultOptions, c.movieStarOptions);
                c.filePatterns.flash9 = new RegExp("\\.(mp3|" + c.netStreamTypes.join("|") + ")(\\?.*)?$", "i");
                c.mimePattern = c.netStreamMimeTypes;
                c.features.movieStar = true
            } else {
                c.useMovieStar = false;
                c.features.movieStar = false
            }
            c.filePattern = c.filePatterns[r !== 8 ? "flash9" : "flash8"];
            c.movieURL = (r === 8 ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", y);
            c.features.peakData = c.features.waveformData = c.features.eqData = r > 8
        };
        T = function (y, m) {
            if (!c.o || !c.allowPolling) return false;
            c.o._setPolling(y, m)
        };
        ja = function (y, m) {
            function V() {
                c._wD("-- SoundManager 2 " + c.version + (!c.html5Only && c.useHTML5Audio ? c.hasHTML5 ? " + HTML5 audio" : ", no HTML5 audio support" : "") + (!c.html5Only ? (c.useMovieStar ? ", MovieStar mode" : "") + (c.useHighPerformance ? ", high performance mode, " : ", ") + ((c.flashPollingInterval ? "custom (" + c.flashPollingInterval + "ms)" : c.useFastPolling ? "fast" : "normal") + " polling") + (c.wmode ? ", wmode: " + c.wmode : "") + (c.debugFlash ? ", flash debug mode" : "") + (c.useFlashBlock ? ", flashBlock mode" : "") : "") + " --", 1)
            }
            m = m ? m : c.url;
            var aa = c.altURL ? c.altURL : m,
                O;
            O = Xa();
            var J, R, ma = eb(),
                ya, Ha = null;
            Ha = (Ha = x.getElementsByTagName("html")[0]) && Ha.dir && Ha.dir.match(/rtl/i);
            y = typeof y === "undefined" ? c.id : y;
            if (Y && la) return false;
            if (c.html5Only) {
                k();
                V();
                c.oMC = p(c.movieID);
                H();
                la = Y = true;
                return false
            }
            Y = true;
            k();
            c.url = wa(c._overHTTP ? m : aa);
            m = c.url;
            c.wmode = !c.wmode && c.useHighPerformance && !c.useMovieStar ? "transparent" : c.wmode;
            if (c.wmode !== null && (w.match(/msie 8/i) || !ib && !c.useHighPerformance) && navigator.platform.match(/win32|win64/i)) {
                c.specialWmodeCase = true;
                sa("spcWmode");
                c.wmode = null
            }
            O = {
                name: y,
                id: y,
                src: m,
                width: "auto",
                height: "auto",
                quality: "high",
                allowScriptAccess: c.allowScriptAccess,
                bgcolor: c.bgColor,
                pluginspage: c._http + "//www.macromedia.com/go/getflashplayer",
                type: "application/x-shockwave-flash",
                wmode: c.wmode,
                hasPriority: "true"
            };
            if (c.debugFlash) O.FlashVars = "debug=1";
            c.wmode || delete O.wmode;
            if (ib) {
                aa = x.createElement("div");
                R = '<object id="' + y + '" data="' + m + '" type="' + O.type + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + c._http + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="' + O.width + '" height="' + O.height + '"><param name="movie" value="' + m + '" /><param name="AllowScriptAccess" value="' + c.allowScriptAccess + '" /><param name="quality" value="' + O.quality + '" />' + (c.wmode ? '<param name="wmode" value="' + c.wmode + '" /> ' : "") + '<param name="bgcolor" value="' + c.bgColor + '" />' + (c.debugFlash ? '<param name="FlashVars" value="' + O.FlashVars + '" />' : "") + "</object>"
            } else {
                aa = x.createElement("embed");
                for (J in O) O.hasOwnProperty(J) && aa.setAttribute(J, O[J])
            }
            j();
            ma = eb();
            if (O = Xa()) {
                c.oMC = p(c.movieID) ? p(c.movieID) : x.createElement("div");
                if (c.oMC.id) {
                    ya = c.oMC.className;
                    c.oMC.className = (ya ? ya + " " : c.swfCSS.swfDefault) + (ma ? " " + ma : "");
                    c.oMC.appendChild(aa);
                    if (ib) {
                        y = c.oMC.appendChild(x.createElement("div"));
                        y.className = c.swfCSS.swfBox;
                        y.innerHTML = R
                    }
                    la = true
                } else {
                    c.oMC.id = c.movieID;
                    c.oMC.className = c.swfCSS.swfDefault + " " + ma;
                    y = J = null;
                    if (!c.useFlashBlock) if (c.useHighPerformance) J = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    };
                    else {
                        J = {
                            position: "absolute",
                            width: "6px",
                            height: "6px",
                            top: "-9999px",
                            left: "-9999px"
                        };
                        if (Ha) J.left = Math.abs(parseInt(J.left, 10)) + "px"
                    }
                    if (Pb) c.oMC.style.zIndex = 1E4;
                    if (!c.debugFlash) for (ya in J) if (J.hasOwnProperty(ya)) c.oMC.style[ya] = J[ya];
                    try {
                        ib || c.oMC.appendChild(aa);
                        O.appendChild(c.oMC);
                        if (ib) {
                            y = c.oMC.appendChild(x.createElement("div"));
                            y.className = c.swfCSS.swfBox;
                            y.innerHTML = R
                        }
                        la = true
                    } catch (Vb) {
                        throw new Error(ua("appXHTML"));
                    }
                }
            }
            V();
            c._wD("soundManager::createMovie(): Trying to load " + m + (!c._overHTTP && c.altURL ? " (alternate URL)" : ""), 1);
            return true
        };
        Qa = this.getSoundById;
        $a = function () {
            if (c.html5Only) {
                ja();
                return false
            }
            if (c.o) return false;
            c.o = c.getMovie(c.id);
            if (!c.o) {
                if (ta) {
                    if (ib) c.oMC.innerHTML = Ea;
                    else c.oMC.appendChild(ta);
                    ta = null;
                    Y = true
                } else ja(c.id, c.url);
                c.o = c.getMovie(c.id)
            }
            c.o && sa("waitEI");
            c.oninitmovie instanceof Function && setTimeout(c.oninitmovie, 1);
            return true
        };
        ba = function (y) {
            if (y) c.url = y;
            $a()
        };
        Ra = function () {
            setTimeout(db, 1E3)
        };
        db = function () {
            if (mb) return false;
            mb = true;
            Wa.remove(B, "load", Ra);
            if (qb && !yb) {
                sa("waitFocus");
                return false
            }
            var y;
            if (!ca) {
                y = c.getMoviePercent();
                c._wD(ua("waitImpatient", y === 100 ? " (SWF loaded)" : y > 0 ? " (SWF " + y + "% loaded)" : ""))
            }
            setTimeout(function () {
                y = c.getMoviePercent();
                if (!ca) {
                    c._wD("soundManager: No Flash response within expected time.\nLikely causes: " + (y === 0 ? "Loading " + c.movieURL + " may have failed (and/or Flash " + r + "+ not present?), " : "") + "Flash blocked or JS-Flash security error." + (c.debugFlash ? " " + ua("checkSWF") : ""), 2);
                    if (!c._overHTTP && y) {
                        sa("localFail", 2);
                        c.debugFlash || sa("tryDebug", 2)
                    }
                    y === 0 && c._wD(ua("swf404", c.url));
                    W("flashtojs", false, ": Timed out" + c._overHTTP ? " (Check flash security or flash blockers)" : " (No plugin/missing SWF?)")
                }
                if (!ca && Lb) if (y === null) if (c.useFlashBlock || c.flashLoadTimeout === 0) {
                    c.useFlashBlock && hb();
                    sa("waitForever")
                } else ia(true);
                else c.flashLoadTimeout === 0 ? sa("waitForever") : ia(true)
            }, c.flashLoadTimeout)
        };
        ba = function (y) {
            if (y) c.url = y;
            $a()
        };
        sa = function (y, m) {
            return y ? c._wD(ua(y), m) : ""
        };
        if (z.indexOf("debug=alert") + 1 && c.debugMode) c._wD = function (y) {
            b.alert(y)
        };
        cb = function () {
            var y = p(c.debugID),
                m = p(c.debugID + "-toggle");
            if (!y) return false;
            if (P) {
                m.innerHTML = "+";
                y.style.display = "none"
            } else {
                m.innerHTML = "-";
                y.style.display = "block"
            }
            P = !P
        };
        W = function (y, m, V) {
            if (typeof sm2Debugger !== "undefined") try {
                sm2Debugger.handleEvent(y, m, V)
            } catch (aa) {}
            return true
        };
        eb = function () {
            var y = [];
            c.debugMode && y.push(c.swfCSS.sm2Debug);
            c.debugFlash && y.push(c.swfCSS.flashDebug);
            c.useHighPerformance && y.push(c.swfCSS.highPerf);
            return y.join(" ")
        };
        hb = function () {
            var y = ua("fbHandler"),
                m = c.getMoviePercent(),
                V = c.swfCSS;
            if (c.ok()) {
                c.didFlashBlock && c._wD(y + ": Unblocked");
                if (c.oMC) c.oMC.className = [eb(), V.swfDefault, V.swfLoaded + (c.didFlashBlock ? " " + V.swfUnblocked : "")].join(" ")
            } else {
                if (nb) {
                    c.oMC.className = eb() + " " + V.swfDefault + " " + (m === null ? V.swfTimedout : V.swfError);
                    c._wD(y + ": " + ua("fbTimeout") + (m ? " (" + ua("fbLoaded") + ")" : ""))
                }
                c.didFlashBlock = true;
                Da({
                    type: "ontimeout",
                    ignoreInit: true
                });
                c.onerror instanceof Function && c.onerror.apply(B)
            }
        };
        Ga = function () {
            function y() {
                Wa.remove(B, "focus", Ga);
                Wa.remove(B, "load", Ga)
            }
            if (yb || !qb) {
                y();
                return true
            }
            yb = Lb = true;
            c._wD("soundManager::handleFocus()");
            Sa && qb && Wa.remove(B, "mousemove", Ga);
            mb = false;
            y();
            return true
        };
        oa = function (y) {
            if (ca) return false;
            if (c.html5Only) {
                c._wD("-- SoundManager 2: loaded --");
                ca = true;
                Da();
                Ca();
                return true
            }
            c.useFlashBlock && c.flashLoadTimeout && !c.getMoviePercent() || (ca = true);
            c._wD("-- SoundManager 2 " + (ra ? "failed to load" : "loaded") + " (" + (ra ? "security/load error" : "OK") + ") --", 1);
            if (ra || y) {
                if (c.useFlashBlock) c.oMC.className = eb() + " " + (c.getMoviePercent() === null ? c.swfCSS.swfTimedout : c.swfCSS.swfError);
                Da({
                    type: "ontimeout"
                });
                W("onload", false);
                c.onerror instanceof Function && c.onerror.apply(B);
                return false
            } else W("onload", true);
            Wa.add(B, "unload", E);
            if (c.waitForWindowLoad && !Ja) {
                sa("waitOnload");
                Wa.add(B, "load", Ca);
                return false
            } else {
                c.waitForWindowLoad && Ja && sa("docLoaded");
                Ca()
            }
            return true
        };
        Ya = function (y, m, V) {
            if (typeof X[y] === "undefined") X[y] = [];
            X[y].push({
                method: m,
                scope: V || null,
                fired: false
            })
        };
        Da = function (y) {
            y || (y = {
                type: "onready"
            });
            if (!ca && y && !y.ignoreInit) return false;
            if (y.type === "ontimeout" && c.ok()) return false;
            var m = {
                success: y && y.ignoreInit ? c.ok() : !ra
            },
                V = y && y.type ? X[y.type] || [] : [],
                aa = [],
                O, J = nb && c.useFlashBlock && !c.ok();
            for (O = 0; O < V.length; O++) V[O].fired !== true && aa.push(V[O]);
            if (aa.length) {
                c._wD("soundManager: Firing " + aa.length + " " + y.type + "() item" + (aa.length === 1 ? "" : "s"));
                O = 0;
                for (y = aa.length; O < y; O++) {
                    aa[O].scope ? aa[O].method.apply(aa[O].scope, [m]) : aa[O].method(m);
                    if (!J) aa[O].fired = true
                }
            }
            return true
        };
        Ca = function () {
            B.setTimeout(function () {
                c.useFlashBlock && hb();
                Da();
                if (c.onload instanceof Function) {
                    sa("onload", 1);
                    c.onload.apply(B);
                    sa("onloadOK", 1)
                }
                c.waitForWindowLoad && Wa.add(B, "load", Ca)
            }, 1)
        };
        ob = function () {
            if (xb !== undefined) return xb;
            var y = false,
                m = navigator,
                V = m.plugins,
                aa, O = B.ActiveXObject;
            if (V && V.length) {
                if ((m = m.mimeTypes) && m["application/x-shockwave-flash"] && m["application/x-shockwave-flash"].enabledPlugin && m["application/x-shockwave-flash"].enabledPlugin.description) y = true
            } else if (typeof O !== "undefined") {
                try {
                    aa = new O("ShockwaveFlash.ShockwaveFlash")
                } catch (J) {}
                y = !! aa
            }
            return xb = y
        };
        Jb = function () {
            var y, m;
            if (w.match(/iphone os (1|2|3_0|3_1)/i) ? true : false) {
                c.hasHTML5 = false;
                c.html5Only = true;
                if (c.oMC) c.oMC.style.display = "none";
                return false
            }
            if (c.useHTML5Audio) {
                if (!c.html5 || !c.html5.canPlayType) {
                    c._wD("SoundManager: No HTML5 Audio() support detected.");
                    c.hasHTML5 = false;
                    return true
                } else c.hasHTML5 = true;
                if (Gb) {
                    c._wD("soundManager::Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - " + (!xb ? " would use flash fallback for MP3/MP4, but none detected." : "will use flash fallback for MP3/MP4, if available"), 1);
                    if (ob()) return true
                }
            } else return true;
            for (m in c.audioFormats) if (c.audioFormats.hasOwnProperty(m)) if (c.audioFormats[m].required && !c.html5.canPlayType(c.audioFormats[m].type) || c.flash[m] || c.flash[c.audioFormats[m].type]) y = true;
            if (c.ignoreFlash) y = false;
            c.html5Only = c.useHTML5Audio && c.hasHTML5 && !y && !c.requireFlash;
            return ob() && y
        };
        H = function () {
            function y() {
                Wa.remove(B, "load", c.beginDelayedInit)
            }
            var m, V = [];
            sa("init");
            if (ca) {
                sa("didInit");
                return false
            }
            if (c.hasHTML5) {
                for (m in c.audioFormats) if (c.audioFormats.hasOwnProperty(m)) V.push(m + ": " + c.html5[m] + (c.preferFlash && c.flash[m] ? " (preferring flash)" : ""));
                c._wD("-- SoundManager 2: HTML5 support tests (" + c.html5Test + "): " + V.join(", ") + " --", 1)
            }
            if (c.html5Only) {
                if (!ca) {
                    y();
                    c.enabled = true;
                    oa()
                }
                return true
            }
            $a();
            try {
                sa("flashJS");
                c.o._externalInterfaceTest(false);
                c.allowPolling ? T(true, c.flashPollingInterval ? c.flashPollingInterval : c.useFastPolling ? 10 : 50) : sa("noPolling", 1);
                c.debugMode || c.o._disableDebug();
                c.enabled = true;
                W("jstoflash", true)
            } catch (aa) {
                c._wD("js/flash exception: " + aa.toString());
                W("jstoflash", false);
                ia(true);
                oa();
                return false
            }
            oa();
            y();
            return true
        };
        Pa = function () {
            if (rb) return false;
            ja();
            $a();
            return rb = true
        };
        Ma = function () {
            if (Za) return false;
            Za = true;
            j();
            if (!c.useHTML5Audio) if (!ob()) {
                c._wD("SoundManager: No Flash detected, trying HTML5");
                c.useHTML5Audio = true
            }
            wb();
            c.html5.usingFlash = Jb();
            nb = c.html5.usingFlash;
            Za = true;
            x.removeEventListener && x.removeEventListener("DOMContentLoaded", Ma, false);
            ba();
            return true
        };
        Hb = function (y) {
            if (!y._hasTimer) y._hasTimer = true
        };
        Ib = function (y) {
            if (y._hasTimer) y._hasTimer = false
        };
        M = function () {
            c.onerror instanceof Function && c.onerror();
            c.disable()
        };
        Fb = function () {
            if (!Gb || !ob()) return false;
            var y = c.audioFormats,
                m, V;
            for (V in y) if (y.hasOwnProperty(V)) if (V === "mp3" || V === "mp4") {
                c._wD("soundManager: Using flash fallback for " + V + " format");
                c.html5[V] = false;
                if (y[V] && y[V].related) for (m = y[V].related.length; m--;) c.html5[y[V].related[m]] = false
            }
        };
        this._setSandboxType = function (y) {
            var m = c.sandbox;
            m.type = y;
            m.description = m.types[typeof m.types[y] !== "undefined" ? y : "unknown"];
            c._wD("Flash security sandbox type: " + m.type);
            if (m.type === "localWithFile") {
                m.noRemote = true;
                m.noLocal = false;
                sa("secNote", 2)
            } else if (m.type === "localWithNetwork") {
                m.noRemote = false;
                m.noLocal = true
            } else if (m.type === "localTrusted") {
                m.noRemote = false;
                m.noLocal = false
            }
        };
        this._externalInterfaceOK = function (y) {
            if (c.swfLoaded) return false;
            var m = (new Date).getTime();
            c._wD("soundManager::externalInterfaceOK()" + (y ? " (~" + (m - y) + " ms)" : ""));
            W("swf", true);
            W("flashtojs", true);
            c.swfLoaded = true;
            qb = false;
            Gb && Fb();
            ib ? setTimeout(H, 100) : H()
        };
        Db = function () {
            if (x.readyState === "complete") {
                Ma();
                x.detachEvent("onreadystatechange", Db)
            }
            return true
        };
        if (!c.hasHTML5 || nb) {
            Wa.add(B, "focus", Ga);
            Wa.add(B, "load", Ga);
            Wa.add(B, "load", Ra);
            Sa && qb && Wa.add(B, "mousemove", Ga)
        }
        if (x.addEventListener) x.addEventListener("DOMContentLoaded", Ma, false);
        else if (x.attachEvent) x.attachEvent("onreadystatechange", Db);
        else {
            W("onload", false);
            M()
        }
        x.readyState === "complete" && setTimeout(Ma, 100)
    }
    b.SoundManager = d;
    b.soundManager = null
})(window);
(function (b, d) {
    function f(e) {
        return k.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
    }
    function g(e) {
        if (!Qb[e]) {
            var h = ba.body,
                o = k("<" + e + ">").appendTo(h),
                q = o.css("display");
            o.remove();
            if (q === "none" || q === "") {
                kb || (kb = ba.createElement("iframe"), kb.frameBorder = kb.width = kb.height = 0);
                h.appendChild(kb);
                if (!zb || !kb.createElement) {
                    zb = (kb.contentWindow || kb.contentDocument).document;
                    zb.write((ba.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>");
                    zb.close()
                }
                o = zb.createElement(e);
                zb.body.appendChild(o);
                q = k.css(o, "display");
                h.removeChild(kb)
            }
            Qb[e] = q
        }
        return Qb[e]
    }
    function i(e, h) {
        var o = {};
        k.each(Wb.concat.apply([], Wb.slice(0, h)), function () {
            o[this] = e
        });
        return o
    }
    function j() {
        Nb = d
    }
    function n() {
        setTimeout(j, 0);
        return Nb = k.now()
    }
    function c() {
        try {
            return new b.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    function l() {
        try {
            return new b.XMLHttpRequest
        } catch (e) {}
    }
    function p(e, h) {
        e.dataFilter && (h = e.dataFilter(h, e.dataType));
        var o = e.dataTypes,
            q = {},
            s, u, C = o.length,
            G, I = o[0],
            K, U, na, qa, pa;
        for (s = 1; s < C; s++) {
            if (s === 1) for (u in e.converters) typeof u == "string" && (q[u.toLowerCase()] = e.converters[u]);
            K = I;
            I = o[s];
            if (I === "*") I = K;
            else if (K !== "*" && K !== I) {
                U = K + " " + I;
                na = q[U] || q["* " + I];
                if (!na) {
                    pa = d;
                    for (qa in q) {
                        G = qa.split(" ");
                        if (G[0] === K || G[0] === "*") if (pa = q[G[1] + " " + I]) {
                            qa = q[qa];
                            qa === true ? (na = pa) : pa === true && (na = qa);
                            break
                        }
                    }
                }!na && !pa && k.error("No conversion from " + U.replace(" ", " to "));
                na !== true && (h = na ? na(h) : pa(qa(h)))
            }
        }
        return h
    }
    function w(e, h, o) {
        var q = e.contents,
            s = e.dataTypes,
            u = e.responseFields,
            C, G, I, K;
        for (G in u) G in o && (h[u[G]] = o[G]);
        for (; s[0] === "*";) {
            s.shift();
            C === d && (C = e.mimeType || h.getResponseHeader("content-type"))
        }
        if (C) for (G in q) if (q[G] && q[G].test(C)) {
            s.unshift(G);
            break
        }
        if (s[0] in o) I = s[0];
        else {
            for (G in o) {
                if (!s[0] || e.converters[G + " " + s[0]]) {
                    I = G;
                    break
                }
                K || (K = G)
            }
            I = I || K
        }
        if (I) {
            I !== s[0] && s.unshift(I);
            return o[I]
        }
    }
    function B(e, h, o, q) {
        if (k.isArray(h)) k.each(h, function (u, C) {
            o || ma.test(e) ? q(e, C) : B(e + "[" + (typeof C == "object" || k.isArray(C) ? u : "") + "]", C, o, q)
        });
        else if (!o && h != null && typeof h == "object") for (var s in h) B(e + "[" + s + "]", h[s], o, q);
        else q(e, h)
    }
    function z(e, h, o, q, s, u) {
        s = s || h.dataTypes[0];
        u = u || {};
        u[s] = true;
        s = e[s];
        for (var C = 0, G = s ? s.length : 0, I = e === Rb, K; C < G && (I || !K); C++) {
            K = s[C](h, o, q);
            typeof K == "string" && (!I || u[K] ? (K = d) : (h.dataTypes.unshift(K), K = z(e, h, o, q, K, u)))
        }(I || !K) && !u["*"] && (K = z(e, h, o, q, "*", u));
        return K
    }
    function r(e) {
        return function (h, o) {
            typeof h != "string" && (o = h, h = "*");
            if (k.isFunction(o)) {
                h = h.toLowerCase().split(Xb);
                for (var q = 0, s = h.length, u, C; q < s; q++) {
                    u = h[q];
                    (C = /^\+/.test(u)) && (u = u.substr(1) || "*");
                    u = e[u] = e[u] || [];
                    u[C ? "unshift" : "push"](o)
                }
            }
        }
    }
    function x(e, h, o) {
        var q = h === "width" ? e.offsetWidth : e.offsetHeight,
            s = h === "width" ? m : V;
        if (q > 0) {
            o !== "border" && k.each(s, function () {
                o || (q -= parseFloat(k.css(e, "padding" + this)) || 0);
                o === "margin" ? (q += parseFloat(k.css(e, o + this)) || 0) : (q -= parseFloat(k.css(e, "border" + this + "Width")) || 0)
            });
            return q + "px"
        }
        q = aa(e, h, h);
        if (q < 0 || q == null) q = e.style[h] || 0;
        q = parseFloat(q) || 0;
        o && k.each(s, function () {
            q += parseFloat(k.css(e, "padding" + this)) || 0;
            o !== "padding" && (q += parseFloat(k.css(e, "border" + this + "Width")) || 0);
            o === "margin" && (q += parseFloat(k.css(e, o + this)) || 0)
        });
        return q + "px"
    }
    function E(e, h) {
        h.src ? k.ajax({
            url: h.src,
            async: false,
            dataType: "script"
        }) : k.globalEval((h.text || h.textContent || h.innerHTML || "").replace(Pb, "/*$0*/"));
        h.parentNode && h.parentNode.removeChild(h)
    }
    function H(e) {
        k.nodeName(e, "input") ? X(e) : "getElementsByTagName" in e && k.grep(e.getElementsByTagName("input"), X)
    }
    function X(e) {
        if (e.type === "checkbox" || e.type === "radio") e.defaultChecked = e.checked
    }
    function P(e) {
        return "getElementsByTagName" in e ? e.getElementsByTagName("*") : "querySelectorAll" in e ? e.querySelectorAll("*") : []
    }
    function W(e, h) {
        var o;
        if (h.nodeType === 1) {
            h.clearAttributes && h.clearAttributes();
            h.mergeAttributes && h.mergeAttributes(e);
            o = h.nodeName.toLowerCase();
            if (o === "object") h.outerHTML = e.outerHTML;
            else if (o !== "input" || e.type !== "checkbox" && e.type !== "radio") if (o === "option") h.selected = e.defaultSelected;
            else {
                if (o === "input" || o === "textarea") h.defaultValue = e.defaultValue
            } else {
                e.checked && (h.defaultChecked = h.checked = e.checked);
                h.value !== e.value && (h.value = e.value)
            }
            h.removeAttribute(k.expando)
        }
    }

    function Y(e, h) {
        if (h.nodeType === 1 && k.hasData(e)) {
            var o = k.expando,
                q = k.data(e),
                s = k.data(h, q);
            if (q = q[o]) {
                e = q.events;
                s = s[o] = k.extend({}, q);
                if (e) {
                    delete s.handle;
                    s.events = {};
                    for (var u in e) {
                        o = 0;
                        for (q = e[u].length; o < q; o++) k.event.add(h, u + (e[u][o].namespace ? "." : "") + e[u][o].namespace, e[u][o], e[u][o].data)
                    }
                }
            }
        }
    }
    function la(e) {
        return k.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function ca(e, h, o) {
        h = h || 0;
        if (k.isFunction(h)) return k.grep(e, function (s, u) {
            return !!h.call(s, u, s) === o
        });
        if (h.nodeType) return k.grep(e, function (s) {
            return s === h === o
        });
        if (typeof h == "string") {
            var q = k.grep(e, function (s) {
                return s.nodeType === 1
            });
            if (Jb.test(h)) return k.filter(h, q, !o);
            h = k.filter(h, q)
        }
        return k.grep(e, function (s) {
            return k.inArray(s, h) >= 0 === o
        })
    }
    function ra(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    function Ja(e, h) {
        return (e && e !== "*" ? e + "." : "") + h.replace(ua, "`").replace(hb, "&")
    }
    function sa(e) {
        var h, o, q, s, u, C, G, I, K, U, na, qa = [];
        s = [];
        u = k._data(this, "events");
        if (!(e.liveFired === this || !u || !u.live || e.target.disabled || e.button && e.type === "click")) {
            e.namespace && (na = new RegExp("(^|\\.)" + e.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)"));
            e.liveFired = this;
            var pa = u.live.slice(0);
            for (G = 0; G < pa.length; G++) {
                u = pa[G];
                u.origType.replace(ta, "") === e.type ? s.push(u.selector) : pa.splice(G--, 1)
            }
            s = k(e.target).closest(s, e.currentTarget);
            I = 0;
            for (K = s.length; I < K; I++) {
                U = s[I];
                for (G = 0; G < pa.length; G++) {
                    u = pa[G];
                    if (U.selector === u.selector && (!na || na.test(u.namespace)) && !U.elem.disabled) {
                        C = U.elem;
                        q = null;
                        if (u.preType === "mouseenter" || u.preType === "mouseleave") {
                            e.type = u.preType;
                            (q = k(e.relatedTarget).closest(u.selector)[0]) && k.contains(C, q) && (q = C)
                        }(!q || q !== C) && qa.push({
                            elem: C,
                            handleObj: u,
                            level: U.level
                        })
                    }
                }
            }
            I = 0;
            for (K = qa.length; I < K; I++) {
                s = qa[I];
                if (o && s.level > o) break;
                e.currentTarget = s.elem;
                e.data = s.handleObj.data;
                e.handleObj = s.handleObj;
                na = s.handleObj.origHandler.apply(s.elem, arguments);
                if (na === false || e.isPropagationStopped()) {
                    o = s.level;
                    na === false && (h = false);
                    if (e.isImmediatePropagationStopped()) break
                }
            }
            return h
        }
    }

    function xa(e, h, o) {
        var q = k.extend({}, o[0]);
        q.type = e;
        q.originalEvent = {};
        q.liveFired = d;
        k.event.handle.call(h, q);
        q.isDefaultPrevented() && o[0].preventDefault()
    }
    function oa() {
        return true
    }
    function Ba() {
        return false
    }
    function Ya(e, h, o) {
        var q = h + "defer",
            s = h + "queue",
            u = h + "mark",
            C = k.data(e, q, d, true);
        C && (o === "queue" || !k.data(e, s, d, true)) && (o === "mark" || !k.data(e, u, d, true)) && setTimeout(function () {
            !k.data(e, s, d, true) && !k.data(e, u, d, true) && (k.removeData(e, q, true), C.resolve())
        }, 0)
    }
    function Da(e) {
        for (var h in e) if (h !== "toJSON") return false;
        return true
    }
    function Ca(e, h, o) {
        if (o === d && e.nodeType === 1) {
            o = "data-" + h.replace($a, "$1-$2").toLowerCase();
            o = e.getAttribute(o);
            if (typeof o == "string") {
                try {
                    o = o === "true" ? true : o === "false" ? false : o === "null" ? null : k.isNaN(o) ? za.test(o) ? k.parseJSON(o) : o : parseFloat(o)
                } catch (q) {}
                k.data(e, h, o)
            } else o = d
        }
        return o
    }
    var ba = b.document,
        Ra = b.navigator,
        db = b.location,
        k = function () {
            function e() {
                if (!h.isReady) {
                    try {
                        ba.documentElement.doScroll("left")
                    } catch (F) {
                        setTimeout(e, 1);
                        return
                    }
                    h.ready()
                }
            }
            var h = function (F, S) {
                    return new h.fn.init(F, S, s)
                },
                o = b.jQuery,
                q = b.$,
                s, u = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                C = /\S/,
                G = /^\s+/,
                I = /\s+$/,
                K = /\d/,
                U = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                na = /^[\],:{}\s]*$/,
                qa = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                pa = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                Aa = /(?:^|:|,)(?:\s*\[)+/g,
                fb = /(webkit)[ \/]([\w.]+)/,
                Ta = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                Ua = /(msie) ([\w.]+)/,
                lb = /(mozilla)(?:.*? rv:([\w.]+))?/,
                A = /-([a-z])/ig,
                D = function (F, S) {
                    return S.toUpperCase()
                },
                L = Ra.userAgent,
                N, Q, Z = Object.prototype.toString,
                ga = Object.prototype.hasOwnProperty,
                da = Array.prototype.push,
                va = Array.prototype.slice,
                Na = String.prototype.trim,
                Oa = Array.prototype.indexOf,
                bb = {};
            h.fn = h.prototype = {
                constructor: h,
                init: function (F, S, fa) {
                    var ha, Fa;
                    if (!F) return this;
                    if (F.nodeType) {
                        this.context = this[0] = F;
                        this.length = 1;
                        return this
                    }
                    if (F === "body" && !S && ba.body) {
                        this.context = ba;
                        this[0] = ba.body;
                        this.selector = F;
                        this.length = 1;
                        return this
                    }
                    if (typeof F == "string") {
                        F.charAt(0) !== "<" || F.charAt(F.length - 1) !== ">" || F.length < 3 ? (ha = u.exec(F)) : (ha = [null, F, null]);
                        if (ha && (ha[1] || !S)) {
                            if (ha[1]) {
                                Fa = (S = S instanceof h ? S[0] : S) ? S.ownerDocument || S : ba;
                                (fa = U.exec(F)) ? h.isPlainObject(S) ? (F = [ba.createElement(fa[1])], h.fn.attr.call(F, S, true)) : (F = [Fa.createElement(fa[1])]) : (fa = h.buildFragment([ha[1]], [Fa]), F = (fa.cacheable ? h.clone(fa.fragment) : fa.fragment).childNodes);
                                return h.merge(this, F)
                            }
                            if ((S = ba.getElementById(ha[2])) && S.parentNode) {
                                if (S.id !== ha[2]) return fa.find(F);
                                this.length = 1;
                                this[0] = S
                            }
                            this.context = ba;
                            this.selector = F;
                            return this
                        }
                        return !S || S.jquery ? (S || fa).find(F) : this.constructor(S).find(F)
                    }
                    if (h.isFunction(F)) return fa.ready(F);
                    F.selector !== d && (this.selector = F.selector, this.context = F.context);
                    return h.makeArray(F, this)
                },
                selector: "",
                jquery: "1.6.2",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return va.call(this, 0)
                },
                get: function (F) {
                    return F == null ? this.toArray() : F < 0 ? this[this.length + F] : this[F]
                },
                pushStack: function (F, S, fa) {
                    var ha = this.constructor();
                    h.isArray(F) ? da.apply(ha, F) : h.merge(ha, F);
                    ha.prevObject = this;
                    ha.context = this.context;
                    S === "find" ? (ha.selector = this.selector + (this.selector ? " " : "") + fa) : S && (ha.selector = this.selector + "." + S + "(" + fa + ")");
                    return ha
                },
                each: function (F, S) {
                    return h.each(this, F, S)
                },
                ready: function (F) {
                    h.bindReady();
                    N.done(F);
                    return this
                },
                eq: function (F) {
                    return F === -1 ? this.slice(F) : this.slice(F, +F + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(va.apply(this, arguments), "slice", va.call(arguments).join(","))
                },
                map: function (F) {
                    return this.pushStack(h.map(this, function (S, fa) {
                        return F.call(S, fa, S)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: da,
                sort: [].sort,
                splice: [].splice
            };
            h.fn.init.prototype = h.fn;
            h.extend = h.fn.extend = function () {
                var F, S, fa, ha, Fa, Ka, Ia = arguments[0] || {},
                    La = 1,
                    Yb = arguments.length,
                    Sb = false;
                typeof Ia == "boolean" && (Sb = Ia, Ia = arguments[1] || {}, La = 2);
                typeof Ia != "object" && !h.isFunction(Ia) && (Ia = {});
                for (Yb === La && (Ia = this, --La); La < Yb; La++) if ((F = arguments[La]) != null) for (S in F) {
                    fa = Ia[S];
                    ha = F[S];
                    if (Ia !== ha) Sb && ha && (h.isPlainObject(ha) || (Fa = h.isArray(ha))) ? (Fa ? (Fa = false, Ka = fa && h.isArray(fa) ? fa : []) : (Ka = fa && h.isPlainObject(fa) ? fa : {}), Ia[S] = h.extend(Sb, Ka, ha)) : ha !== d && (Ia[S] = ha)
                }
                return Ia
            };
            h.extend({
                noConflict: function (F) {
                    b.$ === h && (b.$ = q);
                    F && b.jQuery === h && (b.jQuery = o);
                    return h
                },
                isReady: false,
                readyWait: 1,
                holdReady: function (F) {
                    F ? h.readyWait++ : h.ready(true)
                },
                ready: function (F) {
                    if (F === true && !--h.readyWait || F !== true && !h.isReady) {
                        if (!ba.body) return setTimeout(h.ready, 1);
                        h.isReady = true;
                        if (!(F !== true && --h.readyWait > 0)) {
                            N.resolveWith(ba, [h]);
                            h.fn.trigger && h(ba).trigger("ready").unbind("ready")
                        }
                    }
                },
                bindReady: function () {
                    if (!N) {
                        N = h._Deferred();
                        if (ba.readyState === "complete") return setTimeout(h.ready, 1);
                        if (ba.addEventListener) {
                            ba.addEventListener("DOMContentLoaded", Q, false);
                            b.addEventListener("load", h.ready, false)
                        } else if (ba.attachEvent) {
                            ba.attachEvent("onreadystatechange", Q);
                            b.attachEvent("onload", h.ready);
                            var F = false;
                            try {
                                F = b.frameElement == null
                            } catch (S) {}
                            ba.documentElement.doScroll && F && e()
                        }
                    }
                },
                isFunction: function (F) {
                    return h.type(F) === "function"
                },
                isArray: Array.isArray ||
                function (F) {
                    return h.type(F) === "array"
                },
                isWindow: function (F) {
                    return F && typeof F == "object" && "setInterval" in F
                },
                isNaN: function (F) {
                    return F == null || !K.test(F) || isNaN(F)
                },
                type: function (F) {
                    return F == null ? String(F) : bb[Z.call(F)] || "object"
                },
                isPlainObject: function (F) {
                    if (!F || h.type(F) !== "object" || F.nodeType || h.isWindow(F)) return false;
                    if (F.constructor && !ga.call(F, "constructor") && !ga.call(F.constructor.prototype, "isPrototypeOf")) return false;
                    var S;
                    for (S in F);
                    return S === d || ga.call(F, S)
                },
                isEmptyObject: function (F) {
                    for (var S in F) return false;
                    return true
                },
                error: function (F) {
                    throw F;
                },
                parseJSON: function (F) {
                    if (typeof F != "string" || !F) return null;
                    F = h.trim(F);
                    if (b.JSON && b.JSON.parse) return b.JSON.parse(F);
                    if (na.test(F.replace(qa, "@").replace(pa, "]").replace(Aa, ""))) return (new Function("return " + F))();
                    h.error("Invalid JSON: " + F)
                },
                parseXML: function (F, S, fa) {
                    b.DOMParser ? (fa = new DOMParser, S = fa.parseFromString(F, "text/xml")) : (S = new ActiveXObject("Microsoft.XMLDOM"), S.async = "false", S.loadXML(F));
                    fa = S.documentElement;
                    (!fa || !fa.nodeName || fa.nodeName === "parsererror") && h.error("Invalid XML: " + F);
                    return S
                },
                noop: function () {},
                globalEval: function (F) {
                    F && C.test(F) && (b.execScript ||
                    function (S) {
                        b.eval.call(b, S)
                    })(F)
                },
                camelCase: function (F) {
                    return F.replace(A, D)
                },
                nodeName: function (F, S) {
                    return F.nodeName && F.nodeName.toUpperCase() === S.toUpperCase()
                },
                each: function (F, S, fa) {
                    var ha, Fa = 0,
                        Ka = F.length,
                        Ia = Ka === d || h.isFunction(F);
                    if (fa) if (Ia) for (ha in F) {
                        if (S.apply(F[ha], fa) === false) break
                    } else for (; Fa < Ka;) {
                        if (S.apply(F[Fa++], fa) === false) break
                    } else if (Ia) for (ha in F) {
                        if (S.call(F[ha], ha, F[ha]) === false) break
                    } else for (; Fa < Ka;) if (S.call(F[Fa], Fa, F[Fa++]) === false) break;
                    return F
                },
                trim: Na ?
                function (F) {
                    return F == null ? "" : Na.call(F)
                } : function (F) {
                    return F == null ? "" : (F + "").replace(G, "").replace(I, "")
                },
                makeArray: function (F, S) {
                    S = S || [];
                    if (F != null) {
                        var fa = h.type(F);
                        F.length == null || fa === "string" || fa === "function" || fa === "regexp" || h.isWindow(F) ? da.call(S, F) : h.merge(S, F)
                    }
                    return S
                },
                inArray: function (F, S) {
                    if (Oa) return Oa.call(S, F);
                    for (var fa = 0, ha = S.length; fa < ha; fa++) if (S[fa] === F) return fa;
                    return -1
                },
                merge: function (F, S) {
                    var fa = F.length,
                        ha = 0;
                    if (typeof S.length == "number") for (var Fa = S.length; ha < Fa; ha++) F[fa++] = S[ha];
                    else for (; S[ha] !== d;) F[fa++] = S[ha++];
                    F.length = fa;
                    return F
                },
                grep: function (F, S, fa) {
                    var ha = [],
                        Fa;
                    fa = !! fa;
                    for (var Ka = 0, Ia = F.length; Ka < Ia; Ka++) {
                        Fa = !! S(F[Ka], Ka);
                        fa !== Fa && ha.push(F[Ka])
                    }
                    return ha
                },
                map: function (F, S, fa) {
                    var ha, Fa, Ka = [],
                        Ia = 0,
                        La = F.length;
                    if (F instanceof h || La !== d && typeof La == "number" && (La > 0 && F[0] && F[La - 1] || La === 0 || h.isArray(F))) for (; Ia < La; Ia++) {
                        ha = S(F[Ia], Ia, fa);
                        ha != null && (Ka[Ka.length] = ha)
                    } else for (Fa in F) {
                        ha = S(F[Fa], Fa, fa);
                        ha != null && (Ka[Ka.length] = ha)
                    }
                    return Ka.concat.apply([], Ka)
                },
                guid: 1,
                proxy: function (F, S) {
                    if (typeof S == "string") {
                        var fa = F[S];
                        S = F;
                        F = fa
                    }
                    if (!h.isFunction(F)) return d;
                    var ha = va.call(arguments, 2);
                    fa = function () {
                        return F.apply(S, ha.concat(va.call(arguments)))
                    };
                    fa.guid = F.guid = F.guid || fa.guid || h.guid++;
                    return fa
                },
                access: function (F, S, fa, ha, Fa, Ka) {
                    var Ia = F.length;
                    if (typeof S == "object") {
                        for (var La in S) h.access(F, La, S[La], ha, Fa, fa);
                        return F
                    }
                    if (fa !== d) {
                        ha = !Ka && ha && h.isFunction(fa);
                        for (La = 0; La < Ia; La++) Fa(F[La], S, ha ? fa.call(F[La], La, Fa(F[La], S)) : fa, Ka);
                        return F
                    }
                    return Ia ? Fa(F[0], S) : d
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (F) {
                    F = F.toLowerCase();
                    F = fb.exec(F) || Ta.exec(F) || Ua.exec(F) || F.indexOf("compatible") < 0 && lb.exec(F) || [];
                    return {
                        browser: F[1] || "",
                        version: F[2] || "0"
                    }
                },
                sub: function () {
                    function F(fa, ha) {
                        return new F.fn.init(fa, ha)
                    }
                    h.extend(true, F, this);
                    F.superclass = this;
                    F.fn = F.prototype = this();
                    F.fn.constructor = F;
                    F.sub = this.sub;
                    F.fn.init = function (fa, ha) {
                        ha && ha instanceof h && !(ha instanceof F) && (ha = F(ha));
                        return h.fn.init.call(this, fa, ha, S)
                    };
                    F.fn.init.prototype = F.fn;
                    var S = F(ba);
                    return F
                },
                browser: {}
            });
            h.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (F, S) {
                bb["[object " + S + "]"] = S.toLowerCase()
            });
            L = h.uaMatch(L);
            L.browser && (h.browser[L.browser] = true, h.browser.version = L.version);
            h.browser.webkit && (h.browser.safari = true);
            C.test(" ") && (G = /^[\s\xA0]+/, I = /[\s\xA0]+$/);
            s = h(ba);
            ba.addEventListener ? (Q = function () {
                ba.removeEventListener("DOMContentLoaded", Q, false);
                h.ready()
            }) : ba.attachEvent && (Q = function () {
                ba.readyState === "complete" && (ba.detachEvent("onreadystatechange", Q), h.ready())
            });
            return h
        }(),
        Ga = "done fail isResolved isRejected promise then always pipe".split(" "),
        Pa = [].slice;
    k.extend({
        _Deferred: function () {
            var e = [],
                h, o, q, s = {
                    done: function () {
                        if (!q) {
                            var u = arguments,
                                C, G, I, K, U;
                            h && (U = h, h = 0);
                            C = 0;
                            for (G = u.length; C < G; C++) {
                                I = u[C];
                                K = k.type(I);
                                K === "array" ? s.done.apply(s, I) : K === "function" && e.push(I)
                            }
                            U && s.resolveWith(U[0], U[1])
                        }
                        return this
                    },
                    resolveWith: function (u, C) {
                        if (!q && !h && !o) {
                            C = C || [];
                            o = 1;
                            try {
                                for (; e[0];) e.shift().apply(u, C)
                            } finally {
                                h = [u, C];
                                o = 0
                            }
                        }
                        return this
                    },
                    resolve: function () {
                        s.resolveWith(this, arguments);
                        return this
                    },
                    isResolved: function () {
                        return !!o || !! h
                    },
                    cancel: function () {
                        q = 1;
                        e = [];
                        return this
                    }
                };
            return s
        },
        Deferred: function (e) {
            var h = k._Deferred(),
                o = k._Deferred(),
                q;
            k.extend(h, {
                then: function (s, u) {
                    h.done(s).fail(u);
                    return this
                },
                always: function () {
                    return h.done.apply(h, arguments).fail.apply(this, arguments)
                },
                fail: o.done,
                rejectWith: o.resolveWith,
                reject: o.resolve,
                isRejected: o.isResolved,
                pipe: function (s, u) {
                    return k.Deferred(function (C) {
                        k.each({
                            done: [s, "resolve"],
                            fail: [u, "reject"]
                        }, function (G, I) {
                            var K = I[0],
                                U = I[1],
                                na;
                            k.isFunction(K) ? h[G](function () {
                                (na = K.apply(this, arguments)) && k.isFunction(na.promise) ? na.promise().then(C.resolve, C.reject) : C[U](na)
                            }) : h[G](C[U])
                        })
                    }).promise()
                },
                promise: function (s) {
                    if (s == null) {
                        if (q) return q;
                        q = s = {}
                    }
                    for (var u = Ga.length; u--;) s[Ga[u]] = h[Ga[u]];
                    return s
                }
            });
            h.done(o.cancel).fail(h.cancel);
            delete h.cancel;
            e && e.call(h, h);
            return h
        },
        when: function (e) {
            function h(G) {
                return function (I) {
                    o[G] = arguments.length > 1 ? Pa.call(arguments, 0) : I;
                    --u || C.resolveWith(C, Pa.call(o, 0))
                }
            }
            var o = arguments,
                q = 0,
                s = o.length,
                u = s,
                C = s <= 1 && e && k.isFunction(e.promise) ? e : k.Deferred();
            if (s > 1) {
                for (; q < s; q++) o[q] && k.isFunction(o[q].promise) ? o[q].promise().then(h(q), C.reject) : --u;
                u || C.resolveWith(C, o)
            } else C !== e && C.resolveWith(C, s ? [e] : []);
            return C.promise()
        }
    });
    k.support = function () {
        var e = ba.createElement("div"),
            h = ba.documentElement,
            o, q, s, u, C, G, I;
        e.setAttribute("className", "t");
        e.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        o = e.getElementsByTagName("*");
        q = e.getElementsByTagName("a")[0];
        if (!o || !o.length || !q) return {};
        s = ba.createElement("select");
        u = s.appendChild(ba.createElement("option"));
        o = e.getElementsByTagName("input")[0];
        G = {
            leadingWhitespace: e.firstChild.nodeType === 3,
            tbody: !e.getElementsByTagName("tbody").length,
            htmlSerialize: !! e.getElementsByTagName("link").length,
            style: /top/.test(q.getAttribute("style")),
            hrefNormalized: q.getAttribute("href") === "/a",
            opacity: /^0.55$/.test(q.style.opacity),
            cssFloat: !! q.style.cssFloat,
            checkOn: o.value === "on",
            optSelected: u.selected,
            getSetAttribute: e.className !== "t",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true
        };
        o.checked = true;
        G.noCloneChecked = o.cloneNode(true).checked;
        s.disabled = true;
        G.optDisabled = !u.disabled;
        try {
            delete e.test
        } catch (K) {
            G.deleteExpando = false
        }!e.addEventListener && e.attachEvent && e.fireEvent && (e.attachEvent("onclick", function () {
            G.noCloneEvent = false
        }), e.cloneNode(true).fireEvent("onclick"));
        o = ba.createElement("input");
        o.value = "t";
        o.setAttribute("type", "radio");
        G.radioValue = o.value === "t";
        o.setAttribute("checked", "checked");
        e.appendChild(o);
        q = ba.createDocumentFragment();
        q.appendChild(e.firstChild);
        G.checkClone = q.cloneNode(true).cloneNode(true).lastChild.checked;
        e.innerHTML = "";
        e.style.width = e.style.paddingLeft = "1px";
        s = ba.getElementsByTagName("body")[0];
        q = ba.createElement(s ? "div" : "body");
        u = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0
        };
        s && k.extend(u, {
            position: "absolute",
            left: -1000,
            top: -1000
        });
        for (I in u) q.style[I] = u[I];
        q.appendChild(e);
        h = s || h;
        h.insertBefore(q, h.firstChild);
        G.appendChecked = o.checked;
        G.boxModel = e.offsetWidth === 2;
        "zoom" in e.style && (e.style.display = "inline", e.style.zoom = 1, G.inlineBlockNeedsLayout = e.offsetWidth === 2, e.style.display = "", e.innerHTML = "<div style='width:4px;'></div>", G.shrinkWrapBlocks = e.offsetWidth !== 2);
        e.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
        s = e.getElementsByTagName("td");
        o = s[0].offsetHeight === 0;
        s[0].style.display = "";
        s[1].style.display = "none";
        G.reliableHiddenOffsets = o && s[0].offsetHeight === 0;
        e.innerHTML = "";
        ba.defaultView && ba.defaultView.getComputedStyle && (C = ba.createElement("div"), C.style.width = "0", C.style.marginRight = "0", e.appendChild(C), G.reliableMarginRight = (parseInt((ba.defaultView.getComputedStyle(C, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        q.innerHTML = "";
        h.removeChild(q);
        if (e.attachEvent) for (I in {
            submit: 1,
            change: 1,
            focusin: 1
        }) {
            C = "on" + I;
            (o = C in e) || (e.setAttribute(C, "return;"), o = typeof e[C] == "function");
            G[I + "Bubbles"] = o
        }
        q = q = s = u = s = C = e = o = null;
        return G
    }();
    k.boxModel = k.support.boxModel;
    var za = /^(?:\{.*\}|\[.*\])$/,
        $a = /([a-z])([A-Z])/g;
    k.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (k.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        hasData: function (e) {
            e = e.nodeType ? k.cache[e[k.expando]] : e[k.expando];
            return !!e && !Da(e)
        },
        data: function (e, h, o, q) {
            if (k.acceptData(e)) {
                var s = k.expando,
                    u = typeof h == "string",
                    C = e.nodeType,
                    G = C ? k.cache : e,
                    I = C ? e[k.expando] : e[k.expando] && k.expando;
                if (!((!I || q && I && !G[I][s]) && u && o === d)) {
                    I || (C ? (e[k.expando] = I = ++k.uuid) : (I = k.expando));
                    G[I] || (G[I] = {}, C || (G[I].toJSON = k.noop));
                    if (typeof h == "object" || typeof h == "function") q ? (G[I][s] = k.extend(G[I][s], h)) : (G[I] = k.extend(G[I], h));
                    e = G[I];
                    q && (e[s] || (e[s] = {}), e = e[s]);
                    o !== d && (e[k.camelCase(h)] = o);
                    if (h === "events" && !e[h]) return e[s] && e[s].events;
                    return u ? e[k.camelCase(h)] || e[h] : e
                }
            }
        },
        removeData: function (e, h, o) {
            if (k.acceptData(e)) {
                var q = k.expando,
                    s = e.nodeType,
                    u = s ? k.cache : e,
                    C = s ? e[k.expando] : k.expando;
                if (u[C]) {
                    if (h) {
                        var G = o ? u[C][q] : u[C];
                        if (G) {
                            delete G[h];
                            if (!Da(G)) return
                        }
                    }
                    if (o) {
                        delete u[C][q];
                        if (!Da(u[C])) return
                    }
                    h = u[C][q];
                    k.support.deleteExpando || u != b ? delete u[C] : (u[C] = null);
                    h ? (u[C] = {}, s || (u[C].toJSON = k.noop), u[C][q] = h) : s && (k.support.deleteExpando ? delete e[k.expando] : e.removeAttribute ? e.removeAttribute(k.expando) : (e[k.expando] = null))
                }
            }
        },
        _data: function (e, h, o) {
            return k.data(e, h, o, true)
        },
        acceptData: function (e) {
            if (e.nodeName) {
                var h = k.noData[e.nodeName.toLowerCase()];
                if (h) return h !== true && e.getAttribute("classid") === h
            }
            return true
        }
    });
    k.fn.extend({
        data: function (e, h) {
            var o = null;
            if (typeof e == "undefined") {
                if (this.length) {
                    o = k.data(this[0]);
                    if (this[0].nodeType === 1) for (var q = this[0].attributes, s, u = 0, C = q.length; u < C; u++) {
                        s = q[u].name;
                        s.indexOf("data-") === 0 && (s = k.camelCase(s.substring(5)), Ca(this[0], s, o[s]))
                    }
                }
                return o
            }
            if (typeof e == "object") return this.each(function () {
                k.data(this, e)
            });
            var G = e.split(".");
            G[1] = G[1] ? "." + G[1] : "";
            if (h === d) {
                o = this.triggerHandler("getData" + G[1] + "!", [G[0]]);
                o === d && this.length && (o = k.data(this[0], e), o = Ca(this[0], e, o));
                return o === d && G[1] ? this.data(G[0]) : o
            }
            return this.each(function () {
                var I = k(this),
                    K = [G[0], h];
                I.triggerHandler("setData" + G[1] + "!", K);
                k.data(this, e, h);
                I.triggerHandler("changeData" + G[1] + "!", K)
            })
        },
        removeData: function (e) {
            return this.each(function () {
                k.removeData(this, e)
            })
        }
    });
    k.extend({
        _mark: function (e, h) {
            e && (h = (h || "fx") + "mark", k.data(e, h, (k.data(e, h, d, true) || 0) + 1, true))
        },
        _unmark: function (e, h, o) {
            e !== true && (o = h, h = e, e = false);
            if (h) {
                o = o || "fx";
                var q = o + "mark";
                (e = e ? 0 : (k.data(h, q, d, true) || 1) - 1) ? k.data(h, q, e, true) : (k.removeData(h, q, true), Ya(h, o, "mark"))
            }
        },
        queue: function (e, h, o) {
            if (e) {
                h = (h || "fx") + "queue";
                var q = k.data(e, h, d, true);
                o && (!q || k.isArray(o) ? (q = k.data(e, h, k.makeArray(o), true)) : q.push(o));
                return q || []
            }
        },
        dequeue: function (e, h) {
            h = h || "fx";
            var o = k.queue(e, h),
                q = o.shift();
            q === "inprogress" && (q = o.shift());
            q && (h === "fx" && o.unshift("inprogress"), q.call(e, function () {
                k.dequeue(e, h)
            }));
            o.length || (k.removeData(e, h + "queue", true), Ya(e, h, "queue"))
        }
    });
    k.fn.extend({
        queue: function (e, h) {
            typeof e != "string" && (h = e, e = "fx");
            if (h === d) return k.queue(this[0], e);
            return this.each(function () {
                var o = k.queue(this, e, h);
                e === "fx" && o[0] !== "inprogress" && k.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                k.dequeue(this, e)
            })
        },
        delay: function (e, h) {
            e = k.fx ? k.fx.speeds[e] || e : e;
            h = h || "fx";
            return this.queue(h, function () {
                var o = this;
                setTimeout(function () {
                    k.dequeue(o, h)
                }, e)
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, h) {
            function o() {
                --u || q.resolveWith(s, [s])
            }
            typeof e != "string" && (h = e, e = d);
            e = e || "fx";
            var q = k.Deferred(),
                s = this;
            h = s.length;
            var u = 1,
                C = e + "defer",
                G = e + "queue";
            e = e + "mark";
            for (var I; h--;) if (I = k.data(s[h], C, d, true) || (k.data(s[h], G, d, true) || k.data(s[h], e, d, true)) && k.data(s[h], C, k._Deferred(), true)) {
                u++;
                I.done(o)
            }
            o();
            return q.promise()
        }
    });
    var Ma = /[\n\t\r]/g,
        Za = /\s+/,
        Xa = /\r/g,
        ja = /^(?:button|input)$/i,
        M = /^(?:button|input|object|select|textarea)$/i,
        T = /^a(?:rea)?$/i,
        ea = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        ka = /\:|^on/,
        ia, wa;
    k.fn.extend({
        attr: function (e, h) {
            return k.access(this, e, h, true, k.attr)
        },
        removeAttr: function (e) {
            return this.each(function () {
                k.removeAttr(this, e)
            })
        },
        prop: function (e, h) {
            return k.access(this, e, h, true, k.prop)
        },
        removeProp: function (e) {
            e = k.propFix[e] || e;
            return this.each(function () {
                try {
                    this[e] = d;
                    delete this[e]
                } catch (h) {}
            })
        },
        addClass: function (e) {
            var h, o, q, s, u, C, G;
            if (k.isFunction(e)) return this.each(function (I) {
                k(this).addClass(e.call(this, I, this.className))
            });
            if (e && typeof e == "string") {
                h = e.split(Za);
                o = 0;
                for (q = this.length; o < q; o++) {
                    s = this[o];
                    if (s.nodeType === 1) if (!s.className && h.length === 1) s.className = e;
                    else {
                        u = " " + s.className + " ";
                        C = 0;
                        for (G = h.length; C < G; C++)~u.indexOf(" " + h[C] + " ") || (u += h[C] + " ");
                        s.className = k.trim(u)
                    }
                }
            }
            return this
        },
        removeClass: function (e) {
            var h, o, q, s, u, C, G;
            if (k.isFunction(e)) return this.each(function (I) {
                k(this).removeClass(e.call(this, I, this.className))
            });
            if (e && typeof e == "string" || e === d) {
                h = (e || "").split(Za);
                o = 0;
                for (q = this.length; o < q; o++) {
                    s = this[o];
                    if (s.nodeType === 1 && s.className) if (e) {
                        u = (" " + s.className + " ").replace(Ma, " ");
                        C = 0;
                        for (G = h.length; C < G; C++) u = u.replace(" " + h[C] + " ", " ");
                        s.className = k.trim(u)
                    } else s.className = ""
                }
            }
            return this
        },
        toggleClass: function (e, h) {
            var o = typeof e,
                q = typeof h == "boolean";
            if (k.isFunction(e)) return this.each(function (s) {
                k(this).toggleClass(e.call(this, s, this.className, h), h)
            });
            return this.each(function () {
                if (o === "string") for (var s, u = 0, C = k(this), G = h, I = e.split(Za); s = I[u++];) {
                    G = q ? G : !C.hasClass(s);
                    C[G ? "addClass" : "removeClass"](s)
                } else if (o === "undefined" || o === "boolean") {
                    this.className && k._data(this, "__className__", this.className);
                    this.className = this.className || e === false ? "" : k._data(this, "__className__") || ""
                }
            })
        },
        hasClass: function (e) {
            e = " " + e + " ";
            for (var h = 0, o = this.length; h < o; h++) if ((" " + this[h].className + " ").replace(Ma, " ").indexOf(e) > -1) return true;
            return false
        },
        val: function (e) {
            var h, o, q = this[0];
            if (!arguments.length) {
                if (q) {
                    if ((h = k.valHooks[q.nodeName.toLowerCase()] || k.valHooks[q.type]) && "get" in h && (o = h.get(q, "value")) !== d) return o;
                    o = q.value;
                    return typeof o == "string" ? o.replace(Xa, "") : o == null ? "" : o
                }
                return d
            }
            var s = k.isFunction(e);
            return this.each(function (u) {
                var C = k(this),
                    G;
                if (this.nodeType === 1) {
                    s ? (G = e.call(this, u, C.val())) : (G = e);
                    G == null ? (G = "") : typeof G == "number" ? (G += "") : k.isArray(G) && (G = k.map(G, function (I) {
                        return I == null ? "" : I + ""
                    }));
                    h = k.valHooks[this.nodeName.toLowerCase()] || k.valHooks[this.type];
                    if (!h || !("set" in h) || h.set(this, G, "value") === d) this.value = G
                }
            })
        }
    });
    k.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var h = e.attributes.value;
                    return !h || h.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    var h, o = e.selectedIndex,
                        q = [],
                        s = e.options;
                    e = e.type === "select-one";
                    if (o < 0) return null;
                    for (var u = e ? o : 0, C = e ? o + 1 : s.length; u < C; u++) {
                        h = s[u];
                        if (h.selected && (k.support.optDisabled ? !h.disabled : h.getAttribute("disabled") === null) && (!h.parentNode.disabled || !k.nodeName(h.parentNode, "optgroup"))) {
                            h = k(h).val();
                            if (e) return h;
                            q.push(h)
                        }
                    }
                    if (e && !q.length && s.length) return k(s[o]).val();
                    return q
                },
                set: function (e, h) {
                    var o = k.makeArray(h);
                    k(e).find("option").each(function () {
                        this.selected = k.inArray(k(this).val(), o) >= 0
                    });
                    o.length || (e.selectedIndex = -1);
                    return o
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attrFix: {
            tabindex: "tabIndex"
        },
        attr: function (e, h, o, q) {
            var s = e.nodeType;
            if (!e || s === 3 || s === 8 || s === 2) return d;
            if (q && h in k.attrFn) return k(e)[h](o);
            if (!("getAttribute" in e)) return k.prop(e, h, o);
            var u, C;
            (q = s !== 1 || !k.isXMLDoc(e)) && (h = k.attrFix[h] || h, C = k.attrHooks[h], C || (ea.test(h) ? (C = wa) : ia && h !== "className" && (k.nodeName(e, "form") || ka.test(h)) && (C = ia)));
            if (o !== d) {
                if (o === null) {
                    k.removeAttr(e, h);
                    return d
                }
                if (C && "set" in C && q && (u = C.set(e, o, h)) !== d) return u;
                e.setAttribute(h, "" + o);
                return o
            }
            if (C && "get" in C && q && (u = C.get(e, h)) !== null) return u;
            u = e.getAttribute(h);
            return u === null ? d : u
        },
        removeAttr: function (e, h) {
            var o;
            e.nodeType === 1 && (h = k.attrFix[h] || h, k.support.getSetAttribute ? e.removeAttribute(h) : (k.attr(e, h, ""), e.removeAttributeNode(e.getAttributeNode(h))), ea.test(h) && (o = k.propFix[h] || h) in e && (e[o] = false))
        },
        attrHooks: {
            type: {
                set: function (e, h) {
                    if (ja.test(e.nodeName) && e.parentNode) k.error("type property can't be changed");
                    else if (!k.support.radioValue && h === "radio" && k.nodeName(e, "input")) {
                        var o = e.value;
                        e.setAttribute("type", h);
                        o && (e.value = o);
                        return h
                    }
                }
            },
            tabIndex: {
                get: function (e) {
                    var h = e.getAttributeNode("tabIndex");
                    return h && h.specified ? parseInt(h.value, 10) : M.test(e.nodeName) || T.test(e.nodeName) && e.href ? 0 : d
                }
            },
            value: {
                get: function (e, h) {
                    if (ia && k.nodeName(e, "button")) return ia.get(e, h);
                    return h in e ? e.value : null
                },
                set: function (e, h, o) {
                    if (ia && k.nodeName(e, "button")) return ia.set(e, h, o);
                    e.value = h
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, h, o) {
            var q = e.nodeType;
            if (!e || q === 3 || q === 8 || q === 2) return d;
            var s, u;
            (q !== 1 || !k.isXMLDoc(e)) && (h = k.propFix[h] || h, u = k.propHooks[h]);
            return o !== d ? u && "set" in u && (s = u.set(e, o, h)) !== d ? s : (e[h] = o) : u && "get" in u && (s = u.get(e, h)) !== d ? s : e[h]
        },
        propHooks: {}
    });
    wa = {
        get: function (e, h) {
            return k.prop(e, h) ? h.toLowerCase() : d
        },
        set: function (e, h, o) {
            var q;
            h === false ? k.removeAttr(e, o) : (q = k.propFix[o] || o, q in e && (e[q] = true), e.setAttribute(o, o.toLowerCase()));
            return o
        }
    };
    k.support.getSetAttribute || (k.attrFix = k.propFix, ia = k.attrHooks.name = k.attrHooks.title = k.valHooks.button = {
        get: function (e, h) {
            return (e = e.getAttributeNode(h)) && e.nodeValue !== "" ? e.nodeValue : d
        },
        set: function (e, h, o) {
            if (e = e.getAttributeNode(o)) return e.nodeValue = h
        }
    }, k.each(["width", "height"], function (e, h) {
        k.attrHooks[h] = k.extend(k.attrHooks[h], {
            set: function (o, q) {
                if (q === "") {
                    o.setAttribute(h, "auto");
                    return q
                }
            }
        })
    }));
    k.support.hrefNormalized || k.each(["href", "src", "width", "height"], function (e, h) {
        k.attrHooks[h] = k.extend(k.attrHooks[h], {
            get: function (o) {
                o = o.getAttribute(h, 2);
                return o === null ? d : o
            }
        })
    });
    k.support.style || (k.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || d
        },
        set: function (e, h) {
            return e.style.cssText = "" + h
        }
    });
    k.support.optSelected || (k.propHooks.selected = k.extend(k.propHooks.selected, {
        get: function () {}
    }));
    k.support.checkOn || k.each(["radio", "checkbox"], function () {
        k.valHooks[this] = {
            get: function (e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    });
    k.each(["radio", "checkbox"], function () {
        k.valHooks[this] = k.extend(k.valHooks[this], {
            set: function (e, h) {
                if (k.isArray(h)) return e.checked = k.inArray(k(e).val(), h) >= 0
            }
        })
    });
    var ta = /\.(.*)$/,
        Ea = /^(?:textarea|input|select)$/i,
        ua = /\./g,
        hb = / /g,
        eb = /[^\w\s.|`]/g,
        cb = function (e) {
            return e.replace(eb, "\\$&")
        };
    k.event = {
        add: function (e, h, o, q) {
            if (e.nodeType !== 3 && e.nodeType !== 8) {
                if (o === false) o = Ba;
                else if (!o) return;
                var s, u;
                o.handler && (s = o, o = s.handler);
                o.guid || (o.guid = k.guid++);
                if (u = k._data(e)) {
                    var C = u.events,
                        G = u.handle;
                    C || (u.events = C = {});
                    G || (u.handle = G = function (pa) {
                        return typeof k != "undefined" && (!pa || k.event.triggered !== pa.type) ? k.event.handle.apply(G.elem, arguments) : d
                    });
                    G.elem = e;
                    h = h.split(" ");
                    for (var I, K = 0, U; I = h[K++];) {
                        u = s ? k.extend({}, s) : {
                            handler: o,
                            data: q
                        };
                        I.indexOf(".") > -1 ? (U = I.split("."), I = U.shift(), u.namespace = U.slice(0).sort().join(".")) : (U = [], u.namespace = "");
                        u.type = I;
                        u.guid || (u.guid = o.guid);
                        var na = C[I],
                            qa = k.event.special[I] || {};
                        if (!na) {
                            na = C[I] = [];
                            if (!qa.setup || qa.setup.call(e, q, U, G) === false) e.addEventListener ? e.addEventListener(I, G, false) : e.attachEvent && e.attachEvent("on" + I, G)
                        }
                        qa.add && (qa.add.call(e, u), u.handler.guid || (u.handler.guid = o.guid));
                        na.push(u);
                        k.event.global[I] = true
                    }
                    e = null
                }
            }
        },
        global: {},
        remove: function (e, h, o, q) {
            if (e.nodeType !== 3 && e.nodeType !== 8) {
                o === false && (o = Ba);
                var s, u, C = 0,
                    G, I, K, U, na, qa, pa = k.hasData(e) && k._data(e),
                    Aa = pa && pa.events;
                if (pa && Aa) {
                    h && h.type && (o = h.handler, h = h.type);
                    if (!h || typeof h == "string" && h.charAt(0) === ".") {
                        h = h || "";
                        for (s in Aa) k.event.remove(e, s + h)
                    } else {
                        for (h = h.split(" "); s = h[C++];) {
                            U = s;
                            G = s.indexOf(".") < 0;
                            I = [];
                            G || (I = s.split("."), s = I.shift(), K = new RegExp("(^|\\.)" + k.map(I.slice(0).sort(), cb).join("\\.(?:.*\\.)?") + "(\\.|$)"));
                            if (na = Aa[s]) if (o) {
                                U = k.event.special[s] || {};
                                for (u = q || 0; u < na.length; u++) {
                                    qa = na[u];
                                    if (o.guid === qa.guid) {
                                        if (G || K.test(qa.namespace)) {
                                            q == null && na.splice(u--, 1);
                                            U.remove && U.remove.call(e, qa)
                                        }
                                        if (q != null) break
                                    }
                                }
                                if (na.length === 0 || q != null && na.length === 1) {
                                    (!U.teardown || U.teardown.call(e, I) === false) && k.removeEvent(e, s, pa.handle);
                                    delete Aa[s]
                                }
                            } else for (u = 0; u < na.length; u++) {
                                qa = na[u];
                                if (G || K.test(qa.namespace)) {
                                    k.event.remove(e, U, qa.handler, u);
                                    na.splice(u--, 1)
                                }
                            }
                        }
                        if (k.isEmptyObject(Aa)) {
                            (h = pa.handle) && (h.elem = null);
                            delete pa.events;
                            delete pa.handle;
                            k.isEmptyObject(pa) && k.removeData(e, d, true)
                        }
                    }
                }
            }
        },
        customEvent: {
            getData: true,
            setData: true,
            changeData: true
        },
        trigger: function (e, h, o, q) {
            var s = e.type || e,
                u = [],
                C;
            s.indexOf("!") >= 0 && (s = s.slice(0, -1), C = true);
            s.indexOf(".") >= 0 && (u = s.split("."), s = u.shift(), u.sort());
            if (o && !k.event.customEvent[s] || k.event.global[s]) {
                e = typeof e == "object" ? e[k.expando] ? e : new k.Event(s, e) : new k.Event(s);
                e.type = s;
                e.exclusive = C;
                e.namespace = u.join(".");
                e.namespace_re = new RegExp("(^|\\.)" + u.join("\\.(?:.*\\.)?") + "(\\.|$)");
                if (q || !o) {
                    e.preventDefault();
                    e.stopPropagation()
                }
                if (o) {
                    if (!(o.nodeType === 3 || o.nodeType === 8)) {
                        e.result = d;
                        e.target = o;
                        h = h != null ? k.makeArray(h) : [];
                        h.unshift(e);
                        u = o;
                        q = s.indexOf(":") < 0 ? "on" + s : "";
                        do {
                            C = k._data(u, "handle");
                            e.currentTarget = u;
                            C && C.apply(u, h);
                            q && k.acceptData(u) && u[q] && u[q].apply(u, h) === false && (e.result = false, e.preventDefault());
                            u = u.parentNode || u.ownerDocument || u === e.target.ownerDocument && b
                        } while (u && !e.isPropagationStopped());
                        if (!e.isDefaultPrevented()) {
                            var G;
                            u = k.event.special[s] || {};
                            if ((!u._default || u._default.call(o.ownerDocument, e) === false) && (s !== "click" || !k.nodeName(o, "a")) && k.acceptData(o)) {
                                try {
                                    q && o[s] && (G = o[q], G && (o[q] = null), k.event.triggered = s, o[s]())
                                } catch (I) {}
                                G && (o[q] = G);
                                k.event.triggered = d
                            }
                        }
                        return e.result
                    }
                } else k.each(k.cache, function () {
                    var K = this[k.expando];
                    K && K.events && K.events[s] && k.event.trigger(e, h, K.handle.elem)
                })
            }
        },
        handle: function (e) {
            e = k.event.fix(e || b.event);
            var h = ((k._data(this, "events") || {})[e.type] || []).slice(0),
                o = !e.exclusive && !e.namespace,
                q = Array.prototype.slice.call(arguments, 0);
            q[0] = e;
            e.currentTarget = this;
            for (var s = 0, u = h.length; s < u; s++) {
                var C = h[s];
                if (o || e.namespace_re.test(C.namespace)) {
                    e.handler = C.handler;
                    e.data = C.data;
                    e.handleObj = C;
                    C = C.handler.apply(this, q);
                    C !== d && (e.result = C, C === false && (e.preventDefault(), e.stopPropagation()));
                    if (e.isImmediatePropagationStopped()) break
                }
            }
            return e.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function (e) {
            if (e[k.expando]) return e;
            var h = e;
            e = k.Event(h);
            for (var o = this.props.length, q; o;) {
                q = this.props[--o];
                e[q] = h[q]
            }
            e.target || (e.target = e.srcElement || ba);
            e.target.nodeType === 3 && (e.target = e.target.parentNode);
            !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement);
            if (e.pageX == null && e.clientX != null) {
                o = e.target.ownerDocument || ba;
                h = o.documentElement;
                o = o.body;
                e.pageX = e.clientX + (h && h.scrollLeft || o && o.scrollLeft || 0) - (h && h.clientLeft || o && o.clientLeft || 0);
                e.pageY = e.clientY + (h && h.scrollTop || o && o.scrollTop || 0) - (h && h.clientTop || o && o.clientTop || 0)
            }
            e.which == null && (e.charCode != null || e.keyCode != null) && (e.which = e.charCode != null ? e.charCode : e.keyCode);
            !e.metaKey && e.ctrlKey && (e.metaKey = e.ctrlKey);
            !e.which && e.button !== d && (e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0);
            return e
        },
        guid: 1E8,
        proxy: k.proxy,
        special: {
            ready: {
                setup: k.bindReady,
                teardown: k.noop
            },
            live: {
                add: function (e) {
                    k.event.add(this, Ja(e.origType, e.selector), k.extend({}, e, {
                        handler: sa,
                        guid: e.handler.guid
                    }))
                },
                remove: function (e) {
                    k.event.remove(this, Ja(e.origType, e.selector), e)
                }
            },
            beforeunload: {
                setup: function (e, h, o) {
                    k.isWindow(this) && (this.onbeforeunload = o)
                },
                teardown: function (e, h) {
                    this.onbeforeunload === h && (this.onbeforeunload = null)
                }
            }
        }
    };
    k.removeEvent = ba.removeEventListener ?
    function (e, h, o) {
        e.removeEventListener && e.removeEventListener(h, o, false)
    } : function (e, h, o) {
        e.detachEvent && e.detachEvent("on" + h, o)
    };
    k.Event = function (e, h) {
        if (!this.preventDefault) return new k.Event(e, h);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === false || e.getPreventDefault && e.getPreventDefault() ? oa : Ba) : (this.type = e);
        h && k.extend(this, h);
        this.timeStamp = k.now();
        this[k.expando] = true
    };
    k.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = oa;
            var e = this.originalEvent;
            !e || (e.preventDefault ? e.preventDefault() : (e.returnValue = false))
        },
        stopPropagation: function () {
            this.isPropagationStopped = oa;
            var e = this.originalEvent;
            !e || (e.stopPropagation && e.stopPropagation(), e.cancelBubble = true)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = oa;
            this.stopPropagation()
        },
        isDefaultPrevented: Ba,
        isPropagationStopped: Ba,
        isImmediatePropagationStopped: Ba
    };
    var Va = function (e) {
            var h = e.relatedTarget,
                o = false,
                q = e.type;
            e.type = e.data;
            h !== this && (h && (o = k.contains(this, h)), o || (k.event.handle.apply(this, arguments), e.type = q))
        },
        gb = function (e) {
            e.type = e.data;
            k.event.handle.apply(this, arguments)
        };
    k.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, h) {
        k.event.special[e] = {
            setup: function (o) {
                k.event.add(this, h, o && o.selector ? gb : Va, e)
            },
            teardown: function (o) {
                k.event.remove(this, h, o && o.selector ? gb : Va)
            }
        }
    });
    k.support.submitBubbles || (k.event.special.submit = {
        setup: function () {
            if (k.nodeName(this, "form")) return false;
            else {
                k.event.add(this, "click.specialSubmit", function (e) {
                    var h = e.target,
                        o = h.type;
                    (o === "submit" || o === "image") && k(h).closest("form").length && xa("submit", this, arguments)
                });
                k.event.add(this, "keypress.specialSubmit", function (e) {
                    var h = e.target,
                        o = h.type;
                    (o === "text" || o === "password") && k(h).closest("form").length && e.keyCode === 13 && xa("submit", this, arguments)
                })
            }
        },
        teardown: function () {
            k.event.remove(this, ".specialSubmit")
        }
    });
    if (!k.support.changeBubbles) {
        var ab, Qa = function (e) {
                var h = e.type,
                    o = e.value;
                h === "radio" || h === "checkbox" ? (o = e.checked) : h === "select-multiple" ? (o = e.selectedIndex > -1 ? k.map(e.options, function (q) {
                    return q.selected
                }).join("-") : "") : k.nodeName(e, "select") && (o = e.selectedIndex);
                return o
            },
            mb = function (e, h) {
                var o = e.target,
                    q, s;
                if (Ea.test(o.nodeName) && !o.readOnly) {
                    q = k._data(o, "_change_data");
                    s = Qa(o);
                    (e.type !== "focusout" || o.type !== "radio") && k._data(o, "_change_data", s);
                    if (!(q === d || s === q)) if (q != null || s) {
                        e.type = "change";
                        e.liveFired = d;
                        k.event.trigger(e, h, o)
                    }
                }
            };
        k.event.special.change = {
            filters: {
                focusout: mb,
                beforedeactivate: mb,
                click: function (e) {
                    var h = e.target,
                        o = k.nodeName(h, "input") ? h.type : "";
                    (o === "radio" || o === "checkbox" || k.nodeName(h, "select")) && mb.call(this, e)
                },
                keydown: function (e) {
                    var h = e.target,
                        o = k.nodeName(h, "input") ? h.type : "";
                    (e.keyCode === 13 && !k.nodeName(h, "textarea") || e.keyCode === 32 && (o === "checkbox" || o === "radio") || o === "select-multiple") && mb.call(this, e)
                },
                beforeactivate: function (e) {
                    e = e.target;
                    k._data(e, "_change_data", Qa(e))
                }
            },
            setup: function () {
                if (this.type === "file") return false;
                for (var e in ab) k.event.add(this, e + ".specialChange", ab[e]);
                return Ea.test(this.nodeName)
            },
            teardown: function () {
                k.event.remove(this, ".specialChange");
                return Ea.test(this.nodeName)
            }
        };
        ab = k.event.special.change.filters;
        ab.focus = ab.beforeactivate
    }
    k.support.focusinBubbles || k.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, h) {
        function o(s) {
            var u = k.event.fix(s);
            u.type = h;
            u.originalEvent = {};
            k.event.trigger(u, null, u.target);
            u.isDefaultPrevented() && s.preventDefault()
        }
        var q = 0;
        k.event.special[h] = {
            setup: function () {
                q++ === 0 && ba.addEventListener(e, o, true)
            },
            teardown: function () {
                --q === 0 && ba.removeEventListener(e, o, true)
            }
        }
    });
    k.each(["bind", "one"], function (e, h) {
        k.fn[h] = function (o, q, s) {
            var u;
            if (typeof o == "object") {
                for (var C in o) this[h](C, q, o[C], s);
                return this
            }
            if (arguments.length === 2 || q === false) {
                s = q;
                q = d
            }
            h === "one" ? (u = function (I) {
                k(this).unbind(I, u);
                return s.apply(this, arguments)
            }, u.guid = s.guid || k.guid++) : (u = s);
            if (o === "unload" && h !== "one") this.one(o, q, s);
            else {
                C = 0;
                for (var G = this.length; C < G; C++) k.event.add(this[C], o, u, q)
            }
            return this
        }
    });
    k.fn.extend({
        unbind: function (e, h) {
            if (typeof e == "object" && !e.preventDefault) for (var o in e) this.unbind(o, e[o]);
            else {
                o = 0;
                for (var q = this.length; o < q; o++) k.event.remove(this[o], e, h)
            }
            return this
        },
        delegate: function (e, h, o, q) {
            return this.live(h, o, q, e)
        },
        undelegate: function (e, h, o) {
            return arguments.length === 0 ? this.unbind("live") : this.die(h, null, o, e)
        },
        trigger: function (e, h) {
            return this.each(function () {
                k.event.trigger(e, h, this)
            })
        },
        triggerHandler: function (e, h) {
            if (this[0]) return k.event.trigger(e, h, this[0], true)
        },
        toggle: function (e) {
            var h = arguments,
                o = e.guid || k.guid++,
                q = 0,
                s = function (u) {
                    var C = (k.data(this, "lastToggle" + e.guid) || 0) % q;
                    k.data(this, "lastToggle" + e.guid, C + 1);
                    u.preventDefault();
                    return h[C].apply(this, arguments) || false
                };
            for (s.guid = o; q < h.length;) h[q++].guid = o;
            return this.click(s)
        },
        hover: function (e, h) {
            return this.mouseenter(e).mouseleave(h || e)
        }
    });
    var rb = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    k.each(["live", "die"], function (e, h) {
        k.fn[h] = function (o, q, s, u) {
            var C = 0,
                G, I, K = u || this.selector,
                U = u ? this : k(this.context);
            if (typeof o == "object" && !o.preventDefault) {
                for (G in o) U[h](G, q, o[G], K);
                return this
            }
            if (h === "die" && !o && u && u.charAt(0) === ".") {
                U.unbind(u);
                return this
            }
            if (q === false || k.isFunction(q)) {
                s = q || Ba;
                q = d
            }
            for (o = (o || "").split(" ");
            (u = o[C++]) != null;) {
                G = ta.exec(u);
                I = "";
                G && (I = G[0], u = u.replace(ta, ""));
                if (u === "hover") o.push("mouseenter" + I, "mouseleave" + I);
                else {
                    G = u;
                    rb[u] ? (o.push(rb[u] + I), u += I) : (u = (rb[u] || u) + I);
                    if (h === "live") {
                        I = 0;
                        for (var na = U.length; I < na; I++) k.event.add(U[I], "live." + Ja(u, K), {
                            data: q,
                            selector: K,
                            handler: s,
                            origType: u,
                            origHandler: s,
                            preType: G
                        })
                    } else U.unbind("live." + Ja(u, K), s)
                }
            }
            return this
        }
    });
    k.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (e, h) {
        k.fn[h] = function (o, q) {
            q == null && (q = o, o = null);
            return arguments.length > 0 ? this.bind(h, o, q) : this.trigger(h)
        };
        k.attrFn && (k.attrFn[h] = true)
    });
    (function () {
        function e(A, D, L, N, Q, Z) {
            Q = 0;
            for (var ga = N.length; Q < ga; Q++) {
                var da = N[Q];
                if (da) {
                    var va = false;
                    for (da = da[A]; da;) {
                        if (da.sizcache === L) {
                            va = N[da.sizset];
                            break
                        }
                        if (da.nodeType === 1) {
                            Z || (da.sizcache = L, da.sizset = Q);
                            if (typeof D != "string") {
                                if (da === D) {
                                    va = true;
                                    break
                                }
                            } else if (K.filter(D, [da]).length > 0) {
                                va = da;
                                break
                            }
                        }
                        da = da[A]
                    }
                    N[Q] = va
                }
            }
        }
        function h(A, D, L, N, Q, Z) {
            Q = 0;
            for (var ga = N.length; Q < ga; Q++) {
                var da = N[Q];
                if (da) {
                    var va = false;
                    for (da = da[A]; da;) {
                        if (da.sizcache === L) {
                            va = N[da.sizset];
                            break
                        }
                        da.nodeType === 1 && !Z && (da.sizcache = L, da.sizset = Q);
                        if (da.nodeName.toLowerCase() === D) {
                            va = da;
                            break
                        }
                        da = da[A]
                    }
                    N[Q] = va
                }
            }
        }
        var o = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            q = 0,
            s = Object.prototype.toString,
            u = false,
            C = true,
            G = /\\/g,
            I = /\W/;
        [0, 0].sort(function () {
            C = false;
            return 0
        });
        var K = function (A, D, L, N) {
                L = L || [];
                var Q = D = D || ba;
                if (D.nodeType !== 1 && D.nodeType !== 9) return [];
                if (!A || typeof A != "string") return L;
                var Z, ga, da, va, Na, Oa, bb = true,
                    F = K.isXML(D),
                    S = [],
                    fa = A;
                do {
                    o.exec("");
                    if (Z = o.exec(fa)) {
                        fa = Z[3];
                        S.push(Z[1]);
                        if (Z[2]) {
                            va = Z[3];
                            break
                        }
                    }
                } while (Z);
                if (S.length > 1 && na.exec(A)) if (S.length === 2 && U.relative[S[0]]) ga = lb(S[0] + S[1], D);
                else for (ga = U.relative[S[0]] ? [D] : K(S.shift(), D); S.length;) {
                    A = S.shift();
                    U.relative[A] && (A += S.shift());
                    ga = lb(A, ga)
                } else {
                    !N && S.length > 1 && D.nodeType === 9 && !F && U.match.ID.test(S[0]) && !U.match.ID.test(S[S.length - 1]) && (Na = K.find(S.shift(), D, F), D = Na.expr ? K.filter(Na.expr, Na.set)[0] : Na.set[0]);
                    if (D) {
                        Na = N ? {
                            expr: S.pop(),
                            set: Aa(N)
                        } : K.find(S.pop(), S.length === 1 && (S[0] === "~" || S[0] === "+") && D.parentNode ? D.parentNode : D, F);
                        ga = Na.expr ? K.filter(Na.expr, Na.set) : Na.set;
                        for (S.length > 0 ? (da = Aa(ga)) : (bb = false); S.length;) {
                            Z = Oa = S.pop();
                            U.relative[Oa] ? (Z = S.pop()) : (Oa = "");
                            Z == null && (Z = D);
                            U.relative[Oa](da, Z, F)
                        }
                    } else da = []
                }
                da || (da = ga);
                da || K.error(Oa || A);
                if (s.call(da) === "[object Array]") if (bb) if (D && D.nodeType === 1) for (A = 0; da[A] != null; A++) da[A] && (da[A] === true || da[A].nodeType === 1 && K.contains(D, da[A])) && L.push(ga[A]);
                else for (A = 0; da[A] != null; A++) da[A] && da[A].nodeType === 1 && L.push(ga[A]);
                else L.push.apply(L, da);
                else Aa(da, L);
                va && (K(va, Q, L, N), K.uniqueSort(L));
                return L
            };
        K.uniqueSort = function (A) {
            if (Ta) {
                u = C;
                A.sort(Ta);
                if (u) for (var D = 1; D < A.length; D++) A[D] === A[D - 1] && A.splice(D--, 1)
            }
            return A
        };
        K.matches = function (A, D) {
            return K(A, null, null, D)
        };
        K.matchesSelector = function (A, D) {
            return K(D, null, null, [A]).length > 0
        };
        K.find = function (A, D, L) {
            var N;
            if (!A) return [];
            for (var Q = 0, Z = U.order.length; Q < Z; Q++) {
                var ga, da = U.order[Q];
                if (ga = U.leftMatch[da].exec(A)) {
                    var va = ga[1];
                    ga.splice(1, 1);
                    if (va.substr(va.length - 1) !== "\\") {
                        ga[1] = (ga[1] || "").replace(G, "");
                        N = U.find[da](ga, D, L);
                        if (N != null) {
                            A = A.replace(U.match[da], "");
                            break
                        }
                    }
                }
            }
            N || (N = typeof D.getElementsByTagName != "undefined" ? D.getElementsByTagName("*") : []);
            return {
                set: N,
                expr: A
            }
        };
        K.filter = function (A, D, L, N) {
            for (var Q, Z, ga = A, da = [], va = D, Na = D && D[0] && K.isXML(D[0]); A && D.length;) {
                for (var Oa in U.filter) if ((Q = U.leftMatch[Oa].exec(A)) != null && Q[2]) {
                    var bb, F, S = U.filter[Oa];
                    F = Q[1];
                    Z = false;
                    Q.splice(1, 1);
                    if (F.substr(F.length - 1) !== "\\") {
                        va === da && (da = []);
                        if (U.preFilter[Oa]) if (Q = U.preFilter[Oa](Q, va, L, da, N, Na)) {
                            if (Q === true) continue
                        } else Z = bb = true;
                        if (Q) for (var fa = 0;
                        (F = va[fa]) != null; fa++) if (F) {
                            bb = S(F, Q, fa, va);
                            var ha = N ^ !! bb;
                            L && bb != null ? ha ? (Z = true) : (va[fa] = false) : ha && (da.push(F), Z = true)
                        }
                        if (bb !== d) {
                            L || (va = da);
                            A = A.replace(U.match[Oa], "");
                            if (!Z) return [];
                            break
                        }
                    }
                }
                if (A === ga) if (Z == null) K.error(A);
                else break;
                ga = A
            }
            return va
        };
        K.error = function (A) {
            throw "Syntax error, unrecognized expression: " + A;
        };
        var U = K.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function (A) {
                    return A.getAttribute("href")
                },
                type: function (A) {
                    return A.getAttribute("type")
                }
            },
            relative: {
                "+": function (A, D) {
                    var L = typeof D == "string",
                        N = L && !I.test(D);
                    L = L && !N;
                    N && (D = D.toLowerCase());
                    N = 0;
                    for (var Q = A.length, Z; N < Q; N++) if (Z = A[N]) {
                        for (;
                        (Z = Z.previousSibling) && Z.nodeType !== 1;);
                        A[N] = L || Z && Z.nodeName.toLowerCase() === D ? Z || false : Z === D
                    }
                    L && K.filter(D, A, true)
                },
                ">": function (A, D) {
                    var L, N = typeof D == "string",
                        Q = 0,
                        Z = A.length;
                    if (N && !I.test(D)) for (D = D.toLowerCase(); Q < Z; Q++) {
                        if (L = A[Q]) {
                            L = L.parentNode;
                            A[Q] = L.nodeName.toLowerCase() === D ? L : false
                        }
                    } else {
                        for (; Q < Z; Q++)(L = A[Q]) && (A[Q] = N ? L.parentNode : L.parentNode === D);
                        N && K.filter(D, A, true)
                    }
                },
                "": function (A, D, L) {
                    var N, Q = q++,
                        Z = e;
                    typeof D == "string" && !I.test(D) && (D = D.toLowerCase(), N = D, Z = h);
                    Z("parentNode", D, Q, A, N, L)
                },
                "~": function (A, D, L) {
                    var N, Q = q++,
                        Z = e;
                    typeof D == "string" && !I.test(D) && (D = D.toLowerCase(), N = D, Z = h);
                    Z("previousSibling", D, Q, A, N, L)
                }
            },
            find: {
                ID: function (A, D, L) {
                    if (typeof D.getElementById != "undefined" && !L) return (A = D.getElementById(A[1])) && A.parentNode ? [A] : []
                },
                NAME: function (A, D) {
                    if (typeof D.getElementsByName != "undefined") {
                        var L = [];
                        D = D.getElementsByName(A[1]);
                        for (var N = 0, Q = D.length; N < Q; N++) D[N].getAttribute("name") === A[1] && L.push(D[N]);
                        return L.length === 0 ? null : L
                    }
                },
                TAG: function (A, D) {
                    if (typeof D.getElementsByTagName != "undefined") return D.getElementsByTagName(A[1])
                }
            },
            preFilter: {
                CLASS: function (A, D, L, N, Q, Z) {
                    A = " " + A[1].replace(G, "") + " ";
                    if (Z) return A;
                    Z = 0;
                    for (var ga;
                    (ga = D[Z]) != null; Z++) ga && (Q ^ (ga.className && (" " + ga.className + " ").replace(/[\t\n\r]/g, " ").indexOf(A) >= 0) ? L || N.push(ga) : L && (D[Z] = false));
                    return false
                },
                ID: function (A) {
                    return A[1].replace(G, "")
                },
                TAG: function (A) {
                    return A[1].replace(G, "").toLowerCase()
                },
                CHILD: function (A) {
                    if (A[1] === "nth") {
                        A[2] || K.error(A[0]);
                        A[2] = A[2].replace(/^\+|\s*/g, "");
                        var D = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(A[2] === "even" && "2n" || A[2] === "odd" && "2n+1" || !/\D/.test(A[2]) && "0n+" + A[2] || A[2]);
                        A[2] = D[1] + (D[2] || 1) - 0;
                        A[3] = D[3] - 0
                    } else A[2] && K.error(A[0]);
                    A[0] = q++;
                    return A
                },
                ATTR: function (A, D, L, N, Q, Z) {
                    D = A[1] = A[1].replace(G, "");
                    !Z && U.attrMap[D] && (A[1] = U.attrMap[D]);
                    A[4] = (A[4] || A[5] || "").replace(G, "");
                    A[2] === "~=" && (A[4] = " " + A[4] + " ");
                    return A
                },
                PSEUDO: function (A, D, L, N, Q) {
                    if (A[1] === "not") if ((o.exec(A[3]) || "").length > 1 || /^\w/.test(A[3])) A[3] = K(A[3], null, null, D);
                    else {
                        A = K.filter(A[3], D, L, true ^ Q);
                        L || N.push.apply(N, A);
                        return false
                    } else if (U.match.POS.test(A[0]) || U.match.CHILD.test(A[0])) return true;
                    return A
                },
                POS: function (A) {
                    A.unshift(true);
                    return A
                }
            },
            filters: {
                enabled: function (A) {
                    return A.disabled === false && A.type !== "hidden"
                },
                disabled: function (A) {
                    return A.disabled === true
                },
                checked: function (A) {
                    return A.checked === true
                },
                selected: function (A) {
                    return A.selected === true
                },
                parent: function (A) {
                    return !!A.firstChild
                },
                empty: function (A) {
                    return !A.firstChild
                },
                has: function (A, D, L) {
                    return !!K(L[3], A).length
                },
                header: function (A) {
                    return /h\d/i.test(A.nodeName)
                },
                text: function (A) {
                    var D = A.getAttribute("type"),
                        L = A.type;
                    return A.nodeName.toLowerCase() === "input" && "text" === L && (D === L || D === null)
                },
                radio: function (A) {
                    return A.nodeName.toLowerCase() === "input" && "radio" === A.type
                },
                checkbox: function (A) {
                    return A.nodeName.toLowerCase() === "input" && "checkbox" === A.type
                },
                file: function (A) {
                    return A.nodeName.toLowerCase() === "input" && "file" === A.type
                },
                password: function (A) {
                    return A.nodeName.toLowerCase() === "input" && "password" === A.type
                },
                submit: function (A) {
                    var D = A.nodeName.toLowerCase();
                    return (D === "input" || D === "button") && "submit" === A.type
                },
                image: function (A) {
                    return A.nodeName.toLowerCase() === "input" && "image" === A.type
                },
                reset: function (A) {
                    var D = A.nodeName.toLowerCase();
                    return (D === "input" || D === "button") && "reset" === A.type
                },
                button: function (A) {
                    var D = A.nodeName.toLowerCase();
                    return D === "input" && "button" === A.type || D === "button"
                },
                input: function (A) {
                    return /input|select|textarea|button/i.test(A.nodeName)
                },
                focus: function (A) {
                    return A === A.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (A, D) {
                    return D === 0
                },
                last: function (A, D, L, N) {
                    return D === N.length - 1
                },
                even: function (A, D) {
                    return D % 2 === 0
                },
                odd: function (A, D) {
                    return D % 2 === 1
                },
                lt: function (A, D, L) {
                    return D < L[3] - 0
                },
                gt: function (A, D, L) {
                    return D > L[3] - 0
                },
                nth: function (A, D, L) {
                    return L[3] - 0 === D
                },
                eq: function (A, D, L) {
                    return L[3] - 0 === D
                }
            },
            filter: {
                PSEUDO: function (A, D, L, N) {
                    var Q = D[1],
                        Z = U.filters[Q];
                    if (Z) return Z(A, L, D, N);
                    if (Q === "contains") return (A.textContent || A.innerText || K.getText([A]) || "").indexOf(D[3]) >= 0;
                    if (Q === "not") {
                        D = D[3];
                        L = 0;
                        for (N = D.length; L < N; L++) if (D[L] === A) return false;
                        return true
                    }
                    K.error(Q)
                },
                CHILD: function (A, D) {
                    var L = D[1],
                        N = A;
                    switch (L) {
                    case "only":
                    case "first":
                        for (; N = N.previousSibling;) if (N.nodeType === 1) return false;
                        if (L === "first") return true;
                        N = A;
                    case "last":
                        for (; N = N.nextSibling;) if (N.nodeType === 1) return false;
                        return true;
                    case "nth":
                        L = D[2];
                        var Q = D[3];
                        if (L === 1 && Q === 0) return true;
                        D = D[0];
                        var Z = A.parentNode;
                        if (Z && (Z.sizcache !== D || !A.nodeIndex)) {
                            var ga = 0;
                            for (N = Z.firstChild; N; N = N.nextSibling) N.nodeType === 1 && (N.nodeIndex = ++ga);
                            Z.sizcache = D
                        }
                        A = A.nodeIndex - Q;
                        return L === 0 ? A === 0 : A % L === 0 && A / L >= 0
                    }
                },
                ID: function (A, D) {
                    return A.nodeType === 1 && A.getAttribute("id") === D
                },
                TAG: function (A, D) {
                    return D === "*" && A.nodeType === 1 || A.nodeName.toLowerCase() === D
                },
                CLASS: function (A, D) {
                    return (" " + (A.className || A.getAttribute("class")) + " ").indexOf(D) > -1
                },
                ATTR: function (A, D) {
                    var L = D[1];
                    A = U.attrHandle[L] ? U.attrHandle[L](A) : A[L] != null ? A[L] : A.getAttribute(L);
                    L = A + "";
                    var N = D[2];
                    D = D[4];
                    return A == null ? N === "!=" : N === "=" ? L === D : N === "*=" ? L.indexOf(D) >= 0 : N === "~=" ? (" " + L + " ").indexOf(D) >= 0 : D ? N === "!=" ? L !== D : N === "^=" ? L.indexOf(D) === 0 : N === "$=" ? L.substr(L.length - D.length) === D : N === "|=" ? L === D || L.substr(0, D.length + 1) === D + "-" : false : L && A !== false
                },
                POS: function (A, D, L, N) {
                    var Q = U.setFilters[D[2]];
                    if (Q) return Q(A, L, D, N)
                }
            }
        },
            na = U.match.POS,
            qa = function (A, D) {
                return "\\" + (D - 0 + 1)
            };
        for (var pa in U.match) {
            U.match[pa] = new RegExp(U.match[pa].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            U.leftMatch[pa] = new RegExp(/(^(?:.|\r|\n)*?)/.source + U.match[pa].source.replace(/\\(\d+)/g, qa))
        }
        var Aa = function (A, D) {
                A = Array.prototype.slice.call(A, 0);
                if (D) {
                    D.push.apply(D, A);
                    return D
                }
                return A
            };
        try {
            Array.prototype.slice.call(ba.documentElement.childNodes, 0)
        } catch (fb) {
            Aa = function (A, D) {
                var L = 0;
                D = D || [];
                if (s.call(A) === "[object Array]") Array.prototype.push.apply(D, A);
                else if (typeof A.length == "number") for (var N = A.length; L < N; L++) D.push(A[L]);
                else for (; A[L]; L++) D.push(A[L]);
                return D
            }
        }
        var Ta, Ua;
        ba.documentElement.compareDocumentPosition ? (Ta = function (A, D) {
            if (A === D) {
                u = true;
                return 0
            }
            if (!A.compareDocumentPosition || !D.compareDocumentPosition) return A.compareDocumentPosition ? -1 : 1;
            return A.compareDocumentPosition(D) & 4 ? -1 : 1
        }) : (Ta = function (A, D) {
            if (A === D) {
                u = true;
                return 0
            }
            if (A.sourceIndex && D.sourceIndex) return A.sourceIndex - D.sourceIndex;
            var L, N, Q = [],
                Z = [];
            L = A.parentNode;
            N = D.parentNode;
            var ga = L;
            if (L === N) return Ua(A, D);
            if (!L) return -1;
            if (!N) return 1;
            for (; ga;) {
                Q.unshift(ga);
                ga = ga.parentNode
            }
            for (ga = N; ga;) {
                Z.unshift(ga);
                ga = ga.parentNode
            }
            L = Q.length;
            N = Z.length;
            for (ga = 0; ga < L && ga < N; ga++) if (Q[ga] !== Z[ga]) return Ua(Q[ga], Z[ga]);
            return ga === L ? Ua(A, Z[ga], -1) : Ua(Q[ga], D, 1)
        }, Ua = function (A, D, L) {
            if (A === D) return L;
            for (A = A.nextSibling; A;) {
                if (A === D) return -1;
                A = A.nextSibling
            }
            return 1
        });
        K.getText = function (A) {
            for (var D = "", L, N = 0; A[N]; N++) {
                L = A[N];
                L.nodeType === 3 || L.nodeType === 4 ? (D += L.nodeValue) : L.nodeType !== 8 && (D += K.getText(L.childNodes))
            }
            return D
        };
        (function () {
            var A = ba.createElement("div"),
                D = "script" + (new Date).getTime(),
                L = ba.documentElement;
            A.innerHTML = "<a name='" + D + "'/>";
            L.insertBefore(A, L.firstChild);
            ba.getElementById(D) && (U.find.ID = function (N, Q, Z) {
                if (typeof Q.getElementById != "undefined" && !Z) return (Q = Q.getElementById(N[1])) ? Q.id === N[1] || typeof Q.getAttributeNode != "undefined" && Q.getAttributeNode("id").nodeValue === N[1] ? [Q] : d : []
            }, U.filter.ID = function (N, Q) {
                var Z = typeof N.getAttributeNode != "undefined" && N.getAttributeNode("id");
                return N.nodeType === 1 && Z && Z.nodeValue === Q
            });
            L.removeChild(A);
            L = A = null
        })();
        (function () {
            var A = ba.createElement("div");
            A.appendChild(ba.createComment(""));
            A.getElementsByTagName("*").length > 0 && (U.find.TAG = function (D, L) {
                L = L.getElementsByTagName(D[1]);
                if (D[1] === "*") {
                    D = [];
                    for (var N = 0; L[N]; N++) L[N].nodeType === 1 && D.push(L[N]);
                    L = D
                }
                return L
            });
            A.innerHTML = "<a href='#'></a>";
            A.firstChild && typeof A.firstChild.getAttribute != "undefined" && A.firstChild.getAttribute("href") !== "#" && (U.attrHandle.href = function (D) {
                return D.getAttribute("href", 2)
            });
            A = null
        })();
        ba.querySelectorAll &&
        function () {
            var A = K,
                D = ba.createElement("div");
            D.innerHTML = "<p class='TEST'></p>";
            if (!D.querySelectorAll || D.querySelectorAll(".TEST").length !== 0) {
                K = function (N, Q, Z, ga) {
                    Q = Q || ba;
                    if (!ga && !K.isXML(Q)) {
                        var da = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(N);
                        if (da && (Q.nodeType === 1 || Q.nodeType === 9)) {
                            if (da[1]) return Aa(Q.getElementsByTagName(N), Z);
                            if (da[2] && U.find.CLASS && Q.getElementsByClassName) return Aa(Q.getElementsByClassName(da[2]), Z)
                        }
                        if (Q.nodeType === 9) {
                            if (N === "body" && Q.body) return Aa([Q.body], Z);
                            if (da && da[3]) {
                                var va = Q.getElementById(da[3]);
                                if (!va || !va.parentNode) return Aa([], Z);
                                if (va.id === da[3]) return Aa([va], Z)
                            }
                            try {
                                return Aa(Q.querySelectorAll(N), Z)
                            } catch (Na) {}
                        } else if (Q.nodeType === 1 && Q.nodeName.toLowerCase() !== "object") {
                            da = Q;
                            var Oa = (va = Q.getAttribute("id")) || "__sizzle__",
                                bb = Q.parentNode,
                                F = /^\s*[+~]/.test(N);
                            va ? (Oa = Oa.replace(/'/g, "\\$&")) : Q.setAttribute("id", Oa);
                            F && bb && (Q = Q.parentNode);
                            try {
                                if (!F || bb) return Aa(Q.querySelectorAll("[id='" + Oa + "'] " + N), Z)
                            } catch (S) {} finally {
                                va || da.removeAttribute("id")
                            }
                        }
                    }
                    return A(N, Q, Z, ga)
                };
                for (var L in A) K[L] = A[L];
                D = null
            }
        }();
        (function () {
            var A = ba.documentElement,
                D = A.matchesSelector || A.mozMatchesSelector || A.webkitMatchesSelector || A.msMatchesSelector;
            if (D) {
                var L = !D.call(ba.createElement("div"), "div"),
                    N = false;
                try {
                    D.call(ba.documentElement, "[test!='']:sizzle")
                } catch (Q) {
                    N = true
                }
                K.matchesSelector = function (Z, ga) {
                    ga = ga.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!K.isXML(Z)) try {
                        if (N || !U.match.PSEUDO.test(ga) && !/!=/.test(ga)) {
                            var da = D.call(Z, ga);
                            if (da || !L || Z.document && Z.document.nodeType !== 11) return da
                        }
                    } catch (va) {}
                    return K(ga, null, null, [Z]).length > 0
                }
            }
        })();
        (function () {
            var A = ba.createElement("div");
            A.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (A.getElementsByClassName && A.getElementsByClassName("e").length !== 0) {
                A.lastChild.className = "e";
                if (A.getElementsByClassName("e").length !== 1) {
                    U.order.splice(1, 0, "CLASS");
                    U.find.CLASS = function (D, L, N) {
                        if (typeof L.getElementsByClassName != "undefined" && !N) return L.getElementsByClassName(D[1])
                    };
                    A = null
                }
            }
        })();
        ba.documentElement.contains ? (K.contains = function (A, D) {
            return A !== D && (A.contains ? A.contains(D) : true)
        }) : ba.documentElement.compareDocumentPosition ? (K.contains = function (A, D) {
            return !!(A.compareDocumentPosition(D) & 16)
        }) : (K.contains = function () {
            return false
        });
        K.isXML = function (A) {
            return (A = (A ? A.ownerDocument || A : 0).documentElement) ? A.nodeName !== "HTML" : false
        };
        var lb = function (A, D) {
                var L, N = [],
                    Q = "";
                for (D = D.nodeType ? [D] : D; L = U.match.PSEUDO.exec(A);) {
                    Q += L[0];
                    A = A.replace(U.match.PSEUDO, "")
                }
                A = U.relative[A] ? A + "*" : A;
                L = 0;
                for (var Z = D.length; L < Z; L++) K(A, D[L], N);
                return K.filter(Q, N)
            };
        k.find = K;
        k.expr = K.selectors;
        k.expr[":"] = k.expr.filters;
        k.unique = K.uniqueSort;
        k.text = K.getText;
        k.isXMLDoc = K.isXML;
        k.contains = K.contains
    })();
    var Hb = /Until$/,
        Ib = /^(?:parents|prevUntil|prevAll)/,
        nb = /,/,
        Jb = /^.[^:#\[\.,]*$/,
        vb = Array.prototype.slice,
        pb = k.expr.match.POS,
        jb = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    k.fn.extend({
        find: function (e) {
            var h = this,
                o, q;
            if (typeof e != "string") return k(e).filter(function () {
                o = 0;
                for (q = h.length; o < q; o++) if (k.contains(h[o], this)) return true
            });
            var s = this.pushStack("", "find", e),
                u, C, G;
            o = 0;
            for (q = this.length; o < q; o++) {
                u = s.length;
                k.find(e, this[o], s);
                if (o > 0) for (C = u; C < s.length; C++) for (G = 0; G < u; G++) if (s[G] === s[C]) {
                    s.splice(C--, 1);
                    break
                }
            }
            return s
        },
        has: function (e) {
            var h = k(e);
            return this.filter(function () {
                for (var o = 0, q = h.length; o < q; o++) if (k.contains(this, h[o])) return true
            })
        },
        not: function (e) {
            return this.pushStack(ca(this, e, false), "not", e)
        },
        filter: function (e) {
            return this.pushStack(ca(this, e, true), "filter", e)
        },
        is: function (e) {
            return !!e && (typeof e == "string" ? k.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, h) {
            var o = [],
                q, s, u = this[0];
            if (k.isArray(e)) {
                var C, G = {},
                    I = 1;
                if (u && e.length) {
                    q = 0;
                    for (s = e.length; q < s; q++) {
                        C = e[q];
                        G[C] || (G[C] = pb.test(C) ? k(C, h || this.context) : C)
                    }
                    for (; u && u.ownerDocument && u !== h;) {
                        for (C in G) {
                            e = G[C];
                            (e.jquery ? e.index(u) > -1 : k(u).is(e)) && o.push({
                                selector: C,
                                elem: u,
                                level: I
                            })
                        }
                        u = u.parentNode;
                        I++
                    }
                }
                return o
            }
            C = pb.test(e) || typeof e != "string" ? k(e, h || this.context) : 0;
            q = 0;
            for (s = this.length; q < s; q++) for (u = this[q]; u;) {
                if (C ? C.index(u) > -1 : k.find.matchesSelector(u, e)) {
                    o.push(u);
                    break
                }
                u = u.parentNode;
                if (!u || !u.ownerDocument || u === h || u.nodeType === 11) break
            }
            o = o.length > 1 ? k.unique(o) : o;
            return this.pushStack(o, "closest", e)
        },
        index: function (e) {
            if (!e || typeof e == "string") return k.inArray(this[0], e ? k(e) : this.parent().children());
            return k.inArray(e.jquery ? e[0] : e, this)
        },
        add: function (e, h) {
            e = typeof e == "string" ? k(e, h) : k.makeArray(e && e.nodeType ? [e] : e);
            h = k.merge(this.get(), e);
            return this.pushStack(ra(e[0]) || ra(h[0]) ? h : k.unique(h))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    });
    k.each({
        parent: function (e) {
            return (e = e.parentNode) && e.nodeType !== 11 ? e : null
        },
        parents: function (e) {
            return k.dir(e, "parentNode")
        },
        parentsUntil: function (e, h, o) {
            return k.dir(e, "parentNode", o)
        },
        next: function (e) {
            return k.nth(e, 2, "nextSibling")
        },
        prev: function (e) {
            return k.nth(e, 2, "previousSibling")
        },
        nextAll: function (e) {
            return k.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return k.dir(e, "previousSibling")
        },
        nextUntil: function (e, h, o) {
            return k.dir(e, "nextSibling", o)
        },
        prevUntil: function (e, h, o) {
            return k.dir(e, "previousSibling", o)
        },
        siblings: function (e) {
            return k.sibling(e.parentNode.firstChild, e)
        },
        children: function (e) {
            return k.sibling(e.firstChild)
        },
        contents: function (e) {
            return k.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : k.makeArray(e.childNodes)
        }
    }, function (e, h) {
        k.fn[e] = function (o, q) {
            var s = k.map(this, h, o),
                u = vb.call(arguments);
            Hb.test(e) || (q = o);
            q && typeof q == "string" && (s = k.filter(q, s));
            s = this.length > 1 && !jb[e] ? k.unique(s) : s;
            (this.length > 1 || nb.test(q)) && Ib.test(e) && (s = s.reverse());
            return this.pushStack(s, e, u.join(","))
        }
    });
    k.extend({
        filter: function (e, h, o) {
            o && (e = ":not(" + e + ")");
            return h.length === 1 ? k.find.matchesSelector(h[0], e) ? [h[0]] : [] : k.find.matches(e, h)
        },
        dir: function (e, h, o) {
            var q = [];
            for (e = e[h]; e && e.nodeType !== 9 && (o === d || e.nodeType !== 1 || !k(e).is(o));) {
                e.nodeType === 1 && q.push(e);
                e = e[h]
            }
            return q
        },
        nth: function (e, h, o) {
            h = h || 1;
            for (var q = 0; e; e = e[o]) if (e.nodeType === 1 && ++q === h) break;
            return e
        },
        sibling: function (e, h) {
            for (var o = []; e; e = e.nextSibling) e.nodeType === 1 && e !== h && o.push(e);
            return o
        }
    });
    var Db = / jQuery\d+="(?:\d+|null)"/g,
        wb = /^\s+/,
        Wa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Eb = /<([\w:]+)/,
        sb = /<tbody/i,
        xb = /<|&#?\w+;/,
        ob = /<(?:script|object|embed|option|style)/i,
        Fb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ib = /\/(java|ecma)script/i,
        Pb = /^\s*<!(?:\[CDATA\[|\-\-)/,
        Sa = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    Sa.optgroup = Sa.option;
    Sa.tbody = Sa.tfoot = Sa.colgroup = Sa.caption = Sa.thead;
    Sa.th = Sa.td;
    k.support.htmlSerialize || (Sa._default = [1, "div<div>", "</div>"]);
    k.fn.extend({
        text: function (e) {
            if (k.isFunction(e)) return this.each(function (h) {
                var o = k(this);
                o.text(e.call(this, h, o.text()))
            });
            if (typeof e != "object" && e !== d) return this.empty().append((this[0] && this[0].ownerDocument || ba).createTextNode(e));
            return k.text(this)
        },
        wrapAll: function (e) {
            if (k.isFunction(e)) return this.each(function (o) {
                k(this).wrapAll(e.call(this, o))
            });
            if (this[0]) {
                var h = k(e, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && h.insertBefore(this[0]);
                h.map(function () {
                    for (var o = this; o.firstChild && o.firstChild.nodeType === 1;) o = o.firstChild;
                    return o
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            if (k.isFunction(e)) return this.each(function (h) {
                k(this).wrapInner(e.call(this, h))
            });
            return this.each(function () {
                var h = k(this),
                    o = h.contents();
                o.length ? o.wrapAll(e) : h.append(e)
            })
        },
        wrap: function (e) {
            return this.each(function () {
                k(this).wrapAll(e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                k.nodeName(this, "body") || k(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, true, function (e) {
                this.nodeType === 1 && this.appendChild(e)
            })
        },
        prepend: function () {
            return this.domManip(arguments, true, function (e) {
                this.nodeType === 1 && this.insertBefore(e, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (h) {
                this.parentNode.insertBefore(h, this)
            });
            if (arguments.length) {
                var e = k(arguments[0]);
                e.push.apply(e, this.toArray());
                return this.pushStack(e, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (h) {
                this.parentNode.insertBefore(h, this.nextSibling)
            });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                e.push.apply(e, k(arguments[0]).toArray());
                return e
            }
        },
        remove: function (e, h) {
            for (var o = 0, q;
            (q = this[o]) != null; o++) if (!e || k.filter(e, [q]).length) {
                !h && q.nodeType === 1 && (k.cleanData(q.getElementsByTagName("*")), k.cleanData([q]));
                q.parentNode && q.parentNode.removeChild(q)
            }
            return this
        },
        empty: function () {
            for (var e = 0, h;
            (h = this[e]) != null; e++) for (h.nodeType === 1 && k.cleanData(h.getElementsByTagName("*")); h.firstChild;) h.removeChild(h.firstChild);
            return this
        },
        clone: function (e, h) {
            e = e == null ? false : e;
            h = h == null ? e : h;
            return this.map(function () {
                return k.clone(this, e, h)
            })
        },
        html: function (e) {
            if (e === d) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Db, "") : null;
            if (typeof e == "string" && !ob.test(e) && (k.support.leadingWhitespace || !wb.test(e)) && !Sa[(Eb.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(Wa, "<$1></$2>");
                try {
                    for (var h = 0, o = this.length; h < o; h++) this[h].nodeType === 1 && (k.cleanData(this[h].getElementsByTagName("*")), this[h].innerHTML = e)
                } catch (q) {
                    this.empty().append(e)
                }
            } else k.isFunction(e) ? this.each(function (s) {
                var u = k(this);
                u.html(e.call(this, s, u.html()))
            }) : this.empty().append(e);
            return this
        },
        replaceWith: function (e) {
            if (this[0] && this[0].parentNode) {
                if (k.isFunction(e)) return this.each(function (h) {
                    var o = k(this),
                        q = o.html();
                    o.replaceWith(e.call(this, h, q))
                });
                typeof e != "string" && (e = k(e).detach());
                return this.each(function () {
                    var h = this.nextSibling,
                        o = this.parentNode;
                    k(this).remove();
                    h ? k(h).before(e) : k(o).append(e)
                })
            }
            return this.length ? this.pushStack(k(k.isFunction(e) ? e() : e), "replaceWith", e) : this
        },
        detach: function (e) {
            return this.remove(e, true)
        },
        domManip: function (e, h, o) {
            var q, s, u, C = e[0],
                G = [];
            if (!k.support.checkClone && arguments.length === 3 && typeof C == "string" && Fb.test(C)) return this.each(function () {
                k(this).domManip(e, h, o, true)
            });
            if (k.isFunction(C)) return this.each(function (na) {
                var qa = k(this);
                e[0] = C.call(this, na, h ? qa.html() : d);
                qa.domManip(e, h, o)
            });
            if (this[0]) {
                u = C && C.parentNode;
                k.support.parentNode && u && u.nodeType === 11 && u.childNodes.length === this.length ? (q = {
                    fragment: u
                }) : (q = k.buildFragment(e, this, G));
                u = q.fragment;
                u.childNodes.length === 1 ? (s = u = u.firstChild) : (s = u.firstChild);
                if (s) {
                    h = h && k.nodeName(s, "tr");
                    for (var I = 0, K = this.length, U = K - 1; I < K; I++) o.call(h ? la(this[I], s) : this[I], q.cacheable || K > 1 && I < U ? k.clone(u, true, true) : u)
                }
                G.length && k.each(G, E)
            }
            return this
        }
    });
    k.buildFragment = function (e, h, o) {
        var q, s, u, C;
        h && h[0] && (C = h[0].ownerDocument || h[0]);
        C.createDocumentFragment || (C = ba);
        e.length === 1 && typeof e[0] == "string" && e[0].length < 512 && C === ba && e[0].charAt(0) === "<" && !ob.test(e[0]) && (k.support.checkClone || !Fb.test(e[0])) && (s = true, u = k.fragments[e[0]], u && u !== 1 && (q = u));
        q || (q = C.createDocumentFragment(), k.clean(e, C, q, o));
        s && (k.fragments[e[0]] = u ? q : 1);
        return {
            fragment: q,
            cacheable: s
        }
    };
    k.fragments = {};
    k.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, h) {
        k.fn[e] = function (o) {
            var q = [];
            o = k(o);
            var s = this.length === 1 && this[0].parentNode;
            if (s && s.nodeType === 11 && s.childNodes.length === 1 && o.length === 1) {
                o[h](this[0]);
                return this
            }
            s = 0;
            for (var u = o.length; s < u; s++) {
                var C = (s > 0 ? this.clone(true) : this).get();
                k(o[s])[h](C);
                q = q.concat(C)
            }
            return this.pushStack(q, e, o.selector)
        }
    });
    k.extend({
        clone: function (e, h, o) {
            var q = e.cloneNode(true),
                s, u, C;
            if ((!k.support.noCloneEvent || !k.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !k.isXMLDoc(e)) {
                W(e, q);
                s = P(e);
                u = P(q);
                for (C = 0; s[C]; ++C) W(s[C], u[C])
            }
            if (h) {
                Y(e, q);
                if (o) {
                    s = P(e);
                    u = P(q);
                    for (C = 0; s[C]; ++C) Y(s[C], u[C])
                }
            }
            return q
        },
        clean: function (e, h, o, q) {
            h = h || ba;
            typeof h.createElement == "undefined" && (h = h.ownerDocument || h[0] && h[0].ownerDocument || ba);
            for (var s = [], u, C = 0, G;
            (G = e[C]) != null; C++) {
                typeof G == "number" && (G += "");
                if (G) {
                    if (typeof G == "string") if (xb.test(G)) {
                        G = G.replace(Wa, "<$1></$2>");
                        u = (Eb.exec(G) || ["", ""])[1].toLowerCase();
                        var I = Sa[u] || Sa._default,
                            K = I[0],
                            U = h.createElement("div");
                        for (U.innerHTML = I[1] + G + I[2]; K--;) U = U.lastChild;
                        if (!k.support.tbody) {
                            K = sb.test(G);
                            I = u === "table" && !K ? U.firstChild && U.firstChild.childNodes : I[1] === "<table>" && !K ? U.childNodes : [];
                            for (u = I.length - 1; u >= 0; --u) k.nodeName(I[u], "tbody") && !I[u].childNodes.length && I[u].parentNode.removeChild(I[u])
                        }!k.support.leadingWhitespace && wb.test(G) && U.insertBefore(h.createTextNode(wb.exec(G)[0]), U.firstChild);
                        G = U.childNodes
                    } else G = h.createTextNode(G);
                    var na;
                    if (!k.support.appendChecked) if (G[0] && typeof (na = G.length) == "number") for (u = 0; u < na; u++) H(G[u]);
                    else H(G);
                    G.nodeType ? s.push(G) : (s = k.merge(s, G))
                }
            }
            if (o) {
                e = function (qa) {
                    return !qa.type || ib.test(qa.type)
                };
                for (C = 0; s[C]; C++) if (q && k.nodeName(s[C], "script") && (!s[C].type || s[C].type.toLowerCase() === "text/javascript")) q.push(s[C].parentNode ? s[C].parentNode.removeChild(s[C]) : s[C]);
                else {
                    if (s[C].nodeType === 1) {
                        h = k.grep(s[C].getElementsByTagName("script"), e);
                        s.splice.apply(s, [C + 1, 0].concat(h))
                    }
                    o.appendChild(s[C])
                }
            }
            return s
        },
        cleanData: function (e) {
            for (var h, o, q = k.cache, s = k.expando, u = k.event.special, C = k.support.deleteExpando, G = 0, I;
            (I = e[G]) != null; G++) if (!(I.nodeName && k.noData[I.nodeName.toLowerCase()])) if (o = I[k.expando]) {
                if ((h = q[o] && q[o][s]) && h.events) {
                    for (var K in h.events) u[K] ? k.event.remove(I, K) : k.removeEvent(I, K, h.handle);
                    h.handle && (h.handle.elem = null)
                }
                C ? delete I[k.expando] : I.removeAttribute && I.removeAttribute(k.expando);
                delete q[o]
            }
        }
    });
    var Kb = /alpha\([^)]*\)/i,
        Gb = /opacity=([^)]*)/,
        Cb = /([A-Z]|^ms)/g,
        yb = /^-?\d+(?:px)?$/i,
        qb = /^-?\d/,
        Lb = /^[+\-]=/,
        Mb = /[^+\-\.\de]+/g,
        y = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        m = ["Left", "Right"],
        V = ["Top", "Bottom"],
        aa, O, J;
    k.fn.css = function (e, h) {
        if (arguments.length === 2 && h === d) return this;
        return k.access(this, e, h, true, function (o, q, s) {
            return s !== d ? k.style(o, q, s) : k.css(o, q)
        })
    };
    k.extend({
        cssHooks: {
            opacity: {
                get: function (e, h) {
                    if (h) {
                        e = aa(e, "opacity", "opacity");
                        return e === "" ? "1" : e
                    }
                    return e.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": k.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, h, o, q) {
            if (e && e.nodeType !== 3 && e.nodeType !== 8 && e.style) {
                var s, u = k.camelCase(h),
                    C = e.style,
                    G = k.cssHooks[u];
                h = k.cssProps[u] || u;
                if (o === d) {
                    if (G && "get" in G && (s = G.get(e, false, q)) !== d) return s;
                    return C[h]
                }
                q = typeof o;
                if (!(q === "number" && isNaN(o) || o == null)) {
                    q === "string" && Lb.test(o) && (o = +o.replace(Mb, "") + parseFloat(k.css(e, h)), q = "number");
                    q === "number" && !k.cssNumber[u] && (o += "px");
                    if (!G || !("set" in G) || (o = G.set(e, o)) !== d) try {
                        C[h] = o
                    } catch (I) {}
                }
            }
        },
        css: function (e, h, o) {
            var q, s;
            h = k.camelCase(h);
            s = k.cssHooks[h];
            h = k.cssProps[h] || h;
            h === "cssFloat" && (h = "float");
            if (s && "get" in s && (q = s.get(e, true, o)) !== d) return q;
            if (aa) return aa(e, h)
        },
        swap: function (e, h, o) {
            var q = {};
            for (var s in h) {
                q[s] = e.style[s];
                e.style[s] = h[s]
            }
            o.call(e);
            for (s in h) e.style[s] = q[s]
        }
    });
    k.curCSS = k.css;
    k.each(["height", "width"], function (e, h) {
        k.cssHooks[h] = {
            get: function (o, q, s) {
                var u;
                if (q) {
                    if (o.offsetWidth !== 0) return x(o, h, s);
                    k.swap(o, y, function () {
                        u = x(o, h, s)
                    });
                    return u
                }
            },
            set: function (o, q) {
                if (!yb.test(q)) return q;
                q = parseFloat(q);
                if (q >= 0) return q + "px"
            }
        }
    });
    k.support.opacity || (k.cssHooks.opacity = {
        get: function (e, h) {
            return Gb.test((h && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : h ? "1" : ""
        },
        set: function (e, h) {
            var o = e.style;
            e = e.currentStyle;
            o.zoom = 1;
            h = k.isNaN(h) ? "" : "alpha(opacity=" + h * 100 + ")";
            e = e && e.filter || o.filter || "";
            o.filter = Kb.test(e) ? e.replace(Kb, h) : e + " " + h
        }
    });
    k(function () {
        k.support.reliableMarginRight || (k.cssHooks.marginRight = {
            get: function (e, h) {
                var o;
                k.swap(e, {
                    display: "inline-block"
                }, function () {
                    h ? (o = aa(e, "margin-right", "marginRight")) : (o = e.style.marginRight)
                });
                return o
            }
        })
    });
    ba.defaultView && ba.defaultView.getComputedStyle && (O = function (e, h) {
        var o, q;
        h = h.replace(Cb, "-$1").toLowerCase();
        if (!(q = e.ownerDocument.defaultView)) return d;
        if (q = q.getComputedStyle(e, null)) {
            o = q.getPropertyValue(h);
            o === "" && !k.contains(e.ownerDocument.documentElement, e) && (o = k.style(e, h))
        }
        return o
    });
    ba.documentElement.currentStyle && (J = function (e, h) {
        var o, q = e.currentStyle && e.currentStyle[h],
            s = e.runtimeStyle && e.runtimeStyle[h],
            u = e.style;
        !yb.test(q) && qb.test(q) && (o = u.left, s && (e.runtimeStyle.left = e.currentStyle.left), u.left = h === "fontSize" ? "1em" : q || 0, q = u.pixelLeft + "px", u.left = o, s && (e.runtimeStyle.left = s));
        return q === "" ? "auto" : q
    });
    aa = O || J;
    k.expr && k.expr.filters && (k.expr.filters.hidden = function (e) {
        var h = e.offsetHeight;
        return e.offsetWidth === 0 && h === 0 || !k.support.reliableHiddenOffsets && (e.style.display || k.css(e, "display")) === "none"
    }, k.expr.filters.visible = function (e) {
        return !k.expr.filters.hidden(e)
    });
    var R = /%20/g,
        ma = /\[\]$/,
        ya = /\r?\n/g,
        Ha = /#.*$/,
        Vb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dc = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        ec = /^(?:GET|HEAD)$/,
        fc = /^\/\//,
        Zb = /\?/,
        gc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        hc = /^(?:select|textarea)/i,
        Xb = /\s+/,
        ic = /([?&])_=[^&]*/,
        $b = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        ac = k.fn.load,
        Rb = {},
        bc = {},
        tb, ub;
    try {
        tb = db.href
    } catch (oc) {
        tb = ba.createElement("a");
        tb.href = "";
        tb = tb.href
    }
    ub = $b.exec(tb.toLowerCase()) || [];
    k.fn.extend({
        load: function (e, h, o) {
            if (typeof e != "string" && ac) return ac.apply(this, arguments);
            if (!this.length) return this;
            var q = e.indexOf(" ");
            if (q >= 0) {
                var s = e.slice(q, e.length);
                e = e.slice(0, q)
            }
            q = "GET";
            h && (k.isFunction(h) ? (o = h, h = d) : typeof h == "object" && (h = k.param(h, k.ajaxSettings.traditional), q = "POST"));
            var u = this;
            k.ajax({
                url: e,
                type: q,
                dataType: "html",
                data: h,
                complete: function (C, G, I) {
                    I = C.responseText;
                    C.isResolved() && (C.done(function (K) {
                        I = K
                    }), u.html(s ? k("<div>").append(I.replace(gc, "")).find(s) : I));
                    o && u.each(o, [I, G, C])
                }
            });
            return this
        },
        serialize: function () {
            return k.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? k.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || hc.test(this.nodeName) || dc.test(this.type))
            }).map(function (e, h) {
                e = k(this).val();
                return e == null ? null : k.isArray(e) ? k.map(e, function (o) {
                    return {
                        name: h.name,
                        value: o.replace(ya, "\r\n")
                    }
                }) : {
                    name: h.name,
                    value: e.replace(ya, "\r\n")
                }
            }).get()
        }
    });
    k.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, h) {
        k.fn[h] = function (o) {
            return this.bind(h, o)
        }
    });
    k.each(["get", "post"], function (e, h) {
        k[h] = function (o, q, s, u) {
            k.isFunction(q) && (u = u || s, s = q, q = d);
            return k.ajax({
                type: h,
                url: o,
                data: q,
                success: s,
                dataType: u
            })
        }
    });
    k.extend({
        getScript: function (e, h) {
            return k.get(e, d, h, "script")
        },
        getJSON: function (e, h, o) {
            return k.get(e, h, o, "json")
        },
        ajaxSetup: function (e, h) {
            h ? k.extend(true, e, k.ajaxSettings, h) : (h = e, e = k.extend(true, k.ajaxSettings, h));
            for (var o in {
                context: 1,
                url: 1
            }) o in h ? (e[o] = h[o]) : o in k.ajaxSettings && (e[o] = k.ajaxSettings[o]);
            return e
        },
        ajaxSettings: {
            url: tb,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|widget):$/.test(ub[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": "*/*"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": b.String,
                "text html": true,
                "text json": k.parseJSON,
                "text xml": k.parseXML
            }
        },
        ajaxPrefilter: r(Rb),
        ajaxTransport: r(bc),
        ajax: function (e, h) {
            function o(N, Q, Z, ga) {
                if (Ua !== 2) {
                    Ua = 2;
                    fb && clearTimeout(fb);
                    Aa = d;
                    qa = ga || "";
                    D.readyState = N ? 4 : 0;
                    var da, va, Na;
                    Z = Z ? w(q, D, Z) : d;
                    if (N >= 200 && N < 300 || N === 304) {
                        if (q.ifModified) {
                            if (ga = D.getResponseHeader("Last-Modified")) k.lastModified[K] = ga;
                            if (ga = D.getResponseHeader("Etag")) k.etag[K] = ga
                        }
                        if (N === 304) {
                            Q = "notmodified";
                            da = true
                        } else try {
                            va = p(q, Z);
                            Q = "success";
                            da = true
                        } catch (Oa) {
                            Q = "parsererror";
                            Na = Oa
                        }
                    } else {
                        Na = Q;
                        if (!Q || N) {
                            Q = "error";
                            N < 0 && (N = 0)
                        }
                    }
                    D.status = N;
                    D.statusText = Q;
                    da ? C.resolveWith(s, [va, Q, D]) : C.rejectWith(s, [D, Q, Na]);
                    D.statusCode(I);
                    I = d;
                    lb && u.trigger("ajax" + (da ? "Success" : "Error"), [D, q, da ? va : Na]);
                    G.resolveWith(s, [D, Q]);
                    lb && (u.trigger("ajaxComplete", [D, q]), --k.active || k.event.trigger("ajaxStop"))
                }
            }
            typeof e == "object" && (h = e, e = d);
            h = h || {};
            var q = k.ajaxSetup({}, h),
                s = q.context || q,
                u = s !== q && (s.nodeType || s instanceof k) ? k(s) : k.event,
                C = k.Deferred(),
                G = k._Deferred(),
                I = q.statusCode || {},
                K, U = {},
                na = {},
                qa, pa, Aa, fb, Ta, Ua = 0,
                lb, A, D = {
                    readyState: 0,
                    setRequestHeader: function (N, Q) {
                        if (!Ua) {
                            var Z = N.toLowerCase();
                            N = na[Z] = na[Z] || N;
                            U[N] = Q
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return Ua === 2 ? qa : null
                    },
                    getResponseHeader: function (N) {
                        var Q;
                        if (Ua === 2) {
                            if (!pa) for (pa = {}; Q = Vb.exec(qa);) pa[Q[1].toLowerCase()] = Q[2];
                            Q = pa[N.toLowerCase()]
                        }
                        return Q === d ? null : Q
                    },
                    overrideMimeType: function (N) {
                        Ua || (q.mimeType = N);
                        return this
                    },
                    abort: function (N) {
                        N = N || "abort";
                        Aa && Aa.abort(N);
                        o(0, N);
                        return this
                    }
                };
            C.promise(D);
            D.success = D.done;
            D.error = D.fail;
            D.complete = G.done;
            D.statusCode = function (N) {
                if (N) {
                    var Q;
                    if (Ua < 2) for (Q in N) I[Q] = [I[Q], N[Q]];
                    else {
                        Q = N[D.status];
                        D.then(Q, Q)
                    }
                }
                return this
            };
            q.url = ((e || q.url) + "").replace(Ha, "").replace(fc, ub[1] + "//");
            q.dataTypes = k.trim(q.dataType || "*").toLowerCase().split(Xb);
            q.crossDomain == null && (Ta = $b.exec(q.url.toLowerCase()), q.crossDomain = !(!Ta || Ta[1] == ub[1] && Ta[2] == ub[2] && (Ta[3] || (Ta[1] === "http:" ? 80 : 443)) == (ub[3] || (ub[1] === "http:" ? 80 : 443))));
            q.data && q.processData && typeof q.data != "string" && (q.data = k.param(q.data, q.traditional));
            z(Rb, q, h, D);
            if (Ua === 2) return false;
            lb = q.global;
            q.type = q.type.toUpperCase();
            q.hasContent = !ec.test(q.type);
            lb && k.active++ === 0 && k.event.trigger("ajaxStart");
            if (!q.hasContent) {
                q.data && (q.url += (Zb.test(q.url) ? "&" : "?") + q.data);
                K = q.url;
                if (q.cache === false) {
                    e = k.now();
                    Ta = q.url.replace(ic, "$1_=" + e);
                    q.url = Ta + (Ta === q.url ? (Zb.test(q.url) ? "&" : "?") + "_=" + e : "")
                }
            }(q.data && q.hasContent && q.contentType !== false || h.contentType) && D.setRequestHeader("Content-Type", q.contentType);
            q.ifModified && (K = K || q.url, k.lastModified[K] && D.setRequestHeader("If-Modified-Since", k.lastModified[K]), k.etag[K] && D.setRequestHeader("If-None-Match", k.etag[K]));
            D.setRequestHeader("Accept", q.dataTypes[0] && q.accepts[q.dataTypes[0]] ? q.accepts[q.dataTypes[0]] + (q.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : q.accepts["*"]);
            for (A in q.headers) D.setRequestHeader(A, q.headers[A]);
            if (q.beforeSend && (q.beforeSend.call(s, D, q) === false || Ua === 2)) {
                D.abort();
                return false
            }
            for (A in {
                success: 1,
                error: 1,
                complete: 1
            }) D[A](q[A]);
            if (Aa = z(bc, q, h, D)) {
                D.readyState = 1;
                lb && u.trigger("ajaxSend", [D, q]);
                q.async && q.timeout > 0 && (fb = setTimeout(function () {
                    D.abort("timeout")
                }, q.timeout));
                try {
                    Ua = 1;
                    Aa.send(U, o)
                } catch (L) {
                    status < 2 ? o(-1, L) : k.error(L)
                }
            } else o(-1, "No Transport");
            return D
        },
        param: function (e, h) {
            var o = [],
                q = function (u, C) {
                    C = k.isFunction(C) ? C() : C;
                    o[o.length] = encodeURIComponent(u) + "=" + encodeURIComponent(C)
                };
            h === d && (h = k.ajaxSettings.traditional);
            if (k.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, function () {
                q(this.name, this.value)
            });
            else for (var s in e) B(s, e[s], h, q);
            return o.join("&").replace(R, "+")
        }
    });
    k.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var jc = k.now(),
        Ob = /(\=)\?(&|$)|\?\?/i;
    k.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return k.expando + "_" + jc++
        }
    });
    k.ajaxPrefilter("json jsonp", function (e, h, o) {
        h = e.contentType === "application/x-www-form-urlencoded" && typeof e.data == "string";
        if (e.dataTypes[0] === "jsonp" || e.jsonp !== false && (Ob.test(e.url) || h && Ob.test(e.data))) {
            var q, s = e.jsonpCallback = k.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                u = b[s],
                C = e.url,
                G = e.data,
                I = "$1" + s + "$2";
            e.jsonp !== false && (C = C.replace(Ob, I), e.url === C && (h && (G = G.replace(Ob, I)), e.data === G && (C += (/\?/.test(C) ? "&" : "?") + e.jsonp + "=" + s)));
            e.url = C;
            e.data = G;
            b[s] = function (K) {
                q = [K]
            };
            o.always(function () {
                b[s] = u;
                q && k.isFunction(u) && b[s](q[0])
            });
            e.converters["script json"] = function () {
                q || k.error(s + " was not called");
                return q[0]
            };
            e.dataTypes[0] = "json";
            return "script"
        }
    });
    k.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                k.globalEval(e);
                return e
            }
        }
    });
    k.ajaxPrefilter("script", function (e) {
        e.cache === d && (e.cache = false);
        e.crossDomain && (e.type = "GET", e.global = false)
    });
    k.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var h, o = ba.head || ba.getElementsByTagName("head")[0] || ba.documentElement;
            return {
                send: function (q, s) {
                    h = ba.createElement("script");
                    h.async = "async";
                    e.scriptCharset && (h.charset = e.scriptCharset);
                    h.src = e.url;
                    h.onload = h.onreadystatechange = function (u, C) {
                        if (C || !h.readyState || /loaded|complete/.test(h.readyState)) {
                            h.onload = h.onreadystatechange = null;
                            o && h.parentNode && o.removeChild(h);
                            h = d;
                            C || s(200, "success")
                        }
                    };
                    o.insertBefore(h, o.firstChild)
                },
                abort: function () {
                    h && h.onload(0, 1)
                }
            }
        }
    });
    var Tb = b.ActiveXObject ?
    function () {
        for (var e in Ab) Ab[e](0, 1)
    } : false, kc = 0, Ab;
    k.ajaxSettings.xhr = b.ActiveXObject ?
    function () {
        return !this.isLocal && l() || c()
    } : l;
    (function (e) {
        k.extend(k.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        })
    })(k.ajaxSettings.xhr());
    k.support.ajax && k.ajaxTransport(function (e) {
        if (!e.crossDomain || k.support.cors) {
            var h;
            return {
                send: function (o, q) {
                    var s = e.xhr(),
                        u, C;
                    e.username ? s.open(e.type, e.url, e.async, e.username, e.password) : s.open(e.type, e.url, e.async);
                    if (e.xhrFields) for (C in e.xhrFields) s[C] = e.xhrFields[C];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType);
                    !e.crossDomain && !o["X-Requested-With"] && (o["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (C in o) s.setRequestHeader(C, o[C])
                    } catch (G) {}
                    s.send(e.hasContent && e.data || null);
                    h = function (I, K) {
                        var U, na, qa, pa, Aa;
                        try {
                            if (h && (K || s.readyState === 4)) {
                                h = d;
                                u && (s.onreadystatechange = k.noop, Tb && delete Ab[u]);
                                if (K) s.readyState !== 4 && s.abort();
                                else {
                                    U = s.status;
                                    qa = s.getAllResponseHeaders();
                                    pa = {};
                                    (Aa = s.responseXML) && Aa.documentElement && (pa.xml = Aa);
                                    pa.text = s.responseText;
                                    try {
                                        na = s.statusText
                                    } catch (fb) {
                                        na = ""
                                    }!U && e.isLocal && !e.crossDomain ? (U = pa.text ? 200 : 404) : U === 1223 && (U = 204)
                                }
                            }
                        } catch (Ta) {
                            K || q(-1, Ta)
                        }
                        pa && q(U, na, pa, qa)
                    };
                    !e.async || s.readyState === 4 ? h() : (u = ++kc, Tb && (Ab || (Ab = {}, k(b).unload(Tb)), Ab[u] = h), s.onreadystatechange = h)
                },
                abort: function () {
                    h && h(0, 1)
                }
            }
        }
    });
    var Qb = {},
        kb, zb, lc = /^(?:toggle|show|hide)$/,
        mc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        Bb, Wb = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        Nb, Ub = b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame;
    k.fn.extend({
        show: function (e, h, o) {
            var q;
            if (e || e === 0) return this.animate(i("show", 3), e, h, o);
            h = 0;
            for (o = this.length; h < o; h++) {
                e = this[h];
                e.style && (q = e.style.display, !k._data(e, "olddisplay") && q === "none" && (q = e.style.display = ""), q === "" && k.css(e, "display") === "none" && k._data(e, "olddisplay", g(e.nodeName)))
            }
            for (h = 0; h < o; h++) {
                e = this[h];
                if (e.style) {
                    q = e.style.display;
                    if (q === "" || q === "none") e.style.display = k._data(e, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (e, h, o) {
            if (e || e === 0) return this.animate(i("hide", 3), e, h, o);
            e = 0;
            for (h = this.length; e < h; e++) if (this[e].style) {
                o = k.css(this[e], "display");
                o !== "none" && !k._data(this[e], "olddisplay") && k._data(this[e], "olddisplay", o)
            }
            for (e = 0; e < h; e++) this[e].style && (this[e].style.display = "none");
            return this
        },
        _toggle: k.fn.toggle,
        toggle: function (e, h, o) {
            var q = typeof e == "boolean";
            k.isFunction(e) && k.isFunction(h) ? this._toggle.apply(this, arguments) : e == null || q ? this.each(function () {
                var s = q ? e : k(this).is(":hidden");
                k(this)[s ? "show" : "hide"]()
            }) : this.animate(i("toggle", 3), e, h, o);
            return this
        },
        fadeTo: function (e, h, o, q) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: h
            }, e, o, q)
        },
        animate: function (e, h, o, q) {
            var s = k.speed(h, o, q);
            if (k.isEmptyObject(e)) return this.each(s.complete, [false]);
            e = k.extend({}, e);
            return this[s.queue === false ? "each" : "queue"](function () {
                s.queue === false && k._mark(this);
                var u = k.extend({}, s),
                    C = this.nodeType === 1,
                    G = C && k(this).is(":hidden"),
                    I, K, U, na, qa, pa, Aa, fb;
                u.animatedProperties = {};
                for (U in e) {
                    I = k.camelCase(U);
                    U !== I && (e[I] = e[U], delete e[U]);
                    K = e[I];
                    k.isArray(K) ? (u.animatedProperties[I] = K[1], K = e[I] = K[0]) : (u.animatedProperties[I] = u.specialEasing && u.specialEasing[I] || u.easing || "swing");
                    if (K === "hide" && G || K === "show" && !G) return u.complete.call(this);
                    C && (I === "height" || I === "width") && (u.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], k.css(this, "display") === "inline" && k.css(this, "float") === "none" && (k.support.inlineBlockNeedsLayout ? (na = g(this.nodeName), na === "inline" ? (this.style.display = "inline-block") : (this.style.display = "inline", this.style.zoom = 1)) : (this.style.display = "inline-block")))
                }
                u.overflow != null && (this.style.overflow = "hidden");
                for (U in e) {
                    C = new k.fx(this, u, U);
                    K = e[U];
                    lc.test(K) ? C[K === "toggle" ? G ? "show" : "hide" : K]() : (qa = mc.exec(K), pa = C.cur(), qa ? (Aa = parseFloat(qa[2]), fb = qa[3] || (k.cssNumber[U] ? "" : "px"), fb !== "px" && (k.style(this, U, (Aa || 1) + fb), pa = (Aa || 1) / C.cur() * pa, k.style(this, U, pa + fb)), qa[1] && (Aa = (qa[1] === "-=" ? -1 : 1) * Aa + pa), C.custom(pa, Aa, fb)) : C.custom(pa, K, ""))
                }
                return true
            })
        },
        stop: function (e, h) {
            e && this.queue([]);
            this.each(function () {
                var o = k.timers,
                    q = o.length;
                for (h || k._unmark(true, this); q--;) o[q].elem === this && (h && o[q](true), o.splice(q, 1))
            });
            h || this.dequeue();
            return this
        }
    });
    k.each({
        slideDown: i("show", 1),
        slideUp: i("hide", 1),
        slideToggle: i("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, h) {
        k.fn[e] = function (o, q, s) {
            return this.animate(h, o, q, s)
        }
    });
    k.extend({
        speed: function (e, h, o) {
            var q = e && typeof e == "object" ? k.extend({}, e) : {
                complete: o || !o && h || k.isFunction(e) && e,
                duration: e,
                easing: o && h || h && !k.isFunction(h) && h
            };
            q.duration = k.fx.off ? 0 : typeof q.duration == "number" ? q.duration : q.duration in k.fx.speeds ? k.fx.speeds[q.duration] : k.fx.speeds._default;
            q.old = q.complete;
            q.complete = function (s) {
                k.isFunction(q.old) && q.old.call(this);
                q.queue !== false ? k.dequeue(this) : s !== false && k._unmark(this)
            };
            return q
        },
        easing: {
            linear: function (e, h, o, q) {
                return o + q * e
            },
            swing: function (e, h, o, q) {
                return (-Math.cos(e * Math.PI) / 2 + 0.5) * q + o
            }
        },
        timers: [],
        fx: function (e, h, o) {
            this.options = h;
            this.elem = e;
            this.prop = o;
            h.orig = h.orig || {}
        }
    });
    k.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (k.fx.step[this.prop] || k.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var e, h = k.css(this.elem, this.prop);
            return isNaN(e = parseFloat(h)) ? !h || h === "auto" ? 0 : h : e
        },
        custom: function (e, h, o) {
            function q(G) {
                return s.step(G)
            }
            var s = this,
                u = k.fx,
                C;
            this.startTime = Nb || n();
            this.start = e;
            this.end = h;
            this.unit = o || this.unit || (k.cssNumber[this.prop] ? "" : "px");
            this.now = this.start;
            this.pos = this.state = 0;
            q.elem = this.elem;
            q() && k.timers.push(q) && !Bb && (Ub ? (Bb = true, C = function () {
                Bb && (Ub(C), u.tick())
            }, Ub(C)) : (Bb = setInterval(u.tick, u.interval)))
        },
        show: function () {
            this.options.orig[this.prop] = k.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            k(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = k.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function (e) {
            var h = Nb || n(),
                o = true,
                q = this.elem,
                s = this.options,
                u, C;
            if (e || h >= s.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                s.animatedProperties[this.prop] = true;
                for (u in s.animatedProperties) s.animatedProperties[u] !== true && (o = false);
                if (o) {
                    s.overflow != null && !k.support.shrinkWrapBlocks && k.each(["", "X", "Y"], function (I, K) {
                        q.style["overflow" + K] = s.overflow[I]
                    });
                    s.hide && k(q).hide();
                    if (s.hide || s.show) for (var G in s.animatedProperties) k.style(q, G, s.orig[G]);
                    s.complete.call(q)
                }
                return false
            }
            s.duration == Infinity ? (this.now = h) : (C = h - this.startTime, this.state = C / s.duration, this.pos = k.easing[s.animatedProperties[this.prop]](this.state, C, 0, 1, s.duration), this.now = this.start + (this.end - this.start) * this.pos);
            this.update();
            return true
        }
    };
    k.extend(k.fx, {
        tick: function () {
            for (var e = k.timers, h = 0; h < e.length; ++h) e[h]() || e.splice(h--, 1);
            e.length || k.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(Bb);
            Bb = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (e) {
                k.style(e.elem, "opacity", e.now)
            },
            _default: function (e) {
                e.elem.style && e.elem.style[e.prop] != null ? (e.elem.style[e.prop] = (e.prop === "width" || e.prop === "height" ? Math.max(0, e.now) : e.now) + e.unit) : (e.elem[e.prop] = e.now)
            }
        }
    });
    k.expr && k.expr.filters && (k.expr.filters.animated = function (e) {
        return k.grep(k.timers, function (h) {
            return e === h.elem
        }).length
    });
    var nc = /^t(?:able|d|h)$/i,
        cc = /^(?:body|html)$/i;
    "getBoundingClientRect" in ba.documentElement ? (k.fn.offset = function (e) {
        var h = this[0],
            o;
        if (e) return this.each(function (C) {
            k.offset.setOffset(this, e, C)
        });
        if (!h || !h.ownerDocument) return null;
        if (h === h.ownerDocument.body) return k.offset.bodyOffset(h);
        try {
            o = h.getBoundingClientRect()
        } catch (q) {}
        var s = h.ownerDocument,
            u = s.documentElement;
        if (!o || !k.contains(u, h)) return o ? {
            top: o.top,
            left: o.left
        } : {
            top: 0,
            left: 0
        };
        h = s.body;
        s = f(s);
        return {
            top: o.top + (s.pageYOffset || k.support.boxModel && u.scrollTop || h.scrollTop) - (u.clientTop || h.clientTop || 0),
            left: o.left + (s.pageXOffset || k.support.boxModel && u.scrollLeft || h.scrollLeft) - (u.clientLeft || h.clientLeft || 0)
        }
    }) : (k.fn.offset = function (e) {
        var h = this[0];
        if (e) return this.each(function (U) {
            k.offset.setOffset(this, e, U)
        });
        if (!h || !h.ownerDocument) return null;
        if (h === h.ownerDocument.body) return k.offset.bodyOffset(h);
        k.offset.initialize();
        var o, q = h.offsetParent,
            s = h,
            u = h.ownerDocument,
            C = u.documentElement,
            G = u.body;
        o = (u = u.defaultView) ? u.getComputedStyle(h, null) : h.currentStyle;
        for (var I = h.offsetTop, K = h.offsetLeft;
        (h = h.parentNode) && h !== G && h !== C;) {
            if (k.offset.supportsFixedPosition && o.position === "fixed") break;
            o = u ? u.getComputedStyle(h, null) : h.currentStyle;
            I -= h.scrollTop;
            K -= h.scrollLeft;
            h === q && (I += h.offsetTop, K += h.offsetLeft, k.offset.doesNotAddBorder && (!k.offset.doesAddBorderForTableAndCells || !nc.test(h.nodeName)) && (I += parseFloat(o.borderTopWidth) || 0, K += parseFloat(o.borderLeftWidth) || 0), s = q, q = h.offsetParent);
            k.offset.subtractsBorderForOverflowNotVisible && o.overflow !== "visible" && (I += parseFloat(o.borderTopWidth) || 0, K += parseFloat(o.borderLeftWidth) || 0);
            o = o
        }
        if (o.position === "relative" || o.position === "static") {
            I += G.offsetTop;
            K += G.offsetLeft
        }
        k.offset.supportsFixedPosition && o.position === "fixed" && (I += Math.max(C.scrollTop, G.scrollTop), K += Math.max(C.scrollLeft, G.scrollLeft));
        return {
            top: I,
            left: K
        }
    });
    k.offset = {
        initialize: function () {
            var e = ba.body,
                h = ba.createElement("div"),
                o, q, s, u = parseFloat(k.css(e, "marginTop")) || 0;
            k.extend(h.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            h.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            e.insertBefore(h, e.firstChild);
            o = h.firstChild;
            q = o.firstChild;
            s = o.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = q.offsetTop !== 5;
            this.doesAddBorderForTableAndCells = s.offsetTop === 5;
            q.style.position = "fixed";
            q.style.top = "20px";
            this.supportsFixedPosition = q.offsetTop === 20 || q.offsetTop === 15;
            q.style.position = q.style.top = "";
            o.style.overflow = "hidden";
            o.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = q.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = e.offsetTop !== u;
            e.removeChild(h);
            k.offset.initialize = k.noop
        },
        bodyOffset: function (e) {
            var h = e.offsetTop,
                o = e.offsetLeft;
            k.offset.initialize();
            k.offset.doesNotIncludeMarginInBodyOffset && (h += parseFloat(k.css(e, "marginTop")) || 0, o += parseFloat(k.css(e, "marginLeft")) || 0);
            return {
                top: h,
                left: o
            }
        },
        setOffset: function (e, h, o) {
            var q = k.css(e, "position");
            q === "static" && (e.style.position = "relative");
            var s = k(e),
                u = s.offset(),
                C = k.css(e, "top"),
                G = k.css(e, "left"),
                I = {},
                K = {},
                U, na;
            (q === "absolute" || q === "fixed") && k.inArray("auto", [C, G]) > -1 ? (K = s.position(), U = K.top, na = K.left) : (U = parseFloat(C) || 0, na = parseFloat(G) || 0);
            k.isFunction(h) && (h = h.call(e, o, u));
            h.top != null && (I.top = h.top - u.top + U);
            h.left != null && (I.left = h.left - u.left + na);
            "using" in h ? h.using.call(e, I) : s.css(I)
        }
    };
    k.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var e = this[0],
                h = this.offsetParent(),
                o = this.offset(),
                q = cc.test(h[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : h.offset();
            o.top -= parseFloat(k.css(e, "marginTop")) || 0;
            o.left -= parseFloat(k.css(e, "marginLeft")) || 0;
            q.top += parseFloat(k.css(h[0], "borderTopWidth")) || 0;
            q.left += parseFloat(k.css(h[0], "borderLeftWidth")) || 0;
            return {
                top: o.top - q.top,
                left: o.left - q.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || ba.body; e && !cc.test(e.nodeName) && k.css(e, "position") === "static";) e = e.offsetParent;
                return e
            })
        }
    });
    k.each(["Left", "Top"], function (e, h) {
        var o = "scroll" + h;
        k.fn[o] = function (q) {
            var s, u;
            if (q === d) {
                s = this[0];
                if (!s) return null;
                return (u = f(s)) ? "pageXOffset" in u ? u[e ? "pageYOffset" : "pageXOffset"] : k.support.boxModel && u.document.documentElement[o] || u.document.body[o] : s[o]
            }
            return this.each(function () {
                (u = f(this)) ? u.scrollTo(e ? k(u).scrollLeft() : q, e ? q : k(u).scrollTop()) : (this[o] = q)
            })
        }
    });
    k.each(["Height", "Width"], function (e, h) {
        var o = h.toLowerCase();
        k.fn["inner" + h] = function () {
            var q = this[0];
            return q && q.style ? parseFloat(k.css(q, o, "padding")) : null
        };
        k.fn["outer" + h] = function (q) {
            var s = this[0];
            return s && s.style ? parseFloat(k.css(s, o, q ? "margin" : "border")) : null
        };
        k.fn[o] = function (q) {
            var s = this[0];
            if (!s) return q == null ? null : this;
            if (k.isFunction(q)) return this.each(function (C) {
                var G = k(this);
                G[o](q.call(this, C, G[o]()))
            });
            if (k.isWindow(s)) {
                var u = s.document.documentElement["client" + h];
                return s.document.compatMode === "CSS1Compat" && u || s.document.body["client" + h] || u
            }
            if (s.nodeType === 9) return Math.max(s.documentElement["client" + h], s.body["scroll" + h], s.documentElement["scroll" + h], s.body["offset" + h], s.documentElement["offset" + h]);
            if (q === d) {
                s = k.css(s, o);
                u = parseFloat(s);
                return k.isNaN(u) ? s : u
            }
            return this.css(o, typeof q == "string" ? q : q + "px")
        }
    });
    b.jQuery = b.$ = k
})(window);
(function (b, d) {
    function f(i, j) {
        var n = i.nodeName.toLowerCase();
        if ("area" === n) {
            j = i.parentNode;
            n = j.name;
            if (!i.href || !n || j.nodeName.toLowerCase() !== "map") return false;
            i = b("img[usemap=#" + n + "]")[0];
            return !!i && g(i)
        }
        return (/input|select|textarea|button|object/.test(n) ? !i.disabled : "a" == n ? i.href || j : j) && g(i)
    }
    function g(i) {
        return !b(i).parents().andSelf().filter(function () {
            return b.curCSS(this, "visibility") === "hidden" || b.expr.filters.hidden(this)
        }).length
    }
    b.ui = b.ui || {};
    if (!b.ui.version) {
        b.extend(b.ui, {
            version: "1.8.14",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        b.fn.extend({
            _focus: b.fn.focus,
            focus: function (i, j) {
                return typeof i === "number" ? this.each(function () {
                    var n = this;
                    setTimeout(function () {
                        b(n).focus();
                        j && j.call(n)
                    }, i)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var i;
                i = b.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(b.curCSS(this, "position", 1)) && /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !i.length ? b(document) : i
            },
            zIndex: function (i) {
                if (i !== d) return this.css("zIndex", i);
                if (this.length) {
                    i = b(this[0]);
                    for (var j; i.length && i[0] !== document;) {
                        j = i.css("position");
                        if (j === "absolute" || j === "relative" || j === "fixed") {
                            j = parseInt(i.css("zIndex"), 10);
                            if (!isNaN(j) && j !== 0) return j
                        }
                        i = i.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (i) {
                    i.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        b.each(["Width", "Height"], function (i, j) {
            function n(w, B, z, r) {
                b.each(c, function () {
                    B -= parseFloat(b.curCSS(w, "padding" + this, true)) || 0;
                    if (z) B -= parseFloat(b.curCSS(w, "border" + this + "Width", true)) || 0;
                    if (r) B -= parseFloat(b.curCSS(w, "margin" + this, true)) || 0
                });
                return B
            }
            var c = j === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                l = j.toLowerCase(),
                p = {
                    innerWidth: b.fn.innerWidth,
                    innerHeight: b.fn.innerHeight,
                    outerWidth: b.fn.outerWidth,
                    outerHeight: b.fn.outerHeight
                };
            b.fn["inner" + j] = function (w) {
                if (w === d) return p["inner" + j].call(this);
                return this.each(function () {
                    b(this).css(l, n(this, w) + "px")
                })
            };
            b.fn["outer" + j] = function (w, B) {
                if (typeof w !== "number") return p["outer" + j].call(this, w);
                return this.each(function () {
                    b(this).css(l, n(this, w, true, B) + "px")
                })
            }
        });
        b.extend(b.expr[":"], {
            data: function (i, j, n) {
                return !!b.data(i, n[3])
            },
            focusable: function (i) {
                return f(i, !isNaN(b.attr(i, "tabindex")))
            },
            tabbable: function (i) {
                var j = b.attr(i, "tabindex"),
                    n = isNaN(j);
                return (n || j >= 0) && f(i, !n)
            }
        });
        b(function () {
            var i = document.body,
                j = i.appendChild(j = document.createElement("div"));
            b.extend(j.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            b.support.minHeight = j.offsetHeight === 100;
            b.support.selectstart = "onselectstart" in j;
            i.removeChild(j).style.display = "none"
        });
        b.extend(b.ui, {
            plugin: {
                add: function (i, j, n) {
                    i = b.ui[i].prototype;
                    for (var c in n) {
                        i.plugins[c] = i.plugins[c] || [];
                        i.plugins[c].push([j, n[c]])
                    }
                },
                call: function (i, j, n) {
                    if ((j = i.plugins[j]) && i.element[0].parentNode) for (var c = 0; c < j.length; c++) i.options[j[c][0]] && j[c][1].apply(i.element, n)
                }
            },
            contains: function (i, j) {
                return document.compareDocumentPosition ? i.compareDocumentPosition(j) & 16 : i !== j && i.contains(j)
            },
            hasScroll: function (i, j) {
                if (b(i).css("overflow") === "hidden") return false;
                j = j && j === "left" ? "scrollLeft" : "scrollTop";
                var n = false;
                if (i[j] > 0) return true;
                i[j] = 1;
                n = i[j] > 0;
                i[j] = 0;
                return n
            },
            isOverAxis: function (i, j, n) {
                return i > j && i < j + n
            },
            isOver: function (i, j, n, c, l, p) {
                return b.ui.isOverAxis(i, n, l) && b.ui.isOverAxis(j, c, p)
            }
        })
    }
})(jQuery);
(function (b, d) {
    if (b.cleanData) {
        var f = b.cleanData;
        b.cleanData = function (i) {
            for (var j = 0, n;
            (n = i[j]) != null; j++) b(n).triggerHandler("remove");
            f(i)
        }
    } else {
        var g = b.fn.remove;
        b.fn.remove = function (i, j) {
            return this.each(function () {
                if (!j) if (!i || b.filter(i, [this]).length) b("*", this).add([this]).each(function () {
                    b(this).triggerHandler("remove")
                });
                return g.call(b(this), i, j)
            })
        }
    }
    b.widget = function (i, j, n) {
        var c = i.split(".")[0],
            l;
        i = i.split(".")[1];
        l = c + "-" + i;
        if (!n) {
            n = j;
            j = b.Widget
        }
        b.expr[":"][l] = function (p) {
            return !!b.data(p, i)
        };
        b[c] = b[c] || {};
        b[c][i] = function (p, w) {
            arguments.length && this._createWidget(p, w)
        };
        j = new j;
        j.options = b.extend(true, {}, j.options);
        b[c][i].prototype = b.extend(true, j, {
            namespace: c,
            widgetName: i,
            widgetEventPrefix: b[c][i].prototype.widgetEventPrefix || i,
            widgetBaseClass: l
        }, n);
        b.widget.bridge(i, b[c][i])
    };
    b.widget.bridge = function (i, j) {
        b.fn[i] = function (n) {
            var c = typeof n === "string",
                l = Array.prototype.slice.call(arguments, 1),
                p = this;
            n = !c && l.length ? b.extend.apply(null, [true, n].concat(l)) : n;
            if (c && n.charAt(0) === "_") return p;
            c ? this.each(function () {
                var w = b.data(this, i),
                    B = w && b.isFunction(w[n]) ? w[n].apply(w, l) : w;
                if (B !== w && B !== d) {
                    p = B;
                    return false
                }
            }) : this.each(function () {
                var w = b.data(this, i);
                w ? w.option(n || {})._init() : b.data(this, i, new j(n, this))
            });
            return p
        }
    };
    b.Widget = function (i, j) {
        arguments.length && this._createWidget(i, j)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (i, j) {
            b.data(j, this.widgetName, this);
            this.element = b(j);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), i);
            var n = this;
            this.element.bind("remove." + this.widgetName, function () {
                n.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (i, j) {
            var n = i;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof i === "string") {
                if (j === d) return this.options[i];
                n = {};
                n[i] = j
            }
            this._setOptions(n);
            return this
        },
        _setOptions: function (i) {
            var j = this;
            b.each(i, function (n, c) {
                j._setOption(n, c)
            });
            return this
        },
        _setOption: function (i, j) {
            this.options[i] = j;
            if (i === "disabled") this.widget()[j ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", j);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (i, j, n) {
            var c = this.options[i];
            j = b.Event(j);
            j.type = (i === this.widgetEventPrefix ? i : this.widgetEventPrefix + i).toLowerCase();
            n = n || {};
            if (j.originalEvent) {
                i = b.event.props.length;
                for (var l; i;) {
                    l = b.event.props[--i];
                    j[l] = j.originalEvent[l]
                }
            }
            this.element.trigger(j, n);
            return !(b.isFunction(c) && c.call(this.element[0], j, n) === false || j.isDefaultPrevented())
        }
    }
})(jQuery);
(function (b) {
    var d = false;
    b(document).mousedown(function () {
        d = false
    });
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var f = this;
            this.element.bind("mousedown." + this.widgetName, function (g) {
                return f._mouseDown(g)
            }).bind("click." + this.widgetName, function (g) {
                if (true === b.data(g.target, f.widgetName + ".preventClickEvent")) {
                    b.removeData(g.target, f.widgetName + ".preventClickEvent");
                    g.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (f) {
            if (!d) {
                this._mouseStarted && this._mouseUp(f);
                this._mouseDownEvent = f;
                var g = this,
                    i = f.which == 1,
                    j = typeof this.options.cancel == "string" ? b(f.target).closest(this.options.cancel).length : false;
                if (!i || j || !this._mouseCapture(f)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                    g.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(f) && this._mouseDelayMet(f)) {
                    this._mouseStarted = this._mouseStart(f) !== false;
                    if (!this._mouseStarted) {
                        f.preventDefault();
                        return true
                    }
                }
                true === b.data(f.target, this.widgetName + ".preventClickEvent") && b.removeData(f.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (n) {
                    return g._mouseMove(n)
                };
                this._mouseUpDelegate = function (n) {
                    return g._mouseUp(n)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                f.preventDefault();
                return d = true
            }
        },
        _mouseMove: function (f) {
            if (b.browser.msie && !(document.documentMode >= 9) && !f.button) return this._mouseUp(f);
            if (this._mouseStarted) {
                this._mouseDrag(f);
                return f.preventDefault()
            }
            if (this._mouseDistanceMet(f) && this._mouseDelayMet(f))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, f) !== false) ? this._mouseDrag(f) : this._mouseUp(f);
            return !this._mouseStarted
        },
        _mouseUp: function (f) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                f.target == this._mouseDownEvent.target && b.data(f.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(f)
            }
            return false
        },
        _mouseDistanceMet: function (f) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - f.pageX), Math.abs(this._mouseDownEvent.pageY - f.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (b) {
    b.ui = b.ui || {};
    var d = /left|center|right/,
        f = /top|center|bottom/,
        g = b.fn.position,
        i = b.fn.offset;
    b.fn.position = function (j) {
        if (!j || !j.of) return g.apply(this, arguments);
        j = b.extend({}, j);
        var n = b(j.of),
            c = n[0],
            l = (j.collision || "flip").split(" "),
            p = j.offset ? j.offset.split(" ") : [0, 0],
            w, B, z;
        if (c.nodeType === 9) {
            w = n.width();
            B = n.height();
            z = {
                top: 0,
                left: 0
            }
        } else if (c.setTimeout) {
            w = n.width();
            B = n.height();
            z = {
                top: n.scrollTop(),
                left: n.scrollLeft()
            }
        } else if (c.preventDefault) {
            j.at = "left top";
            w = B = 0;
            z = {
                top: j.of.pageY,
                left: j.of.pageX
            }
        } else {
            w = n.outerWidth();
            B = n.outerHeight();
            z = n.offset()
        }
        b.each(["my", "at"], function () {
            var r = (j[this] || "").split(" ");
            if (r.length === 1) r = d.test(r[0]) ? r.concat(["center"]) : f.test(r[0]) ? ["center"].concat(r) : ["center", "center"];
            r[0] = d.test(r[0]) ? r[0] : "center";
            r[1] = f.test(r[1]) ? r[1] : "center";
            j[this] = r
        });
        if (l.length === 1) l[1] = l[0];
        p[0] = parseInt(p[0], 10) || 0;
        if (p.length === 1) p[1] = p[0];
        p[1] = parseInt(p[1], 10) || 0;
        if (j.at[0] === "right") z.left += w;
        else if (j.at[0] === "center") z.left += w / 2;
        if (j.at[1] === "bottom") z.top += B;
        else if (j.at[1] === "center") z.top += B / 2;
        z.left += p[0];
        z.top += p[1];
        return this.each(function () {
            var r = b(this),
                x = r.outerWidth(),
                E = r.outerHeight(),
                H = parseInt(b.curCSS(this, "marginLeft", true)) || 0,
                X = parseInt(b.curCSS(this, "marginTop", true)) || 0,
                P = x + H + (parseInt(b.curCSS(this, "marginRight", true)) || 0),
                W = E + X + (parseInt(b.curCSS(this, "marginBottom", true)) || 0),
                Y = b.extend({}, z),
                la;
            if (j.my[0] === "right") Y.left -= x;
            else if (j.my[0] === "center") Y.left -= x / 2;
            if (j.my[1] === "bottom") Y.top -= E;
            else if (j.my[1] === "center") Y.top -= E / 2;
            Y.left = Math.round(Y.left);
            Y.top = Math.round(Y.top);
            la = {
                left: Y.left - H,
                top: Y.top - X
            };
            b.each(["left", "top"], function (ca, ra) {
                b.ui.position[l[ca]] && b.ui.position[l[ca]][ra](Y, {
                    targetWidth: w,
                    targetHeight: B,
                    elemWidth: x,
                    elemHeight: E,
                    collisionPosition: la,
                    collisionWidth: P,
                    collisionHeight: W,
                    offset: p,
                    my: j.my,
                    at: j.at
                })
            });
            b.fn.bgiframe && r.bgiframe();
            r.offset(b.extend(Y, {
                using: j.using
            }))
        })
    };
    b.ui.position = {
        fit: {
            left: function (j, n) {
                var c = b(window);
                c = n.collisionPosition.left + n.collisionWidth - c.width() - c.scrollLeft();
                j.left = c > 0 ? j.left - c : Math.max(j.left - n.collisionPosition.left, j.left)
            },
            top: function (j, n) {
                var c = b(window);
                c = n.collisionPosition.top + n.collisionHeight - c.height() - c.scrollTop();
                j.top = c > 0 ? j.top - c : Math.max(j.top - n.collisionPosition.top, j.top)
            }
        },
        flip: {
            left: function (j, n) {
                if (n.at[0] !== "center") {
                    var c = b(window);
                    c = n.collisionPosition.left + n.collisionWidth - c.width() - c.scrollLeft();
                    var l = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0,
                        p = n.at[0] === "left" ? n.targetWidth : -n.targetWidth,
                        w = -2 * n.offset[0];
                    j.left += n.collisionPosition.left < 0 ? l + p + w : c > 0 ? l + p + w : 0
                }
            },
            top: function (j, n) {
                if (n.at[1] !== "center") {
                    var c = b(window);
                    c = n.collisionPosition.top + n.collisionHeight - c.height() - c.scrollTop();
                    var l = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0,
                        p = n.at[1] === "top" ? n.targetHeight : -n.targetHeight,
                        w = -2 * n.offset[1];
                    j.top += n.collisionPosition.top < 0 ? l + p + w : c > 0 ? l + p + w : 0
                }
            }
        }
    };
    if (!b.offset.setOffset) {
        b.offset.setOffset = function (j, n) {
            if (/static/.test(b.curCSS(j, "position"))) j.style.position = "relative";
            var c = b(j),
                l = c.offset(),
                p = parseInt(b.curCSS(j, "top", true), 10) || 0,
                w = parseInt(b.curCSS(j, "left", true), 10) || 0;
            l = {
                top: n.top - l.top + p,
                left: n.left - l.left + w
            };
            "using" in n ? n.using.call(j, l) : c.css(l)
        };
        b.fn.offset = function (j) {
            var n = this[0];
            if (!n || !n.ownerDocument) return null;
            if (j) return this.each(function () {
                b.offset.setOffset(this, j)
            });
            return i.call(this)
        }
    }
})(jQuery);
(function (b) {
    b.widget("ui.draggable", b.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (d) {
            var f = this.options;
            if (this.helper || f.disabled || b(d.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(d);
            if (!this.handle) return false;
            b(f.iframeFix === true ? "iframe" : f.iframeFix).each(function () {
                b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(b(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function (d) {
            var f = this.options;
            this.helper = this._createHelper(d);
            this._cacheHelperProportions();
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            b.extend(this.offset, {
                click: {
                    left: d.pageX - this.offset.left,
                    top: d.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(d);
            this.originalPageX = d.pageX;
            this.originalPageY = d.pageY;
            f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt);
            f.containment && this._setContainment();
            if (this._trigger("start", d) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, d);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(d, true);
            b.ui.ddmanager && b.ui.ddmanager.dragStart(this, d);
            return true
        },
        _mouseDrag: function (d, f) {
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!f) {
                f = this._uiHash();
                if (this._trigger("drag", d, f) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = f.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            b.ui.ddmanager && b.ui.ddmanager.drag(this, d);
            return false
        },
        _mouseStop: function (d) {
            var f = false;
            if (b.ui.ddmanager && !this.options.dropBehaviour) f = b.ui.ddmanager.drop(this, d);
            if (this.dropped) {
                f = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !f || this.options.revert == "valid" && f || this.options.revert === true || b.isFunction(this.options.revert) && this.options.revert.call(this.element, f)) {
                var g = this;
                b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    g._trigger("stop", d) !== false && g._clear()
                })
            } else this._trigger("stop", d) !== false && this._clear();
            return false
        },
        _mouseUp: function (d) {
            this.options.iframeFix === true && b("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            b.ui.ddmanager && b.ui.ddmanager.dragStop(this, d);
            return b.ui.mouse.prototype._mouseUp.call(this, d)
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (d) {
            var f = !this.options.handle || !b(this.options.handle, this.element).length ? true : false;
            b(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == d.target) f = true
            });
            return f
        },
        _createHelper: function (d) {
            var f = this.options;
            d = b.isFunction(f.helper) ? b(f.helper.apply(this.element[0], [d])) : f.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            d.parents("body").length || d.appendTo(f.appendTo == "parent" ? this.element[0].parentNode : f.appendTo);
            d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
            return d
        },
        _adjustOffsetFromHelper: function (d) {
            if (typeof d == "string") d = d.split(" ");
            if (b.isArray(d)) d = {
                left: +d[0],
                top: +d[1] || 0
            };
            if ("left" in d) this.offset.click.left = d.left + this.margins.left;
            if ("right" in d) this.offset.click.left = this.helperProportions.width - d.right + this.margins.left;
            if ("top" in d) this.offset.click.top = d.top + this.margins.top;
            if ("bottom" in d) this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) d = {
                top: 0,
                left: 0
            };
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var d = this.element.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var d = this.options;
            if (d.containment == "parent") d.containment = this.helper[0].parentNode;
            if (d.containment == "document" || d.containment == "window") this.containment = [d.containment == "document" ? 0 : b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, d.containment == "document" ? 0 : b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (d.containment == "document" ? 0 : b(window).scrollLeft()) + b(d.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (d.containment == "document" ? 0 : b(window).scrollTop()) + (b(d.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(d.containment) && d.containment.constructor != Array) {
                d = b(d.containment);
                var f = d[0];
                if (f) {
                    d.offset();
                    var g = b(f).css("overflow") != "hidden";
                    this.containment = [(parseInt(b(f).css("borderLeftWidth"), 10) || 0) + (parseInt(b(f).css("paddingLeft"), 10) || 0), (parseInt(b(f).css("borderTopWidth"), 10) || 0) + (parseInt(b(f).css("paddingTop"), 10) || 0), (g ? Math.max(f.scrollWidth, f.offsetWidth) : f.offsetWidth) - (parseInt(b(f).css("borderLeftWidth"), 10) || 0) - (parseInt(b(f).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (g ? Math.max(f.scrollHeight, f.offsetHeight) : f.offsetHeight) - (parseInt(b(f).css("borderTopWidth"), 10) || 0) - (parseInt(b(f).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                    this.relative_container = d
                }
            } else if (d.containment.constructor == Array) this.containment = d.containment
        },
        _convertPositionTo: function (d, f) {
            if (!f) f = this.position;
            d = d == "absolute" ? 1 : -1;
            var g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = /(html|body)/i.test(g[0].tagName);
            return {
                top: f.top + this.offset.relative.top * d + this.offset.parent.top * d - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : g.scrollTop()) * d),
                left: f.left + this.offset.relative.left * d + this.offset.parent.left * d - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : g.scrollLeft()) * d)
            }
        },
        _generatePosition: function (d) {
            var f = this.options,
                g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = /(html|body)/i.test(g[0].tagName),
                j = d.pageX,
                n = d.pageY;
            if (this.originalPosition) {
                var c;
                if (this.containment) {
                    if (this.relative_container) {
                        c = this.relative_container.offset();
                        c = [this.containment[0] + c.left, this.containment[1] + c.top, this.containment[2] + c.left, this.containment[3] + c.top]
                    } else c = this.containment;
                    if (d.pageX - this.offset.click.left < c[0]) j = c[0] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top < c[1]) n = c[1] + this.offset.click.top;
                    if (d.pageX - this.offset.click.left > c[2]) j = c[2] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top > c[3]) n = c[3] + this.offset.click.top
                }
                if (f.grid) {
                    n = f.grid[1] ? this.originalPageY + Math.round((n - this.originalPageY) / f.grid[1]) * f.grid[1] : this.originalPageY;
                    n = c ? !(n - this.offset.click.top < c[1] || n - this.offset.click.top > c[3]) ? n : !(n - this.offset.click.top < c[1]) ? n - f.grid[1] : n + f.grid[1] : n;
                    j = f.grid[0] ? this.originalPageX + Math.round((j - this.originalPageX) / f.grid[0]) * f.grid[0] : this.originalPageX;
                    j = c ? !(j - this.offset.click.left < c[0] || j - this.offset.click.left > c[2]) ? j : !(j - this.offset.click.left < c[0]) ? j - f.grid[0] : j + f.grid[0] : j
                }
            }
            return {
                top: n - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : g.scrollTop()),
                left: j - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : g.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (d, f, g) {
            g = g || this._uiHash();
            b.ui.plugin.call(this, d, [f, g]);
            if (d == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return b.Widget.prototype._trigger.call(this, d, f, g)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    b.extend(b.ui.draggable, {
        version: "1.8.14"
    });
    b.ui.plugin.add("draggable", "connectToSortable", {
        start: function (d, f) {
            var g = b(this).data("draggable"),
                i = g.options,
                j = b.extend({}, f, {
                    item: g.element
                });
            g.sortables = [];
            b(i.connectToSortable).each(function () {
                var n = b.data(this, "sortable");
                if (n && !n.options.disabled) {
                    g.sortables.push({
                        instance: n,
                        shouldRevert: n.options.revert
                    });
                    n.refreshPositions();
                    n._trigger("activate", d, j)
                }
            })
        },
        stop: function (d, f) {
            var g = b(this).data("draggable"),
                i = b.extend({}, f, {
                    item: g.element
                });
            b.each(g.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    g.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(d);
                    this.instance.options.helper = this.instance.options._helper;
                    g.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", d, i)
                }
            })
        },
        drag: function (d, f) {
            var g = b(this).data("draggable"),
                i = this;
            b.each(g.sortables, function () {
                this.instance.positionAbs = g.positionAbs;
                this.instance.helperProportions = g.helperProportions;
                this.instance.offset.click = g.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = b(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return f.helper[0]
                        };
                        d.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(d, true);
                        this.instance._mouseStart(d, true, true);
                        this.instance.offset.click.top = g.offset.click.top;
                        this.instance.offset.click.left = g.offset.click.left;
                        this.instance.offset.parent.left -= g.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= g.offset.parent.top - this.instance.offset.parent.top;
                        g._trigger("toSortable", d);
                        g.dropped = this.instance.element;
                        g.currentItem = g.element;
                        this.instance.fromOutside = g
                    }
                    this.instance.currentItem && this.instance._mouseDrag(d)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", d, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(d, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    g._trigger("fromSortable", d);
                    g.dropped = false
                }
            })
        }
    });
    b.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var d = b("body"),
                f = b(this).data("draggable").options;
            if (d.css("cursor")) f._cursor = d.css("cursor");
            d.css("cursor", f.cursor)
        },
        stop: function () {
            var d = b(this).data("draggable").options;
            d._cursor && b("body").css("cursor", d._cursor)
        }
    });
    b.ui.plugin.add("draggable", "opacity", {
        start: function (d, f) {
            d = b(f.helper);
            f = b(this).data("draggable").options;
            if (d.css("opacity")) f._opacity = d.css("opacity");
            d.css("opacity", f.opacity)
        },
        stop: function (d, f) {
            d = b(this).data("draggable").options;
            d._opacity && b(f.helper).css("opacity", d._opacity)
        }
    });
    b.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var d = b(this).data("draggable");
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") d.overflowOffset = d.scrollParent.offset()
        },
        drag: function (d) {
            var f = b(this).data("draggable"),
                g = f.options,
                i = false;
            if (f.scrollParent[0] != document && f.scrollParent[0].tagName != "HTML") {
                if (!g.axis || g.axis != "x") if (f.overflowOffset.top + f.scrollParent[0].offsetHeight - d.pageY < g.scrollSensitivity) f.scrollParent[0].scrollTop = i = f.scrollParent[0].scrollTop + g.scrollSpeed;
                else if (d.pageY - f.overflowOffset.top < g.scrollSensitivity) f.scrollParent[0].scrollTop = i = f.scrollParent[0].scrollTop - g.scrollSpeed;
                if (!g.axis || g.axis != "y") if (f.overflowOffset.left + f.scrollParent[0].offsetWidth - d.pageX < g.scrollSensitivity) f.scrollParent[0].scrollLeft = i = f.scrollParent[0].scrollLeft + g.scrollSpeed;
                else if (d.pageX - f.overflowOffset.left < g.scrollSensitivity) f.scrollParent[0].scrollLeft = i = f.scrollParent[0].scrollLeft - g.scrollSpeed
            } else {
                if (!g.axis || g.axis != "x") if (d.pageY - b(document).scrollTop() < g.scrollSensitivity) i = b(document).scrollTop(b(document).scrollTop() - g.scrollSpeed);
                else if (b(window).height() - (d.pageY - b(document).scrollTop()) < g.scrollSensitivity) i = b(document).scrollTop(b(document).scrollTop() + g.scrollSpeed);
                if (!g.axis || g.axis != "y") if (d.pageX - b(document).scrollLeft() < g.scrollSensitivity) i = b(document).scrollLeft(b(document).scrollLeft() - g.scrollSpeed);
                else if (b(window).width() - (d.pageX - b(document).scrollLeft()) < g.scrollSensitivity) i = b(document).scrollLeft(b(document).scrollLeft() + g.scrollSpeed)
            }
            i !== false && b.ui.ddmanager && !g.dropBehaviour && b.ui.ddmanager.prepareOffsets(f, d)
        }
    });
    b.ui.plugin.add("draggable", "snap", {
        start: function () {
            var d = b(this).data("draggable"),
                f = d.options;
            d.snapElements = [];
            b(f.snap.constructor != String ? f.snap.items || ":data(draggable)" : f.snap).each(function () {
                var g = b(this),
                    i = g.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: g.outerWidth(),
                    height: g.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function (d, f) {
            for (var g = b(this).data("draggable"), i = g.options, j = i.snapTolerance, n = f.offset.left, c = n + g.helperProportions.width, l = f.offset.top, p = l + g.helperProportions.height, w = g.snapElements.length - 1; w >= 0; w--) {
                var B = g.snapElements[w].left,
                    z = B + g.snapElements[w].width,
                    r = g.snapElements[w].top,
                    x = r + g.snapElements[w].height;
                if (B - j < n && n < z + j && r - j < l && l < x + j || B - j < n && n < z + j && r - j < p && p < x + j || B - j < c && c < z + j && r - j < l && l < x + j || B - j < c && c < z + j && r - j < p && p < x + j) {
                    if (i.snapMode != "inner") {
                        var E = Math.abs(r - p) <= j,
                            H = Math.abs(x - l) <= j,
                            X = Math.abs(B - c) <= j,
                            P = Math.abs(z - n) <= j;
                        if (E) f.position.top = g._convertPositionTo("relative", {
                            top: r - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top;
                        if (H) f.position.top = g._convertPositionTo("relative", {
                            top: x,
                            left: 0
                        }).top - g.margins.top;
                        if (X) f.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: B - g.helperProportions.width
                        }).left - g.margins.left;
                        if (P) f.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: z
                        }).left - g.margins.left
                    }
                    var W = E || H || X || P;
                    if (i.snapMode != "outer") {
                        E = Math.abs(r - l) <= j;
                        H = Math.abs(x - p) <= j;
                        X = Math.abs(B - n) <= j;
                        P = Math.abs(z - c) <= j;
                        if (E) f.position.top = g._convertPositionTo("relative", {
                            top: r,
                            left: 0
                        }).top - g.margins.top;
                        if (H) f.position.top = g._convertPositionTo("relative", {
                            top: x - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top;
                        if (X) f.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: B
                        }).left - g.margins.left;
                        if (P) f.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: z - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (!g.snapElements[w].snapping && (E || H || X || P || W)) g.options.snap.snap && g.options.snap.snap.call(g.element, d, b.extend(g._uiHash(), {
                        snapItem: g.snapElements[w].item
                    }));
                    g.snapElements[w].snapping = E || H || X || P || W
                } else {
                    g.snapElements[w].snapping && g.options.snap.release && g.options.snap.release.call(g.element, d, b.extend(g._uiHash(), {
                        snapItem: g.snapElements[w].item
                    }));
                    g.snapElements[w].snapping = false
                }
            }
        }
    });
    b.ui.plugin.add("draggable", "stack", {
        start: function () {
            var d = b(this).data("draggable").options;
            d = b.makeArray(b(d.stack)).sort(function (g, i) {
                return (parseInt(b(g).css("zIndex"), 10) || 0) - (parseInt(b(i).css("zIndex"), 10) || 0)
            });
            if (d.length) {
                var f = parseInt(d[0].style.zIndex) || 0;
                b(d).each(function (g) {
                    this.style.zIndex = f + g
                });
                this[0].style.zIndex = f + d.length
            }
        }
    });
    b.ui.plugin.add("draggable", "zIndex", {
        start: function (d, f) {
            d = b(f.helper);
            f = b(this).data("draggable").options;
            if (d.css("zIndex")) f._zIndex = d.css("zIndex");
            d.css("zIndex", f.zIndex)
        },
        stop: function (d, f) {
            d = b(this).data("draggable").options;
            d._zIndex && b(f.helper).css("zIndex", d._zIndex)
        }
    })
})(jQuery);
(function (b) {
    b.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var d = this.options,
                f = d.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = b.isFunction(f) ? f : function (g) {
                return g.is(f)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            b.ui.ddmanager.droppables[d.scope] = b.ui.ddmanager.droppables[d.scope] || [];
            b.ui.ddmanager.droppables[d.scope].push(this);
            d.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var d = b.ui.ddmanager.droppables[this.options.scope], f = 0; f < d.length; f++) d[f] == this && d.splice(f, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (d, f) {
            if (d == "accept") this.accept = b.isFunction(f) ? f : function (g) {
                return g.is(f)
            };
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (d) {
            var f = b.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            f && this._trigger("activate", d, this.ui(f))
        },
        _deactivate: function (d) {
            var f = b.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            f && this._trigger("deactivate", d, this.ui(f))
        },
        _over: function (d) {
            var f = b.ui.ddmanager.current;
            if (!(!f || (f.currentItem || f.element)[0] == this.element[0])) if (this.accept.call(this.element[0], f.currentItem || f.element)) {
                this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                this._trigger("over", d, this.ui(f))
            }
        },
        _out: function (d) {
            var f = b.ui.ddmanager.current;
            if (!(!f || (f.currentItem || f.element)[0] == this.element[0])) if (this.accept.call(this.element[0], f.currentItem || f.element)) {
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("out", d, this.ui(f))
            }
        },
        _drop: function (d, f) {
            var g = f || b.ui.ddmanager.current;
            if (!g || (g.currentItem || g.element)[0] == this.element[0]) return false;
            var i = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var j = b.data(this, "droppable");
                if (j.options.greedy && !j.options.disabled && j.options.scope == g.options.scope && j.accept.call(j.element[0], g.currentItem || g.element) && b.ui.intersect(g, b.extend(j, {
                    offset: j.element.offset()
                }), j.options.tolerance)) {
                    i = true;
                    return false
                }
            });
            if (i) return false;
            if (this.accept.call(this.element[0], g.currentItem || g.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", d, this.ui(g));
                return this.element
            }
            return false
        },
        ui: function (d) {
            return {
                draggable: d.currentItem || d.element,
                helper: d.helper,
                position: d.position,
                offset: d.positionAbs
            }
        }
    });
    b.extend(b.ui.droppable, {
        version: "1.8.14"
    });
    b.ui.intersect = function (d, f, g) {
        if (!f.offset) return false;
        var i = (d.positionAbs || d.position.absolute).left,
            j = i + d.helperProportions.width,
            n = (d.positionAbs || d.position.absolute).top,
            c = n + d.helperProportions.height,
            l = f.offset.left,
            p = l + f.proportions.width,
            w = f.offset.top,
            B = w + f.proportions.height;
        switch (g) {
        case "fit":
            return l <= i && j <= p && w <= n && c <= B;
        case "intersect":
            return l < i + d.helperProportions.width / 2 && j - d.helperProportions.width / 2 < p && w < n + d.helperProportions.height / 2 && c - d.helperProportions.height / 2 < B;
        case "pointer":
            return b.ui.isOver((d.positionAbs || d.position.absolute).top + (d.clickOffset || d.offset.click).top, (d.positionAbs || d.position.absolute).left + (d.clickOffset || d.offset.click).left, w, l, f.proportions.height, f.proportions.width);
        case "touch":
            return (n >= w && n <= B || c >= w && c <= B || n < w && c > B) && (i >= l && i <= p || j >= l && j <= p || i < l && j > p);
        default:
            return false
        }
    };
    b.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (d, f) {
            var g = b.ui.ddmanager.droppables[d.options.scope] || [],
                i = f ? f.type : null,
                j = (d.currentItem || d.element).find(":data(droppable)").andSelf(),
                n = 0;
            a: for (; n < g.length; n++) if (!(g[n].options.disabled || d && !g[n].accept.call(g[n].element[0], d.currentItem || d.element))) {
                for (var c = 0; c < j.length; c++) if (j[c] == g[n].element[0]) {
                    g[n].proportions.height = 0;
                    continue a
                }
                g[n].visible = g[n].element.css("display") != "none";
                if (g[n].visible) {
                    i == "mousedown" && g[n]._activate.call(g[n], f);
                    g[n].offset = g[n].element.offset();
                    g[n].proportions = {
                        width: g[n].element[0].offsetWidth,
                        height: g[n].element[0].offsetHeight
                    }
                }
            }
        },
        drop: function (d, f) {
            var g = false;
            b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function () {
                if (this.options) {
                    if (!this.options.disabled && this.visible && b.ui.intersect(d, this, this.options.tolerance)) g = g || this._drop.call(this, f);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], d.currentItem || d.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, f)
                    }
                }
            });
            return g
        },
        dragStart: function (d, f) {
            d.element.parentsUntil("body").bind("scroll.droppable", function () {
                d.options.refreshPositions || b.ui.ddmanager.prepareOffsets(d, f)
            })
        },
        drag: function (d, f) {
            d.options.refreshPositions && b.ui.ddmanager.prepareOffsets(d, f);
            b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function () {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var g = b.ui.intersect(d, this, this.options.tolerance);
                    if (g = !g && this.isover == 1 ? "isout" : g && this.isover == 0 ? "isover" : null) {
                        var i;
                        if (this.options.greedy) {
                            var j = this.element.parents(":data(droppable):eq(0)");
                            if (j.length) {
                                i = b.data(j[0], "droppable");
                                i.greedyChild = g == "isover" ? 1 : 0
                            }
                        }
                        if (i && g == "isover") {
                            i.isover = 0;
                            i.isout = 1;
                            i._out.call(i, f)
                        }
                        this[g] = 1;
                        this[g == "isout" ? "isover" : "isout"] = 0;
                        this[g == "isover" ? "_over" : "_out"].call(this, f);
                        if (i && g == "isout") {
                            i.isout = 0;
                            i.isover = 1;
                            i._over.call(i, f)
                        }
                    }
                }
            })
        },
        dragStop: function (d, f) {
            d.element.parentsUntil("body").unbind("scroll.droppable");
            d.options.refreshPositions || b.ui.ddmanager.prepareOffsets(d, f)
        }
    }
})(jQuery);
(function (b) {
    b.widget("ui.resizable", b.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function () {
            var g = this,
                i = this.options;
            this.element.addClass("ui-resizable");
            b.extend(this, {
                _aspectRatio: !! i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && b.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(b('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = i.handles || (!b(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var j = this.handles.split(",");
                this.handles = {};
                for (var n = 0; n < j.length; n++) {
                    var c = b.trim(j[n]),
                        l = b('<div class="ui-resizable-handle ' + ("ui-resizable-" + c) + '"></div>');
                    /sw|se|ne|nw/.test(c) && l.css({
                        zIndex: ++i.zIndex
                    });
                    "se" == c && l.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[c] = ".ui-resizable-" + c;
                    this.element.append(l)
                }
            }
            this._renderAxis = function (p) {
                p = p || this.element;
                for (var w in this.handles) {
                    if (this.handles[w].constructor == String) this.handles[w] = b(this.handles[w], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var B = b(this.handles[w], this.element),
                            z = 0;
                        z = /sw|ne|nw|se|n|s/.test(w) ? B.outerHeight() : B.outerWidth();
                        B = ["padding", /ne|nw|n/.test(w) ? "Top" : /se|sw|s/.test(w) ? "Bottom" : /^e$/.test(w) ? "Right" : "Left"].join("");
                        p.css(B, z);
                        this._proportionallyResize()
                    }
                    b(this.handles[w])
                }
            };
            this._renderAxis(this.element);
            this._handles = b(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!g.resizing) {
                    if (this.className) var p = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    g.axis = p && p[1] ? p[1] : "se"
                }
            });
            if (i.autoHide) {
                this._handles.hide();
                b(this.element).addClass("ui-resizable-autohide").hover(function () {
                    if (!i.disabled) {
                        b(this).removeClass("ui-resizable-autohide");
                        g._handles.show()
                    }
                }, function () {
                    if (!i.disabled) if (!g.resizing) {
                        b(this).addClass("ui-resizable-autohide");
                        g._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var g = function (j) {
                    b(j).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
            if (this.elementIsWrapper) {
                g(this.element);
                var i = this.element;
                i.after(this.originalElement.css({
                    position: i.css("position"),
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: i.css("top"),
                    left: i.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            g(this.originalElement);
            return this
        },
        _mouseCapture: function (g) {
            var i = false;
            for (var j in this.handles) if (b(this.handles[j])[0] == g.target) i = true;
            return !this.options.disabled && i
        },
        _mouseStart: function (g) {
            var i = this.options,
                j = this.element.position(),
                n = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: b(document).scrollTop(),
                left: b(document).scrollLeft()
            };
            if (n.is(".ui-draggable") || /absolute/.test(n.css("position"))) n.css({
                position: "absolute",
                top: j.top,
                left: j.left
            });
            b.browser.opera && /relative/.test(n.css("position")) && n.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            j = d(this.helper.css("left"));
            var c = d(this.helper.css("top"));
            if (i.containment) {
                j += b(i.containment).scrollLeft() || 0;
                c += b(i.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: j,
                top: c
            };
            this.size = this._helper ? {
                width: n.outerWidth(),
                height: n.outerHeight()
            } : {
                width: n.width(),
                height: n.height()
            };
            this.originalSize = this._helper ? {
                width: n.outerWidth(),
                height: n.outerHeight()
            } : {
                width: n.width(),
                height: n.height()
            };
            this.originalPosition = {
                left: j,
                top: c
            };
            this.sizeDiff = {
                width: n.outerWidth() - n.width(),
                height: n.outerHeight() - n.height()
            };
            this.originalMousePosition = {
                left: g.pageX,
                top: g.pageY
            };
            this.aspectRatio = typeof i.aspectRatio == "number" ? i.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            i = b(".ui-resizable-" + this.axis).css("cursor");
            b("body").css("cursor", i == "auto" ? this.axis + "-resize" : i);
            n.addClass("ui-resizable-resizing");
            this._propagate("start", g);
            return true
        },
        _mouseDrag: function (g) {
            var i = this.helper,
                j = this.originalMousePosition,
                n = this._change[this.axis];
            if (!n) return false;
            j = n.apply(this, [g, g.pageX - j.left || 0, g.pageY - j.top || 0]);
            this._updateVirtualBoundaries(g.shiftKey);
            if (this._aspectRatio || g.shiftKey) j = this._updateRatio(j, g);
            j = this._respectSize(j, g);
            this._propagate("resize", g);
            i.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(j);
            this._trigger("resize", g, this.ui());
            return false
        },
        _mouseStop: function (g) {
            this.resizing = false;
            var i = this.options;
            if (this._helper) {
                var j = this._proportionallyResizeElements,
                    n = j.length && /textarea/i.test(j[0].nodeName);
                j = n && b.ui.hasScroll(j[0], "left") ? 0 : this.sizeDiff.height;
                n = n ? 0 : this.sizeDiff.width;
                n = {
                    width: this.helper.width() - n,
                    height: this.helper.height() - j
                };
                j = parseInt(this.element.css("left"), 10) + (this.position.left - this.originalPosition.left) || null;
                var c = parseInt(this.element.css("top"), 10) + (this.position.top - this.originalPosition.top) || null;
                i.animate || this.element.css(b.extend(n, {
                    top: c,
                    left: j
                }));
                this.helper.height(this.size.height);
                this.helper.width(this.size.width);
                this._helper && !i.animate && this._proportionallyResize()
            }
            b("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", g);
            this._helper && this.helper.remove();
            return false
        },
        _updateVirtualBoundaries: function (g) {
            var i = this.options,
                j, n, c;
            i = {
                minWidth: f(i.minWidth) ? i.minWidth : 0,
                maxWidth: f(i.maxWidth) ? i.maxWidth : Infinity,
                minHeight: f(i.minHeight) ? i.minHeight : 0,
                maxHeight: f(i.maxHeight) ? i.maxHeight : Infinity
            };
            if (this._aspectRatio || g) {
                g = i.minHeight * this.aspectRatio;
                n = i.minWidth / this.aspectRatio;
                j = i.maxHeight * this.aspectRatio;
                c = i.maxWidth / this.aspectRatio;
                if (g > i.minWidth) i.minWidth = g;
                if (n > i.minHeight) i.minHeight = n;
                if (j < i.maxWidth) i.maxWidth = j;
                if (c < i.maxHeight) i.maxHeight = c
            }
            this._vBoundaries = i
        },
        _updateCache: function (g) {
            this.offset = this.helper.offset();
            if (f(g.left)) this.position.left = g.left;
            if (f(g.top)) this.position.top = g.top;
            if (f(g.height)) this.size.height = g.height;
            if (f(g.width)) this.size.width = g.width
        },
        _updateRatio: function (g) {
            var i = this.position,
                j = this.size,
                n = this.axis;
            if (f(g.height)) g.width = g.height * this.aspectRatio;
            else if (f(g.width)) g.height = g.width / this.aspectRatio;
            if (n == "sw") {
                g.left = i.left + (j.width - g.width);
                g.top = null
            }
            if (n == "nw") {
                g.top = i.top + (j.height - g.height);
                g.left = i.left + (j.width - g.width)
            }
            return g
        },
        _respectSize: function (g) {
            var i = this._vBoundaries,
                j = this.axis,
                n = f(g.width) && i.maxWidth && i.maxWidth < g.width,
                c = f(g.height) && i.maxHeight && i.maxHeight < g.height,
                l = f(g.width) && i.minWidth && i.minWidth > g.width,
                p = f(g.height) && i.minHeight && i.minHeight > g.height;
            if (l) g.width = i.minWidth;
            if (p) g.height = i.minHeight;
            if (n) g.width = i.maxWidth;
            if (c) g.height = i.maxHeight;
            var w = this.originalPosition.left + this.originalSize.width,
                B = this.position.top + this.size.height,
                z = /sw|nw|w/.test(j);
            j = /nw|ne|n/.test(j);
            if (l && z) g.left = w - i.minWidth;
            if (n && z) g.left = w - i.maxWidth;
            if (p && j) g.top = B - i.minHeight;
            if (c && j) g.top = B - i.maxHeight;
            if ((i = !g.width && !g.height) && !g.left && g.top) g.top = null;
            else if (i && !g.top && g.left) g.left = null;
            return g
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) for (var g = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                var j = this._proportionallyResizeElements[i];
                if (!this.borderDif) {
                    var n = [j.css("borderTopWidth"), j.css("borderRightWidth"), j.css("borderBottomWidth"), j.css("borderLeftWidth")],
                        c = [j.css("paddingTop"), j.css("paddingRight"), j.css("paddingBottom"), j.css("paddingLeft")];
                    this.borderDif = b.map(n, function (l, p) {
                        l = parseInt(l, 10) || 0;
                        p = parseInt(c[p], 10) || 0;
                        return l + p
                    })
                }
                b.browser.msie && (b(g).is(":hidden") || b(g).parents(":hidden").length) || j.css({
                    height: g.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: g.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function () {
            var g = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || b('<div style="overflow:hidden;"></div>');
                var i = b.browser.msie && b.browser.version < 7,
                    j = i ? 1 : 0;
                i = i ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + i,
                    height: this.element.outerHeight() + i,
                    position: "absolute",
                    left: this.elementOffset.left - j + "px",
                    top: this.elementOffset.top - j + "px",
                    zIndex: ++g.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (g, i) {
                return {
                    width: this.originalSize.width + i
                }
            },
            w: function (g, i) {
                return {
                    left: this.originalPosition.left + i,
                    width: this.originalSize.width - i
                }
            },
            n: function (g, i, j) {
                return {
                    top: this.originalPosition.top + j,
                    height: this.originalSize.height - j
                }
            },
            s: function (g, i, j) {
                return {
                    height: this.originalSize.height + j
                }
            },
            se: function (g, i, j) {
                return b.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [g, i, j]))
            },
            sw: function (g, i, j) {
                return b.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [g, i, j]))
            },
            ne: function (g, i, j) {
                return b.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [g, i, j]))
            },
            nw: function (g, i, j) {
                return b.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [g, i, j]))
            }
        },
        _propagate: function (g, i) {
            b.ui.plugin.call(this, g, [i, this.ui()]);
            g != "resize" && this._trigger(g, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    b.extend(b.ui.resizable, {
        version: "1.8.14"
    });
    b.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var g = b(this).data("resizable").options,
                i = function (j) {
                    b(j).each(function () {
                        var n = b(this);
                        n.data("resizable-alsoresize", {
                            width: parseInt(n.width(), 10),
                            height: parseInt(n.height(), 10),
                            left: parseInt(n.css("left"), 10),
                            top: parseInt(n.css("top"), 10),
                            position: n.css("position")
                        })
                    })
                };
            if (typeof g.alsoResize == "object" && !g.alsoResize.parentNode) if (g.alsoResize.length) {
                g.alsoResize = g.alsoResize[0];
                i(g.alsoResize)
            } else b.each(g.alsoResize, function (j) {
                i(j)
            });
            else i(g.alsoResize)
        },
        resize: function (g, i) {
            var j = b(this).data("resizable");
            g = j.options;
            var n = j.originalSize,
                c = j.originalPosition,
                l = {
                    height: j.size.height - n.height || 0,
                    width: j.size.width - n.width || 0,
                    top: j.position.top - c.top || 0,
                    left: j.position.left - c.left || 0
                },
                p = function (w, B) {
                    b(w).each(function () {
                        var z = b(this),
                            r = b(this).data("resizable-alsoresize"),
                            x = {},
                            E = B && B.length ? B : z.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        b.each(E, function (H, X) {
                            if ((H = (r[X] || 0) + (l[X] || 0)) && H >= 0) x[X] = H || null
                        });
                        if (b.browser.opera && /relative/.test(z.css("position"))) {
                            j._revertToRelativePosition = true;
                            z.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })
                        }
                        z.css(x)
                    })
                };
            typeof g.alsoResize == "object" && !g.alsoResize.nodeType ? b.each(g.alsoResize, function (w, B) {
                p(w, B)
            }) : p(g.alsoResize)
        },
        stop: function () {
            var g = b(this).data("resizable"),
                i = g.options,
                j = function (n) {
                    b(n).each(function () {
                        var c = b(this);
                        c.css({
                            position: c.data("resizable-alsoresize").position
                        })
                    })
                };
            if (g._revertToRelativePosition) {
                g._revertToRelativePosition = false;
                typeof i.alsoResize == "object" && !i.alsoResize.nodeType ? b.each(i.alsoResize, function (n) {
                    j(n)
                }) : j(i.alsoResize)
            }
            b(this).removeData("resizable-alsoresize")
        }
    });
    b.ui.plugin.add("resizable", "animate", {
        stop: function (g) {
            var i = b(this).data("resizable"),
                j = i.options,
                n = i._proportionallyResizeElements,
                c = n.length && /textarea/i.test(n[0].nodeName),
                l = c && b.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height;
            c = {
                width: i.size.width - (c ? 0 : i.sizeDiff.width),
                height: i.size.height - l
            };
            l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null;
            var p = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(b.extend(c, p && l ? {
                top: p,
                left: l
            } : {}), {
                duration: j.animateDuration,
                easing: j.animateEasing,
                step: function () {
                    var w = {
                        width: parseInt(i.element.css("width"), 10),
                        height: parseInt(i.element.css("height"), 10),
                        top: parseInt(i.element.css("top"), 10),
                        left: parseInt(i.element.css("left"), 10)
                    };
                    n && n.length && b(n[0]).css({
                        width: w.width,
                        height: w.height
                    });
                    i._updateCache(w);
                    i._propagate("resize", g)
                }
            })
        }
    });
    b.ui.plugin.add("resizable", "containment", {
        start: function () {
            var g = b(this).data("resizable"),
                i = g.element,
                j = g.options.containment;
            if (i = j instanceof b ? j.get(0) : /parent/.test(j) ? i.parent().get(0) : j) {
                g.containerElement = b(i);
                if (/document/.test(j) || j == document) {
                    g.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    g.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    g.parentData = {
                        element: b(document),
                        left: 0,
                        top: 0,
                        width: b(document).width(),
                        height: b(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var n = b(i),
                        c = [];
                    b(["Top", "Right", "Left", "Bottom"]).each(function (w, B) {
                        c[w] = d(n.css("padding" + B))
                    });
                    g.containerOffset = n.offset();
                    g.containerPosition = n.position();
                    g.containerSize = {
                        height: n.innerHeight() - c[3],
                        width: n.innerWidth() - c[1]
                    };
                    j = g.containerOffset;
                    var l = g.containerSize.height,
                        p = g.containerSize.width;
                    p = b.ui.hasScroll(i, "left") ? i.scrollWidth : p;
                    l = b.ui.hasScroll(i) ? i.scrollHeight : l;
                    g.parentData = {
                        element: i,
                        left: j.left,
                        top: j.top,
                        width: p,
                        height: l
                    }
                }
            }
        },
        resize: function (g) {
            var i = b(this).data("resizable"),
                j = i.options,
                n = i.containerOffset,
                c = i.position;
            g = i._aspectRatio || g.shiftKey;
            var l = {
                top: 0,
                left: 0
            },
                p = i.containerElement;
            if (p[0] != document && /static/.test(p.css("position"))) l = n;
            if (c.left < (i._helper ? n.left : 0)) {
                i.size.width += i._helper ? i.position.left - n.left : i.position.left - l.left;
                if (g) i.size.height = i.size.width / j.aspectRatio;
                i.position.left = j.helper ? n.left : 0
            }
            if (c.top < (i._helper ? n.top : 0)) {
                i.size.height += i._helper ? i.position.top - n.top : i.position.top;
                if (g) i.size.width = i.size.height * j.aspectRatio;
                i.position.top = i._helper ? n.top : 0
            }
            i.offset.left = i.parentData.left + i.position.left;
            i.offset.top = i.parentData.top + i.position.top;
            j = Math.abs((i._helper ? i.offset.left - l.left : i.offset.left - l.left) + i.sizeDiff.width);
            n = Math.abs((i._helper ? i.offset.top - l.top : i.offset.top - n.top) + i.sizeDiff.height);
            c = i.containerElement.get(0) == i.element.parent().get(0);
            l = /relative|absolute/.test(i.containerElement.css("position"));
            if (c && l) j -= i.parentData.left;
            if (j + i.size.width >= i.parentData.width) {
                i.size.width = i.parentData.width - j;
                if (g) i.size.height = i.size.width / i.aspectRatio
            }
            if (n + i.size.height >= i.parentData.height) {
                i.size.height = i.parentData.height - n;
                if (g) i.size.width = i.size.height * i.aspectRatio
            }
        },
        stop: function () {
            var g = b(this).data("resizable"),
                i = g.options,
                j = g.containerOffset,
                n = g.containerPosition,
                c = g.containerElement,
                l = b(g.helper),
                p = l.offset(),
                w = l.outerWidth() - g.sizeDiff.width;
            l = l.outerHeight() - g.sizeDiff.height;
            g._helper && !i.animate && /relative/.test(c.css("position")) && b(this).css({
                left: p.left - n.left - j.left,
                width: w,
                height: l
            });
            g._helper && !i.animate && /static/.test(c.css("position")) && b(this).css({
                left: p.left - n.left - j.left,
                width: w,
                height: l
            })
        }
    });
    b.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var g = b(this).data("resizable"),
                i = g.options,
                j = g.size;
            g.ghost = g.originalElement.clone();
            g.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: j.height,
                width: j.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : "");
            g.ghost.appendTo(g.helper)
        },
        resize: function () {
            var g = b(this).data("resizable");
            g.ghost && g.ghost.css({
                position: "relative",
                height: g.size.height,
                width: g.size.width
            })
        },
        stop: function () {
            var g = b(this).data("resizable");
            g.ghost && g.helper && g.helper.get(0).removeChild(g.ghost.get(0))
        }
    });
    b.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var g = b(this).data("resizable"),
                i = g.options,
                j = g.size,
                n = g.originalSize,
                c = g.originalPosition,
                l = g.axis;
            i.grid = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid;
            var p = Math.round((j.width - n.width) / (i.grid[0] || 1)) * (i.grid[0] || 1);
            i = Math.round((j.height - n.height) / (i.grid[1] || 1)) * (i.grid[1] || 1);
            if (/^(se|s|e)$/.test(l)) {
                g.size.width = n.width + p;
                g.size.height = n.height + i
            } else if (/^(ne)$/.test(l)) {
                g.size.width = n.width + p;
                g.size.height = n.height + i;
                g.position.top = c.top - i
            } else {
                if (/^(sw)$/.test(l)) {
                    g.size.width = n.width + p;
                    g.size.height = n.height + i
                } else {
                    g.size.width = n.width + p;
                    g.size.height = n.height + i;
                    g.position.top = c.top - i
                }
                g.position.left = c.left - p
            }
        }
    });
    var d = function (g) {
            return parseInt(g, 10) || 0
        },
        f = function (g) {
            return !isNaN(parseInt(g, 10))
        }
})(jQuery);
(function (b) {
    b.widget("ui.sortable", b.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function () {
            var d = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? d.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var d = this.items.length - 1; d >= 0; d--) this.items[d].item.removeData("sortable-item");
            return this
        },
        _setOption: function (d, f) {
            if (d === "disabled") {
                this.options[d] = f;
                this.widget()[f ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else b.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (d, f) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(d);
            var g = null,
                i = this;
            b(d.target).parents().each(function () {
                if (b.data(this, "sortable-item") == i) {
                    g = b(this);
                    return false
                }
            });
            if (b.data(d.target, "sortable-item") == i) g = b(d.target);
            if (!g) return false;
            if (this.options.handle && !f) {
                var j = false;
                b(this.options.handle, g).find("*").andSelf().each(function () {
                    if (this == d.target) j = true
                });
                if (!j) return false
            }
            this.currentItem = g;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (d, f, g) {
            f = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(d);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            b.extend(this.offset, {
                click: {
                    left: d.pageX - this.offset.left,
                    top: d.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(d);
            this.originalPageX = d.pageX;
            this.originalPageY = d.pageY;
            f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            f.containment && this._setContainment();
            if (f.cursor) {
                if (b("body").css("cursor")) this._storedCursor = b("body").css("cursor");
                b("body").css("cursor", f.cursor)
            }
            if (f.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", f.opacity)
            }
            if (f.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", f.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", d, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!g) for (g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", d, this._uiHash(this));
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, d);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(d);
            return true
        },
        _mouseDrag: function (d) {
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var f = this.options,
                    g = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - d.pageY < f.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop + f.scrollSpeed;
                    else if (d.pageY - this.overflowOffset.top < f.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop - f.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - d.pageX < f.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft + f.scrollSpeed;
                    else if (d.pageX - this.overflowOffset.left < f.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft - f.scrollSpeed
                } else {
                    if (d.pageY - b(document).scrollTop() < f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() - f.scrollSpeed);
                    else if (b(window).height() - (d.pageY - b(document).scrollTop()) < f.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() + f.scrollSpeed);
                    if (d.pageX - b(document).scrollLeft() < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() - f.scrollSpeed);
                    else if (b(window).width() - (d.pageX - b(document).scrollLeft()) < f.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() + f.scrollSpeed)
                }
                g !== false && b.ui.ddmanager && !f.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, d)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (f = this.items.length - 1; f >= 0; f--) {
                g = this.items[f];
                var i = g.item[0],
                    j = this._intersectsWithPointer(g);
                if (j) if (i != this.currentItem[0] && this.placeholder[j == 1 ? "next" : "prev"]()[0] != i && !b.ui.contains(this.placeholder[0], i) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0], i) : true)) {
                    this.direction = j == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(g)) this._rearrange(d, g);
                    else break;
                    this._trigger("change", d, this._uiHash());
                    break
                }
            }
            this._contactContainers(d);
            b.ui.ddmanager && b.ui.ddmanager.drag(this, d);
            this._trigger("sort", d, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (d, f) {
            if (d) {
                b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, d);
                if (this.options.revert) {
                    var g = this;
                    f = g.placeholder.offset();
                    g.reverting = true;
                    b(this.helper).animate({
                        left: f.left - this.offset.parent.left - g.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: f.top - this.offset.parent.top - g.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        g._clear(d)
                    })
                } else this._clear(d, f);
                return false
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var d = this.containers.length - 1; d >= 0; d--) {
                    this.containers[d]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[d].containerCache.over) {
                        this.containers[d]._trigger("out", null, this._uiHash(this));
                        this.containers[d].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                b.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (d) {
            var f = this._getItemsAsjQuery(d && d.connected),
                g = [];
            d = d || {};
            b(f).each(function () {
                var i = (b(d.item || this).attr(d.attribute || "id") || "").match(d.expression || /(.+)[-=_](.+)/);
                if (i) g.push((d.key || i[1] + "[]") + "=" + (d.key && d.expression ? i[1] : i[2]))
            });
            !g.length && d.key && g.push(d.key + "=");
            return g.join("&")
        },
        toArray: function (d) {
            var f = this._getItemsAsjQuery(d && d.connected),
                g = [];
            d = d || {};
            f.each(function () {
                g.push(b(d.item || this).attr(d.attribute || "id") || "")
            });
            return g
        },
        _intersectsWith: function (d) {
            var f = this.positionAbs.left,
                g = f + this.helperProportions.width,
                i = this.positionAbs.top,
                j = i + this.helperProportions.height,
                n = d.left,
                c = n + d.width,
                l = d.top,
                p = l + d.height,
                w = this.offset.click.top,
                B = this.offset.click.left;
            w = i + w > l && i + w < p && f + B > n && f + B < c;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > d[this.floating ? "width" : "height"] ? w : n < f + this.helperProportions.width / 2 && g - this.helperProportions.width / 2 < c && l < i + this.helperProportions.height / 2 && j - this.helperProportions.height / 2 < p
        },
        _intersectsWithPointer: function (d) {
            var f = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height);
            d = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width);
            f = f && d;
            d = this._getDragVerticalDirection();
            var g = this._getDragHorizontalDirection();
            if (!f) return false;
            return this.floating ? g && g == "right" || d == "down" ? 2 : 1 : d && (d == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (d) {
            var f = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top + d.height / 2, d.height);
            d = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left + d.width / 2, d.width);
            var g = this._getDragVerticalDirection(),
                i = this._getDragHorizontalDirection();
            return this.floating && i ? i == "right" && d || i == "left" && !d : g && (g == "down" && f || g == "up" && !f)
        },
        _getDragVerticalDirection: function () {
            var d = this.positionAbs.top - this.lastPositionAbs.top;
            return d != 0 && (d > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var d = this.positionAbs.left - this.lastPositionAbs.left;
            return d != 0 && (d > 0 ? "right" : "left")
        },
        refresh: function (d) {
            this._refreshItems(d);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var d = this.options;
            return d.connectWith.constructor == String ? [d.connectWith] : d.connectWith
        },
        _getItemsAsjQuery: function (d) {
            var f = [],
                g = [],
                i = this._connectWith();
            if (i && d) for (d = i.length - 1; d >= 0; d--) for (var j = b(i[d]), n = j.length - 1; n >= 0; n--) {
                var c = b.data(j[n], "sortable");
                if (c && c != this && !c.options.disabled) g.push([b.isFunction(c.options.items) ? c.options.items.call(c.element) : b(c.options.items, c.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), c])
            }
            g.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (d = g.length - 1; d >= 0; d--) g[d][0].each(function () {
                f.push(this)
            });
            return b(f)
        },
        _removeCurrentsFromItems: function () {
            for (var d = this.currentItem.find(":data(sortable-item)"), f = 0; f < this.items.length; f++) for (var g = 0; g < d.length; g++) d[g] == this.items[f].item[0] && this.items.splice(f, 1)
        },
        _refreshItems: function (d) {
            this.items = [];
            this.containers = [this];
            var f = this.items,
                g = [
                    [b.isFunction(this.options.items) ? this.options.items.call(this.element[0], d, {
                        item: this.currentItem
                    }) : b(this.options.items, this.element), this]
                ],
                i = this._connectWith();
            if (i) for (var j = i.length - 1; j >= 0; j--) for (var n = b(i[j]), c = n.length - 1; c >= 0; c--) {
                var l = b.data(n[c], "sortable");
                if (l && l != this && !l.options.disabled) {
                    g.push([b.isFunction(l.options.items) ? l.options.items.call(l.element[0], d, {
                        item: this.currentItem
                    }) : b(l.options.items, l.element), l]);
                    this.containers.push(l)
                }
            }
            for (j = g.length - 1; j >= 0; j--) {
                d = g[j][1];
                i = g[j][0];
                c = 0;
                for (n = i.length; c < n; c++) {
                    l = b(i[c]);
                    l.data("sortable-item", d);
                    f.push({
                        item: l,
                        instance: d,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (d) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var f = this.items.length - 1; f >= 0; f--) {
                var g = this.items[f];
                if (!(g.instance != this.currentContainer && this.currentContainer && g.item[0] != this.currentItem[0])) {
                    var i = this.options.toleranceElement ? b(this.options.toleranceElement, g.item) : g.item;
                    if (!d) {
                        g.width = i.outerWidth();
                        g.height = i.outerHeight()
                    }
                    i = i.offset();
                    g.left = i.left;
                    g.top = i.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (f = this.containers.length - 1; f >= 0; f--) {
                i = this.containers[f].element.offset();
                this.containers[f].containerCache.left = i.left;
                this.containers[f].containerCache.top = i.top;
                this.containers[f].containerCache.width = this.containers[f].element.outerWidth();
                this.containers[f].containerCache.height = this.containers[f].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (d) {
            var f = d || this,
                g = f.options;
            if (!g.placeholder || g.placeholder.constructor == String) {
                var i = g.placeholder;
                g.placeholder = {
                    element: function () {
                        var j = b(document.createElement(f.currentItem[0].nodeName)).addClass(i || f.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!i) j.style.visibility = "hidden";
                        return j
                    },
                    update: function (j, n) {
                        if (!(i && !g.forcePlaceholderSize)) {
                            n.height() || n.height(f.currentItem.innerHeight() - parseInt(f.currentItem.css("paddingTop") || 0, 10) - parseInt(f.currentItem.css("paddingBottom") || 0, 10));
                            n.width() || n.width(f.currentItem.innerWidth() - parseInt(f.currentItem.css("paddingLeft") || 0, 10) - parseInt(f.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            f.placeholder = b(g.placeholder.element.call(f.element, f.currentItem));
            f.currentItem.after(f.placeholder);
            g.placeholder.update(f, f.placeholder)
        },
        _contactContainers: function (d) {
            for (var f = null, g = null, i = this.containers.length - 1; i >= 0; i--) if (!b.ui.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
                if (!(f && b.ui.contains(this.containers[i].element[0], f.element[0]))) {
                    f = this.containers[i];
                    g = i
                }
            } else if (this.containers[i].containerCache.over) {
                this.containers[i]._trigger("out", d, this._uiHash(this));
                this.containers[i].containerCache.over = 0
            }
            if (f) if (this.containers.length === 1) {
                this.containers[g]._trigger("over", d, this._uiHash(this));
                this.containers[g].containerCache.over = 1
            } else if (this.currentContainer != this.containers[g]) {
                f = 1E4;
                i = null;
                for (var j = this.positionAbs[this.containers[g].floating ? "left" : "top"], n = this.items.length - 1; n >= 0; n--) if (b.ui.contains(this.containers[g].element[0], this.items[n].item[0])) {
                    var c = this.items[n][this.containers[g].floating ? "left" : "top"];
                    if (Math.abs(c - j) < f) {
                        f = Math.abs(c - j);
                        i = this.items[n]
                    }
                }
                if (i || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[g];
                    i ? this._rearrange(d, i, null, true) : this._rearrange(d, null, this.containers[g].element, true);
                    this._trigger("change", d, this._uiHash());
                    this.containers[g]._trigger("change", d, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[g]._trigger("over", d, this._uiHash(this));
                    this.containers[g].containerCache.over = 1
                }
            }
        },
        _createHelper: function (d) {
            var f = this.options;
            d = b.isFunction(f.helper) ? b(f.helper.apply(this.element[0], [d, this.currentItem])) : f.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            d.parents("body").length || b(f.appendTo != "parent" ? f.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]);
            if (d[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (d[0].style.width == "" || f.forceHelperSize) d.width(this.currentItem.width());
            if (d[0].style.height == "" || f.forceHelperSize) d.height(this.currentItem.height());
            return d
        },
        _adjustOffsetFromHelper: function (d) {
            if (typeof d == "string") d = d.split(" ");
            if (b.isArray(d)) d = {
                left: +d[0],
                top: +d[1] || 0
            };
            if ("left" in d) this.offset.click.left = d.left + this.margins.left;
            if ("right" in d) this.offset.click.left = this.helperProportions.width - d.right + this.margins.left;
            if ("top" in d) this.offset.click.top = d.top + this.margins.top;
            if ("bottom" in d) this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) d = {
                top: 0,
                left: 0
            };
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var d = this.currentItem.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var d = this.options;
            if (d.containment == "parent") d.containment = this.helper[0].parentNode;
            if (d.containment == "document" || d.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(d.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b(d.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(d.containment)) {
                var f = b(d.containment)[0];
                d = b(d.containment).offset();
                var g = b(f).css("overflow") != "hidden";
                this.containment = [d.left + (parseInt(b(f).css("borderLeftWidth"), 10) || 0) + (parseInt(b(f).css("paddingLeft"), 10) || 0) - this.margins.left, d.top + (parseInt(b(f).css("borderTopWidth"), 10) || 0) + (parseInt(b(f).css("paddingTop"), 10) || 0) - this.margins.top, d.left + (g ? Math.max(f.scrollWidth, f.offsetWidth) : f.offsetWidth) - (parseInt(b(f).css("borderLeftWidth"), 10) || 0) - (parseInt(b(f).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, d.top + (g ? Math.max(f.scrollHeight, f.offsetHeight) : f.offsetHeight) - (parseInt(b(f).css("borderTopWidth"), 10) || 0) - (parseInt(b(f).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (d, f) {
            if (!f) f = this.position;
            d = d == "absolute" ? 1 : -1;
            var g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = /(html|body)/i.test(g[0].tagName);
            return {
                top: f.top + this.offset.relative.top * d + this.offset.parent.top * d - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : g.scrollTop()) * d),
                left: f.left + this.offset.relative.left * d + this.offset.parent.left * d - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : g.scrollLeft()) * d)
            }
        },
        _generatePosition: function (d) {
            var f = this.options,
                g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = /(html|body)/i.test(g[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var j = d.pageX,
                n = d.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (d.pageX - this.offset.click.left < this.containment[0]) j = this.containment[0] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top < this.containment[1]) n = this.containment[1] + this.offset.click.top;
                    if (d.pageX - this.offset.click.left > this.containment[2]) j = this.containment[2] + this.offset.click.left;
                    if (d.pageY - this.offset.click.top > this.containment[3]) n = this.containment[3] + this.offset.click.top
                }
                if (f.grid) {
                    n = this.originalPageY + Math.round((n - this.originalPageY) / f.grid[1]) * f.grid[1];
                    n = this.containment ? !(n - this.offset.click.top < this.containment[1] || n - this.offset.click.top > this.containment[3]) ? n : !(n - this.offset.click.top < this.containment[1]) ? n - f.grid[1] : n + f.grid[1] : n;
                    j = this.originalPageX + Math.round((j - this.originalPageX) / f.grid[0]) * f.grid[0];
                    j = this.containment ? !(j - this.offset.click.left < this.containment[0] || j - this.offset.click.left > this.containment[2]) ? j : !(j - this.offset.click.left < this.containment[0]) ? j - f.grid[0] : j + f.grid[0] : j
                }
            }
            return {
                top: n - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : g.scrollTop()),
                left: j - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : g.scrollLeft())
            }
        },
        _rearrange: function (d, f, g, i) {
            g ? g[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? f.item[0] : f.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var j = this,
                n = this.counter;
            window.setTimeout(function () {
                n == j.counter && j.refreshPositions(!i)
            }, 0)
        },
        _clear: function (d, f) {
            this.reverting = false;
            var g = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var i in this._storedCSS) if (this._storedCSS[i] == "auto" || this._storedCSS[i] == "static") this._storedCSS[i] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !f && g.push(function (j) {
                this._trigger("receive", j, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !f) g.push(function (j) {
                this._trigger("update", j, this._uiHash())
            });
            if (!b.ui.contains(this.element[0], this.currentItem[0])) {
                f || g.push(function (j) {
                    this._trigger("remove", j, this._uiHash())
                });
                for (i = this.containers.length - 1; i >= 0; i--) if (b.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !f) {
                    g.push(function (j) {
                        return function (n) {
                            j._trigger("receive", n, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]));
                    g.push(function (j) {
                        return function (n) {
                            j._trigger("update", n, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]))
                }
            }
            for (i = this.containers.length - 1; i >= 0; i--) {
                f || g.push(function (j) {
                    return function (n) {
                        j._trigger("deactivate", n, this._uiHash(this))
                    }
                }.call(this, this.containers[i]));
                if (this.containers[i].containerCache.over) {
                    g.push(function (j) {
                        return function (n) {
                            j._trigger("out", n, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]));
                    this.containers[i].containerCache.over = 0
                }
            }
            this._storedCursor && b("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!f) {
                    this._trigger("beforeStop", d, this._uiHash());
                    for (i = 0; i < g.length; i++) g[i].call(this, d);
                    this._trigger("stop", d, this._uiHash())
                }
                return false
            }
            f || this._trigger("beforeStop", d, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!f) {
                for (i = 0; i < g.length; i++) g[i].call(this, d);
                this._trigger("stop", d, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            b.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (d) {
            var f = d || this;
            return {
                helper: f.helper,
                placeholder: f.placeholder || b([]),
                position: f.position,
                originalPosition: f.originalPosition,
                offset: f.positionAbs,
                item: f.currentItem,
                sender: d ? d.element : null
            }
        }
    });
    b.extend(b.ui.sortable, {
        version: "1.8.14"
    })
})(jQuery);
(function (b) {
    var d = 0;
    b.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function () {
            var f = this,
                g = this.element[0].ownerDocument,
                i;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (j) {
                if (!(f.options.disabled || f.element.attr("readonly"))) {
                    i = false;
                    var n = b.ui.keyCode;
                    switch (j.keyCode) {
                    case n.PAGE_UP:
                        f._move("previousPage", j);
                        break;
                    case n.PAGE_DOWN:
                        f._move("nextPage", j);
                        break;
                    case n.UP:
                        f._move("previous", j);
                        j.preventDefault();
                        break;
                    case n.DOWN:
                        f._move("next", j);
                        j.preventDefault();
                        break;
                    case n.ENTER:
                    case n.NUMPAD_ENTER:
                        if (f.menu.active) {
                            i = true;
                            j.preventDefault()
                        }
                    case n.TAB:
                        if (!f.menu.active) return;
                        f.menu.select(j);
                        break;
                    case n.ESCAPE:
                        f.element.val(f.term);
                        f.close(j);
                        break;
                    default:
                        clearTimeout(f.searching);
                        f.searching = setTimeout(function () {
                            if (f.term != f.element.val()) {
                                f.selectedItem = null;
                                f.search(null, j)
                            }
                        }, f.options.delay);
                        break
                    }
                }
            }).bind("keypress.autocomplete", function (j) {
                if (i) {
                    i = false;
                    j.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (!f.options.disabled) {
                    f.selectedItem = null;
                    f.previous = f.element.val()
                }
            }).bind("blur.autocomplete", function (j) {
                if (!f.options.disabled) {
                    clearTimeout(f.searching);
                    f.closing = setTimeout(function () {
                        f.close(j);
                        f._change(j)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function () {
                return f._response.apply(f, arguments)
            };
            this.menu = b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo || "body", g)[0]).mousedown(function (j) {
                var n = f.menu.element[0];
                b(j.target).closest(".ui-menu-item").length || setTimeout(function () {
                    b(document).one("mousedown", function (c) {
                        c.target !== f.element[0] && c.target !== n && !b.ui.contains(n, c.target) && f.close()
                    })
                }, 1);
                setTimeout(function () {
                    clearTimeout(f.closing)
                }, 13)
            }).menu({
                focus: function (j, n) {
                    n = n.item.data("item.autocomplete");
                    false !== f._trigger("focus", j, {
                        item: n
                    }) && /^key/.test(j.originalEvent.type) && f.element.val(n.value)
                },
                selected: function (j, n) {
                    var c = n.item.data("item.autocomplete"),
                        l = f.previous;
                    if (f.element[0] !== g.activeElement) {
                        f.element.focus();
                        f.previous = l;
                        setTimeout(function () {
                            f.previous = l;
                            f.selectedItem = c
                        }, 1)
                    }
                    false !== f._trigger("select", j, {
                        item: c
                    }) && f.element.val(c.value);
                    f.term = f.element.val();
                    f.close(j);
                    f.selectedItem = c
                },
                blur: function () {
                    f.menu.element.is(":visible") && f.element.val() !== f.term && f.element.val(f.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            b.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function (f, g) {
            b.Widget.prototype._setOption.apply(this, arguments);
            f === "source" && this._initSource();
            if (f === "appendTo") this.menu.element.appendTo(b(g || "body", this.element[0].ownerDocument)[0]);
            f === "disabled" && g && this.xhr && this.xhr.abort()
        },
        _initSource: function () {
            var f = this,
                g, i;
            if (b.isArray(this.options.source)) {
                g = this.options.source;
                this.source = function (j, n) {
                    n(b.ui.autocomplete.filter(g, j.term))
                }
            } else if (typeof this.options.source === "string") {
                i = this.options.source;
                this.source = function (j, n) {
                    f.xhr && f.xhr.abort();
                    f.xhr = b.ajax({
                        url: i,
                        data: j,
                        dataType: "json",
                        autocompleteRequest: ++d,
                        success: function (c) {
                            this.autocompleteRequest === d && n(c)
                        },
                        error: function () {
                            this.autocompleteRequest === d && n([])
                        }
                    })
                }
            } else this.source = this.options.source
        },
        search: function (f, g) {
            f = f != null ? f : this.element.val();
            this.term = this.element.val();
            if (f.length < this.options.minLength) return this.close(g);
            clearTimeout(this.closing);
            if (this._trigger("search", g) !== false) return this._search(f)
        },
        _search: function (f) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: f
            }, this.response)
        },
        _response: function (f) {
            if (!this.options.disabled && f && f.length) {
                f = this._normalize(f);
                this._suggest(f);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function (f) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", f)
            }
        },
        _change: function (f) {
            this.previous !== this.element.val() && this._trigger("change", f, {
                item: this.selectedItem
            })
        },
        _normalize: function (f) {
            if (f.length && f[0].label && f[0].value) return f;
            return b.map(f, function (g) {
                if (typeof g === "string") return {
                    label: g,
                    value: g
                };
                return b.extend({
                    label: g.label || g.value,
                    value: g.value || g.label
                }, g)
            })
        },
        _suggest: function (f) {
            var g = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(g, f);
            this.menu.deactivate();
            this.menu.refresh();
            g.show();
            this._resizeMenu();
            g.position(b.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next(new b.Event("mouseover"))
        },
        _resizeMenu: function () {
            var f = this.menu.element;
            f.outerWidth(Math.max(f.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function (f, g) {
            var i = this;
            b.each(g, function (j, n) {
                i._renderItem(f, n)
            })
        },
        _renderItem: function (f, g) {
            return b("<li></li>").data("item.autocomplete", g).append(b("<a></a>").text(g.label)).appendTo(f)
        },
        _move: function (f, g) {
            if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(f) || this.menu.last() && /^next/.test(f)) {
                this.element.val(this.term);
                this.menu.deactivate()
            } else this.menu[f](g);
            else this.search(null, g)
        },
        widget: function () {
            return this.menu.element
        }
    });
    b.extend(b.ui.autocomplete, {
        escapeRegex: function (f) {
            return f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function (f, g) {
            var i = new RegExp(b.ui.autocomplete.escapeRegex(g), "i");
            return b.grep(f, function (j) {
                return i.test(j.label || j.value || j)
            })
        }
    })
})(jQuery);
(function (b) {
    b.widget("ui.menu", {
        _create: function () {
            var d = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (f) {
                if (b(f.target).closest(".ui-menu-item a").length) {
                    f.preventDefault();
                    d.select(f)
                }
            });
            this.refresh()
        },
        refresh: function () {
            var d = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (f) {
                d.activate(f, b(this).parent())
            }).mouseleave(function () {
                d.deactivate()
            })
        },
        activate: function (d, f) {
            this.deactivate();
            if (this.hasScroll()) {
                var g = f.offset().top - this.element.offset().top,
                    i = this.element.scrollTop(),
                    j = this.element.height();
                if (g < 0) this.element.scrollTop(i + g);
                else g >= j && this.element.scrollTop(i + g - j + f.height())
            }
            this.active = f.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", d, {
                item: f
            })
        },
        deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        },
        next: function (d) {
            this.move("next", ".ui-menu-item:first", d)
        },
        previous: function (d) {
            this.move("prev", ".ui-menu-item:last", d)
        },
        first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function (d, f, g) {
            if (this.active) {
                d = this.active[d + "All"](".ui-menu-item").eq(0);
                d.length ? this.activate(g, d) : this.activate(g, this.element.children(f))
            } else this.activate(g, this.element.children(f))
        },
        nextPage: function (d) {
            if (this.hasScroll()) if (!this.active || this.last()) this.activate(d, this.element.children(".ui-menu-item:first"));
            else {
                var f = this.active.offset().top,
                    g = this.element.height(),
                    i = this.element.children(".ui-menu-item").filter(function () {
                        var j = b(this).offset().top - f - g + b(this).height();
                        return j < 10 && j > -10
                    });
                i.length || (i = this.element.children(".ui-menu-item:last"));
                this.activate(d, i)
            } else this.activate(d, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        },
        previousPage: function (d) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(d, this.element.children(".ui-menu-item:last"));
            else {
                var f = this.active.offset().top,
                    g = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function () {
                    var i = b(this).offset().top - f + g - b(this).height();
                    return i < 10 && i > -10
                });
                result.length || (result = this.element.children(".ui-menu-item:first"));
                this.activate(d, result)
            } else this.activate(d, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        },
        hasScroll: function () {
            return this.element.height() < this.element[b.fn.prop ? "prop" : "attr"]("scrollHeight")
        },
        select: function (d) {
            this._trigger("selected", d, {
                item: this.active
            })
        }
    })
})(jQuery);
(function (b, d) {
    var f = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    },
        g = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        i = b.attrFn || {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true,
            click: true
        };
    b.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function (j) {
                    var n = b(this).css(j).offset().top;
                    n < 0 && b(this).css("top", j.top - n)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var j = this,
                n = j.options,
                c = n.title || "&#160;",
                l = b.ui.dialog.getTitleId(j.element),
                p = (j.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + n.dialogClass).css({
                    zIndex: n.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (z) {
                    if (n.closeOnEscape && z.keyCode && z.keyCode === b.ui.keyCode.ESCAPE) {
                        j.close(z);
                        z.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": l
                }).mousedown(function (z) {
                    j.moveToTop(false, z)
                });
            j.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(p);
            var w = (j.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(p),
                B = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                    B.addClass("ui-state-hover")
                }, function () {
                    B.removeClass("ui-state-hover")
                }).focus(function () {
                    B.addClass("ui-state-focus")
                }).blur(function () {
                    B.removeClass("ui-state-focus")
                }).click(function (z) {
                    j.close(z);
                    return false
                }).appendTo(w);
            (j.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(n.closeText).appendTo(B);
            b("<span></span>").addClass("ui-dialog-title").attr("id", l).html(c).prependTo(w);
            if (b.isFunction(n.beforeclose) && !b.isFunction(n.beforeClose)) n.beforeClose = n.beforeclose;
            w.find("*").add(w).disableSelection();
            n.draggable && b.fn.draggable && j._makeDraggable();
            n.resizable && b.fn.resizable && j._makeResizable();
            j._createButtons(n.buttons);
            j._isOpen = false;
            b.fn.bgiframe && p.bgiframe()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        destroy: function () {
            this.overlay && this.overlay.destroy();
            this.uiDialog.hide();
            this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            this.uiDialog.remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            return this
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (j) {
            var n = this,
                c, l;
            if (false !== n._trigger("beforeClose", j)) {
                n.overlay && n.overlay.destroy();
                n.uiDialog.unbind("keypress.ui-dialog");
                n._isOpen = false;
                if (n.options.hide) n.uiDialog.hide(n.options.hide, function () {
                    n._trigger("close", j)
                });
                else {
                    n.uiDialog.hide();
                    n._trigger("close", j)
                }
                b.ui.dialog.overlay.resize();
                if (n.options.modal) {
                    c = 0;
                    b(".ui-dialog").each(function () {
                        if (this !== n.uiDialog[0]) {
                            l = b(this).css("z-index");
                            isNaN(l) || (c = Math.max(c, l))
                        }
                    });
                    b.ui.dialog.maxZ = c
                }
                return n
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (j, n) {
            var c = this.options;
            if (c.modal && !j || !c.stack && !c.modal) return this._trigger("focus", n);
            if (c.zIndex > b.ui.dialog.maxZ) b.ui.dialog.maxZ = c.zIndex;
            if (this.overlay) {
                b.ui.dialog.maxZ += 1;
                this.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
            }
            j = {
                scrollTop: this.element.attr("scrollTop"),
                scrollLeft: this.element.attr("scrollLeft")
            };
            b.ui.dialog.maxZ += 1;
            this.uiDialog.css("z-index", b.ui.dialog.maxZ);
            this.element.attr(j);
            this._trigger("focus", n);
            return this
        },
        open: function () {
            if (!this._isOpen) {
                var j = this.options,
                    n = this.uiDialog;
                this.overlay = j.modal ? new b.ui.dialog.overlay(this) : null;
                this._size();
                this._position(j.position);
                n.show(j.show);
                this.moveToTop(true);
                j.modal && n.bind("keypress.ui-dialog", function (c) {
                    if (c.keyCode === b.ui.keyCode.TAB) {
                        var l = b(":tabbable", this),
                            p = l.filter(":first");
                        l = l.filter(":last");
                        if (c.target === l[0] && !c.shiftKey) {
                            p.focus(1);
                            return false
                        } else if (c.target === p[0] && c.shiftKey) {
                            l.focus(1);
                            return false
                        }
                    }
                });
                b(this.element.find(":tabbable").get().concat(n.find(".ui-dialog-buttonpane :tabbable").get().concat(n.get()))).eq(0).focus();
                this._isOpen = true;
                this._trigger("open");
                return this
            }
        },
        _createButtons: function (j) {
            var n = this,
                c = false,
                l = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                p = b("<div></div>").addClass("ui-dialog-buttonset").appendTo(l);
            n.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof j === "object" && j !== null && b.each(j, function () {
                return !(c = true)
            });
            if (c) {
                b.each(j, function (w, B) {
                    B = b.isFunction(B) ? {
                        click: B,
                        text: w
                    } : B;
                    var z = b('<button type="button"></button>').click(function () {
                        B.click.apply(n.element[0], arguments)
                    }).appendTo(p);
                    b.each(B, function (r, x) {
                        if (r !== "click") r in i ? z[r](x) : z.attr(r, x)
                    });
                    b.fn.button && z.button()
                });
                l.appendTo(n.uiDialog)
            }
        },
        _makeDraggable: function () {
            function j(w) {
                return {
                    position: w.position,
                    offset: w.offset
                }
            }
            var n = this,
                c = n.options,
                l = b(document),
                p;
            n.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (w, B) {
                    p = c.height === "auto" ? "auto" : b(this).height();
                    b(this).height(b(this).height()).addClass("ui-dialog-dragging");
                    n._trigger("dragStart", w, j(B))
                },
                drag: function (w, B) {
                    n._trigger("drag", w, j(B))
                },
                stop: function (w, B) {
                    c.position = [B.position.left - l.scrollLeft(), B.position.top - l.scrollTop()];
                    b(this).removeClass("ui-dialog-dragging").height(p);
                    n._trigger("dragStop", w, j(B));
                    b.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (j) {
            function n(w) {
                return {
                    originalPosition: w.originalPosition,
                    originalSize: w.originalSize,
                    position: w.position,
                    size: w.size
                }
            }
            j = j === d ? this.options.resizable : j;
            var c = this,
                l = c.options,
                p = c.uiDialog.css("position");
            j = typeof j === "string" ? j : "n,e,s,w,se,sw,ne,nw";
            c.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: c.element,
                maxWidth: l.maxWidth,
                maxHeight: l.maxHeight,
                minWidth: l.minWidth,
                minHeight: c._minHeight(),
                handles: j,
                start: function (w, B) {
                    b(this).addClass("ui-dialog-resizing");
                    c._trigger("resizeStart", w, n(B))
                },
                resize: function (w, B) {
                    c._trigger("resize", w, n(B))
                },
                stop: function (w, B) {
                    b(this).removeClass("ui-dialog-resizing");
                    l.height = b(this).height();
                    l.width = b(this).width();
                    c._trigger("resizeStop", w, n(B));
                    b.ui.dialog.overlay.resize()
                }
            }).css("position", p).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var j = this.options;
            return j.height === "auto" ? j.minHeight : Math.min(j.minHeight, j.height)
        },
        _position: function (j) {
            var n = [],
                c = [0, 0],
                l;
            if (j) {
                if (typeof j === "string" || typeof j === "object" && "0" in j) {
                    n = j.split ? j.split(" ") : [j[0], j[1]];
                    if (n.length === 1) n[1] = n[0];
                    b.each(["left", "top"], function (p, w) {
                        if (+n[p] === n[p]) {
                            c[p] = n[p];
                            n[p] = w
                        }
                    });
                    j = {
                        my: n.join(" "),
                        at: n.join(" "),
                        offset: c.join(" ")
                    }
                }
                j = b.extend({}, b.ui.dialog.prototype.options.position, j)
            } else j = b.ui.dialog.prototype.options.position;
            (l = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(b.extend({
                of: window
            }, j));
            l || this.uiDialog.hide()
        },
        _setOptions: function (j) {
            var n = this,
                c = {},
                l = false;
            b.each(j, function (p, w) {
                n._setOption(p, w);
                if (p in f) l = true;
                if (p in g) c[p] = w
            });
            l && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", c)
        },
        _setOption: function (j, n) {
            var c = this.uiDialog;
            switch (j) {
            case "beforeclose":
                j = "beforeClose";
                break;
            case "buttons":
                this._createButtons(n);
                break;
            case "closeText":
                this.uiDialogTitlebarCloseText.text("" + n);
                break;
            case "dialogClass":
                c.removeClass(this.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + n);
                break;
            case "disabled":
                n ? c.addClass("ui-dialog-disabled") : c.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                var l = c.is(":data(draggable)");
                l && !n && c.draggable("destroy");
                !l && n && this._makeDraggable();
                break;
            case "position":
                this._position(n);
                break;
            case "resizable":
                (l = c.is(":data(resizable)")) && !n && c.resizable("destroy");
                l && typeof n === "string" && c.resizable("option", "handles", n);
                !l && n !== false && this._makeResizable(n);
                break;
            case "title":
                b(".ui-dialog-title", this.uiDialogTitlebar).html("" + (n || "&#160;"));
                break
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _size: function () {
            var j = this.options,
                n, c, l = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (j.minWidth > j.width) j.width = j.minWidth;
            n = this.uiDialog.css({
                height: "auto",
                width: j.width
            }).height();
            c = Math.max(0, j.minHeight - n);
            if (j.height === "auto") if (b.support.minHeight) this.element.css({
                minHeight: c,
                height: "auto"
            });
            else {
                this.uiDialog.show();
                j = this.element.css("height", "auto").height();
                l || this.uiDialog.hide();
                this.element.height(Math.max(j, c))
            } else this.element.height(Math.max(j.height - n, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    b.extend(b.ui.dialog, {
        version: "1.8.14",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (j) {
            j = j.attr("id");
            if (!j) {
                this.uuid += 1;
                j = this.uuid
            }
            return "ui-dialog-title-" + j
        },
        overlay: function (j) {
            this.$el = b.ui.dialog.overlay.create(j)
        }
    });
    b.extend(b.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (j) {
            return j + ".dialog-overlay"
        }).join(" "),
        create: function (j) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    b.ui.dialog.overlay.instances.length && b(document).bind(b.ui.dialog.overlay.events, function (c) {
                        if (b(c.target).zIndex() < b.ui.dialog.overlay.maxZ) return false
                    })
                }, 1);
                b(document).bind("keydown.dialog-overlay", function (c) {
                    if (j.options.closeOnEscape && c.keyCode && c.keyCode === b.ui.keyCode.ESCAPE) {
                        j.close(c);
                        c.preventDefault()
                    }
                });
                b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
            }
            var n = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            b.fn.bgiframe && n.bgiframe();
            this.instances.push(n);
            return n
        },
        destroy: function (j) {
            var n = b.inArray(j, this.instances);
            n != -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]);
            this.instances.length === 0 && b([document, window]).unbind(".dialog-overlay");
            j.remove();
            var c = 0;
            b.each(this.instances, function () {
                c = Math.max(c, this.css("z-index"))
            });
            this.maxZ = c
        },
        height: function () {
            var j, n;
            if (b.browser.msie && b.browser.version < 7) {
                j = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return j < n ? b(window).height() + "px" : j + "px"
            } else return b(document).height() + "px"
        },
        width: function () {
            var j, n;
            if (b.browser.msie) {
                j = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return j < n ? b(window).width() + "px" : j + "px"
            } else return b(document).width() + "px"
        },
        resize: function () {
            var j = b([]);
            b.each(b.ui.dialog.overlay.instances, function () {
                j = j.add(this)
            });
            j.css({
                width: 0,
                height: 0
            }).css({
                width: b.ui.dialog.overlay.width(),
                height: b.ui.dialog.overlay.height()
            })
        }
    });
    b.extend(b.ui.dialog.overlay.prototype, {
        destroy: function () {
            b.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function (b, d) {
    function f() {
        return ++i
    }
    function g() {
        return ++j
    }
    var i = 0,
        j = 0;
    b.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function () {
            this._tabify(true)
        },
        _setOption: function (n, c) {
            if (n == "selected") this.options.collapsible && c == this.options.selected || this.select(c);
            else {
                this.options[n] = c;
                this._tabify()
            }
        },
        _tabId: function (n) {
            return n.title && n.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + f()
        },
        _sanitizeSelector: function (n) {
            return n.replace(/:/g, "\\:")
        },
        _cookie: function () {
            var n = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + g());
            return b.cookie.apply(null, [n].concat(b.makeArray(arguments)))
        },
        _ui: function (n, c) {
            return {
                tab: n,
                panel: c,
                index: this.anchors.index(n)
            }
        },
        _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var n = b(this);
                n.html(n.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function (n) {
            function c(P, W) {
                P.css("display", "");
                !b.support.opacity && W.opacity && P[0].style.removeAttribute("filter")
            }
            var l = this,
                p = this.options,
                w = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = b(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return b("a", this)[0]
            });
            this.panels = b([]);
            this.anchors.each(function (P, W) {
                var Y = b(W).attr("href"),
                    la = Y.split("#")[0],
                    ca;
                if (la && (la === location.toString().split("#")[0] || (ca = b("base")[0]) && la === ca.href)) {
                    Y = W.hash;
                    W.href = Y
                }
                if (w.test(Y)) l.panels = l.panels.add(l.element.find(l._sanitizeSelector(Y)));
                else if (Y && Y !== "#") {
                    b.data(W, "href.tabs", Y);
                    b.data(W, "load.tabs", Y.replace(/#.*$/, ""));
                    Y = l._tabId(W);
                    W.href = "#" + Y;
                    W = l.element.find("#" + Y);
                    if (!W.length) {
                        W = b(p.panelTemplate).attr("id", Y).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(l.panels[P - 1] || l.list);
                        W.data("destroy.tabs", true)
                    }
                    l.panels = l.panels.add(W)
                } else p.disabled.push(P)
            });
            if (n) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (p.selected === d) {
                    location.hash && this.anchors.each(function (P, W) {
                        if (W.hash == location.hash) {
                            p.selected = P;
                            return false
                        }
                    });
                    if (typeof p.selected !== "number" && p.cookie) p.selected = parseInt(l._cookie(), 10);
                    if (typeof p.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) p.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    p.selected = p.selected || (this.lis.length ? 0 : -1)
                } else if (p.selected === null) p.selected = -1;
                p.selected = p.selected >= 0 && this.anchors[p.selected] || p.selected < 0 ? p.selected : 0;
                p.disabled = b.unique(p.disabled.concat(b.map(this.lis.filter(".ui-state-disabled"), function (P) {
                    return l.lis.index(P)
                }))).sort();
                b.inArray(p.selected, p.disabled) != -1 && p.disabled.splice(b.inArray(p.selected, p.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (p.selected >= 0 && this.anchors.length) {
                    l.element.find(l._sanitizeSelector(l.anchors[p.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(p.selected).addClass("ui-tabs-selected ui-state-active");
                    l.element.queue("tabs", function () {
                        l._trigger("show", null, l._ui(l.anchors[p.selected], l.element.find(l._sanitizeSelector(l.anchors[p.selected].hash))[0]))
                    });
                    this.load(p.selected)
                }
                b(window).bind("unload", function () {
                    l.lis.add(l.anchors).unbind(".tabs");
                    l.lis = l.anchors = l.panels = null
                })
            } else p.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[p.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            p.cookie && this._cookie(p.selected, p.cookie);
            n = 0;
            for (var B; B = this.lis[n]; n++) b(B)[b.inArray(n, p.disabled) != -1 && !b(B).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            p.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (p.event !== "mouseover") {
                var z = function (P, W) {
                        W.is(":not(.ui-state-disabled)") && W.addClass("ui-state-" + P)
                    },
                    r = function (P, W) {
                        W.removeClass("ui-state-" + P)
                    };
                this.lis.bind("mouseover.tabs", function () {
                    z("hover", b(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    r("hover", b(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    z("focus", b(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    r("focus", b(this).closest("li"))
                })
            }
            var x, E;
            if (p.fx) if (b.isArray(p.fx)) {
                x = p.fx[0];
                E = p.fx[1]
            } else x = E = p.fx;
            var H = E ?
            function (P, W) {
                b(P).closest("li").addClass("ui-tabs-selected ui-state-active");
                W.hide().removeClass("ui-tabs-hide").animate(E, E.duration || "normal", function () {
                    c(W, E);
                    l._trigger("show", null, l._ui(P, W[0]))
                })
            } : function (P, W) {
                b(P).closest("li").addClass("ui-tabs-selected ui-state-active");
                W.removeClass("ui-tabs-hide");
                l._trigger("show", null, l._ui(P, W[0]))
            }, X = x ?
            function (P, W) {
                W.animate(x, x.duration || "normal", function () {
                    l.lis.removeClass("ui-tabs-selected ui-state-active");
                    W.addClass("ui-tabs-hide");
                    c(W, x);
                    l.element.dequeue("tabs")
                })
            } : function (P, W) {
                l.lis.removeClass("ui-tabs-selected ui-state-active");
                W.addClass("ui-tabs-hide");
                l.element.dequeue("tabs")
            };
            this.anchors.bind(p.event + ".tabs", function () {
                var P = this,
                    W = b(P).closest("li"),
                    Y = l.panels.filter(":not(.ui-tabs-hide)"),
                    la = l.element.find(l._sanitizeSelector(P.hash));
                if (W.hasClass("ui-tabs-selected") && !p.collapsible || W.hasClass("ui-state-disabled") || W.hasClass("ui-state-processing") || l.panels.filter(":animated").length || l._trigger("select", null, l._ui(this, la[0])) === false) {
                    this.blur();
                    return false
                }
                p.selected = l.anchors.index(this);
                l.abort();
                if (p.collapsible) if (W.hasClass("ui-tabs-selected")) {
                    p.selected = -1;
                    p.cookie && l._cookie(p.selected, p.cookie);
                    l.element.queue("tabs", function () {
                        X(P, Y)
                    }).dequeue("tabs");
                    this.blur();
                    return false
                } else if (!Y.length) {
                    p.cookie && l._cookie(p.selected, p.cookie);
                    l.element.queue("tabs", function () {
                        H(P, la)
                    });
                    l.load(l.anchors.index(this));
                    this.blur();
                    return false
                }
                p.cookie && l._cookie(p.selected, p.cookie);
                if (la.length) {
                    Y.length && l.element.queue("tabs", function () {
                        X(P, Y)
                    });
                    l.element.queue("tabs", function () {
                        H(P, la)
                    });
                    l.load(l.anchors.index(this))
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                b.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        },
        _getIndex: function (n) {
            if (typeof n == "string") n = this.anchors.index(this.anchors.filter("[href$=" + n + "]"));
            return n
        },
        destroy: function () {
            var n = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var c = b.data(this, "href.tabs");
                if (c) this.href = c;
                var l = b(this).unbind(".tabs");
                b.each(["href", "load", "cache"], function (p, w) {
                    l.removeData(w + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                b.data(this, "destroy.tabs") ? b(this).remove() : b(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            n.cookie && this._cookie(null, n.cookie);
            return this
        },
        add: function (n, c, l) {
            if (l === d) l = this.anchors.length;
            var p = this,
                w = this.options;
            c = b(w.tabTemplate.replace(/#\{href\}/g, n).replace(/#\{label\}/g, c));
            n = !n.indexOf("#") ? n.replace("#", "") : this._tabId(b("a", c)[0]);
            c.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var B = p.element.find("#" + n);
            B.length || (B = b(w.panelTemplate).attr("id", n).data("destroy.tabs", true));
            B.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (l >= this.lis.length) {
                c.appendTo(this.list);
                B.appendTo(this.list[0].parentNode)
            } else {
                c.insertBefore(this.lis[l]);
                B.insertBefore(this.panels[l])
            }
            w.disabled = b.map(w.disabled, function (z) {
                return z >= l ? ++z : z
            });
            this._tabify();
            if (this.anchors.length == 1) {
                w.selected = 0;
                c.addClass("ui-tabs-selected ui-state-active");
                B.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    p._trigger("show", null, p._ui(p.anchors[0], p.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[l], this.panels[l]));
            return this
        },
        remove: function (n) {
            n = this._getIndex(n);
            var c = this.options,
                l = this.lis.eq(n).remove(),
                p = this.panels.eq(n).remove();
            if (l.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(n + (n + 1 < this.anchors.length ? 1 : -1));
            c.disabled = b.map(b.grep(c.disabled, function (w) {
                return w != n
            }), function (w) {
                return w >= n ? --w : w
            });
            this._tabify();
            this._trigger("remove", null, this._ui(l.find("a")[0], p[0]));
            return this
        },
        enable: function (n) {
            n = this._getIndex(n);
            var c = this.options;
            if (b.inArray(n, c.disabled) != -1) {
                this.lis.eq(n).removeClass("ui-state-disabled");
                c.disabled = b.grep(c.disabled, function (l) {
                    return l != n
                });
                this._trigger("enable", null, this._ui(this.anchors[n], this.panels[n]));
                return this
            }
        },
        disable: function (n) {
            n = this._getIndex(n);
            var c = this.options;
            if (n != c.selected) {
                this.lis.eq(n).addClass("ui-state-disabled");
                c.disabled.push(n);
                c.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[n], this.panels[n]))
            }
            return this
        },
        select: function (n) {
            n = this._getIndex(n);
            if (n == -1) if (this.options.collapsible && this.options.selected != -1) n = this.options.selected;
            else return this;
            this.anchors.eq(n).trigger(this.options.event + ".tabs");
            return this
        },
        load: function (n) {
            n = this._getIndex(n);
            var c = this,
                l = this.options,
                p = this.anchors.eq(n)[0],
                w = b.data(p, "load.tabs");
            this.abort();
            if (!w || this.element.queue("tabs").length !== 0 && b.data(p, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(n).addClass("ui-state-processing");
                if (l.spinner) {
                    var B = b("span", p);
                    B.data("label.tabs", B.html()).html(l.spinner)
                }
                this.xhr = b.ajax(b.extend({}, l.ajaxOptions, {
                    url: w,
                    success: function (z, r) {
                        c.element.find(c._sanitizeSelector(p.hash)).html(z);
                        c._cleanup();
                        l.cache && b.data(p, "cache.tabs", true);
                        c._trigger("load", null, c._ui(c.anchors[n], c.panels[n]));
                        try {
                            l.ajaxOptions.success(z, r)
                        } catch (x) {}
                    },
                    error: function (z, r) {
                        c._cleanup();
                        c._trigger("load", null, c._ui(c.anchors[n], c.panels[n]));
                        try {
                            l.ajaxOptions.error(z, r, n, p)
                        } catch (x) {}
                    }
                }));
                c.element.dequeue("tabs");
                return this
            }
        },
        abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function (n, c) {
            this.anchors.eq(n).removeData("cache.tabs").data("load.tabs", c);
            return this
        },
        length: function () {
            return this.anchors.length
        }
    });
    b.extend(b.ui.tabs, {
        version: "1.8.14"
    });
    b.extend(b.ui.tabs.prototype, {
        rotation: null,
        rotate: function (n, c) {
            var l = this,
                p = this.options,
                w = l._rotate || (l._rotate = function (B) {
                    clearTimeout(l.rotation);
                    l.rotation = setTimeout(function () {
                        var z = p.selected;
                        l.select(++z < l.anchors.length ? z : 0)
                    }, n);
                    B && B.stopPropagation()
                });
            c = l._unrotate || (l._unrotate = !c ?
            function (B) {
                B.clientX && l.rotate(null)
            } : function () {
                t = p.selected;
                w()
            });
            if (n) {
                this.element.bind("tabsshow", w);
                this.anchors.bind(p.event + ".tabs", c);
                w()
            } else {
                clearTimeout(l.rotation);
                this.element.unbind("tabsshow", w);
                this.anchors.unbind(p.event + ".tabs", c);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (b, d) {
    function f() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        b.extend(this._defaults, this.regional[""]);
        this.dpDiv = g(b('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    function g(c) {
        return c.bind("mouseout", function (l) {
            l = b(l.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            l.length && l.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function (l) {
            l = b(l.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            if (!(b.datepicker._isDisabledDatepicker(n.inline ? c.parent()[0] : n.input[0]) || !l.length)) {
                l.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                l.addClass("ui-state-hover");
                l.hasClass("ui-datepicker-prev") && l.addClass("ui-datepicker-prev-hover");
                l.hasClass("ui-datepicker-next") && l.addClass("ui-datepicker-next-hover")
            }
        })
    }
    function i(c, l) {
        b.extend(c, l);
        for (var p in l) if (l[p] == null || l[p] == d) c[p] = l[p];
        return c
    }
    b.extend(b.ui, {
        datepicker: {
            version: "1.8.14"
        }
    });
    var j = (new Date).getTime(),
        n;
    b.extend(f.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (c) {
            i(this._defaults, c || {});
            return this
        },
        _attachDatepicker: function (c, l) {
            var p = null;
            for (var w in this._defaults) {
                var B = c.getAttribute("date:" + w);
                if (B) {
                    p = p || {};
                    try {
                        p[w] = eval(B)
                    } catch (z) {
                        p[w] = B
                    }
                }
            }
            w = c.nodeName.toLowerCase();
            B = w == "div" || w == "span";
            if (!c.id) {
                this.uuid += 1;
                c.id = "dp" + this.uuid
            }
            var r = this._newInst(b(c), B);
            r.settings = b.extend({}, l || {}, p || {});
            if (w == "input") this._connectDatepicker(c, r);
            else B && this._inlineDatepicker(c, r)
        },
        _newInst: function (c, l) {
            return {
                id: c[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: c,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: l,
                dpDiv: !l ? this.dpDiv : g(b('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (c, l) {
            var p = b(c);
            l.append = b([]);
            l.trigger = b([]);
            if (!p.hasClass(this.markerClassName)) {
                this._attachments(p, l);
                p.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (w, B, z) {
                    l.settings[B] = z
                }).bind("getData.datepicker", function (w, B) {
                    return this._get(l, B)
                });
                this._autoSize(l);
                b.data(c, "datepicker", l)
            }
        },
        _attachments: function (c, l) {
            var p = this._get(l, "appendText"),
                w = this._get(l, "isRTL");
            l.append && l.append.remove();
            if (p) {
                l.append = b('<span class="' + this._appendClass + '">' + p + "</span>");
                c[w ? "before" : "after"](l.append)
            }
            c.unbind("focus", this._showDatepicker);
            l.trigger && l.trigger.remove();
            p = this._get(l, "showOn");
            if (p == "focus" || p == "both") c.focus(this._showDatepicker);
            if (p == "button" || p == "both") {
                p = this._get(l, "buttonText");
                var B = this._get(l, "buttonImage");
                l.trigger = b(this._get(l, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
                    src: B,
                    alt: p,
                    title: p
                }) : b('<button type="button"></button>').addClass(this._triggerClass).html(B == "" ? p : b("<img/>").attr({
                    src: B,
                    alt: p,
                    title: p
                })));
                c[w ? "before" : "after"](l.trigger);
                l.trigger.click(function () {
                    b.datepicker._datepickerShowing && b.datepicker._lastInput == c[0] ? b.datepicker._hideDatepicker() : b.datepicker._showDatepicker(c[0]);
                    return false
                })
            }
        },
        _autoSize: function (c) {
            if (this._get(c, "autoSize") && !c.inline) {
                var l = new Date(2009, 11, 20),
                    p = this._get(c, "dateFormat");
                if (p.match(/[DM]/)) {
                    var w = function (B) {
                            for (var z = 0, r = 0, x = 0; x < B.length; x++) if (B[x].length > z) {
                                z = B[x].length;
                                r = x
                            }
                            return r
                        };
                    l.setMonth(w(this._get(c, p.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    l.setDate(w(this._get(c, p.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - l.getDay())
                }
                c.input.attr("size", this._formatDate(c, l).length)
            }
        },
        _inlineDatepicker: function (c, l) {
            var p = b(c);
            if (!p.hasClass(this.markerClassName)) {
                p.addClass(this.markerClassName).append(l.dpDiv).bind("setData.datepicker", function (w, B, z) {
                    l.settings[B] = z
                }).bind("getData.datepicker", function (w, B) {
                    return this._get(l, B)
                });
                b.data(c, "datepicker", l);
                this._setDate(l, this._getDefaultDate(l), true);
                this._updateDatepicker(l);
                this._updateAlternate(l);
                l.dpDiv.show()
            }
        },
        _dialogDatepicker: function (c, l, p, w, B) {
            c = this._dialogInst;
            if (!c) {
                this.uuid += 1;
                this._dialogInput = b('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                b("body").append(this._dialogInput);
                c = this._dialogInst = this._newInst(this._dialogInput, false);
                c.settings = {};
                b.data(this._dialogInput[0], "datepicker", c)
            }
            i(c.settings, w || {});
            l = l && l.constructor == Date ? this._formatDate(c, l) : l;
            this._dialogInput.val(l);
            this._pos = B ? B.length ? B : [B.pageX, B.pageY] : null;
            if (!this._pos) this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            c.settings.onSelect = p;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            b.blockUI && b.blockUI(this.dpDiv);
            b.data(this._dialogInput[0], "datepicker", c);
            return this
        },
        _destroyDatepicker: function (c) {
            var l = b(c),
                p = b.data(c, "datepicker");
            if (l.hasClass(this.markerClassName)) {
                var w = c.nodeName.toLowerCase();
                b.removeData(c, "datepicker");
                if (w == "input") {
                    p.append.remove();
                    p.trigger.remove();
                    l.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else if (w == "div" || w == "span") l.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (c) {
            var l = b(c),
                p = b.data(c, "datepicker");
            if (l.hasClass(this.markerClassName)) {
                var w = c.nodeName.toLowerCase();
                if (w == "input") {
                    c.disabled = false;
                    p.trigger.filter("button").each(function () {
                        this.disabled = false
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
                } else if (w == "div" || w == "span") {
                    l = l.children("." + this._inlineClass);
                    l.children().removeClass("ui-state-disabled");
                    l.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = b.map(this._disabledInputs, function (B) {
                    return B == c ? null : B
                })
            }
        },
        _disableDatepicker: function (c) {
            var l = b(c),
                p = b.data(c, "datepicker");
            if (l.hasClass(this.markerClassName)) {
                var w = c.nodeName.toLowerCase();
                if (w == "input") {
                    c.disabled = true;
                    p.trigger.filter("button").each(function () {
                        this.disabled = true
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
                } else if (w == "div" || w == "span") {
                    l = l.children("." + this._inlineClass);
                    l.children().addClass("ui-state-disabled");
                    l.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = b.map(this._disabledInputs, function (B) {
                    return B == c ? null : B
                });
                this._disabledInputs[this._disabledInputs.length] = c
            }
        },
        _isDisabledDatepicker: function (c) {
            if (!c) return false;
            for (var l = 0; l < this._disabledInputs.length; l++) if (this._disabledInputs[l] == c) return true;
            return false
        },
        _getInst: function (c) {
            try {
                return b.data(c, "datepicker")
            } catch (l) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function (c, l, p) {
            var w = this._getInst(c);
            if (arguments.length == 2 && typeof l == "string") return l == "defaults" ? b.extend({}, b.datepicker._defaults) : w ? l == "all" ? b.extend({}, w.settings) : this._get(w, l) : null;
            var B = l || {};
            if (typeof l == "string") {
                B = {};
                B[l] = p
            }
            if (w) {
                this._curInst == w && this._hideDatepicker();
                var z = this._getDateDatepicker(c, true),
                    r = this._getMinMaxDate(w, "min"),
                    x = this._getMinMaxDate(w, "max");
                i(w.settings, B);
                if (r !== null && B.dateFormat !== d && B.minDate === d) w.settings.minDate = this._formatDate(w, r);
                if (x !== null && B.dateFormat !== d && B.maxDate === d) w.settings.maxDate = this._formatDate(w, x);
                this._attachments(b(c), w);
                this._autoSize(w);
                this._setDate(w, z);
                this._updateAlternate(w);
                this._updateDatepicker(w)
            }
        },
        _changeDatepicker: function (c, l, p) {
            this._optionDatepicker(c, l, p)
        },
        _refreshDatepicker: function (c) {
            (c = this._getInst(c)) && this._updateDatepicker(c)
        },
        _setDateDatepicker: function (c, l) {
            if (c = this._getInst(c)) {
                this._setDate(c, l);
                this._updateDatepicker(c);
                this._updateAlternate(c)
            }
        },
        _getDateDatepicker: function (c, l) {
            (c = this._getInst(c)) && !c.inline && this._setDateFromField(c, l);
            return c ? this._getDate(c) : null
        },
        _doKeyDown: function (c) {
            var l = b.datepicker._getInst(c.target),
                p = true,
                w = l.dpDiv.is(".ui-datepicker-rtl");
            l._keyEvent = true;
            if (b.datepicker._datepickerShowing) switch (c.keyCode) {
            case 9:
                b.datepicker._hideDatepicker();
                p = false;
                break;
            case 13:
                p = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", l.dpDiv);
                p[0] ? b.datepicker._selectDay(c.target, l.selectedMonth, l.selectedYear, p[0]) : b.datepicker._hideDatepicker();
                return false;
            case 27:
                b.datepicker._hideDatepicker();
                break;
            case 33:
                b.datepicker._adjustDate(c.target, c.ctrlKey ? -b.datepicker._get(l, "stepBigMonths") : -b.datepicker._get(l, "stepMonths"), "M");
                break;
            case 34:
                b.datepicker._adjustDate(c.target, c.ctrlKey ? +b.datepicker._get(l, "stepBigMonths") : +b.datepicker._get(l, "stepMonths"), "M");
                break;
            case 35:
                if (c.ctrlKey || c.metaKey) b.datepicker._clearDate(c.target);
                p = c.ctrlKey || c.metaKey;
                break;
            case 36:
                if (c.ctrlKey || c.metaKey) b.datepicker._gotoToday(c.target);
                p = c.ctrlKey || c.metaKey;
                break;
            case 37:
                if (c.ctrlKey || c.metaKey) b.datepicker._adjustDate(c.target, w ? +1 : -1, "D");
                p = c.ctrlKey || c.metaKey;
                if (c.originalEvent.altKey) b.datepicker._adjustDate(c.target, c.ctrlKey ? -b.datepicker._get(l, "stepBigMonths") : -b.datepicker._get(l, "stepMonths"), "M");
                break;
            case 38:
                if (c.ctrlKey || c.metaKey) b.datepicker._adjustDate(c.target, -7, "D");
                p = c.ctrlKey || c.metaKey;
                break;
            case 39:
                if (c.ctrlKey || c.metaKey) b.datepicker._adjustDate(c.target, w ? -1 : +1, "D");
                p = c.ctrlKey || c.metaKey;
                if (c.originalEvent.altKey) b.datepicker._adjustDate(c.target, c.ctrlKey ? +b.datepicker._get(l, "stepBigMonths") : +b.datepicker._get(l, "stepMonths"), "M");
                break;
            case 40:
                if (c.ctrlKey || c.metaKey) b.datepicker._adjustDate(c.target, +7, "D");
                p = c.ctrlKey || c.metaKey;
                break;
            default:
                p = false
            } else if (c.keyCode == 36 && c.ctrlKey) b.datepicker._showDatepicker(this);
            else p = false;
            if (p) {
                c.preventDefault();
                c.stopPropagation()
            }
        },
        _doKeyPress: function (c) {
            var l = b.datepicker._getInst(c.target);
            if (b.datepicker._get(l, "constrainInput")) {
                l = b.datepicker._possibleChars(b.datepicker._get(l, "dateFormat"));
                var p = String.fromCharCode(c.charCode == d ? c.keyCode : c.charCode);
                return c.ctrlKey || c.metaKey || p < " " || !l || l.indexOf(p) > -1
            }
        },
        _doKeyUp: function (c) {
            c = b.datepicker._getInst(c.target);
            if (c.input.val() != c.lastVal) try {
                if (b.datepicker.parseDate(b.datepicker._get(c, "dateFormat"), c.input ? c.input.val() : null, b.datepicker._getFormatConfig(c))) {
                    b.datepicker._setDateFromField(c);
                    b.datepicker._updateAlternate(c);
                    b.datepicker._updateDatepicker(c)
                }
            } catch (l) {
                b.datepicker.log(l)
            }
            return true
        },
        _showDatepicker: function (c) {
            c = c.target || c;
            if (c.nodeName.toLowerCase() != "input") c = b("input", c.parentNode)[0];
            if (!(b.datepicker._isDisabledDatepicker(c) || b.datepicker._lastInput == c)) {
                var l = b.datepicker._getInst(c);
                if (b.datepicker._curInst && b.datepicker._curInst != l) {
                    b.datepicker._datepickerShowing && b.datepicker._triggerOnClose(b.datepicker._curInst);
                    b.datepicker._curInst.dpDiv.stop(true, true)
                }
                var p = b.datepicker._get(l, "beforeShow");
                i(l.settings, p ? p.apply(c, [c, l]) : {});
                l.lastVal = null;
                b.datepicker._lastInput = c;
                b.datepicker._setDateFromField(l);
                if (b.datepicker._inDialog) c.value = "";
                if (!b.datepicker._pos) {
                    b.datepicker._pos = b.datepicker._findPos(c);
                    b.datepicker._pos[1] += c.offsetHeight
                }
                var w = false;
                b(c).parents().each(function () {
                    w |= b(this).css("position") == "fixed";
                    return !w
                });
                if (w && b.browser.opera) {
                    b.datepicker._pos[0] -= document.documentElement.scrollLeft;
                    b.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                p = {
                    left: b.datepicker._pos[0],
                    top: b.datepicker._pos[1]
                };
                b.datepicker._pos = null;
                l.dpDiv.empty();
                l.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                });
                b.datepicker._updateDatepicker(l);
                p = b.datepicker._checkOffset(l, p, w);
                l.dpDiv.css({
                    position: b.datepicker._inDialog && b.blockUI ? "static" : w ? "fixed" : "absolute",
                    display: "none",
                    left: p.left + "px",
                    top: p.top + "px"
                });
                if (!l.inline) {
                    p = b.datepicker._get(l, "showAnim");
                    var B = b.datepicker._get(l, "duration"),
                        z = function () {
                            var r = l.dpDiv.find("iframe.ui-datepicker-cover");
                            if (r.length) {
                                var x = b.datepicker._getBorders(l.dpDiv);
                                r.css({
                                    left: -x[0],
                                    top: -x[1],
                                    width: l.dpDiv.outerWidth(),
                                    height: l.dpDiv.outerHeight()
                                })
                            }
                        };
                    l.dpDiv.zIndex(b(c).zIndex() + 1);
                    b.datepicker._datepickerShowing = true;
                    b.effects && b.effects[p] ? l.dpDiv.show(p, b.datepicker._get(l, "showOptions"), B, z) : l.dpDiv[p || "show"](p ? B : null, z);
                    if (!p || !B) z();
                    l.input.is(":visible") && !l.input.is(":disabled") && l.input.focus();
                    b.datepicker._curInst = l
                }
            }
        },
        _updateDatepicker: function (c) {
            this.maxRows = 4;
            var l = b.datepicker._getBorders(c.dpDiv);
            n = c;
            c.dpDiv.empty().append(this._generateHTML(c));
            var p = c.dpDiv.find("iframe.ui-datepicker-cover");
            p.length && p.css({
                left: -l[0],
                top: -l[1],
                width: c.dpDiv.outerWidth(),
                height: c.dpDiv.outerHeight()
            });
            c.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            l = this._getNumberOfMonths(c);
            p = l[1];
            c.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            p > 1 && c.dpDiv.addClass("ui-datepicker-multi-" + p).css("width", 17 * p + "em");
            c.dpDiv[(l[0] != 1 || l[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            c.dpDiv[(this._get(c, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            c == b.datepicker._curInst && b.datepicker._datepickerShowing && c.input && c.input.is(":visible") && !c.input.is(":disabled") && c.input[0] != document.activeElement && c.input.focus();
            if (c.yearshtml) {
                var w = c.yearshtml;
                setTimeout(function () {
                    w === c.yearshtml && c.yearshtml && c.dpDiv.find("select.ui-datepicker-year:first").replaceWith(c.yearshtml);
                    w = c.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (c) {
            var l = function (p) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[p] || p
                };
            return [parseFloat(l(c.css("border-left-width"))), parseFloat(l(c.css("border-top-width")))]
        },
        _checkOffset: function (c, l, p) {
            var w = c.dpDiv.outerWidth(),
                B = c.dpDiv.outerHeight(),
                z = c.input ? c.input.outerWidth() : 0,
                r = c.input ? c.input.outerHeight() : 0,
                x = document.documentElement.clientWidth + b(document).scrollLeft(),
                E = document.documentElement.clientHeight + b(document).scrollTop();
            l.left -= this._get(c, "isRTL") ? w - z : 0;
            l.left -= p && l.left == c.input.offset().left ? b(document).scrollLeft() : 0;
            l.top -= p && l.top == c.input.offset().top + r ? b(document).scrollTop() : 0;
            l.left -= Math.min(l.left, l.left + w > x && x > w ? Math.abs(l.left + w - x) : 0);
            l.top -= Math.min(l.top, l.top + B > E && E > B ? Math.abs(B + r) : 0);
            return l
        },
        _findPos: function (c) {
            for (var l = this._get(this._getInst(c), "isRTL"); c && (c.type == "hidden" || c.nodeType != 1 || b.expr.filters.hidden(c));) c = c[l ? "previousSibling" : "nextSibling"];
            c = b(c).offset();
            return [c.left, c.top]
        },
        _triggerOnClose: function (c) {
            var l = this._get(c, "onClose");
            if (l) l.apply(c.input ? c.input[0] : null, [c.input ? c.input.val() : "", c])
        },
        _hideDatepicker: function (c) {
            var l = this._curInst;
            if (!(!l || c && l != b.data(c, "datepicker"))) if (this._datepickerShowing) {
                c = this._get(l, "showAnim");
                var p = this._get(l, "duration"),
                    w = function () {
                        b.datepicker._tidyDialog(l);
                        this._curInst = null
                    };
                b.effects && b.effects[c] ? l.dpDiv.hide(c, b.datepicker._get(l, "showOptions"), p, w) : l.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? p : null, w);
                c || w();
                b.datepicker._triggerOnClose(l);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (b.blockUI) {
                        b.unblockUI();
                        b("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (c) {
            c.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (c) {
            if (b.datepicker._curInst) {
                c = b(c.target);
                c[0].id != b.datepicker._mainDivId && c.parents("#" + b.datepicker._mainDivId).length == 0 && !c.hasClass(b.datepicker.markerClassName) && !c.hasClass(b.datepicker._triggerClass) && b.datepicker._datepickerShowing && !(b.datepicker._inDialog && b.blockUI) && b.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (c, l, p) {
            c = b(c);
            var w = this._getInst(c[0]);
            if (!this._isDisabledDatepicker(c[0])) {
                this._adjustInstDate(w, l + (p == "M" ? this._get(w, "showCurrentAtPos") : 0), p);
                this._updateDatepicker(w)
            }
        },
        _gotoToday: function (c) {
            c = b(c);
            var l = this._getInst(c[0]);
            if (this._get(l, "gotoCurrent") && l.currentDay) {
                l.selectedDay = l.currentDay;
                l.drawMonth = l.selectedMonth = l.currentMonth;
                l.drawYear = l.selectedYear = l.currentYear
            } else {
                var p = new Date;
                l.selectedDay = p.getDate();
                l.drawMonth = l.selectedMonth = p.getMonth();
                l.drawYear = l.selectedYear = p.getFullYear()
            }
            this._notifyChange(l);
            this._adjustDate(c)
        },
        _selectMonthYear: function (c, l, p) {
            c = b(c);
            var w = this._getInst(c[0]);
            w._selectingMonthYear = false;
            w["selected" + (p == "M" ? "Month" : "Year")] = w["draw" + (p == "M" ? "Month" : "Year")] = parseInt(l.options[l.selectedIndex].value, 10);
            this._notifyChange(w);
            this._adjustDate(c)
        },
        _clickMonthYear: function (c) {
            var l = this._getInst(b(c)[0]);
            l.input && l._selectingMonthYear && setTimeout(function () {
                l.input.focus()
            }, 0);
            l._selectingMonthYear = !l._selectingMonthYear
        },
        _selectDay: function (c, l, p, w) {
            var B = b(c);
            if (!(b(w).hasClass(this._unselectableClass) || this._isDisabledDatepicker(B[0]))) {
                B = this._getInst(B[0]);
                B.selectedDay = B.currentDay = b("a", w).html();
                B.selectedMonth = B.currentMonth = l;
                B.selectedYear = B.currentYear = p;
                this._selectDate(c, this._formatDate(B, B.currentDay, B.currentMonth, B.currentYear))
            }
        },
        _clearDate: function (c) {
            c = b(c);
            this._getInst(c[0]);
            this._selectDate(c, "")
        },
        _selectDate: function (c, l) {
            c = this._getInst(b(c)[0]);
            l = l != null ? l : this._formatDate(c);
            c.input && c.input.val(l);
            this._updateAlternate(c);
            var p = this._get(c, "onSelect");
            if (p) p.apply(c.input ? c.input[0] : null, [l, c]);
            else c.input && c.input.trigger("change");
            if (c.inline) this._updateDatepicker(c);
            else {
                this._hideDatepicker();
                this._lastInput = c.input[0];
                typeof c.input[0] != "object" && c.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (c) {
            var l = this._get(c, "altField");
            if (l) {
                var p = this._get(c, "altFormat") || this._get(c, "dateFormat"),
                    w = this._getDate(c),
                    B = this.formatDate(p, w, this._getFormatConfig(c));
                b(l).each(function () {
                    b(this).val(B)
                })
            }
        },
        noWeekends: function (c) {
            c = c.getDay();
            return [c > 0 && c < 6, ""]
        },
        iso8601Week: function (c) {
            c = new Date(c.getTime());
            c.setDate(c.getDate() + 4 - (c.getDay() || 7));
            var l = c.getTime();
            c.setMonth(0);
            c.setDate(1);
            return Math.floor(Math.round((l - c) / 864E5) / 7) + 1
        },
        parseDate: function (c, l, p) {
            if (c == null || l == null) throw "Invalid arguments";
            l = typeof l == "object" ? l.toString() : l + "";
            if (l == "") return null;
            var w = (p ? p.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            w = typeof w != "string" ? w : (new Date).getFullYear() % 100 + parseInt(w, 10);
            for (var B = (p ? p.dayNamesShort : null) || this._defaults.dayNamesShort, z = (p ? p.dayNames : null) || this._defaults.dayNames, r = (p ? p.monthNamesShort : null) || this._defaults.monthNamesShort, x = (p ? p.monthNames : null) || this._defaults.monthNames, E = p = -1, H = -1, X = -1, P = false, W = function (xa) {
                    (xa = Ja + 1 < c.length && c.charAt(Ja + 1) == xa) && Ja++;
                    return xa
                }, Y = function (xa) {
                    var oa = W(xa);
                    xa = new RegExp("^\\d{1," + (xa == "@" ? 14 : xa == "!" ? 20 : xa == "y" && oa ? 4 : xa == "o" ? 3 : 2) + "}");
                    xa = l.substring(ra).match(xa);
                    if (!xa) throw "Missing number at position " + ra;
                    ra += xa[0].length;
                    return parseInt(xa[0], 10)
                }, la = function (xa, oa, Ba) {
                    xa = b.map(W(xa) ? Ba : oa, function (Da, Ca) {
                        return [[Ca, Da]]
                    }).sort(function (Da, Ca) {
                        return -(Da[1].length - Ca[1].length)
                    });
                    var Ya = -1;
                    b.each(xa, function (Da, Ca) {
                        Da = Ca[1];
                        if (l.substr(ra, Da.length).toLowerCase() == Da.toLowerCase()) {
                            Ya = Ca[0];
                            ra += Da.length;
                            return false
                        }
                    });
                    if (Ya != -1) return Ya + 1;
                    else throw "Unknown name at position " + ra;
                }, ca = function () {
                    if (l.charAt(ra) != c.charAt(Ja)) throw "Unexpected literal at position " + ra;
                    ra++
                }, ra = 0, Ja = 0; Ja < c.length; Ja++) if (P) if (c.charAt(Ja) == "'" && !W("'")) P = false;
            else ca();
            else switch (c.charAt(Ja)) {
            case "d":
                H = Y("d");
                break;
            case "D":
                la("D", B, z);
                break;
            case "o":
                X = Y("o");
                break;
            case "m":
                E = Y("m");
                break;
            case "M":
                E = la("M", r, x);
                break;
            case "y":
                p = Y("y");
                break;
            case "@":
                var sa = new Date(Y("@"));
                p = sa.getFullYear();
                E = sa.getMonth() + 1;
                H = sa.getDate();
                break;
            case "!":
                sa = new Date((Y("!") - this._ticksTo1970) / 1E4);
                p = sa.getFullYear();
                E = sa.getMonth() + 1;
                H = sa.getDate();
                break;
            case "'":
                if (W("'")) ca();
                else P = true;
                break;
            default:
                ca()
            }
            if (ra < l.length) throw "Extra/unparsed characters found in date: " + l.substring(ra);
            if (p == -1) p = (new Date).getFullYear();
            else if (p < 100) p += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (p <= w ? 0 : -100);
            if (X > -1) {
                E = 1;
                H = X;
                do {
                    w = this._getDaysInMonth(p, E - 1);
                    if (H <= w) break;
                    E++;
                    H -= w
                } while (1)
            }
            sa = this._daylightSavingAdjust(new Date(p, E - 1, H));
            if (sa.getFullYear() != p || sa.getMonth() + 1 != E || sa.getDate() != H) throw "Invalid date";
            return sa
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function (c, l, p) {
            if (!l) return "";
            var w = (p ? p.dayNamesShort : null) || this._defaults.dayNamesShort,
                B = (p ? p.dayNames : null) || this._defaults.dayNames,
                z = (p ? p.monthNamesShort : null) || this._defaults.monthNamesShort;
            p = (p ? p.monthNames : null) || this._defaults.monthNames;
            var r = function (W) {
                    (W = P + 1 < c.length && c.charAt(P + 1) == W) && P++;
                    return W
                },
                x = function (W, Y, la) {
                    Y = "" + Y;
                    if (r(W)) for (; Y.length < la;) Y = "0" + Y;
                    return Y
                },
                E = function (W, Y, la, ca) {
                    return r(W) ? ca[Y] : la[Y]
                },
                H = "",
                X = false;
            if (l) for (var P = 0; P < c.length; P++) if (X) if (c.charAt(P) == "'" && !r("'")) X = false;
            else H += c.charAt(P);
            else switch (c.charAt(P)) {
            case "d":
                H += x("d", l.getDate(), 2);
                break;
            case "D":
                H += E("D", l.getDay(), w, B);
                break;
            case "o":
                H += x("o", Math.round(((new Date(l.getFullYear(), l.getMonth(), l.getDate())).getTime() - (new Date(l.getFullYear(), 0, 0)).getTime()) / 864E5), 3);
                break;
            case "m":
                H += x("m", l.getMonth() + 1, 2);
                break;
            case "M":
                H += E("M", l.getMonth(), z, p);
                break;
            case "y":
                H += r("y") ? l.getFullYear() : (l.getYear() % 100 < 10 ? "0" : "") + l.getYear() % 100;
                break;
            case "@":
                H += l.getTime();
                break;
            case "!":
                H += l.getTime() * 1E4 + this._ticksTo1970;
                break;
            case "'":
                if (r("'")) H += "'";
                else X = true;
                break;
            default:
                H += c.charAt(P)
            }
            return H
        },
        _possibleChars: function (c) {
            for (var l = "", p = false, w = function (z) {
                    (z = B + 1 < c.length && c.charAt(B + 1) == z) && B++;
                    return z
                }, B = 0; B < c.length; B++) if (p) if (c.charAt(B) == "'" && !w("'")) p = false;
            else l += c.charAt(B);
            else switch (c.charAt(B)) {
            case "d":
            case "m":
            case "y":
            case "@":
                l += "0123456789";
                break;
            case "D":
            case "M":
                return null;
            case "'":
                if (w("'")) l += "'";
                else p = true;
                break;
            default:
                l += c.charAt(B)
            }
            return l
        },
        _get: function (c, l) {
            return c.settings[l] !== d ? c.settings[l] : this._defaults[l]
        },
        _setDateFromField: function (c, l) {
            if (c.input.val() != c.lastVal) {
                var p = this._get(c, "dateFormat"),
                    w = c.lastVal = c.input ? c.input.val() : null,
                    B, z;
                B = z = this._getDefaultDate(c);
                var r = this._getFormatConfig(c);
                try {
                    B = this.parseDate(p, w, r) || z
                } catch (x) {
                    this.log(x);
                    w = l ? "" : w
                }
                c.selectedDay = B.getDate();
                c.drawMonth = c.selectedMonth = B.getMonth();
                c.drawYear = c.selectedYear = B.getFullYear();
                c.currentDay = w ? B.getDate() : 0;
                c.currentMonth = w ? B.getMonth() : 0;
                c.currentYear = w ? B.getFullYear() : 0;
                this._adjustInstDate(c)
            }
        },
        _getDefaultDate: function (c) {
            return this._restrictMinMax(c, this._determineDate(c, this._get(c, "defaultDate"), new Date))
        },
        _determineDate: function (c, l, p) {
            var w = function (z) {
                    var r = new Date;
                    r.setDate(r.getDate() + z);
                    return r
                },
                B = function (z) {
                    try {
                        return b.datepicker.parseDate(b.datepicker._get(c, "dateFormat"), z, b.datepicker._getFormatConfig(c))
                    } catch (r) {}
                    var x = (z.toLowerCase().match(/^c/) ? b.datepicker._getDate(c) : null) || new Date,
                        E = x.getFullYear(),
                        H = x.getMonth();
                    x = x.getDate();
                    for (var X = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, P = X.exec(z); P;) {
                        switch (P[2] || "d") {
                        case "d":
                        case "D":
                            x += parseInt(P[1], 10);
                            break;
                        case "w":
                        case "W":
                            x += parseInt(P[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            H += parseInt(P[1], 10);
                            x = Math.min(x, b.datepicker._getDaysInMonth(E, H));
                            break;
                        case "y":
                        case "Y":
                            E += parseInt(P[1], 10);
                            x = Math.min(x, b.datepicker._getDaysInMonth(E, H));
                            break
                        }
                        P = X.exec(z)
                    }
                    return new Date(E, H, x)
                };
            if (l = (l = l == null || l === "" ? p : typeof l == "string" ? B(l) : typeof l == "number" ? isNaN(l) ? p : w(l) : new Date(l.getTime())) && l.toString() == "Invalid Date" ? p : l) {
                l.setHours(0);
                l.setMinutes(0);
                l.setSeconds(0);
                l.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(l)
        },
        _daylightSavingAdjust: function (c) {
            if (!c) return null;
            c.setHours(c.getHours() > 12 ? c.getHours() + 2 : 0);
            return c
        },
        _setDate: function (c, l, p) {
            var w = !l,
                B = c.selectedMonth,
                z = c.selectedYear;
            l = this._restrictMinMax(c, this._determineDate(c, l, new Date));
            c.selectedDay = c.currentDay = l.getDate();
            c.drawMonth = c.selectedMonth = c.currentMonth = l.getMonth();
            c.drawYear = c.selectedYear = c.currentYear = l.getFullYear();
            if ((B != c.selectedMonth || z != c.selectedYear) && !p) this._notifyChange(c);
            this._adjustInstDate(c);
            if (c.input) c.input.val(w ? "" : this._formatDate(c))
        },
        _getDate: function (c) {
            return !c.currentYear || c.input && c.input.val() == "" ? null : this._daylightSavingAdjust(new Date(c.currentYear, c.currentMonth, c.currentDay))
        },
        _generateHTML: function (c) {
            var l = new Date;
            l = this._daylightSavingAdjust(new Date(l.getFullYear(), l.getMonth(), l.getDate()));
            var p = this._get(c, "isRTL"),
                w = this._get(c, "showButtonPanel"),
                B = this._get(c, "hideIfNoPrevNext"),
                z = this._get(c, "navigationAsDateFormat"),
                r = this._getNumberOfMonths(c),
                x = this._get(c, "showCurrentAtPos"),
                E = this._get(c, "stepMonths"),
                H = r[0] != 1 || r[1] != 1,
                X = this._daylightSavingAdjust(!c.currentDay ? new Date(9999, 9, 9) : new Date(c.currentYear, c.currentMonth, c.currentDay)),
                P = this._getMinMaxDate(c, "min"),
                W = this._getMinMaxDate(c, "max");
            x = c.drawMonth - x;
            var Y = c.drawYear;
            if (x < 0) {
                x += 12;
                Y--
            }
            if (W) {
                var la = this._daylightSavingAdjust(new Date(W.getFullYear(), W.getMonth() - r[0] * r[1] + 1, W.getDate()));
                for (la = P && la < P ? P : la; this._daylightSavingAdjust(new Date(Y, x, 1)) > la;) {
                    x--;
                    if (x < 0) {
                        x = 11;
                        Y--
                    }
                }
            }
            c.drawMonth = x;
            c.drawYear = Y;
            la = this._get(c, "prevText");
            la = !z ? la : this.formatDate(la, this._daylightSavingAdjust(new Date(Y, x - E, 1)), this._getFormatConfig(c));
            la = this._canAdjustMonth(c, -1, Y, x) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + j + ".datepicker._adjustDate('#" + c.id + "', -" + E + ", 'M');\" title=\"" + la + '"><span class="ui-icon ui-icon-circle-triangle-' + (p ? "e" : "w") + '">' + la + "</span></a>" : B ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + la + '"><span class="ui-icon ui-icon-circle-triangle-' + (p ? "e" : "w") + '">' + la + "</span></a>";
            var ca = this._get(c, "nextText");
            ca = !z ? ca : this.formatDate(ca, this._daylightSavingAdjust(new Date(Y, x + E, 1)), this._getFormatConfig(c));
            B = this._canAdjustMonth(c, +1, Y, x) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + j + ".datepicker._adjustDate('#" + c.id + "', +" + E + ", 'M');\" title=\"" + ca + '"><span class="ui-icon ui-icon-circle-triangle-' + (p ? "w" : "e") + '">' + ca + "</span></a>" : B ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + ca + '"><span class="ui-icon ui-icon-circle-triangle-' + (p ? "w" : "e") + '">' + ca + "</span></a>";
            E = this._get(c, "currentText");
            ca = this._get(c, "gotoCurrent") && c.currentDay ? X : l;
            E = !z ? E : this.formatDate(E, ca, this._getFormatConfig(c));
            z = !c.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + j + '.datepicker._hideDatepicker();">' + this._get(c, "closeText") + "</button>" : "";
            w = w ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (p ? z : "") + (this._isInRange(c, ca) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + j + ".datepicker._gotoToday('#" + c.id + "');\">" + E + "</button>" : "") + (p ? "" : z) + "</div>" : "";
            z = parseInt(this._get(c, "firstDay"), 10);
            z = isNaN(z) ? 0 : z;
            E = this._get(c, "showWeek");
            ca = this._get(c, "dayNames");
            this._get(c, "dayNamesShort");
            var ra = this._get(c, "dayNamesMin"),
                Ja = this._get(c, "monthNames"),
                sa = this._get(c, "monthNamesShort"),
                xa = this._get(c, "beforeShowDay"),
                oa = this._get(c, "showOtherMonths"),
                Ba = this._get(c, "selectOtherMonths");
            this._get(c, "calculateWeek");
            for (var Ya = this._getDefaultDate(c), Da = "", Ca = 0; Ca < r[0]; Ca++) {
                var ba = "";
                this.maxRows = 4;
                for (var Ra = 0; Ra < r[1]; Ra++) {
                    var db = this._daylightSavingAdjust(new Date(Y, x, c.selectedDay)),
                        k = " ui-corner-all",
                        Ga = "";
                    if (H) {
                        Ga += '<div class="ui-datepicker-group';
                        if (r[1] > 1) switch (Ra) {
                        case 0:
                            Ga += " ui-datepicker-group-first";
                            k = " ui-corner-" + (p ? "right" : "left");
                            break;
                        case r[1] - 1:
                            Ga += " ui-datepicker-group-last";
                            k = " ui-corner-" + (p ? "left" : "right");
                            break;
                        default:
                            Ga += " ui-datepicker-group-middle";
                            k = "";
                            break
                        }
                        Ga += '">'
                    }
                    Ga += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + k + '">' + (/all|left/.test(k) && Ca == 0 ? p ? B : la : "") + (/all|right/.test(k) && Ca == 0 ? p ? la : B : "") + this._generateMonthYearHeader(c, x, Y, P, W, Ca > 0 || Ra > 0, Ja, sa) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var Pa = E ? '<th class="ui-datepicker-week-col">' + this._get(c, "weekHeader") + "</th>" : "";
                    for (k = 0; k < 7; k++) {
                        var za = (k + z) % 7;
                        Pa += "<th" + ((k + z + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + ca[za] + '">' + ra[za] + "</span></th>"
                    }
                    Ga += Pa + "</tr></thead><tbody>";
                    Pa = this._getDaysInMonth(Y, x);
                    if (Y == c.selectedYear && x == c.selectedMonth) c.selectedDay = Math.min(c.selectedDay, Pa);
                    k = (this._getFirstDayOfMonth(Y, x) - z + 7) % 7;
                    Pa = Math.ceil((k + Pa) / 7);
                    this.maxRows = Pa = H ? this.maxRows > Pa ? this.maxRows : Pa : Pa;
                    za = this._daylightSavingAdjust(new Date(Y, x, 1 - k));
                    for (var $a = 0; $a < Pa; $a++) {
                        Ga += "<tr>";
                        var Ma = !E ? "" : '<td class="ui-datepicker-week-col">' + this._get(c, "calculateWeek")(za) + "</td>";
                        for (k = 0; k < 7; k++) {
                            var Za = xa ? xa.apply(c.input ? c.input[0] : null, [za]) : [true, ""],
                                Xa = za.getMonth() != x,
                                ja = Xa && !Ba || !Za[0] || P && za < P || W && za > W;
                            Ma += '<td class="' + ((k + z + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Xa ? " ui-datepicker-other-month" : "") + (za.getTime() == db.getTime() && x == c.selectedMonth && c._keyEvent || Ya.getTime() == za.getTime() && Ya.getTime() == db.getTime() ? " " + this._dayOverClass : "") + (ja ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Xa && !oa ? "" : " " + Za[1] + (za.getTime() == X.getTime() ? " " + this._currentClass : "") + (za.getTime() == l.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!Xa || oa) && Za[2] ? ' title="' + Za[2] + '"' : "") + (ja ? "" : ' onclick="DP_jQuery_' + j + ".datepicker._selectDay('#" + c.id + "'," + za.getMonth() + "," + za.getFullYear() + ', this);return false;"') + ">" + (Xa && !oa ? "&#xa0;" : ja ? '<span class="ui-state-default">' + za.getDate() + "</span>" : '<a class="ui-state-default' + (za.getTime() == l.getTime() ? " ui-state-highlight" : "") + (za.getTime() == X.getTime() ? " ui-state-active" : "") + (Xa ? " ui-priority-secondary" : "") + '" href="#">' + za.getDate() + "</a>") + "</td>";
                            za.setDate(za.getDate() + 1);
                            za = this._daylightSavingAdjust(za)
                        }
                        Ga += Ma + "</tr>"
                    }
                    x++;
                    if (x > 11) {
                        x = 0;
                        Y++
                    }
                    Ga += "</tbody></table>" + (H ? "</div>" + (r[0] > 0 && Ra == r[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    ba += Ga
                }
                Da += ba
            }
            Da += w + (b.browser.msie && parseInt(b.browser.version, 10) < 7 && !c.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            c._keyEvent = false;
            return Da
        },
        _generateMonthYearHeader: function (c, l, p, w, B, z, r, x) {
            var E = this._get(c, "changeMonth"),
                H = this._get(c, "changeYear"),
                X = this._get(c, "showMonthAfterYear"),
                P = '<div class="ui-datepicker-title">',
                W = "";
            if (z || !E) W += '<span class="ui-datepicker-month">' + r[l] + "</span>";
            else {
                r = w && w.getFullYear() == p;
                var Y = B && B.getFullYear() == p;
                W += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + j + ".datepicker._selectMonthYear('#" + c.id + "', this, 'M');\" onclick=\"DP_jQuery_" + j + ".datepicker._clickMonthYear('#" + c.id + "');\">";
                for (var la = 0; la < 12; la++) if ((!r || la >= w.getMonth()) && (!Y || la <= B.getMonth())) W += '<option value="' + la + '"' + (la == l ? ' selected="selected"' : "") + ">" + x[la] + "</option>";
                W += "</select>"
            }
            X || (P += W + (z || !(E && H) ? "&#xa0;" : ""));
            if (!c.yearshtml) {
                c.yearshtml = "";
                if (z || !H) P += '<span class="ui-datepicker-year">' + p + "</span>";
                else {
                    x = this._get(c, "yearRange").split(":");
                    var ca = (new Date).getFullYear();
                    r = function (ra) {
                        ra = ra.match(/c[+-].*/) ? p + parseInt(ra.substring(1), 10) : ra.match(/[+-].*/) ? ca + parseInt(ra, 10) : parseInt(ra, 10);
                        return isNaN(ra) ? ca : ra
                    };
                    l = r(x[0]);
                    x = Math.max(l, r(x[1] || ""));
                    l = w ? Math.max(l, w.getFullYear()) : l;
                    x = B ? Math.min(x, B.getFullYear()) : x;
                    for (c.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + j + ".datepicker._selectMonthYear('#" + c.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + j + ".datepicker._clickMonthYear('#" + c.id + "');\">"; l <= x; l++) c.yearshtml += '<option value="' + l + '"' + (l == p ? ' selected="selected"' : "") + ">" + l + "</option>";
                    c.yearshtml += "</select>";
                    P += c.yearshtml;
                    c.yearshtml = null
                }
            }
            P += this._get(c, "yearSuffix");
            if (X) P += (z || !(E && H) ? "&#xa0;" : "") + W;
            P += "</div>";
            return P
        },
        _adjustInstDate: function (c, l, p) {
            var w = c.drawYear + (p == "Y" ? l : 0),
                B = c.drawMonth + (p == "M" ? l : 0);
            l = Math.min(c.selectedDay, this._getDaysInMonth(w, B)) + (p == "D" ? l : 0);
            w = this._restrictMinMax(c, this._daylightSavingAdjust(new Date(w, B, l)));
            c.selectedDay = w.getDate();
            c.drawMonth = c.selectedMonth = w.getMonth();
            c.drawYear = c.selectedYear = w.getFullYear();
            if (p == "M" || p == "Y") this._notifyChange(c)
        },
        _restrictMinMax: function (c, l) {
            var p = this._getMinMaxDate(c, "min");
            c = this._getMinMaxDate(c, "max");
            l = p && l < p ? p : l;
            return c && l > c ? c : l
        },
        _notifyChange: function (c) {
            var l = this._get(c, "onChangeMonthYear");
            if (l) l.apply(c.input ? c.input[0] : null, [c.selectedYear, c.selectedMonth + 1, c])
        },
        _getNumberOfMonths: function (c) {
            c = this._get(c, "numberOfMonths");
            return c == null ? [1, 1] : typeof c == "number" ? [1, c] : c
        },
        _getMinMaxDate: function (c, l) {
            return this._determineDate(c, this._get(c, l + "Date"), null)
        },
        _getDaysInMonth: function (c, l) {
            return 32 - this._daylightSavingAdjust(new Date(c, l, 32)).getDate()
        },
        _getFirstDayOfMonth: function (c, l) {
            return (new Date(c, l, 1)).getDay()
        },
        _canAdjustMonth: function (c, l, p, w) {
            var B = this._getNumberOfMonths(c);
            p = this._daylightSavingAdjust(new Date(p, w + (l < 0 ? l : B[0] * B[1]), 1));
            l < 0 && p.setDate(this._getDaysInMonth(p.getFullYear(), p.getMonth()));
            return this._isInRange(c, p)
        },
        _isInRange: function (c, l) {
            var p = this._getMinMaxDate(c, "min");
            c = this._getMinMaxDate(c, "max");
            return (!p || l.getTime() >= p.getTime()) && (!c || l.getTime() <= c.getTime())
        },
        _getFormatConfig: function (c) {
            var l = this._get(c, "shortYearCutoff");
            l = typeof l != "string" ? l : (new Date).getFullYear() % 100 + parseInt(l, 10);
            return {
                shortYearCutoff: l,
                dayNamesShort: this._get(c, "dayNamesShort"),
                dayNames: this._get(c, "dayNames"),
                monthNamesShort: this._get(c, "monthNamesShort"),
                monthNames: this._get(c, "monthNames")
            }
        },
        _formatDate: function (c, l, p, w) {
            if (!l) {
                c.currentDay = c.selectedDay;
                c.currentMonth = c.selectedMonth;
                c.currentYear = c.selectedYear
            }
            l = l ? typeof l == "object" ? l : this._daylightSavingAdjust(new Date(w, p, l)) : this._daylightSavingAdjust(new Date(c.currentYear, c.currentMonth, c.currentDay));
            return this.formatDate(this._get(c, "dateFormat"), l, this._getFormatConfig(c))
        }
    });
    b.fn.datepicker = function (c) {
        if (!this.length) return this;
        if (!b.datepicker.initialized) {
            b(document).mousedown(b.datepicker._checkExternalClick).find("body").append(b.datepicker.dpDiv);
            b.datepicker.initialized = true
        }
        var l = Array.prototype.slice.call(arguments, 1);
        if (typeof c == "string" && (c == "isDisabled" || c == "getDate" || c == "widget")) return b.datepicker["_" + c + "Datepicker"].apply(b.datepicker, [this[0]].concat(l));
        if (c == "option" && arguments.length == 2 && typeof arguments[1] == "string") return b.datepicker["_" + c + "Datepicker"].apply(b.datepicker, [this[0]].concat(l));
        return this.each(function () {
            typeof c == "string" ? b.datepicker["_" + c + "Datepicker"].apply(b.datepicker, [this].concat(l)) : b.datepicker._attachDatepicker(this, c)
        })
    };
    b.datepicker = new f;
    b.datepicker.initialized = false;
    b.datepicker.uuid = (new Date).getTime();
    b.datepicker.version = "1.8.14";
    window["DP_jQuery_" + j] = b
})(jQuery);
(function (b, d) {
    b.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            b.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function (f) {
            if (f === d) return this._value();
            this._setOption("value", f);
            return this
        },
        _setOption: function (f, g) {
            if (f === "value") {
                this.options.value = g;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function () {
            var f = this.options.value;
            if (typeof f !== "number") f = 0;
            return Math.min(this.options.max, Math.max(this.min, f))
        },
        _percentage: function () {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function () {
            var f = this.value(),
                g = this._percentage();
            if (this.oldValue !== f) {
                this.oldValue = f;
                this._trigger("change")
            }
            this.valueDiv.toggle(f > this.min).toggleClass("ui-corner-right", f === this.options.max).width(g.toFixed(0) + "%");
            this.element.attr("aria-valuenow", f)
        }
    });
    b.extend(b.ui.progressbar, {
        version: "1.8.14"
    })
})(jQuery);
jQuery.effects ||
function (b, d) {
    function f(z) {
        var r;
        if (z && z.constructor == Array && z.length == 3) return z;
        if (r = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(z)) return [parseInt(r[1], 10), parseInt(r[2], 10), parseInt(r[3], 10)];
        if (r = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(z)) return [parseFloat(r[1]) * 2.55, parseFloat(r[2]) * 2.55, parseFloat(r[3]) * 2.55];
        if (r = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(z)) return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)];
        if (r = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(z)) return [parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(z)) return p.transparent;
        return p[b.trim(z).toLowerCase()]
    }
    function g(z, r) {
        var x;
        do {
            x = b.curCSS(z, r);
            if (x != "" && x != "transparent" || b.nodeName(z, "body")) break;
            r = "backgroundColor"
        } while (z = z.parentNode);
        return f(x)
    }
    function i() {
        var z = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            r = {},
            x, E;
        if (z && z.length && z[0] && z[z[0]]) for (var H = z.length; H--;) {
            x = z[H];
            if (typeof z[x] == "string") {
                E = x.replace(/\-(\w)/g, function (X, P) {
                    return P.toUpperCase()
                });
                r[E] = z[x]
            }
        } else for (x in z) if (typeof z[x] === "string") r[x] = z[x];
        return r
    }
    function j(z) {
        var r, x;
        for (r in z) {
            x = z[r];
            if (x == null || b.isFunction(x) || r in B || /scrollbar/.test(r) || !/color/i.test(r) && isNaN(parseFloat(x))) delete z[r]
        }
        return z
    }
    function n(z, r) {
        var x = {
            _: 0
        },
            E;
        for (E in r) if (z[E] != r[E]) x[E] = r[E];
        return x
    }
    function c(z, r, x, E) {
        if (typeof z == "object") {
            E = r;
            x = null;
            r = z;
            z = r.effect
        }
        if (b.isFunction(r)) {
            E = r;
            x = null;
            r = {}
        }
        if (typeof r == "number" || b.fx.speeds[r]) {
            E = x;
            x = r;
            r = {}
        }
        if (b.isFunction(x)) {
            E = x;
            x = null
        }
        r = r || {};
        x = x || r.duration;
        x = b.fx.off ? 0 : typeof x == "number" ? x : x in b.fx.speeds ? b.fx.speeds[x] : b.fx.speeds._default;
        E = E || r.complete;
        return [z, r, x, E]
    }
    function l(z) {
        if (!z || typeof z === "number" || b.fx.speeds[z]) return true;
        if (typeof z === "string" && !b.effects[z]) return true;
        return false
    }
    b.effects = {};
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (z, r) {
        b.fx.step[r] = function (x) {
            if (!x.colorInit) {
                x.start = g(x.elem, r);
                x.end = f(x.end);
                x.colorInit = true
            }
            x.elem.style[r] = "rgb(" + Math.max(Math.min(parseInt(x.pos * (x.end[0] - x.start[0]) + x.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(x.pos * (x.end[1] - x.start[1]) + x.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(x.pos * (x.end[2] - x.start[2]) + x.start[2], 10), 255), 0) + ")"
        }
    });
    var p = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
        w = ["add", "remove", "toggle"],
        B = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    b.effects.animateClass = function (z, r, x, E) {
        if (b.isFunction(x)) {
            E = x;
            x = null
        }
        return this.queue(function () {
            var H = b(this),
                X = H.attr("style") || " ",
                P = j(i.call(this)),
                W, Y = H.attr("class");
            b.each(w, function (la, ca) {
                z[ca] && H[ca + "Class"](z[ca])
            });
            W = j(i.call(this));
            H.attr("class", Y);
            H.animate(n(P, W), {
                queue: false,
                duration: r,
                easing: x,
                complete: function () {
                    b.each(w, function (la, ca) {
                        z[ca] && H[ca + "Class"](z[ca])
                    });
                    if (typeof H.attr("style") == "object") {
                        H.attr("style").cssText = "";
                        H.attr("style").cssText = X
                    } else H.attr("style", X);
                    E && E.apply(this, arguments);
                    b.dequeue(this)
                }
            })
        })
    };
    b.fn.extend({
        _addClass: b.fn.addClass,
        addClass: function (z, r, x, E) {
            return r ? b.effects.animateClass.apply(this, [{
                add: z
            },
            r, x, E]) : this._addClass(z)
        },
        _removeClass: b.fn.removeClass,
        removeClass: function (z, r, x, E) {
            return r ? b.effects.animateClass.apply(this, [{
                remove: z
            },
            r, x, E]) : this._removeClass(z)
        },
        _toggleClass: b.fn.toggleClass,
        toggleClass: function (z, r, x, E, H) {
            return typeof r == "boolean" || r === d ? x ? b.effects.animateClass.apply(this, [r ? {
                add: z
            } : {
                remove: z
            },
            x, E, H]) : this._toggleClass(z, r) : b.effects.animateClass.apply(this, [{
                toggle: z
            },
            r, x, E])
        },
        switchClass: function (z, r, x, E, H) {
            return b.effects.animateClass.apply(this, [{
                add: r,
                remove: z
            },
            x, E, H])
        }
    });
    b.extend(b.effects, {
        version: "1.8.14",
        save: function (z, r) {
            for (var x = 0; x < r.length; x++) r[x] !== null && z.data("ec.storage." + r[x], z[0].style[r[x]])
        },
        restore: function (z, r) {
            for (var x = 0; x < r.length; x++) r[x] !== null && z.css(r[x], z.data("ec.storage." + r[x]))
        },
        setMode: function (z, r) {
            if (r == "toggle") r = z.is(":hidden") ? "show" : "hide";
            return r
        },
        getBaseline: function (z, r) {
            var x;
            switch (z[0]) {
            case "top":
                x = 0;
                break;
            case "middle":
                x = 0.5;
                break;
            case "bottom":
                x = 1;
                break;
            default:
                x = z[0] / r.height
            }
            switch (z[1]) {
            case "left":
                z = 0;
                break;
            case "center":
                z = 0.5;
                break;
            case "right":
                z = 1;
                break;
            default:
                z = z[1] / r.width
            }
            return {
                x: z,
                y: x
            }
        },
        createWrapper: function (z) {
            if (z.parent().is(".ui-effects-wrapper")) return z.parent();
            var r = {
                width: z.outerWidth(true),
                height: z.outerHeight(true),
                "float": z.css("float")
            },
                x = b("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                });
            z.wrap(x);
            x = z.parent();
            if (z.css("position") == "static") {
                x.css({
                    position: "relative"
                });
                z.css({
                    position: "relative"
                })
            } else {
                b.extend(r, {
                    position: z.css("position"),
                    zIndex: z.css("z-index")
                });
                b.each(["top", "left", "bottom", "right"], function (E, H) {
                    r[H] = z.css(H);
                    if (isNaN(parseInt(r[H], 10))) r[H] = "auto"
                });
                z.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return x.css(r).show()
        },
        removeWrapper: function (z) {
            if (z.parent().is(".ui-effects-wrapper")) return z.parent().replaceWith(z);
            return z
        },
        setTransition: function (z, r, x, E) {
            E = E || {};
            b.each(r, function (H, X) {
                unit = z.cssUnit(X);
                if (unit[0] > 0) E[X] = unit[0] * x + unit[1]
            });
            return E
        }
    });
    b.fn.extend({
        effect: function (z) {
            var r = c.apply(this, arguments),
                x = {
                    options: r[1],
                    duration: r[2],
                    callback: r[3]
                };
            r = x.options.mode;
            var E = b.effects[z];
            if (b.fx.off || !E) return r ? this[r](x.duration, x.callback) : this.each(function () {
                x.callback && x.callback.call(this)
            });
            return E.call(this, x)
        },
        _show: b.fn.show,
        show: function (z) {
            if (l(z)) return this._show.apply(this, arguments);
            else {
                var r = c.apply(this, arguments);
                r[1].mode = "show";
                return this.effect.apply(this, r)
            }
        },
        _hide: b.fn.hide,
        hide: function (z) {
            if (l(z)) return this._hide.apply(this, arguments);
            else {
                var r = c.apply(this, arguments);
                r[1].mode = "hide";
                return this.effect.apply(this, r)
            }
        },
        __toggle: b.fn.toggle,
        toggle: function (z) {
            if (l(z) || typeof z === "boolean" || b.isFunction(z)) return this.__toggle.apply(this, arguments);
            else {
                var r = c.apply(this, arguments);
                r[1].mode = "toggle";
                return this.effect.apply(this, r)
            }
        },
        cssUnit: function (z) {
            var r = this.css(z),
                x = [];
            b.each(["em", "px", "%", "pt"], function (E, H) {
                if (r.indexOf(H) > 0) x = [parseFloat(r), H]
            });
            return x
        }
    });
    b.easing.jswing = b.easing.swing;
    b.extend(b.easing, {
        def: "easeOutQuad",
        swing: function (z, r, x, E, H) {
            return b.easing[b.easing.def](z, r, x, E, H)
        },
        easeInQuad: function (z, r, x, E, H) {
            return E * (r /= H) * r + x
        },
        easeOutQuad: function (z, r, x, E, H) {
            return -E * (r /= H) * (r - 2) + x
        },
        easeInOutQuad: function (z, r, x, E, H) {
            if ((r /= H / 2) < 1) return E / 2 * r * r + x;
            return -E / 2 * (--r * (r - 2) - 1) + x
        },
        easeInCubic: function (z, r, x, E, H) {
            return E * (r /= H) * r * r + x
        },
        easeOutCubic: function (z, r, x, E, H) {
            return E * ((r = r / H - 1) * r * r + 1) + x
        },
        easeInOutCubic: function (z, r, x, E, H) {
            if ((r /= H / 2) < 1) return E / 2 * r * r * r + x;
            return E / 2 * ((r -= 2) * r * r + 2) + x
        },
        easeInQuart: function (z, r, x, E, H) {
            return E * (r /= H) * r * r * r + x
        },
        easeOutQuart: function (z, r, x, E, H) {
            return -E * ((r = r / H - 1) * r * r * r - 1) + x
        },
        easeInOutQuart: function (z, r, x, E, H) {
            if ((r /= H / 2) < 1) return E / 2 * r * r * r * r + x;
            return -E / 2 * ((r -= 2) * r * r * r - 2) + x
        },
        easeInQuint: function (z, r, x, E, H) {
            return E * (r /= H) * r * r * r * r + x
        },
        easeOutQuint: function (z, r, x, E, H) {
            return E * ((r = r / H - 1) * r * r * r * r + 1) + x
        },
        easeInOutQuint: function (z, r, x, E, H) {
            if ((r /= H / 2) < 1) return E / 2 * r * r * r * r * r + x;
            return E / 2 * ((r -= 2) * r * r * r * r + 2) + x
        },
        easeInSine: function (z, r, x, E, H) {
            return -E * Math.cos(r / H * (Math.PI / 2)) + E + x
        },
        easeOutSine: function (z, r, x, E, H) {
            return E * Math.sin(r / H * (Math.PI / 2)) + x
        },
        easeInOutSine: function (z, r, x, E, H) {
            return -E / 2 * (Math.cos(Math.PI * r / H) - 1) + x
        },
        easeInExpo: function (z, r, x, E, H) {
            return r == 0 ? x : E * Math.pow(2, 10 * (r / H - 1)) + x
        },
        easeOutExpo: function (z, r, x, E, H) {
            return r == H ? x + E : E * (-Math.pow(2, -10 * r / H) + 1) + x
        },
        easeInOutExpo: function (z, r, x, E, H) {
            if (r == 0) return x;
            if (r == H) return x + E;
            if ((r /= H / 2) < 1) return E / 2 * Math.pow(2, 10 * (r - 1)) + x;
            return E / 2 * (-Math.pow(2, -10 * --r) + 2) + x
        },
        easeInCirc: function (z, r, x, E, H) {
            return -E * (Math.sqrt(1 - (r /= H) * r) - 1) + x
        },
        easeOutCirc: function (z, r, x, E, H) {
            return E * Math.sqrt(1 - (r = r / H - 1) * r) + x
        },
        easeInOutCirc: function (z, r, x, E, H) {
            if ((r /= H / 2) < 1) return -E / 2 * (Math.sqrt(1 - r * r) - 1) + x;
            return E / 2 * (Math.sqrt(1 - (r -= 2) * r) + 1) + x
        },
        easeInElastic: function (z, r, x, E, H) {
            var X = 0,
                P = E;
            if (r == 0) return x;
            if ((r /= H) == 1) return x + E;
            X || (X = H * 0.3);
            if (P < Math.abs(E)) {
                P = E;
                z = X / 4
            } else z = X / (2 * Math.PI) * Math.asin(E / P);
            return -(P * Math.pow(2, 10 * (r -= 1)) * Math.sin((r * H - z) * 2 * Math.PI / X)) + x
        },
        easeOutElastic: function (z, r, x, E, H) {
            var X = 0,
                P = E;
            if (r == 0) return x;
            if ((r /= H) == 1) return x + E;
            X || (X = H * 0.3);
            if (P < Math.abs(E)) {
                P = E;
                z = X / 4
            } else z = X / (2 * Math.PI) * Math.asin(E / P);
            return P * Math.pow(2, -10 * r) * Math.sin((r * H - z) * 2 * Math.PI / X) + E + x
        },
        easeInOutElastic: function (z, r, x, E, H) {
            var X = 0,
                P = E;
            if (r == 0) return x;
            if ((r /= H / 2) == 2) return x + E;
            X || (X = H * 0.3 * 1.5);
            if (P < Math.abs(E)) {
                P = E;
                z = X / 4
            } else z = X / (2 * Math.PI) * Math.asin(E / P);
            if (r < 1) return -0.5 * P * Math.pow(2, 10 * (r -= 1)) * Math.sin((r * H - z) * 2 * Math.PI / X) + x;
            return P * Math.pow(2, -10 * (r -= 1)) * Math.sin((r * H - z) * 2 * Math.PI / X) * 0.5 + E + x
        },
        easeInBack: function (z, r, x, E, H, X) {
            if (X == d) X = 1.70158;
            return E * (r /= H) * r * ((X + 1) * r - X) + x
        },
        easeOutBack: function (z, r, x, E, H, X) {
            if (X == d) X = 1.70158;
            return E * ((r = r / H - 1) * r * ((X + 1) * r + X) + 1) + x
        },
        easeInOutBack: function (z, r, x, E, H, X) {
            if (X == d) X = 1.70158;
            if ((r /= H / 2) < 1) return E / 2 * r * r * (((X *= 1.525) + 1) * r - X) + x;
            return E / 2 * ((r -= 2) * r * (((X *= 1.525) + 1) * r + X) + 2) + x
        },
        easeInBounce: function (z, r, x, E, H) {
            return E - b.easing.easeOutBounce(z, H - r, 0, E, H) + x
        },
        easeOutBounce: function (z, r, x, E, H) {
            return (r /= H) < 1 / 2.75 ? E * 7.5625 * r * r + x : r < 2 / 2.75 ? E * (7.5625 * (r -= 1.5 / 2.75) * r + 0.75) + x : r < 2.5 / 2.75 ? E * (7.5625 * (r -= 2.25 / 2.75) * r + 0.9375) + x : E * (7.5625 * (r -= 2.625 / 2.75) * r + 0.984375) + x
        },
        easeInOutBounce: function (z, r, x, E, H) {
            if (r < H / 2) return b.easing.easeInBounce(z, r * 2, 0, E, H) * 0.5 + x;
            return b.easing.easeOutBounce(z, r * 2 - H, 0, E, H) * 0.5 + E * 0.5 + x
        }
    })
}(jQuery);
var SWFUpload, swfobject;
if (SWFUpload == undefined) SWFUpload = function (b) {
    this.initSWFUpload(b)
};
SWFUpload.prototype.initSWFUpload = function (b) {
    try {
        this.customSettings = {};
        this.settings = {};
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings(b);
        this.loadSupport();
        this.swfuploadPreload() && this.loadFlash();
        this.displayDebugInfo()
    } catch (d) {
        delete SWFUpload.instances[this.movieName];
        throw d;
    }
};
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.5.0 2010-01-15 Beta 2";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290,
    RESIZE: -300
};
SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};
SWFUpload.UPLOAD_TYPE = {
    NORMAL: -1,
    RESIZED: -2
};
SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120,
    JAVASCRIPT: -130,
    NONE: -130
};
SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};
SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};
SWFUpload.RESIZE_ENCODING = {
    JPEG: -1,
    PNG: -2
};
SWFUpload.completeURL = function (b) {
    try {
        var d = "",
            f = -1;
        if (typeof b !== "string" || b.match(/^https?:\/\//i) || b.match(/^\//) || b === "") return b;
        f = window.location.pathname.lastIndexOf("/");
        d = f <= 0 ? "/" : window.location.pathname.substr(0, f) + "/";
        return d + b
    } catch (g) {
        return b
    }
};
SWFUpload.onload = function () {};
a = SWFUpload.prototype;
a.initSettings = function (b) {
    this.ensureDefault = function (d, f) {
        var g = b[d];
        this.settings[d] = g != undefined ? g : f
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("flash9_url", "swfupload_fp9.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_preload_handler", null);
    this.ensureDefault("swfupload_load_failed_handler", null);
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_resize_start_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("mouse_click_handler", null);
    this.ensureDefault("mouse_out_handler", null);
    this.ensureDefault("mouse_over_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if (this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime();
        this.settings.flash9_url = this.settings.flash9_url + (this.settings.flash9_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime()
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)
    }
    delete this.ensureDefault
};
a.loadSupport = function () {
    this.support = {
        loading: swfobject.hasFlashPlayerVersion("9.0.28"),
        imageResize: swfobject.hasFlashPlayerVersion("10.0.0")
    }
};
a.loadFlash = function () {
    var b, d, f;
    if (this.support.loading) if (document.getElementById(this.movieName) !== null) {
        this.support.loading = false;
        this.queueEvent("swfupload_load_failed_handler", ["Element ID already in use"])
    } else {
        b = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
        if (b == undefined) {
            this.support.loading = false;
            this.queueEvent("swfupload_load_failed_handler", ["button place holder not found"])
        } else {
            d = (b.currentStyle && b.currentStyle.display || window.getComputedStyle && document.defaultView.getComputedStyle(b, null).getPropertyValue("display")) !== "block" ? "span" : "div";
            d = document.createElement(d);
            f = this.getFlashHTML();
            try {
                d.innerHTML = f
            } catch (g) {
                this.support.loading = false;
                this.queueEvent("swfupload_load_failed_handler", ["Exception loading Flash HTML into placeholder"]);
                return
            }
            f = d.getElementsByTagName("object");
            if (!f || f.length > 1 || f.length === 0) {
                this.support.loading = false;
                this.queueEvent("swfupload_load_failed_handler", ["Unable to find movie after adding to DOM"])
            } else {
                if (f.length === 1) this.movieElement = f[0];
                b.parentNode.replaceChild(d.firstChild, b);
                if (window[this.movieName] == undefined) window[this.movieName] = this.getMovieElement()
            }
        }
    } else this.queueEvent("swfupload_load_failed_handler", ["Flash Player doesn't support SWFUpload"])
};
a.getFlashHTML = function () {
    return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload"><param name="wmode" value="', this.settings.button_window_mode, '" /><param name="movie" value="', this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url, '" /><param name="quality" value="high" /><param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
};
a.getFlashVars = function () {
    var b, d;
    d = this.buildParamString();
    b = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(b), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(d), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
};
a.getMovieElement = function () {
    if (this.movieElement == undefined) this.movieElement = document.getElementById(this.movieName);
    if (this.movieElement === null) throw "Could not find Flash element";
    return this.movieElement
};
a.buildParamString = function () {
    var b, d, f = [];
    d = this.settings.post_params;
    if (typeof d === "object") for (b in d) d.hasOwnProperty(b) && f.push(encodeURIComponent(b.toString()) + "=" + encodeURIComponent(d[b].toString()));
    return f.join("&amp;")
};
a.destroy = function () {
    var b;
    try {
        this.cancelUpload(null, false);
        if (b = this.cleanUp()) try {
            b.parentNode.removeChild(b)
        } catch (d) {}
        window[this.movieName] = null;
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        this.movieName = this.eventQueue = this.customSettings = this.settings = this.movieElement = null;
        return true
    } catch (f) {
        return false
    }
};
a.displayDebugInfo = function () {
    this.debug(["---SWFUpload Instance Info---\nVersion: ", SWFUpload.version, "\nMovie Name: ", this.movieName, "\nSettings:\n\tupload_url:               ", this.settings.upload_url, "\n\tflash_url:                ", this.settings.flash_url, "\n\tflash9_url:                ", this.settings.flash9_url, "\n\tuse_query_string:         ", this.settings.use_query_string.toString(), "\n\trequeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n\thttp_success:             ", this.settings.http_success.join(", "), "\n\tassume_success_timeout:   ", this.settings.assume_success_timeout, "\n\tfile_post_name:           ", this.settings.file_post_name, "\n\tpost_params:              ", this.settings.post_params.toString(), "\n\tfile_types:               ", this.settings.file_types, "\n\tfile_types_description:   ", this.settings.file_types_description, "\n\tfile_size_limit:          ", this.settings.file_size_limit, "\n\tfile_upload_limit:        ", this.settings.file_upload_limit, "\n\tfile_queue_limit:         ", this.settings.file_queue_limit, "\n\tdebug:                    ", this.settings.debug.toString(), "\n\tprevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n\tbutton_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n\tbutton_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n\tbutton_image_url:         ", this.settings.button_image_url.toString(), "\n\tbutton_width:             ", this.settings.button_width.toString(), "\n\tbutton_height:            ", this.settings.button_height.toString(), "\n\tbutton_text:              ", this.settings.button_text.toString(), "\n\tbutton_text_style:        ", this.settings.button_text_style.toString(), "\n\tbutton_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n\tbutton_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n\tbutton_action:            ", this.settings.button_action.toString(), "\n\tbutton_cursor:            ", this.settings.button_cursor.toString(), "\n\tbutton_disabled:          ", this.settings.button_disabled.toString(), "\n\tcustom_settings:          ", this.settings.custom_settings.toString(), "\nEvent Handlers:\n\tswfupload_preload_handler assigned:  ", (typeof this.settings.swfupload_preload_handler === "function").toString(), "\n\tswfupload_load_failed_handler assigned:  ", (typeof this.settings.swfupload_load_failed_handler === "function").toString(), "\n\tswfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n\tmouse_click_handler assigned:       ", (typeof this.settings.mouse_click_handler === "function").toString(), "\n\tmouse_over_handler assigned:        ", (typeof this.settings.mouse_over_handler === "function").toString(), "\n\tmouse_out_handler assigned:         ", (typeof this.settings.mouse_out_handler === "function").toString(), "\n\tfile_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n\tfile_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n\tfile_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n\tupload_resize_start_handler assigned:      ", (typeof this.settings.upload_resize_start_handler === "function").toString(), "\n\tupload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n\tupload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n\tupload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n\tupload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n\tupload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n\tdebug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\nSupport:\n\tLoad:                     ", this.support.loading ? "Yes" : "No", "\n\tImage Resize:             ", this.support.imageResize ? "Yes" : "No", "\n"].join(""))
};
a.addSetting = function (b, d, f) {
    return d == undefined ? (this.settings[b] = f) : (this.settings[b] = d)
};
a.getSetting = function (b) {
    if (this.settings[b] != undefined) return this.settings[b];
    return ""
};
a.callFlash = function (b, d) {
    var f, g, i;
    d = d || [];
    f = this.getMovieElement();
    try {
        if (f != undefined) {
            i = f.CallFunction('<invoke name="' + b + '" returntype="javascript">' + __flash__argumentsToXML(d, 0) + "</invoke>");
            g = eval(i)
        } else this.debug("Can't call flash because the movie wasn't found.")
    } catch (j) {
        this.debug("Exception calling flash function '" + b + "': " + j.message)
    }
    if (g != undefined && typeof g.post === "object") g = this.unescapeFilePostParams(g);
    return g
};
a.selectFile = function () {
    this.callFlash("SelectFile")
};
a.selectFiles = function () {
    this.callFlash("SelectFiles")
};
a.startUpload = function (b) {
    this.callFlash("StartUpload", [b])
};
a.startResizedUpload = function (b, d, f, g, i, j) {
    this.callFlash("StartUpload", [b,
    {
        width: d,
        height: f,
        encoding: g,
        quality: i,
        allowEnlarging: j
    }])
};
a.cancelUpload = function (b, d) {
    if (d !== false) d = true;
    this.callFlash("CancelUpload", [b, d])
};
a.stopUpload = function () {
    this.callFlash("StopUpload")
};
a.requeueUpload = function (b) {
    return this.callFlash("RequeueUpload", [b])
};
a.getStats = function () {
    return this.callFlash("GetStats")
};
a.setStats = function (b) {
    this.callFlash("SetStats", [b])
};
a.getFile = function (b) {
    return typeof b === "number" ? this.callFlash("GetFileByIndex", [b]) : this.callFlash("GetFile", [b])
};
a.getQueueFile = function (b) {
    return typeof b === "number" ? this.callFlash("GetFileByQueueIndex", [b]) : this.callFlash("GetFile", [b])
};
a.addFileParam = function (b, d, f) {
    return this.callFlash("AddFileParam", [b, d, f])
};
a.removeFileParam = function (b, d) {
    this.callFlash("RemoveFileParam", [b, d])
};
a.setUploadURL = function (b) {
    this.settings.upload_url = b.toString();
    this.callFlash("SetUploadURL", [b])
};
a.setPostParams = function (b) {
    this.settings.post_params = b;
    this.callFlash("SetPostParams", [b])
};
a.addPostParam = function (b, d) {
    this.settings.post_params[b] = d;
    this.callFlash("SetPostParams", [this.settings.post_params])
};
a.removePostParam = function (b) {
    delete this.settings.post_params[b];
    this.callFlash("SetPostParams", [this.settings.post_params])
};
a.setFileTypes = function (b, d) {
    this.settings.file_types = b;
    this.settings.file_types_description = d;
    this.callFlash("SetFileTypes", [b, d])
};
a.setFileSizeLimit = function (b) {
    this.settings.file_size_limit = b;
    this.callFlash("SetFileSizeLimit", [b])
};
a.setFileUploadLimit = function (b) {
    this.settings.file_upload_limit = b;
    this.callFlash("SetFileUploadLimit", [b])
};
a.setFileQueueLimit = function (b) {
    this.settings.file_queue_limit = b;
    this.callFlash("SetFileQueueLimit", [b])
};
a.setFilePostName = function (b) {
    this.settings.file_post_name = b;
    this.callFlash("SetFilePostName", [b])
};
a.setUseQueryString = function (b) {
    this.settings.use_query_string = b;
    this.callFlash("SetUseQueryString", [b])
};
a.setRequeueOnError = function (b) {
    this.settings.requeue_on_error = b;
    this.callFlash("SetRequeueOnError", [b])
};
a.setHTTPSuccess = function (b) {
    if (typeof b === "string") b = b.replace(" ", "").split(",");
    this.settings.http_success = b;
    this.callFlash("SetHTTPSuccess", [b])
};
a.setAssumeSuccessTimeout = function (b) {
    this.settings.assume_success_timeout = b;
    this.callFlash("SetAssumeSuccessTimeout", [b])
};
a.setDebugEnabled = function (b) {
    this.settings.debug_enabled = b;
    this.callFlash("SetDebugEnabled", [b])
};
a.setButtonImageURL = function (b) {
    if (b == undefined) b = "";
    this.settings.button_image_url = b;
    this.callFlash("SetButtonImageURL", [b])
};
a.setButtonDimensions = function (b, d) {
    this.settings.button_width = b;
    this.settings.button_height = d;
    var f = this.getMovieElement();
    if (f != undefined) {
        f.style.width = b + "px";
        f.style.height = d + "px"
    }
    this.callFlash("SetButtonDimensions", [b, d])
};
a.setButtonText = function (b) {
    this.settings.button_text = b;
    this.callFlash("SetButtonText", [b])
};
a.setButtonTextPadding = function (b, d) {
    this.settings.button_text_top_padding = d;
    this.settings.button_text_left_padding = b;
    this.callFlash("SetButtonTextPadding", [b, d])
};
a.setButtonTextStyle = function (b) {
    this.settings.button_text_style = b;
    this.callFlash("SetButtonTextStyle", [b])
};
a.setButtonDisabled = function (b) {
    this.settings.button_disabled = b;
    this.callFlash("SetButtonDisabled", [b])
};
a.setButtonAction = function (b) {
    this.settings.button_action = b;
    this.callFlash("SetButtonAction", [b])
};
a.setButtonCursor = function (b) {
    this.settings.button_cursor = b;
    this.callFlash("SetButtonCursor", [b])
};
a.queueEvent = function (b, d) {
    var f = this;
    if (d == undefined) d = [];
    else d instanceof Array || (d = [d]);
    if (typeof this.settings[b] === "function") {
        this.eventQueue.push(function () {
            this.settings[b].apply(this, d)
        });
        setTimeout(function () {
            f.executeNextEvent()
        }, 0)
    } else if (this.settings[b] !== null) throw "Event handler " + b + " is unknown or is not a function";
};
a.executeNextEvent = function () {
    var b = this.eventQueue ? this.eventQueue.shift() : null;
    typeof b === "function" && b.apply(this)
};
a.unescapeFilePostParams = function (b) {
    var d = /[$]([0-9a-f]{4})/i,
        f = {},
        g, i, j;
    if (b != undefined) {
        for (i in b.post) if (b.post.hasOwnProperty(i)) {
            for (g = i;
            (j = d.exec(g)) !== null;) g = g.replace(j[0], String.fromCharCode(parseInt("0x" + j[1], 16)));
            f[g] = b.post[i]
        }
        b.post = f
    }
    return b
};
a.swfuploadPreload = function () {
    var b;
    if (typeof this.settings.swfupload_preload_handler === "function") b = this.settings.swfupload_preload_handler.call(this);
    else if (this.settings.swfupload_preload_handler != undefined) throw "upload_start_handler must be a function";
    if (b === undefined) b = true;
    return !!b
};
a.flashReady = function () {
    this.cleanUp() ? this.queueEvent("swfupload_loaded_handler") : this.debug("Flash called back ready but the flash movie can't be found.")
};
a.cleanUp = function () {
    var b, d = this.getMovieElement();
    try {
        if (d && typeof d.CallFunction === "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (b in d) try {
                if (typeof d[b] === "function") d[b] = null
            } catch (f) {}
        }
    } catch (g) {}
    window.__flash__removeCallback = function (i, j) {
        try {
            if (i) i[j] = null
        } catch (n) {}
    };
    return d
};
a.mouseClick = function () {
    this.queueEvent("mouse_click_handler")
};
a.mouseOver = function () {
    this.queueEvent("mouse_over_handler")
};
a.mouseOut = function () {
    this.queueEvent("mouse_out_handler")
};
a.fileDialogStart = function () {
    this.queueEvent("file_dialog_start_handler")
};
a.fileQueued = function (b) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("file_queued_handler", b)
};
a.fileQueueError = function (b, d, f) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("file_queue_error_handler", [b, d, f])
};
a.fileDialogComplete = function (b, d, f) {
    this.queueEvent("file_dialog_complete_handler", [b, d, f])
};
a.uploadResizeStart = function (b, d) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_resize_start_handler", [b, d.width, d.height, d.encoding, d.quality])
};
a.uploadStart = function (b) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("return_upload_start_handler", b)
};
a.returnUploadStart = function (b) {
    var d;
    if (typeof this.settings.upload_start_handler === "function") {
        b = this.unescapeFilePostParams(b);
        d = this.settings.upload_start_handler.call(this, b)
    } else if (this.settings.upload_start_handler != undefined) throw "upload_start_handler must be a function";
    if (d === undefined) d = true;
    d = !! d;
    this.callFlash("ReturnUploadStart", [d])
};
a.uploadProgress = function (b, d, f) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_progress_handler", [b, d, f])
};
a.uploadError = function (b, d, f) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_error_handler", [b, d, f])
};
a.uploadSuccess = function (b, d, f) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_success_handler", [b, d, f])
};
a.uploadComplete = function (b) {
    b = this.unescapeFilePostParams(b);
    this.queueEvent("upload_complete_handler", b)
};
a.debug = function (b) {
    this.queueEvent("debug_handler", b)
};
a.debugMessage = function (b) {
    var d, f;
    if (this.settings.debug) {
        d = [];
        if (typeof b === "object" && typeof b.name === "string" && typeof b.message === "string") {
            for (f in b) b.hasOwnProperty(f) && d.push(f + ": " + b[f]);
            b = d.join("\n") || "";
            d = b.split("\n");
            b = "EXCEPTION: " + d.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(b)
        } else SWFUpload.Console.writeLine(b)
    }
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function (b) {
    var d, f;
    try {
        d = document.getElementById("SWFUpload_Console");
        if (!d) {
            f = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(f);
            d = document.createElement("textarea");
            d.id = "SWFUpload_Console";
            d.style.fontFamily = "monospace";
            d.setAttribute("wrap", "off");
            d.wrap = "off";
            d.style.overflow = "auto";
            d.style.width = "700px";
            d.style.height = "350px";
            d.style.margin = "5px";
            f.appendChild(d)
        }
        d.value += b + "\n";
        d.scrollTop = d.scrollHeight - d.clientHeight
    } catch (g) {
        alert("Exception: " + g.name + " Message: " + g.message)
    }
};
swfobject = function () {
    function b() {
        if (!za) {
            try {
                var M = oa.getElementsByTagName("body")[0].appendChild(H("span"));
                M.parentNode.removeChild(M)
            } catch (T) {
                return
            }
            za = true;
            M = Da.length;
            for (var ea = 0; ea < M; ea++) Da[ea]()
        }
    }
    function d(M) {
        if (za) M();
        else Da[Da.length] = M
    }
    function f(M) {
        if (typeof xa.addEventListener != ca) xa.addEventListener("load", M, false);
        else if (typeof oa.addEventListener != ca) oa.addEventListener("load", M, false);
        else if (typeof xa.attachEvent != ca) X(xa, "onload", M);
        else if (typeof xa.onload == "function") {
            var T = xa.onload;
            xa.onload = function () {
                T();
                M()
            }
        } else xa.onload = M
    }
    function g() {
        Ya ? i() : j()
    }
    function i() {
        var M = oa.getElementsByTagName("body")[0],
            T = H(ra);
        T.setAttribute("type", Ja);
        var ea = M.appendChild(T);
        if (ea) {
            var ka = 0;
            (function () {
                if (typeof ea.GetVariable != ca) {
                    var ia = ea.GetVariable("$version");
                    if (ia) {
                        ia = ia.split(" ")[1].split(",");
                        ja.pv = [parseInt(ia[0], 10), parseInt(ia[1], 10), parseInt(ia[2], 10)]
                    }
                } else if (ka < 10) {
                    ka++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                M.removeChild(T);
                ea = null;
                j()
            })()
        } else j()
    }
    function j() {
        var M = Ca.length;
        if (M > 0) for (var T = 0; T < M; T++) {
            var ea = Ca[T].id,
                ka = Ca[T].callbackFn,
                ia = {
                    success: false,
                    id: ea
                };
            if (ja.pv[0] > 0) {
                var wa = E(ea);
                if (wa) if (P(Ca[T].swfVersion) && !(ja.wk && ja.wk < 312)) {
                    Y(ea, true);
                    if (ka) {
                        ia.success = true;
                        ia.ref = n(ea);
                        ka(ia)
                    }
                } else if (Ca[T].expressInstall && c()) {
                    ia = {};
                    ia.data = Ca[T].expressInstall;
                    ia.width = wa.getAttribute("width") || "0";
                    ia.height = wa.getAttribute("height") || "0";
                    if (wa.getAttribute("class")) ia.styleclass = wa.getAttribute("class");
                    if (wa.getAttribute("align")) ia.align = wa.getAttribute("align");
                    var ta = {};
                    wa = wa.getElementsByTagName("param");
                    for (var Ea = wa.length, ua = 0; ua < Ea; ua++) if (wa[ua].getAttribute("name").toLowerCase() != "movie") ta[wa[ua].getAttribute("name")] = wa[ua].getAttribute("value");
                    l(ia, ta, ea, ka)
                } else {
                    p(wa);
                    ka && ka(ia)
                }
            } else {
                Y(ea, true);
                if (ka) {
                    if ((ea = n(ea)) && typeof ea.SetVariable != ca) {
                        ia.success = true;
                        ia.ref = ea
                    }
                    ka(ia)
                }
            }
        }
    }
    function n(M) {
        var T = null;
        if ((M = E(M)) && M.nodeName == "OBJECT") if (typeof M.SetVariable != ca) T = M;
        else if (M = M.getElementsByTagName(ra)[0]) T = M;
        return T
    }
    function c() {
        return !$a && P("6.0.65") && (ja.win || ja.mac) && !(ja.wk && ja.wk < 312)
    }
    function l(M, T, ea, ka) {
        $a = true;
        Ga = ka || null;
        Pa = {
            success: false,
            id: ea
        };
        var ia = E(ea);
        if (ia) {
            if (ia.nodeName == "OBJECT") {
                db = w(ia);
                k = null
            } else {
                db = ia;
                k = ea
            }
            M.id = sa;
            if (typeof M.width == ca || !/%$/.test(M.width) && parseInt(M.width, 10) < 310) M.width = "310";
            if (typeof M.height == ca || !/%$/.test(M.height) && parseInt(M.height, 10) < 137) M.height = "137";
            oa.title = oa.title.slice(0, 47) + " - Flash Player Installation";
            ka = ja.ie && ja.win ? "ActiveX" : "PlugIn";
            ka = "MMredirectURL=" + xa.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ka + "&MMdoctitle=" + oa.title;
            if (typeof T.flashvars != ca) T.flashvars += "&" + ka;
            else T.flashvars = ka;
            if (ja.ie && ja.win && ia.readyState != 4) {
                ka = H("div");
                ea += "SWFObjectNew";
                ka.setAttribute("id", ea);
                ia.parentNode.insertBefore(ka, ia);
                ia.style.display = "none";
                (function () {
                    ia.readyState == 4 ? ia.parentNode.removeChild(ia) : setTimeout(arguments.callee, 10)
                })()
            }
            B(M, T, ea)
        }
    }
    function p(M) {
        if (ja.ie && ja.win && M.readyState != 4) {
            var T = H("div");
            M.parentNode.insertBefore(T, M);
            T.parentNode.replaceChild(w(M), T);
            M.style.display = "none";
            (function () {
                M.readyState == 4 ? M.parentNode.removeChild(M) : setTimeout(arguments.callee, 10)
            })()
        } else M.parentNode.replaceChild(w(M), M)
    }
    function w(M) {
        var T = H("div");
        if (ja.win && ja.ie) T.innerHTML = M.innerHTML;
        else if (M = M.getElementsByTagName(ra)[0]) if (M = M.childNodes) for (var ea = M.length, ka = 0; ka < ea; ka++)!(M[ka].nodeType == 1 && M[ka].nodeName == "PARAM") && M[ka].nodeType != 8 && T.appendChild(M[ka].cloneNode(true));
        return T
    }
    function B(M, T, ea) {
        var ka, ia = E(ea);
        if (ja.wk && ja.wk < 312) return ka;
        if (ia) {
            if (typeof M.id == ca) M.id = ea;
            if (ja.ie && ja.win) {
                var wa = "";
                for (var ta in M) if (M[ta] != Object.prototype[ta]) if (ta.toLowerCase() == "data") T.movie = M[ta];
                else if (ta.toLowerCase() == "styleclass") wa += ' class="' + M[ta] + '"';
                else if (ta.toLowerCase() != "classid") wa += " " + ta + '="' + M[ta] + '"';
                ta = "";
                for (var Ea in T) if (T[Ea] != Object.prototype[Ea]) ta += '<param name="' + Ea + '" value="' + T[Ea] + '" />';
                ia.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + wa + ">" + ta + "</object>";
                ba[ba.length] = M.id;
                ka = E(M.id)
            } else {
                Ea = H(ra);
                Ea.setAttribute("type", Ja);
                for (wa in M) if (M[wa] != Object.prototype[wa]) if (wa.toLowerCase() == "styleclass") Ea.setAttribute("class", M[wa]);
                else wa.toLowerCase() != "classid" && Ea.setAttribute(wa, M[wa]);
                for (var ua in T) T[ua] != Object.prototype[ua] && ua.toLowerCase() != "movie" && z(Ea, ua, T[ua]);
                ia.parentNode.replaceChild(Ea, ia);
                ka = Ea
            }
        }
        return ka
    }
    function z(M, T, ea) {
        var ka = H("param");
        ka.setAttribute("name", T);
        ka.setAttribute("value", ea);
        M.appendChild(ka)
    }
    function r(M) {
        var T = E(M);
        if (T && T.nodeName == "OBJECT") if (ja.ie && ja.win) {
            T.style.display = "none";
            (function () {
                T.readyState == 4 ? x(M) : setTimeout(arguments.callee, 10)
            })()
        } else T.parentNode.removeChild(T)
    }
    function x(M) {
        if (M = E(M)) {
            for (var T in M) if (typeof M[T] == "function") M[T] = null;
            M.parentNode.removeChild(M)
        }
    }
    function E(M) {
        var T = null;
        try {
            T = oa.getElementById(M)
        } catch (ea) {}
        return T
    }
    function H(M) {
        return oa.createElement(M)
    }
    function X(M, T, ea) {
        M.attachEvent(T, ea);
        Ra[Ra.length] = [M, T, ea]
    }
    function P(M) {
        var T = ja.pv;
        M = M.split(".");
        M[0] = parseInt(M[0], 10);
        M[1] = parseInt(M[1], 10) || 0;
        M[2] = parseInt(M[2], 10) || 0;
        return T[0] > M[0] || T[0] == M[0] && T[1] > M[1] || T[0] == M[0] && T[1] == M[1] && T[2] >= M[2] ? true : false
    }
    function W(M, T, ea, ka) {
        if (!(ja.ie && ja.mac)) {
            var ia = oa.getElementsByTagName("head")[0];
            if (ia) {
                ea = ea && typeof ea == "string" ? ea : "screen";
                if (ka) Za = Ma = null;
                if (!Ma || Za != ea) {
                    ka = H("style");
                    ka.setAttribute("type", "text/css");
                    ka.setAttribute("media", ea);
                    Ma = ia.appendChild(ka);
                    if (ja.ie && ja.win && typeof oa.styleSheets != ca && oa.styleSheets.length > 0) Ma = oa.styleSheets[oa.styleSheets.length - 1];
                    Za = ea
                }
                if (ja.ie && ja.win) Ma && typeof Ma.addRule == ra && Ma.addRule(M, T);
                else Ma && typeof oa.createTextNode != ca && Ma.appendChild(oa.createTextNode(M + " {" + T + "}"))
            }
        }
    }
    function Y(M, T) {
        if (Xa) {
            T = T ? "visible" : "hidden";
            if (za && E(M)) E(M).style.visibility = T;
            else W("#" + M, "visibility:" + T)
        }
    }
    function la(M) {
        return /[\\\"<>\.;]/.exec(M) != null && typeof encodeURIComponent != ca ? encodeURIComponent(M) : M
    }
    var ca = "undefined",
        ra = "object",
        Ja = "application/x-shockwave-flash",
        sa = "SWFObjectExprInst",
        xa = window,
        oa = document,
        Ba = navigator,
        Ya = false,
        Da = [g],
        Ca = [],
        ba = [],
        Ra = [],
        db, k, Ga, Pa, za = false,
        $a = false,
        Ma, Za, Xa = true,
        ja = function () {
            var M = typeof oa.getElementById != ca && typeof oa.getElementsByTagName != ca && typeof oa.createElement != ca,
                T = Ba.userAgent.toLowerCase(),
                ea = Ba.platform.toLowerCase(),
                ka = ea ? /win/.test(ea) : /win/.test(T);
            ea = ea ? /mac/.test(ea) : /mac/.test(T);
            T = /webkit/.test(T) ? parseFloat(T.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false;
            var ia = !+"\u000b1",
                wa = [0, 0, 0],
                ta = null;
            if (typeof Ba.plugins != ca && typeof Ba.plugins["Shockwave Flash"] == ra) {
                if ((ta = Ba.plugins["Shockwave Flash"].description) && !(typeof Ba.mimeTypes != ca && Ba.mimeTypes[Ja] && !Ba.mimeTypes[Ja].enabledPlugin)) {
                    Ya = true;
                    ia = false;
                    ta = ta.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    wa[0] = parseInt(ta.replace(/^(.*)\..*$/, "$1"), 10);
                    wa[1] = parseInt(ta.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    wa[2] = /[a-zA-Z]/.test(ta) ? parseInt(ta.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else if (typeof xa.ActiveXObject != ca) try {
                var Ea = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (Ea) if (ta = Ea.GetVariable("$version")) {
                    ia = true;
                    ta = ta.split(" ")[1].split(",");
                    wa = [parseInt(ta[0], 10), parseInt(ta[1], 10), parseInt(ta[2], 10)]
                }
            } catch (ua) {}
            return {
                w3: M,
                pv: wa,
                wk: T,
                ie: ia,
                win: ka,
                mac: ea
            }
        }();
    (function () {
        if (ja.w3) {
            if (typeof oa.readyState != ca && oa.readyState == "complete" || typeof oa.readyState == ca && (oa.getElementsByTagName("body")[0] || oa.body)) b();
            if (!za) {
                typeof oa.addEventListener != ca && oa.addEventListener("DOMContentLoaded", b, false);
                if (ja.ie && ja.win) {
                    oa.attachEvent("onreadystatechange", function () {
                        if (oa.readyState == "complete") {
                            oa.detachEvent("onreadystatechange", arguments.callee);
                            b()
                        }
                    });
                    xa == top &&
                    function () {
                        if (!za) {
                            try {
                                oa.documentElement.doScroll("left")
                            } catch (M) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            b()
                        }
                    }()
                }
                ja.wk &&
                function () {
                    za || (/loaded|complete/.test(oa.readyState) ? b() : setTimeout(arguments.callee, 0))
                }();
                f(b)
            }
        }
    })();
    (function () {
        ja.ie && ja.win && window.attachEvent("onunload", function () {
            for (var M = Ra.length, T = 0; T < M; T++) Ra[T][0].detachEvent(Ra[T][1], Ra[T][2]);
            M = ba.length;
            for (T = 0; T < M; T++) r(ba[T]);
            for (var ea in ja) ja[ea] = null;
            ja = null;
            for (var ka in swfobject) swfobject[ka] = null;
            swfobject = null
        })
    })();
    return {
        registerObject: function (M, T, ea, ka) {
            if (ja.w3 && M && T) {
                var ia = {};
                ia.id = M;
                ia.swfVersion = T;
                ia.expressInstall = ea;
                ia.callbackFn = ka;
                Ca[Ca.length] = ia;
                Y(M, false)
            } else ka && ka({
                success: false,
                id: M
            })
        },
        getObjectById: function (M) {
            if (ja.w3) return n(M)
        },
        embedSWF: function (M, T, ea, ka, ia, wa, ta, Ea, ua, hb) {
            var eb = {
                success: false,
                id: T
            };
            if (ja.w3 && !(ja.wk && ja.wk < 312) && M && T && ea && ka && ia) {
                Y(T, false);
                d(function () {
                    ea += "";
                    ka += "";
                    var cb = {};
                    if (ua && typeof ua === ra) for (var Va in ua) cb[Va] = ua[Va];
                    cb.data = M;
                    cb.width = ea;
                    cb.height = ka;
                    Va = {};
                    if (Ea && typeof Ea === ra) for (var gb in Ea) Va[gb] = Ea[gb];
                    if (ta && typeof ta === ra) for (var ab in ta) if (typeof Va.flashvars != ca) Va.flashvars += "&" + ab + "=" + ta[ab];
                    else Va.flashvars = ab + "=" + ta[ab];
                    if (P(ia)) {
                        gb = B(cb, Va, T);
                        cb.id == T && Y(T, true);
                        eb.success = true;
                        eb.ref = gb
                    } else if (wa && c()) {
                        cb.data = wa;
                        l(cb, Va, T, hb);
                        return
                    } else Y(T, true);
                    hb && hb(eb)
                })
            } else hb && hb(eb)
        },
        switchOffAutoHideShow: function () {
            Xa = false
        },
        ua: ja,
        getFlashPlayerVersion: function () {
            return {
                major: ja.pv[0],
                minor: ja.pv[1],
                release: ja.pv[2]
            }
        },
        hasFlashPlayerVersion: P,
        createSWF: function (M, T, ea) {
            if (ja.w3) return B(M, T, ea)
        },
        showExpressInstall: function (M, T, ea, ka) {
            ja.w3 && c() && l(M, T, ea, ka)
        },
        removeSWF: function (M) {
            ja.w3 && r(M)
        },
        createCSS: function (M, T, ea, ka) {
            ja.w3 && W(M, T, ea, ka)
        },
        addDomLoadEvent: d,
        addLoadEvent: f,
        getQueryParamValue: function (M) {
            var T = oa.location.search || oa.location.hash;
            if (T) {
                if (/\?/.test(T)) T = T.split("?")[1];
                if (M == null) return la(T);
                T = T.split("&");
                for (var ea = 0; ea < T.length; ea++) if (T[ea].substring(0, T[ea].indexOf("=")) == M) return la(T[ea].substring(T[ea].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function () {
            if ($a) {
                var M = E(sa);
                if (M && db) {
                    M.parentNode.replaceChild(db, M);
                    if (k) {
                        Y(k, true);
                        if (ja.ie && ja.win) db.style.display = "block"
                    }
                    Ga && Ga(Pa)
                }
                $a = false
            }
        }
    }
}();
swfobject.addDomLoadEvent(function () {
    typeof SWFUpload.onload === "function" && SWFUpload.onload.call(window)
});
if (typeof SWFUpload === "function") {
    SWFUpload.prototype.initSettings = function (b) {
        return function (d) {
            typeof b === "function" && b.call(this, d);
            this.refreshCookies(false)
        }
    }(SWFUpload.prototype.initSettings);
    SWFUpload.prototype.refreshCookies = function (b) {
        if (b === undefined) b = true;
        b = !! b;
        var d = this.settings.post_params,
            f, g = document.cookie.split(";"),
            i = g.length,
            j, n, c;
        for (f = 0; f < i; f++) {
            for (j = g[f]; j.charAt(0) === " ";) j = j.substring(1, j.length);
            n = j.indexOf("=");
            if (n > 0) {
                c = j.substring(0, n);
                j = j.substring(n + 1);
                d[c] = j
            }
        }
        b && this.setPostParams(d)
    }
};
(function (b) {
    b.fn.modalTabs = function (d) {
        var f = {
            attr: "href",
            history: true
        };
        d && b.extend(f, d);
        this.each(function () {
            var g = this;
            b(".modal-toolbar a", g).live("click", function (j) {
                j.preventDefault();
                b("a", g).removeClass("selected");
                b(this).addClass("selected");
                j = b(this).attr(f.attr);
                if (f.attr == "href") j = j.replace(/^.*#/, "");
                b(".modal-tab-view").hide();
                b("#" + j + "-pane").show();
                if (f.history) document.location.href = document.location.href.replace(/^.*/, "#" + anchor);
                return true
            });
            var i = function () {
                    var j = document.location.hash.replace("#", "");
                    if (j == "") j = "edit";
                    return j
                };
            if (f.history) {
                b(window).hashchange(function () {
                    b('a[href="#' + i() + '"]', g).click()
                });
                b(window).trigger("hashchange");
                b('a[href="#' + i() + '"]').click();
                history.navigationMode = "compatible"
            }
            b(".modal-tab-view", g).each(function () {
                var j = this;
                b("a.swap-form", j).live("click", function () {
                    b("a.swap-form, fieldset", j).toggle();
                    return false
                })
            })
        })
    }
})(jQuery);
jQuery.cookie = function (b, d, f) {
    if (arguments.length > 1 && String(d) !== "[object Object]") {
        f = jQuery.extend({}, f);
        if (d === null || d === undefined) f.expires = -1;
        if (typeof f.expires === "number") {
            var g = f.expires,
                i = f.expires = new Date;
            i.setDate(i.getDate() + g)
        }
        d = String(d);
        return document.cookie = [encodeURIComponent(b), "=", f.raw ? d : encodeURIComponent(d), f.expires ? "; expires=" + f.expires.toUTCString() : "", f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join("")
    }
    f = d || {};
    i = f.raw ?
    function (j) {
        return j
    } : decodeURIComponent;
    return (g = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? i(g[1]) : null
};
if (!this.JSON) this.JSON = {};
(function () {
    function b(p) {
        return p < 10 ? "0" + p : p
    }
    function d(p) {
        i.lastIndex = 0;
        return i.test(p) ? '"' + p.replace(i, function (w) {
            var B = c[w];
            return typeof B === "string" ? B : "\\u" + ("0000" + w.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + p + '"'
    }
    function f(p, w) {
        var B, z, r = j,
            x, E = w[p];
        if (E && typeof E === "object" && typeof E.toJSON === "function") E = E.toJSON(p);
        if (typeof l === "function") E = l.call(w, p, E);
        switch (typeof E) {
        case "string":
            return d(E);
        case "number":
            return isFinite(E) ? String(E) : "null";
        case "boolean":
        case "null":
            return String(E);
        case "object":
            if (!E) return "null";
            j += n;
            x = [];
            if (Object.prototype.toString.apply(E) === "[object Array]") {
                z = E.length;
                for (p = 0; p < z; p += 1) x[p] = f(p, E) || "null";
                w = x.length === 0 ? "[]" : j ? "[\n" + j + x.join(",\n" + j) + "\n" + r + "]" : "[" + x.join(",") + "]";
                j = r;
                return w
            }
            if (l && typeof l === "object") {
                z = l.length;
                for (p = 0; p < z; p += 1) {
                    B = l[p];
                    if (typeof B === "string") if (w = f(B, E)) x.push(d(B) + (j ? ": " : ":") + w)
                }
            } else for (B in E) if (Object.hasOwnProperty.call(E, B)) if (w = f(B, E)) x.push(d(B) + (j ? ": " : ":") + w);
            w = x.length === 0 ? "{}" : j ? "{\n" + j + x.join(",\n" + j) + "\n" + r + "}" : "{" + x.join(",") + "}";
            j = r;
            return w
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        }
    }
    var g = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        j, n, c = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        l;
    if (typeof JSON.stringify !== "function") JSON.stringify = function (p, w, B) {
        var z;
        n = j = "";
        if (typeof B === "number") for (z = 0; z < B; z += 1) n += " ";
        else if (typeof B === "string") n = B;
        if ((l = w) && typeof w !== "function" && (typeof w !== "object" || typeof w.length !== "number")) throw new Error("JSON.stringify");
        return f("", {
            "": p
        })
    };
    if (typeof JSON.parse !== "function") JSON.parse = function (p, w) {
        function B(z, r) {
            var x, E, H = z[r];
            if (H && typeof H === "object") for (x in H) if (Object.hasOwnProperty.call(H, x)) {
                E = B(H, x);
                if (E !== undefined) H[x] = E;
                else delete H[x]
            }
            return w.call(z, r, H)
        }
        g.lastIndex = 0;
        if (g.test(p)) p = p.replace(g, function (z) {
            return "\\u" + ("0000" + z.charCodeAt(0).toString(16)).slice(-4)
        });
        if (/^[\],:{}\s]*$/.test(p.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            p = eval("(" + p + ")");
            return typeof w === "function" ? B({
                "": p
            }, "") : p
        }
        throw new SyntaxError("JSON.parse");
    }
})();
(function (b) {
    b.extend(b.fn, {
        validate: function (d) {
            if (this.length) {
                var f = b.data(this[0], "validator");
                if (f) return f;
                f = new b.validator(d, this[0]);
                b.data(this[0], "validator", f);
                if (f.settings.onsubmit) {
                    this.find("input, button").filter(".cancel").click(function () {
                        f.cancelSubmit = true
                    });
                    f.settings.submitHandler && this.find("input, button").filter(":submit").click(function () {
                        f.submitButton = this
                    });
                    this.submit(function (g) {
                        function i() {
                            if (f.settings.submitHandler) {
                                if (f.submitButton) var j = b("<input type='hidden'/>").attr("name", f.submitButton.name).val(f.submitButton.value).appendTo(f.currentForm);
                                f.settings.submitHandler.call(f, f.currentForm);
                                f.submitButton && j.remove();
                                return false
                            }
                            return true
                        }
                        f.settings.debug && g.preventDefault();
                        if (f.cancelSubmit) {
                            f.cancelSubmit = false;
                            return i()
                        }
                        if (f.form()) {
                            if (f.pendingRequest) {
                                f.formSubmitted = true;
                                return false
                            }
                            return i()
                        } else {
                            f.focusInvalid();
                            return false
                        }
                    })
                }
                return f
            } else d && d.debug && window.console && console.warn("nothing selected, can't validate, returning nothing")
        },
        valid: function () {
            if (b(this[0]).is("form")) return this.validate().form();
            else {
                var d = true,
                    f = b(this[0].form).validate();
                this.each(function () {
                    d &= f.element(this)
                });
                return d
            }
        },
        removeAttrs: function (d) {
            var f = {},
                g = this;
            b.each(d.split(/\s/), function (i, j) {
                f[j] = g.attr(j);
                g.removeAttr(j)
            });
            return f
        },
        rules: function (d, f) {
            var g = this[0];
            if (d) {
                var i = b.data(g.form, "validator").settings,
                    j = i.rules,
                    n = b.validator.staticRules(g);
                switch (d) {
                case "add":
                    b.extend(n, b.validator.normalizeRule(f));
                    j[g.name] = n;
                    if (f.messages) i.messages[g.name] = b.extend(i.messages[g.name], f.messages);
                    break;
                case "remove":
                    if (!f) {
                        delete j[g.name];
                        return n
                    }
                    var c = {};
                    b.each(f.split(/\s/), function (l, p) {
                        c[p] = n[p];
                        delete n[p]
                    });
                    return c
                }
            }
            g = b.validator.normalizeRules(b.extend({}, b.validator.metadataRules(g), b.validator.classRules(g), b.validator.attributeRules(g), b.validator.staticRules(g)), g);
            if (g.required) {
                i = g.required;
                delete g.required;
                g = b.extend({
                    required: i
                }, g)
            }
            return g
        }
    });
    b.extend(b.expr[":"], {
        blank: function (d) {
            return !b.trim("" + d.value)
        },
        filled: function (d) {
            return !!b.trim("" + d.value)
        },
        unchecked: function (d) {
            return !d.checked
        }
    });
    b.validator = function (d, f) {
        this.settings = b.extend(true, {}, b.validator.defaults, d);
        this.currentForm = f;
        this.init()
    };
    b.validator.format = function (d, f) {
        if (arguments.length == 1) return function () {
            var g = b.makeArray(arguments);
            g.unshift(d);
            return b.validator.format.apply(this, g)
        };
        if (arguments.length > 2 && f.constructor != Array) f = b.makeArray(arguments).slice(1);
        if (f.constructor != Array) f = [f];
        b.each(f, function (g, i) {
            d = d.replace(RegExp("\\{" + g + "\\}", "g"), i)
        });
        return d
    };
    b.extend(b.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: b([]),
            errorLabelContainer: b([]),
            onsubmit: true,
            ignore: [],
            ignoreTitle: false,
            onfocusin: function (d) {
                this.lastActive = d;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, d, this.settings.errorClass, this.settings.validClass);
                    this.addWrapper(this.errorsFor(d)).hide()
                }
            },
            onfocusout: function (d) {
                if (!this.checkable(d) && (d.name in this.submitted || !this.optional(d))) this.element(d)
            },
            onkeyup: function (d) {
                if (d.name in this.submitted || d == this.lastElement) this.element(d)
            },
            onclick: function (d) {
                if (d.name in this.submitted) this.element(d);
                else d.parentNode.name in this.submitted && this.element(d.parentNode)
            },
            highlight: function (d, f, g) {
                d.type === "radio" ? this.findByName(d.name).addClass(f).removeClass(g) : b(d).addClass(f).removeClass(g)
            },
            unhighlight: function (d, f, g) {
                d.type === "radio" ? this.findByName(d.name).removeClass(f).addClass(g) : b(d).removeClass(f).addClass(g)
            }
        },
        setDefaults: function (d) {
            b.extend(b.validator.defaults, d)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: b.validator.format("Please enter no more than {0} characters."),
            minlength: b.validator.format("Please enter at least {0} characters."),
            rangelength: b.validator.format("Please enter a value between {0} and {1} characters long."),
            range: b.validator.format("Please enter a value between {0} and {1}."),
            max: b.validator.format("Please enter a value less than or equal to {0}."),
            min: b.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function () {
                function d(i) {
                    var j = b.data(this[0].form, "validator");
                    i = "on" + i.type.replace(/^validate/, "");
                    j.settings[i] && j.settings[i].call(j, this[0])
                }
                this.labelContainer = b(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || b(this.currentForm);
                this.containers = b(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var f = this.groups = {};
                b.each(this.settings.groups, function (i, j) {
                    b.each(j.split(/\s/), function (n, c) {
                        f[c] = i
                    })
                });
                var g = this.settings.rules;
                b.each(g, function (i, j) {
                    g[i] = b.validator.normalizeRule(j)
                });
                b(this.currentForm).validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", d).validateDelegate(":radio, :checkbox, select, option", "click", d);
                this.settings.invalidHandler && b(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                this.checkForm();
                b.extend(this.submitted, this.errorMap);
                this.invalid = b.extend({}, this.errorMap);
                this.valid() || b(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var d = 0, f = this.currentElements = this.elements(); f[d]; d++) this.check(f[d]);
                return this.valid()
            },
            element: function (d) {
                this.lastElement = d = this.clean(d);
                this.prepareElement(d);
                this.currentElements = b(d);
                var f = this.check(d);
                if (f) delete this.invalid[d.name];
                else this.invalid[d.name] = true;
                if (!this.numberOfInvalids()) this.toHide = this.toHide.add(this.containers);
                this.showErrors();
                return f
            },
            showErrors: function (d) {
                if (d) {
                    b.extend(this.errorMap, d);
                    this.errorList = [];
                    for (var f in d) this.errorList.push({
                        message: d[f],
                        element: this.findByName(f)[0]
                    });
                    this.successList = b.grep(this.successList, function (g) {
                        return !(g.name in d)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                b.fn.resetForm && b(this.currentForm).resetForm();
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (d) {
                var f = 0,
                    g;
                for (g in d) f++;
                return f
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide()
            },
            valid: function () {
                return this.size() == 0
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    b(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (d) {}
            },
            findLastActive: function () {
                var d = this.lastActive;
                return d && b.grep(this.errorList, function (f) {
                    return f.element.name == d.name
                }).length == 1 && d
            },
            elements: function () {
                var d = this,
                    f = {};
                return b(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    !this.name && d.settings.debug && window.console && console.error("%o has no name assigned", this);
                    if (this.name in f || !d.objectLength(b(this).rules())) return false;
                    return f[this.name] = true
                })
            },
            clean: function (d) {
                return b(d)[0]
            },
            errors: function () {
                return b(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
            },
            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = b([]);
                this.toHide = b([]);
                this.currentElements = b([])
            },
            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (d) {
                this.reset();
                this.toHide = this.errorsFor(d)
            },
            check: function (d) {
                d = this.clean(d);
                if (this.checkable(d)) d = this.findByName(d.name).not(this.settings.ignore)[0];
                var f = b(d).rules(),
                    g = false,
                    i;
                for (i in f) {
                    var j = {
                        method: i,
                        parameters: f[i]
                    };
                    try {
                        var n = b.validator.methods[i].call(this, d.value.replace(/\r/g, ""), d, j.parameters);
                        if (n == "dependency-mismatch") g = true;
                        else {
                            g = false;
                            if (n == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(d));
                                return
                            }
                            if (!n) {
                                this.formatAndAdd(d, j);
                                return false
                            }
                        }
                    } catch (c) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + d.id + ", check the '" + j.method + "' method", c);
                        throw c;
                    }
                }
                if (!g) {
                    this.objectLength(f) && this.successList.push(d);
                    return true
                }
            },
            customMetaMessage: function (d, f) {
                if (b.metadata) return (d = this.settings.meta ? b(d).metadata()[this.settings.meta] : b(d).metadata()) && d.messages && d.messages[f]
            },
            customMessage: function (d, f) {
                return (d = this.settings.messages[d]) && (d.constructor == String ? d : d[f])
            },
            findDefined: function () {
                for (var d = 0; d < arguments.length; d++) if (arguments[d] !== undefined) return arguments[d]
            },
            defaultMessage: function (d, f) {
                return this.findDefined(this.customMessage(d.name, f), this.customMetaMessage(d, f), !this.settings.ignoreTitle && d.title || undefined, b.validator.messages[f], "<strong>Warning: No message defined for " + d.name + "</strong>")
            },
            formatAndAdd: function (d, f) {
                var g = this.defaultMessage(d, f.method),
                    i = /\$?\{(\d+)\}/g;
                if (typeof g == "function") g = g.call(this, f.parameters, d);
                else if (i.test(g)) g = jQuery.format(g.replace(i, "{$1}"), f.parameters);
                this.errorList.push({
                    message: g,
                    element: d
                });
                this.errorMap[d.name] = g;
                this.submitted[d.name] = g
            },
            addWrapper: function (d) {
                if (this.settings.wrapper) d = d.add(d.parent(this.settings.wrapper));
                return d
            },
            defaultShowErrors: function () {
                for (var d = 0; this.errorList[d]; d++) {
                    var f = this.errorList[d];
                    this.settings.highlight && this.settings.highlight.call(this, f.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(f.element, f.message)
                }
                if (this.errorList.length) this.toShow = this.toShow.add(this.containers);
                if (this.settings.success) for (d = 0; this.successList[d]; d++) this.showLabel(this.successList[d]);
                if (this.settings.unhighlight) {
                    d = 0;
                    for (f = this.validElements(); f[d]; d++) this.settings.unhighlight.call(this, f[d], this.settings.errorClass, this.settings.validClass)
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return b(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (d, f) {
                var g = this.errorsFor(d);
                if (g.length) {
                    g.removeClass().addClass(this.settings.errorClass);
                    g.attr("generated") && g.html(f)
                } else {
                    g = b("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(d),
                        generated: true
                    }).addClass(this.settings.errorClass).html(f || "");
                    if (this.settings.wrapper) g = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    this.labelContainer.append(g).length || (this.settings.errorPlacement ? this.settings.errorPlacement(g, b(d)) : g.insertAfter(d))
                }
                if (!f && this.settings.success) {
                    g.text("");
                    typeof this.settings.success == "string" ? g.addClass(this.settings.success) : this.settings.success(g)
                }
                this.toShow = this.toShow.add(g)
            },
            errorsFor: function (d) {
                var f = this.idOrName(d);
                return this.errors().filter(function () {
                    return b(this).attr("for") == f
                })
            },
            idOrName: function (d) {
                return this.groups[d.name] || (this.checkable(d) ? d.name : d.id || d.name)
            },
            checkable: function (d) {
                return /radio|checkbox/i.test(d.type)
            },
            findByName: function (d) {
                var f = this.currentForm;
                return b(document.getElementsByName(d)).map(function (g, i) {
                    return i.form == f && i.name == d && i || null
                })
            },
            getLength: function (d, f) {
                switch (f.nodeName.toLowerCase()) {
                case "select":
                    return b("option:selected", f).length;
                case "input":
                    if (this.checkable(f)) return this.findByName(f.name).filter(":checked").length
                }
                return d.length
            },
            depend: function (d, f) {
                return this.dependTypes[typeof d] ? this.dependTypes[typeof d](d, f) : true
            },
            dependTypes: {
                "boolean": function (d) {
                    return d
                },
                string: function (d, f) {
                    return !!b(d, f.form).length
                },
                "function": function (d, f) {
                    return d(f)
                }
            },
            optional: function (d) {
                return !b.validator.methods.required.call(this, b.trim(d.value), d) && "dependency-mismatch"
            },
            startRequest: function (d) {
                if (!this.pending[d.name]) {
                    this.pendingRequest++;
                    this.pending[d.name] = true
                }
            },
            stopRequest: function (d, f) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) this.pendingRequest = 0;
                delete this.pending[d.name];
                if (f && this.pendingRequest == 0 && this.formSubmitted && this.form()) {
                    b(this.currentForm).submit();
                    this.formSubmitted = false
                } else if (!f && this.pendingRequest == 0 && this.formSubmitted) {
                    b(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false
                }
            },
            previousValue: function (d) {
                return b.data(d, "previousValue") || b.data(d, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(d, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            dateDE: {
                dateDE: true
            },
            number: {
                number: true
            },
            numberDE: {
                numberDE: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function (d, f) {
            d.constructor == String ? (this.classRuleSettings[d] = f) : b.extend(this.classRuleSettings, d)
        },
        classRules: function (d) {
            var f = {};
            (d = b(d).attr("class")) && b.each(d.split(" "), function () {
                this in b.validator.classRuleSettings && b.extend(f, b.validator.classRuleSettings[this])
            });
            return f
        },
        attributeRules: function (d) {
            var f = {};
            d = b(d);
            for (var g in b.validator.methods) {
                var i = d.attr(g);
                if (i) f[g] = i
            }
            f.maxlength && /-1|2147483647|524288/.test(f.maxlength) && delete f.maxlength;
            return f
        },
        metadataRules: function (d) {
            if (!b.metadata) return {};
            var f = b.data(d.form, "validator").settings.meta;
            return f ? b(d).metadata()[f] : b(d).metadata()
        },
        staticRules: function (d) {
            var f = {},
                g = b.data(d.form, "validator");
            if (g.settings.rules) f = b.validator.normalizeRule(g.settings.rules[d.name]) || {};
            return f
        },
        normalizeRules: function (d, f) {
            b.each(d, function (g, i) {
                if (i === false) delete d[g];
                else if (i.param || i.depends) {
                    var j = true;
                    switch (typeof i.depends) {
                    case "string":
                        j = !! b(i.depends, f.form).length;
                        break;
                    case "function":
                        j = i.depends.call(f, f)
                    }
                    if (j) d[g] = i.param !== undefined ? i.param : true;
                    else delete d[g]
                }
            });
            b.each(d, function (g, i) {
                d[g] = b.isFunction(i) ? i(f) : i
            });
            b.each(["minlength", "maxlength", "min", "max"], function () {
                if (d[this]) d[this] = Number(d[this])
            });
            b.each(["rangelength", "range"], function () {
                if (d[this]) d[this] = [Number(d[this][0]), Number(d[this][1])]
            });
            if (b.validator.autoCreateRanges) {
                if (d.min && d.max) {
                    d.range = [d.min, d.max];
                    delete d.min;
                    delete d.max
                }
                if (d.minlength && d.maxlength) {
                    d.rangelength = [d.minlength, d.maxlength];
                    delete d.minlength;
                    delete d.maxlength
                }
            }
            d.messages && delete d.messages;
            return d
        },
        normalizeRule: function (d) {
            if (typeof d == "string") {
                var f = {};
                b.each(d.split(/\s/), function () {
                    f[this] = true
                });
                d = f
            }
            return d
        },
        addMethod: function (d, f, g) {
            b.validator.methods[d] = f;
            b.validator.messages[d] = g != undefined ? g : b.validator.messages[d];
            f.length < 3 && b.validator.addClassRules(d, b.validator.normalizeRule(d))
        },
        methods: {
            required: function (d, f, g) {
                if (!this.depend(g, f)) return "dependency-mismatch";
                switch (f.nodeName.toLowerCase()) {
                case "select":
                    return (d = b(f).val()) && d.length > 0;
                case "input":
                    if (this.checkable(f)) return this.getLength(d, f) > 0;
                default:
                    return b.trim(d).length > 0
                }
            },
            remote: function (d, f, g) {
                if (this.optional(f)) return "dependency-mismatch";
                var i = this.previousValue(f);
                this.settings.messages[f.name] || (this.settings.messages[f.name] = {});
                i.originalMessage = this.settings.messages[f.name].remote;
                this.settings.messages[f.name].remote = i.message;
                g = typeof g == "string" && {
                    url: g
                } || g;
                if (this.pending[f.name]) return "pending";
                if (i.old === d) return i.valid;
                i.old = d;
                var j = this;
                this.startRequest(f);
                var n = {};
                n[f.name] = d;
                b.ajax(b.extend(true, {
                    url: g,
                    mode: "abort",
                    port: "validate" + f.name,
                    dataType: "json",
                    data: n,
                    success: function (c) {
                        j.settings.messages[f.name].remote = i.originalMessage;
                        var l = c === true;
                        if (l) {
                            var p = j.formSubmitted;
                            j.prepareElement(f);
                            j.formSubmitted = p;
                            j.successList.push(f);
                            j.showErrors()
                        } else {
                            p = {};
                            c = c || j.defaultMessage(f, "remote");
                            p[f.name] = i.message = b.isFunction(c) ? c(d) : c;
                            j.showErrors(p)
                        }
                        i.valid = l;
                        j.stopRequest(f, l)
                    }
                }, g));
                return "pending"
            },
            minlength: function (d, f, g) {
                return this.optional(f) || this.getLength(b.trim(d), f) >= g
            },
            maxlength: function (d, f, g) {
                return this.optional(f) || this.getLength(b.trim(d), f) <= g
            },
            rangelength: function (d, f, g) {
                d = this.getLength(b.trim(d), f);
                return this.optional(f) || d >= g[0] && d <= g[1]
            },
            min: function (d, f, g) {
                return this.optional(f) || d >= g
            },
            max: function (d, f, g) {
                return this.optional(f) || d <= g
            },
            range: function (d, f, g) {
                return this.optional(f) || d >= g[0] && d <= g[1]
            },
            email: function (d, f) {
                return this.optional(f) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(d)
            },
            url: function (d, f) {
                return this.optional(f) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(d)
            },
            date: function (d, f) {
                return this.optional(f) || !/Invalid|NaN/.test(new Date(d))
            },
            dateISO: function (d, f) {
                return this.optional(f) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(d)
            },
            number: function (d, f) {
                return this.optional(f) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(d)
            },
            digits: function (d, f) {
                return this.optional(f) || /^\d+$/.test(d)
            },
            creditcard: function (d, f) {
                if (this.optional(f)) return "dependency-mismatch";
                if (/[^0-9-]+/.test(d)) return false;
                var g = f = 0,
                    i = false;
                d = d.replace(/\D/g, "");
                for (var j = d.length - 1; j >= 0; j--) {
                    g = d.charAt(j);
                    g = parseInt(g, 10);
                    if (i) if ((g *= 2) > 9) g -= 9;
                    f += g;
                    i = !i
                }
                return f % 10 == 0
            },
            accept: function (d, f, g) {
                g = typeof g == "string" ? g.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(f) || d.match(RegExp(".(" + g + ")$", "i"))
            },
            equalTo: function (d, f, g) {
                g = b(g).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    b(f).valid()
                });
                return d == g.val()
            }
        }
    });
    b.format = b.validator.format
})(jQuery);
(function (b) {
    var d = {};
    if (b.ajaxPrefilter) b.ajaxPrefilter(function (g, i, j) {
        i = g.port;
        if (g.mode == "abort") {
            d[i] && d[i].abort();
            d[i] = j
        }
    });
    else {
        var f = b.ajax;
        b.ajax = function (g) {
            var i = ("port" in g ? g : b.ajaxSettings).port;
            if (("mode" in g ? g : b.ajaxSettings).mode == "abort") {
                d[i] && d[i].abort();
                return d[i] = f.apply(this, arguments)
            }
            return f.apply(this, arguments)
        }
    }
})(jQuery);
(function (b) {
    !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && b.each({
        focus: "focusin",
        blur: "focusout"
    }, function (d, f) {
        function g(i) {
            i = b.event.fix(i);
            i.type = f;
            return b.event.handle.call(this, i)
        }
        b.event.special[f] = {
            setup: function () {
                this.addEventListener(d, g, true)
            },
            teardown: function () {
                this.removeEventListener(d, g, true)
            },
            handler: function (i) {
                arguments[0] = b.event.fix(i);
                arguments[0].type = f;
                return b.event.handle.apply(this, arguments)
            }
        }
    });
    b.extend(b.fn, {
        validateDelegate: function (d, f, g) {
            return this.bind(f, function (i) {
                var j = b(i.target);
                if (j.is(d)) return g.apply(j, arguments)
            })
        }
    })
})(jQuery);
var currentDialogHideFunction = null,
    currentDialogType = null;
OpenVBX.clientDial = function (b) {
    b = $.extend(b, {
        Digits: 1
    });
    window.parent.Client.call(b)
};
OpenVBX.clientHangup = function () {
    window.parent.Client.hangup()
};
OpenVBX.clientMute = function () {
    window.parent.Client.mute()
};
OpenVBX.clientUnMute = function () {
    window.parent.Client.unmute()
};
$(function () {
    if (window.parent.Client && (window.parent.Client.disabled || window.parent.Twilio.Device.status() == "offline")) {
        var b = $('#vbx-context-menu .call-dialog select[name="device"]').closest("label"),
            d = $('<input type="hidden" name="device" value="primary-device" />');
        b.replaceWith(d);
        var f = $("#vbx-client-status");
        if (f.hasClass("online")) {
            f.removeClass("online").addClass("offline").addClass("disabled");
            window.parent.Client.status.setWindowStatus(false)
        }
        window.parent.Client.onready = function () {
            return function () {
                f.hasClass("disabled") && f.removeClass("disabled").find("button").trigger("click");
                d.replaceWith(b)
            }
        }();
        f.addClass("disabled")
    }
    var g = false,
        i = null,
        j = $(".call-dialog").css("opacity", 0);
    $("form", j).live("submit", function (p) {
        p.preventDefault()
    });
    var n = function (p, w) {
            i && clearTimeout(i);
            w.shown = false;
            $(".call-button").data("link", w);
            i = setTimeout(function () {
                i = null;
                j.animate({
                    top: "-=35px",
                    opacity: 0
                }, 250, "swing", function () {
                    g = false;
                    j.css("display", "none")
                })
            }, 100);
            $(".screen").hide();
            $(".invoke-call-button span").text("Call");
            $(".call-dialing").hide();
            currentDialogType = currentDialogHideFunction = null;
            return false
        };
    $(".twilio-call").each(function () {
        var p = false,
            w = this;
        w.shown = false;
        var B = $(this),
            z = function (r, x) {
                currentDialogType == "sms" && currentDialogHideFunction();
                i && clearTimeout(i);
                if (p || x.shown) return false;
                if (g) {
                    g = false;
                    $(".call-button").data("link").shown = false;
                    $(".call-dialog").hide()
                }
                r = "";
                if (x) {
                    r = $(x).text() != "Call" ? $(x).text() : "";
                    target = $(x).attr("href")
                }
                g = p = true;
                j.css({
                    position: "absolute",
                    left: B.get(0).offsetLeft,
                    top: B.get(0).offsetTop,
                    display: "block"
                }).animate({
                    top: "+=35px",
                    opacity: 1
                }, 250, "swing", function () {
                    p = false;
                    x.shown = true
                });
                $(".call-button").data("link", x);
                $('input[name="to"]', j).val(r).focus();
                $('input[name="target"]', j).val(target);
                $(".screen").show();
                currentDialogType = "call";
                currentDialogHideFunction = function () {
                    n(null, x)
                };
                return true
            };
        $(window).keypress(function (r) {
            r.keyCode == 27 && n(r, w)
        });
        $(this).hasClass("hover") ? $([B.get(0), j.get(0)]).mouseover(function (r) {
            z(r, w)
        }).mouseout(function (r) {
            n(r, w)
        }) : $(B).click(function (r) {
            return z(r, w) ? false : n(r, w)
        });
        $(".close", j).live("click", function (r) {
            n(r, w);
            r.preventDefault()
        })
    });
    var c = function () {
            window.parent.Client.call({
                to: $("#dial-number", j).val(),
                callerid: $(':input[name="callerid"]', j).val(),
                Digits: 1
            });
            $(".close", j).click()
        },
        l = function (p, w) {
            $(".invoke-call-button span").text("Calling...");
            $(".call-dialing").show();
            var B = $(w).data("link");
            $(this).prop("disabled", true);
            var z = $(w);
            $.ajax({
                url: OpenVBX.home + "/messages/call",
                data: $("form input, form select", j),
                dataType: "json",
                type: "POST",
                success: function (r) {
                    z.prop("disabled", false);
                    n(p, B);
                    if (r.error) {
                        $(".error-dialog").dialog("option", "buttons", {
                            Ok: function () {
                                $(this).dialog("close")
                            }
                        });
                        $(".error-dialog .error-code").text("");
                        $(".error-dialog .error-message").text("Unable to complete call. Message from server: " + r.message);
                        $(".error-dialog").dialog("open")
                    } else $.notify("You are now being connected to " + $('input[name="to"]', j).val())
                }
            })
        };
    $(".call-button", j).click(function (p) {
        p.preventDefault();
        $('select[name="device"]', j).val() == "client" ? c() : l(p, this)
    });
    $(".screen").live("click", function (p) {
        p.preventDefault();
        g && $(".close", j).click()
    });
    $("#vbx-client-status .client-button").live("click", function (p) {
        p.preventDefault();
        p.stopPropagation();
        p = $(this).closest("#vbx-client-status");
        var w = true,
            B = null;
        if (window.parent.Client.disabled || window.parent.Twilio.Device.status() == "offline") w = false;
        if (w) {
            if (p.hasClass("online")) {
                B = false;
                p.removeClass("online")
            } else {
                B = true;
                p.addClass("online")
            }
            window.parent.Client.status.setWindowStatus(B)
        } else {
            $(".error-dialog .error-code").text("");
            $(".error-dialog .error-message").text("The Phone Client is not available. Please check to make sure that you have Flash installed and that there are no Flash Blocking plugins enabled.");
            $(".error-dialog").dialog("open")
        }
    })
});
$(function () {
    var b = false,
        d = null,
        f = $(".sms-dialog").css("opacity", 0);
    $("form", f).live("submit", function (j) {
        j.preventDefault()
    });
    var g = function (j, n) {
            $(".send-sms-button").prop("disabled", false);
            d && clearTimeout(d);
            n || (n = $(".sms-button").data("link"));
            n.shown = false;
            $(".sms-button").data("link", n);
            d = setTimeout(function () {
                d = null;
                f.animate({
                    top: "-=35px",
                    opacity: 0
                }, 250, "swing", function () {
                    b = false;
                    f.css("display", "none")
                })
            }, 100);
            $(".screen").hide();
            $(".send-sms-button span").text("Send SMS");
            $(".sms-sending").hide();
            currentDialogType = currentDialogHideFunction = null;
            return false
        };
    $(".twilio-sms").each(function () {
        var j = false,
            n = this;
        n.shown = false;
        var c = $(this),
            l = function (p, w) {
                $(".send-sms-button").attr("rel", $(w).attr("rel"));
                $(".send-sms-button").prop("disabled", false);
                currentDialogType == "call" && currentDialogHideFunction();
                d && clearTimeout(d);
                if (j || w.shown) return false;
                if (b) {
                    b = false;
                    $(".sms-button").data("link").shown = false;
                    $(".sms-dialog").hide()
                }
                p = "";
                if (w) {
                    p = $(w).text().match(/sms/i) ? "" : $(w).text();
                    target = $(w).attr("href")
                }
                b = j = true;
                f.css({
                    position: "absolute",
                    left: c.get(0).offsetLeft,
                    top: c.get(0).offsetTop,
                    display: "block"
                }).animate({
                    top: "+=35px",
                    opacity: 1
                }, 250, "swing", function () {
                    j = false;
                    w.shown = true
                });
                $(".sms-button").data("link", w);
                $('input[name="to"]', f).val(p);
                $('input[name="target"]', f).val(target);
                $(".screen").show();
                currentDialogType = "sms";
                currentDialogHideFunction = function () {
                    g(null, w)
                };
                return true
            };
        $(window).keypress(function (p) {
            p.keyCode == 27 && g(p, n)
        });
        $(this).hasClass("hover") ? $([c.get(0), f.get(0)]).mouseover(function (p) {
            l(p, n)
        }).mouseout(function (p) {
            g(p, n)
        }) : $(c).click(function (p) {
            return l(p, n) ? false : g(p, n)
        });
        $(".close", f).live("click", function (p) {
            g(p, n);
            p.preventDefault()
        })
    });
    $(".send-sms-button", f).click(function (j) {
        $(".send-sms-button span").text("Sending...");
        $(".send-sms-button .sms-sending").show();
        var n = $(this).data("link");
        $(this).prop("disabled", false);
        var c = $(j.target).attr("rel"),
            l = $(this);
        $.ajax({
            url: OpenVBX.home + "/messages/sms" + (c ? "/" + c : ""),
            data: $("form input, form select, form textarea", f),
            dataType: "json",
            type: "POST",
            success: function (p) {
                l.prop("disabled", false);
                g(j, n);
                if (p.error) {
                    $(".error-dialog").dialog("option", "buttons", {
                        Ok: function () {
                            $(this).dialog("close")
                        }
                    });
                    $(".error-dialog .error-code").text("");
                    $(".error-dialog .error-message").text("Unable to send sms. Message from server: " + p.message);
                    $(".error-dialog").dialog("open")
                } else {
                    $.notify("SMS sent to " + $('input[name="to"]', f).val());
                    $("textarea", f).val("");
                    $("input", f).val("")
                }
            }
        });
        return false
    });
    var i = function () {
            var j = $(this).val().length;
            $(".count", f).text(160 - j)
        };
    $("textarea", f).live("keypress", i);
    $("textarea", f).live("keyup", i);
    $("textarea", f).live("load", i);
    $(".screen").live("click", function (j) {
        j.preventDefault();
        b && $(".close", f).click()
    })
});
jQuery.fn.flicker = function (b) {
    var d = jQuery.extend({
        color: "#FEEEBD",
        speed: "slow"
    }, b),
        f = function (g) {
            if (!g.flickerLocked) {
                g.flickerLocked = true;
                var i = $(g).css("background-color");
                $(g).animate({
                    backgroundColor: d.color,
                    queue: true
                }, d.speed).animate({
                    backgroundColor: i,
                    queue: true
                }, d.speed, function () {
                    g.flickerLocked = false
                })
            }
        };
    return this.each(function () {
        f(this);
        return $(this)
    })
};
(function (b, d, f) {
    function g(w) {
        w = w || location.href;
        return "#" + w.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var i = "hashchange",
        j = document,
        n, c = b.event.special,
        l = j.documentMode,
        p = "on" + i in d && (l === f || l > 7);
    b.fn[i] = function (w) {
        return w ? this.bind(i, w) : this.trigger(i)
    };
    b.fn[i].delay = 50;
    c[i] = b.extend(c[i], {
        setup: function () {
            if (p) return false;
            b(n.start)
        },
        teardown: function () {
            if (p) return false;
            b(n.stop)
        }
    });
    n = function () {
        function w() {
            var X = g(),
                P = H(r);
            if (X !== r) {
                E(r = X, P);
                b(d).trigger(i)
            } else if (P !== r) location.href = location.href.replace(/#.*/, "") + P;
            z = setTimeout(w, b.fn[i].delay)
        }
        var B = {},
            z, r = g(),
            x = function (X) {
                return X
            },
            E = x,
            H = x;
        B.start = function () {
            z || w()
        };
        B.stop = function () {
            z && clearTimeout(z);
            z = f
        };
        b.browser.msie && !p &&
        function () {
            var X, P;
            B.start = function () {
                if (!X) {
                    P = (P = b.fn[i].src) && P + g();
                    X = b('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        P || E(g());
                        w()
                    }).attr("src", P || "javascript:0").insertAfter("body")[0].contentWindow;
                    j.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") X.document.title = j.title
                        } catch (W) {}
                    }
                }
            };
            B.stop = x;
            H = function () {
                return g(X.location.href)
            };
            E = function (W, Y) {
                var la = X.document,
                    ca = b.fn[i].domain;
                if (W !== Y) {
                    la.title = j.title;
                    la.open();
                    ca && la.write('<script>document.domain="' + ca + '"<\/script>');
                    la.close();
                    X.location.hash = W
                }
            }
        }();
        return B
    }()
})(jQuery, this);
(function (b) {
    b.extend(b.fn, {
        livequery: function (d, f, g) {
            var i = this,
                j;
            if (b.isFunction(d)) {
                g = f;
                f = d;
                d = undefined
            }
            b.each(b.livequery.queries, function (n, c) {
                if (i.selector == c.selector && i.context == c.context && d == c.type && (!f || f.$lqguid == c.fn.$lqguid) && (!g || g.$lqguid == c.fn2.$lqguid)) return (j = c) && false
            });
            j = j || new b.livequery(this.selector, this.context, d, f, g);
            j.stopped = false;
            j.run();
            return this
        },
        expire: function (d, f, g) {
            var i = this;
            if (b.isFunction(d)) {
                g = f;
                f = d;
                d = undefined
            }
            b.each(b.livequery.queries, function (j, n) {
                if (i.selector == n.selector && i.context == n.context && (!d || d == n.type) && (!f || f.$lqguid == n.fn.$lqguid) && (!g || g.$lqguid == n.fn2.$lqguid) && !this.stopped) b.livequery.stop(n.id)
            });
            return this
        }
    });
    b.livequery = function (d, f, g, i, j) {
        this.selector = d;
        this.context = f;
        this.type = g;
        this.fn = i;
        this.fn2 = j;
        this.elements = [];
        this.stopped = false;
        this.id = b.livequery.queries.push(this) - 1;
        i.$lqguid = i.$lqguid || b.livequery.guid++;
        if (j) j.$lqguid = j.$lqguid || b.livequery.guid++;
        return this
    };
    b.livequery.prototype = {
        stop: function () {
            var d = this;
            if (this.type) this.elements.unbind(this.type, this.fn);
            else this.fn2 && this.elements.each(function (f, g) {
                d.fn2.apply(g)
            });
            this.elements = [];
            this.stopped = true
        },
        run: function () {
            if (!this.stopped) {
                var d = this,
                    f = this.elements,
                    g = b(this.selector, this.context),
                    i = g.not(f);
                this.elements = g;
                if (this.type) {
                    i.bind(this.type, this.fn);
                    f.length > 0 && b.each(f, function (j, n) {
                        b.inArray(n, g) < 0 && b.event.remove(n, d.type, d.fn)
                    })
                } else {
                    i.each(function () {
                        d.fn.apply(this)
                    });
                    this.fn2 && f.length > 0 && b.each(f, function (j, n) {
                        b.inArray(n, g) < 0 && d.fn2.apply(n)
                    })
                }
            }
        }
    };
    b.extend(b.livequery, {
        guid: 0,
        queries: [],
        queue: [],
        running: false,
        timeout: null,
        checkQueue: function () {
            if (b.livequery.running && b.livequery.queue.length) for (var d = b.livequery.queue.length; d--;) b.livequery.queries[b.livequery.queue.shift()].run()
        },
        pause: function () {
            b.livequery.running = false
        },
        play: function () {
            b.livequery.running = true;
            b.livequery.run()
        },
        registerPlugin: function () {
            b.each(arguments, function (d, f) {
                if (b.fn[f]) {
                    var g = b.fn[f];
                    b.fn[f] = function () {
                        var i = g.apply(this, arguments);
                        b.livequery.run();
                        return i
                    }
                }
            })
        },
        run: function (d) {
            if (d != undefined) b.inArray(d, b.livequery.queue) < 0 && b.livequery.queue.push(d);
            else b.each(b.livequery.queries, function (f) {
                b.inArray(f, b.livequery.queue) < 0 && b.livequery.queue.push(f)
            });
            b.livequery.timeout && clearTimeout(b.livequery.timeout);
            b.livequery.timeout = setTimeout(b.livequery.checkQueue, 20)
        },
        stop: function (d) {
            d != undefined ? b.livequery.queries[d].stop() : b.each(b.livequery.queries, function (f) {
                b.livequery.queries[f].stop()
            })
        }
    });
    b.livequery.registerPlugin("append", "prepend", "after", "before", "wrap", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "empty", "remove", "html");
    b(function () {
        b.livequery.play()
    })
})(jQuery);
jQuery.fn.buttonista = function (b) {
    var d = jQuery.extend({
        menu: "ul",
        toggler: ".toggler"
    }, b),
        f = function () {
            $(this).parent().children(d.menu).toggleClass("open");
            return false
        };
    $(window).keypress(function (g) {
        g.keyCode == "27" && $(d.menu).removeClass("open")
    });
    return this.each(function () {
        var g = $(this);
        g.click(f);
        $(d.toggler, g.parent()).click(function (i) {
            i.preventDefault();
            g.click()
        })
    })
};
(function (b) {
    function d(i) {
        for (var j = 0; j < document.styleSheets.length; j++) {
            v = document.styleSheets[j];
            attrClass = f(i, v);
            if (attrClass != false) break
        }
        attrClass || (attrClass = Array());
        objStyle = {};
        if (attrClass == "") return false;
        attrClass = attrClass.match(";") ? attrClass.split(";") : [attrClass];
        b(attrClass).each(function (n, c) {
            if (c != "") {
                c = c.split(":");
                c[0] = g(c[0]);
                objStyle[c[0]] = b.trim(c[1])
            }
        });
        return objStyle
    }
    function f(i, j) {
        attrClass = false;
        if (b.browser.msie) if (j.rules.length > 0) b(j.rules).each(function (n, c) {
            if (i == c.selectorText) attrClass = c.style.cssText
        });
        else j.imports.length > 0 && b(j.imports).each(function (n, c) {
            if (i == c.selectorText) attrClass = c.style.cssText;
            else if (c == "[object]" || c == "[Object CSSStyleSheet]" || c == "[object CSSImportRule]") return f(i, c)
        });
        else b(j.cssRules).each(function (n, c) {
            if (i == c.selectorText) attrClass = c.style.cssText;
            else if (c == "[object CSSImportRule]") return f(i, c.styleSheet)
        });
        return attrClass
    }
    function g(i) {
        i = b.trim(i);
        i = i.replace(/-/g, " ");
        i = i.toLowerCase();
        strArr = i.split(" ");
        var j = "";
        b(strArr).each(function (n, c) {
            if (n == 0) j += c;
            else {
                j += c.substr(0, 1).toUpperCase();
                j += c.substr(1, c.length)
            }
        });
        return j
    }
    b.fn.extend({
        animateToClass: function (i, j, n, c) {
            if (!i) return this;
            i = d(i);
            if (!i) return this;
            b(this).data("animated", true);
            return this.animate(i, j, n, c)
        },
        toggleAnimateToClass: function (i, j, n, c, l) {
            i = i;
            if (b(this).data("animated")) {
                b(this).data("animated", false);
                i = j
            } else b(this).data("animated", true);
            j = d(i);
            if (!j) return this;
            return this.animate(j, n, c, l)
        }
    })
})(jQuery);
$.notify = function (b, d) {
    var f = "";
    if (d) f = ' <a href="' + d + '">Learn more</a>';
    $(".notify").addClass("hide");
    setTimeout(function () {
        $(".notify .message").text(b).append(f).append('<a href="" class="close action"><span class="replace">Close</span></a>');
        $(".notify").removeClass("hide").fadeIn("slow");
        $(".notify").delay(1E4).fadeOut("slow")
    }, 500);
    return $(".notify")
};
$(document).ready(function () {
    $(".notify .message .close.action").live("click", function (b) {
        b.preventDefault();
        $(".notify").dequeue().fadeOut("fast")
    })
});
(function (b) {
    var d = ["swfupload_loaded_handler", "file_queued_handler", "file_queue_error_handler", "file_dialog_start_handler", "file_dialog_complete_handler", "upload_start_handler", "upload_progress_handler", "upload_error_handler", "upload_success_handler", "upload_complete_handler", "queue_complete_handler"],
        f = [];
    b.fn.swfupload = function () {
        var g = b.makeArray(arguments);
        return this.each(function () {
            var i;
            if (g.length == 1 && typeof g[0] == "object") {
                i = b(this).data("__swfu");
                if (!i) {
                    var j = g[0],
                        n = b(this);
                    i = [];
                    b.merge(i, d);
                    b.merge(i, f);
                    b.each(i, function (l, p) {
                        var w = p.replace(/_handler$/, "").replace(/_([a-z])/g, function (B, z) {
                            return z.toUpperCase()
                        });
                        j[p] = function () {
                            var B = b.Event(w);
                            n.trigger(B, b.makeArray(arguments));
                            return !B.isDefaultPrevented()
                        }
                    });
                    b(this).data("__swfu", new SWFUpload(j))
                }
            } else if (g.length > 0 && typeof g[0] == "string") {
                var c = g.shift();
                (i = b(this).data("__swfu")) && i[c] && i[c].apply(i, g)
            }
        })
    };
    b.fn.swfuploadUnload = function () {
        return this.each(function () {
            var g;
            g = b(this).data("__swfu");
            if (g != null) {
                var i = g.settings.button_placeholder,
                    j = b("#" + g.movieName).parent();
                g.destroy();
                j.append(i);
                b(this).data("__swfu", null);
                b(this).unbind()
            }
        })
    };
    b.swfupload = {
        additionalHandlers: function () {
            if (arguments.length === 0) return f.slice();
            else b(arguments).each(function (g, i) {
                b.merge(f, b.makeArray(i))
            })
        },
        defaultHandlers: function () {
            return d.slice()
        },
        getInstance: function (g) {
            return b(g).data("__swfu")
        }
    }
})(jQuery);
jQuery.fn.tabify = function (b) {
    settings = jQuery.extend({
        selector: "#tab-",
        view: ".vbx-tab-view",
        defaultView: ""
    }, b);
    return $(this).each(function () {
        var d = this;
        $("li", this).click(function () {
            $("li", d).removeClass("selected");
            $(this).addClass("selected");
            var g = $("a", this).attr("href").replace(/^.*#/, "");
            $(settings.view).hide();
            $(settings.selector + g).show();
            document.location.href = document.location.href.replace(/^.*/, "#" + g);
            return true
        });
        var f = function () {
                var g = document.location.hash.replace("#", "");
                if (g == "") g = settings.defaultView;
                return g
            };
        $(window).hashchange(function () {
            $('a[href="#' + f() + '"]').click()
        });
        $(window).trigger("hashchange");
        $('a[href="#' + f() + '"]').click();
        history.navigationMode = "compatible"
    })
};
(function (b) {
    function d(c, l, p) {
        c.value = b(l).text();
        b(c).change();
        b.browser.msie || c.focus();
        p.hide()
    }
    function f(c, l) {
        var p = c.getHours(),
            w = l.show24Hours ? p : (p + 11) % 12 + 1;
        c = c.getMinutes();
        return g(w) + l.separator + g(c) + (l.show24Hours ? "" : p < 12 ? " AM" : " PM")
    }
    function g(c) {
        return (c < 10 ? "0" : "") + c
    }
    function i(c, l) {
        return typeof c == "object" ? n(c) : j(c, l)
    }
    function j(c, l) {
        if (c) {
            var p = c.split(l.separator),
                w = parseFloat(p[0]);
            p = parseFloat(p[1]);
            if (!l.show24Hours) if (w === 12 && c.indexOf("AM") !== -1) w = 0;
            else if (w !== 12 && c.indexOf("PM") !== -1) w += 12;
            return n(new Date(0, 0, 0, w, p, 0))
        }
        return null
    }
    function n(c) {
        c.setFullYear(2001);
        c.setMonth(0);
        c.setDate(0);
        return c
    }
    b.fn.timePicker = function (c) {
        var l = b.extend({}, b.fn.timePicker.defaults, c);
        return this.each(function () {
            b.timePicker(this, l)
        })
    };
    b.timePicker = function (c, l) {
        c = b(c)[0];
        return c.timePicker || (c.timePicker = new jQuery._timePicker(c, l))
    };
    b._timePicker = function (c, l) {
        var p = false,
            w = false,
            B = i(l.startTime, l),
            z = i(l.endTime, l);
        b(c).attr("autocomplete", "OFF");
        for (var r = [], x = new Date(B); x <= z;) {
            r[r.length] = f(x, l);
            x = new Date(x.setMinutes(x.getMinutes() + l.step))
        }
        var E = b('<div class="time-picker' + (l.show24Hours ? "" : " time-picker-12hours") + '"></div>'),
            H = b("<ul></ul>");
        for (x = 0; x < r.length; x++) H.append("<li>" + r[x] + "</li>");
        E.append(H);
        E.appendTo("body").hide();
        E.mouseover(function () {
            p = true
        }).mouseout(function () {
            p = false
        });
        b("li", H).mouseover(function () {
            if (!w) {
                b("li.selected", E).removeClass("selected");
                b(this).addClass("selected")
            }
        }).mousedown(function () {
            p = true
        }).click(function () {
            d(c, this, E, l);
            p = false
        });
        var X = function () {
                if (E.is(":visible")) return false;
                b("li", E).removeClass("selected");
                var P = b(c).offset();
                E.css({
                    top: P.top + c.offsetHeight,
                    left: P.left
                });
                E.show();
                var W = c.value ? j(c.value, l) : B;
                P = B.getHours() * 60 + B.getMinutes();
                W = W.getHours() * 60 + W.getMinutes() - P;
                W = Math.round(W / l.step);
                P = n(new Date(0, 0, 0, 0, W * l.step + P, 0));
                P = B < P && P <= z ? P : B;
                P = b("li:contains(" + f(P, l) + ")", E);
                if (P.length) {
                    P.addClass("selected");
                    E[0].scrollTop = P[0].offsetTop
                }
                return true
            };
        b(c).focus(X).click(X);
        b(c).blur(function () {
            p || E.hide()
        });
        r = b.browser.opera || b.browser.mozilla ? "keypress" : "keydown";
        b(c)[r](function (P) {
            w = true;
            var W = E[0].scrollTop;
            switch (P.keyCode) {
            case 38:
                if (X()) return false;
                P = b("li.selected", H);
                var Y = P.prev().addClass("selected")[0];
                if (Y) {
                    P.removeClass("selected");
                    if (Y.offsetTop < W) E[0].scrollTop = W - Y.offsetHeight
                } else {
                    P.removeClass("selected");
                    Y = b("li:last", H).addClass("selected")[0];
                    E[0].scrollTop = Y.offsetTop - Y.offsetHeight
                }
                return false;
            case 40:
                if (X()) return false;
                P = b("li.selected", H);
                if (Y = P.next().addClass("selected")[0]) {
                    P.removeClass("selected");
                    if (Y.offsetTop + Y.offsetHeight > W + E[0].offsetHeight) E[0].scrollTop = W + Y.offsetHeight
                } else {
                    P.removeClass("selected");
                    b("li:first", H).addClass("selected");
                    E[0].scrollTop = 0
                }
                return false;
            case 13:
                if (E.is(":visible")) {
                    W = b("li.selected", H)[0];
                    d(c, W, E, l)
                }
                return false;
            case 27:
                E.hide();
                return false
            }
            return true
        });
        b(c).keyup(function () {
            w = false
        });
        this.getTime = function () {
            return j(c.value, l)
        };
        this.setTime = function (P) {
            c.value = f(n(P), l);
            b(c).change()
        }
    };
    b.fn.timePicker.defaults = {
        step: 30,
        startTime: new Date(0, 0, 0, 0, 0, 0),
        endTime: new Date(0, 0, 0, 23, 30, 0),
        separator: ":",
        show24Hours: true
    }
})(jQuery);
var _st = window.setTimeout;
window.setTimeout = function (b, d) {
    if (typeof b == "function") {
        var f = Array.prototype.slice.call(arguments, 2);
        return _st(function () {
            b.apply(null, f)
        }, d)
    }
    return _st(b, d)
};
$.fn.extend({
    left: function (b) {
        if (b === undefined) return $(this).offset().left;
        else $(this).css("left", b)
    },
    top: function (b) {
        if (b === undefined) return $(this).offset().top;
        else $(this).css("top", b)
    },
    right: function (b) {
        if (b === undefined) return $(this).offset().left + $(this).outerWidth(true);
        else $(this).css("left", b - $(this).outerWidth(true))
    },
    bottom: function (b) {
        if (b === undefined) return $(this).offset().top + $(this).outerHeight(true);
        else $(this).css("top", b - $(this).outerHeight(true))
    },
    frame: function () {
        return "{ " + $(this).left() + ", " + $(this).top() + ", " + $(this).outerWidth(true) + ", " + $(this).outerHeight(true) + " }"
    }
});

function preventDefault(b) {
    b.preventDefault()
}

function convertTimeToString(b, d, f) {
    if (!d || !f) {
        var g = new Date;
        d = (new Date(g.getFullYear(), g.getMonth(), g.getDate(), 0, 0, 0)).getTime();
        f = (new Date(g.getFullYear(), 0, 1, 0, 0, 0)).getTime()
    }
    var i = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    g = new Date(b);
    if (b > d) {
        b = g.getHours();
        g = g.getMinutes();
        d = b < 12 ? "am" : "pm";
        if (b > 12) b -= 12;
        if (b == 0) b = 12;
        return b + ":" + (g < 10 ? "0" : "") + g + " " + d
    } else if (b > f) return i[g.getMonth()] + " " + g.getDate();
    else {
        b = g.getYear() - 100;
        return g.getMonth() + "/" + g.getDay() + "/" + (b < 10 ? "0" : "") + b
    }
}
$(document).ready(function () {
    $("button").mouseover(function () {
        $(this).addClass("ui-state-hover")
    }).mouseout(function () {
        $(this).removeClass("ui-state-hover")
    }).mousedown(function () {
        $(this).addClass("ui-state-focus")
    }).mouseup(function () {
        $(this).removeClass("ui-state-focus")
    });
    $.fn.values = function (b) {
        var d = $(this).find(":input").get();
        if (typeof b != "object") {
            b = {};
            $.each(d, function () {
                if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) b[this.name] = $(this).val()
            });
            return b
        } else {
            $.each(d, function () {
                if (this.name && b[this.name]) if (this.type == "checkbox" || this.type == "radio") this.checked = b[this.name] == $(this).val();
                else $(this).val(b[this.name])
            });
            return $(this)
        }
    };
    $.fn.fadeRemove = function (b) {
        return $(this).fadeOut(b, function () {
            $(this).remove()
        })
    };
    $.postJSON = function (b, d, f) {
        if (b.indexOf("http://") < 0) b = OpenVBX.home + "/" + b;
        $.post(b, d, f, "json")
    };
    $.extend($.ui.dialog.defaults, {
        autoOpen: false,
        closeOnEscape: true,
        closeText: "",
        draggable: true,
        height: "auto",
        modal: true,
        position: "center",
        resizable: false,
        open: function () {
            $("button").each(function () {
                $(this).text().match(/cancel/i) && $(this).addClass("cancel")
            })
        }
    });
    $(".tabs").tabs();
    $.each([{
        name: "tabs",
        selector: ".tabs",
        css: "c/ui.tabs.css"
    }], function () {
        $(this.selector).length > 0 && this.css && $("<link>").appendTo("head").attr({
            rel: "stylesheet",
            type: "text/css",
            href: OpenVBX.assets + "/" + this.css
        })
    });
    $(":radio, :checkbox").live("click", function () {
        var b = $(this).hasClass("checked");
        if (this.checked) {
            this.name && $(this).attr("type") == "radio" && $(this).siblings(".checked").removeClass("checked");
            $(this).addClass("checked");
            $('label[for="' + this.id + '"]').addClass("checked")
        } else if (b) {
            $(this).removeClass("checked");
            $('label[for="' + this.id + '"]').removeClass("checked")
        }
    });
    $(".error-dialog").dialog({
        autoOpen: false,
        bgiframe: true,
        resizable: false,
        modal: true,
        buttons: {
            Okay: function () {
                $(this).dialog("close")
            }
        }
    });
    $.ajaxSetup({
        dataType: "json",
        cache: false
    });
    $(document).ajaxError(function (b, d, f) {
        $(".error-dialog").dialog("option", "buttons", {
            Ok: function () {
                $(this).dialog("close")
            }
        });
        $(".error-dialog .error-code").text("");
        $(".error-dialog .error-message").text("An unknown error occurred.  Please contact your OpenVBX provider.  Unable to complete request: " + f.url);
        $(".error-dialog").dialog("open")
    })
});
$(document).ready(function () {
    if ($.browser.msie && $.browser.version < 7) {
        $(".error-dialog").attr("title", "Unsupported Browser");
        $(".error-dialog .error-code").text("");
        $(".error-dialog .error-message").text("Microsoft Internet Explorer is not currently supported.  It is currently under development and will be supported in the near future.  We recommend you use Mozilla Firefox, Safari, or Chrome at this time");
        $(".error-dialog").dialog("open")
    }
    $(".shout-out .close").click(function () {
        $(".shout-out").hide();
        $.cookie("mobile-app", "false", {
            path: "/"
        })
    });
    $("#client-first-run a.dismiss").live("click", function (b) {
        b.preventDefault();
        b.stopPropagation();
        var d = $("#client-first-run");
        b = $("#vbx-client-status").hasClass("online");
        $.ajax({
            url: OpenVBX.home + "/account/edit",
            data: {
                online: (b ? 1 : 0).toString()
            },
            success: function () {
                d.slideUp("3000")
            },
            type: "POST",
            dataType: "json"
        })
    });
    $.cookie("mobile-app") == "false" ? $(".shout-out").hide() : $(".shout-out").show();
    $(".vbx-login-form #iEmail").size() > 0 && $(".vbx-login-form #iEmail").focus()
});

function convertMsecsToMinutesAndSeconds(b) {
    var d = Math.floor(b / 1E3 / 60);
    b = Math.floor(b / 1E3 % 60);
    return (d < 10 ? "0" : "") + d + ":" + (b < 10 ? "0" : "") + b
}
$(document).ready(function () {

});
var swfu, Pickers = {
    
    usergroup: {
        picker: null,
        open: function (b) {
            $(".usergroup-dialog").length > 0 && $(".usergroup-dialog").remove();
            $("body").append($(b));
            $(".usergroup-dialog").dialog({
                autoOpen: false,
                bgiframe: true,
                resizable: false,
                height: 480,
                width: 500,
                modal: true,
                title: "Choose a user or group",
                overlay: {
                    backgroundColor: "#000",
                    opacity: 0.5
                },
                buttons: {
                    Cancel: function () {
                        $(this).dialog("close")
                    },
                    "Add User": Pickers.usergroup.addUser,
                    "Add Group": Pickers.usergroup.addGroup
                }
            });
            $(".usergroup-dialog").dialog("open")
        },
        dialog: function (b) {
            b.preventDefault();
            Pickers.usergroup.picker = b.target;
            $.ajax({
                url: OpenVBX.home + "/dialog/usergroup",
                cache: false,
                data: {
                    barebones: 1
                },
                success: function (d) {
                    Pickers.usergroup.open(d)
                },
                dataType: "html"
            });
            return false
        },
        hoverIn: function (b) {
            $(b.target).parents("tr").addClass("hover")
        },
        hoverOut: function (b) {
            $(b.target).parents("tr").removeClass("hover")
        },
        select: function (b) {
            var d = $(b.target).parents("tr"),
                f = d.attr("rel").replace(/^(user|group)_/, "");
            d = d.hasClass("user") ? "user" : "group";
            var g = "";
            b = $(b.target).parents("tr").children("td");
            g = d == "user" ? $(b[1]).text() + " (" + $(b[2]).text() + ")" : $(b[1]).text();
            Pickers.usergroup.setPickerValue(f, d, g)
        },
        setPickerValue: function (b, d, f) {
            var g = $(Pickers.usergroup.picker).parents(".usergroup-container");
            $(g).find("p").addClass("selected-usergroup").removeClass("placeholder");
            $("input.usergroup-id", g).val(b);
            $("input.usergroup-type", g).val(d);
            $(".selected-usergroup", g).text(f);
            $(".usergroup-dialog").dialog("close");
            $(g).trigger("usergroup-selected", [f, d, b])
        },
        editUser: function (b) {
            b.preventDefault();
            b.stopPropagation();
            b = $(b.target).closest("tr").attr("rel").replace(/^user_/, "");
            $.postJSON("accounts/user/get", {
                id: b
            }, showUserEdit);
            $(document).unbind("user-edited", Pickers.usergroup.userEdited);
            $(document).bind("user-edited", Pickers.usergroup.userEdited);
            return false
        },
        editGroup: function (b) {
            b.preventDefault();
            b.stopPropagation();
            b = $(b.target).closest("tr").attr("rel").replace(/^group_/, "");
            $.postJSON("accounts/group/get", {
                id: b
            }, showGroupEdit);
            $(document).unbind("group-edited", Pickers.usergroup.groupEdited);
            $(document).bind("group-edited", Pickers.usergroup.groupEdited);
            return false
        },
        addUser: function () {
            showUserAdd(null);
            $(document).unbind("user-added", Pickers.usergroup.userAdded);
            $(document).bind("user-added", Pickers.usergroup.userAdded)
        },
        addGroup: function () {
            showGroupEdit(null);
            $(document).unbind("group-added", Pickers.usergroup.groupAdded);
            $(document).bind("group-added", Pickers.usergroup.groupAdded)
        },
        userAdded: function (b, d) {
            Pickers.usergroup.setPickerValue(d.id, "user", d.first_name + " " + d.last_name + " (" + d.email + ")")
        },
        userEdited: function (b, d) {
            b = $('.usergroup-dialog .users-and-groups-table tr[rel="user_' + d.id + '"]').find("td");
            $(b[1]).text(d.first_name + " " + d.last_name);
            $(b[2]).text(d.email)
        },
        groupAdded: function (b, d) {
            Pickers.usergroup.setPickerValue(d.id, "group", d.name)
        },
        groupEdited: function (b, d) {
            b = $('.usergroup-dialog .users-and-groups-table tr[rel="group_' + d.id + '"]').find("td");
            $(b[1]).text(d.name)
        }
    }
};

var Message = {};

$(document).ready(function () {
    (function () {
        var d = new Date,
            f = (new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0)).getTime(),
            g = (new Date(d.getFullYear(), 0, 1, 0, 0, 0)).getTime();
        $(".unformatted-absolute-timestamp").each(function (i, j) {
            j = $(j);
            i = parseInt(j.text()) * 1E3;
            j.text(convertTimeToString(i, f, g));
            j.removeClass("hide")
        });
        d = function () {
            $(".unformatted-relative-timestamp").each(function (i, j) {
                j = $(j);
                i = j.data("timestamp");
                if (!i) {
                    i = parseInt(j.text()) * 1E3;
                    j.data("timestamp", i)
                }
                var n = (new Date).getTime(),
                    c = n - i,
                    l = Math.floor(c / 1E3 / 60);
                c = Math.floor(c / 1E3 / 60 / 60);
                n > i && n - i < 36E5 ? j.text(c == 0 ? l + " minutes ago" : c + " hour" + (c > 1 ? "s" : "") + " ago") : j.text(convertTimeToString(i));
                j.removeClass("hide")
            })
        };
        d();
        setInterval(d, 6E4)
    })();
    
    $(".select").click(function () {
        var d = $(this).attr("class").replace("select ", "").replace("-", "_");
        d = Message.Select[d] ||
        function () {};
        d($(".message-row"));
        $(".dropdown-select-button").parent().children("ul.open").toggleClass("open");
        return false
    });
    $('input[type="checkbox"]').change(function () {
        this.checked ? $(this).trigger("checked") : $(this).trigger("unchecked")
    });
    $('.message-select input[type="checkbox"]').bind("checked", function () {
        $(this).parent().parent().addClass("checked")
    }).bind("unchecked", function () {
        $(this).parent().parent().removeClass("checked")
    });
    $(".assign-button").buttonista({
        menu: ".assign-to-popup"
    });
    $(".assign-button").click(function (d) {
        var f = $(this).parent().children(".assign-to-popup");
        f.top($(this).top() - 1);
        f.right($(this).right() + 5);
        var g = $(document).scrollTop(),
            i = $(document).scrollTop() + $(window).height();
        f.top() < g && f.top(g + 10);
        f.bottom() > i && f.bottom(i - 10);
        d.preventDefault()
    });
    

    $(".dropdown-select-button").buttonista();
    $(".delete-button").click(function () {
        if ($(".delete-button").attr("id") && $(".delete-button").attr("id").match("delete-")) {
            d = $(this).attr("id").replace("delete-", "");
            Message.Detail.archive(d, function () {
                $(".delete-button span").text("Deleted")
            })
        } else {
            var d = [];
            $('input[name^="message"]:checked').each(function () {
                d.push($(this).val())
            });
            if (!d.length) return;
            Message.Detail.archive(d, function () {
                for (var f in d) $('tr[rel="' + d[f] + '"]').remove();
                $.notify("Deleted " + d.length + " message" + (d.length > 1 ? "s" : ""))
            })
        }
        return false
    });
    $(".assign-user-list .user a").live("click", function (d) {
        d.preventDefault();
        var f = $(this),
            g;
        g = (d = f.text().match(/\((..)\)$/)) ? d[1] : "";
        Message.Detail.assign($(this).parents("tr").attr("rel"), $(this).attr("rel"), function () {
            f.parents("ul").find("li").removeClass("assigned");
            f.parent().addClass("assigned");
            f.parents("td").find(".owner-name").text(g);
            f.parents(".assign-to-popup").removeClass("open")
        })
    });
    $("#save-details").click(function () {
        $("#message-details").submit()
    })
});

$(document).ready(function () {
});