/*:
* https://notritter.itch.io/ritter-title-movie-plugin-rpg-maker-mz
*
* @target MZ
*
* @plugindesc Ritter's Title Movie Plugin v2.1
* https://notritter.itch.io/
*
* @author Ritter
*
* @help
*
* Ritter's Title Movie Plugin Features:
* - Play Videos from a Playlist before the Title Screen!
* - - Plays every video on playlist before going to Title Screen!
* - - Input skips to next available video else goes to Title Screen.
* - Play a Video from a Playlist when Idle on Title Screen!
* - - Choose Random or Ordered Playback.
* - - When Video Playback Completes Returns to Title Screen.
* - - Next Video will Play when Idle again.
* - Play a Video in the Background of your Title Screen!
* - Play a Video in the Foreground of your Title Screen!
* - Apply Blend Modes to Foreground and Background Videos and more!
*
* Configure Plugin Parameters to get Started!
*
* Place your movie files inside your projects movies folder. You may need both
* .webm and .mp4 files.
*
* --------------------------------------------------------------------------------
* 
* Terms of Use:
* Can be used in Commercial and Non-Commercial games if purchased.
* Personal edits are allowed for use in your game,
* Don't claim credit for creating this plugin.
* Don't post this plugin elsewhere, modified or otherwise.
* Don't remove my name from Author.
* I am not liable for any problems you may encounter while
* using this plugin, though I may, or may not, be available
* for support on RPG Maker Forums or my itch.io page for this plugin.
* I will not offer support for edits to the code.
* Please credit me in your games credits as: Craig "Ritter" B.
*
* --------------------------------------------------------------------------------
*
* @param Pre-Title Movie Settings
* @type struct<PTSettings>
* @desc Pre-Title Movie Settings
* @default {"Playlist":"[]"}
*
* @param Idle Movie Settings
* @type struct<IdleSettings>
* @desc Idle Movie Settings
* @default {"Playlist":"[]","Playback":"order","Wait":"60","Fade":"3","BlackWait":"1"}
*
* @param Background Movie Settings
* @type struct<VidSettings>
* @default {"Name":"none","BlendMode":"NORMAL","Rate":"1","Volume":"0","Alpha":"1","Loop":"true"}
* @desc Background Movie Settings.
*
* @param Foreground Movie Settings
* @type struct<VidSettings>
* @default {"Name":"none","BlendMode":"ADD","Rate":"1","Volume":"0","Alpha":"1","Loop":"true"}
* @desc Foreground Movie Settings.
*
* @param Pause Videos On Focus Lost
* @type boolean
* @default true
* @desc Pauses the Videos if the Game Window Loses Focus.
*
*/
/*~struct~VidSettings: 
* @param Name
* @text Video Filename
* @type text
* @desc Filename of Video. No extension.
* Set to 'none' to disable this feature.
* @default none
* 
* @param BlendMode
* @text Blend Mode
* @type select
* @option NORMAL
* @value NORMAL
* @option ADD
* @value ADD
* @option MULTIPLY
* @value MULTIPLY
* @option SCREEN
* @value SCREEN
* @desc Select Blend Mode.
* @default NORMAL
*
* @param Rate
* @text Playback Rate
* @type text
* @desc Playback speed of Video. 1 = 1x
* @default 1
*
* @param Volume
* @type text
* @desc Volume of Video. 0 min 1 max
* @default 0
*
* @param Alpha
* @text Opacity
* @type text
* @desc The Alpha Value for Video
* @default 1
*
* @param Loop
* @text Looping video?
* @desc Does the Video Loop?
* @type boolean
* @default true
* 
*/
/*~struct~PTSettings: 
* @param Playlist
* @type text[]
* @desc Pre-Title Movie Player Playlist. List of Video Filenames.
* Leave Empty to Disable this Feature.
* @default 
*
*/
/*~struct~IdleSettings: 
* @param Playlist
* @type text[]
* @desc Idle Video Player Playlist. List of Video FileNames.
* Do not include file extension. Leave Empty to Disable Feature.
* @default 
* 
* @param Playback
* @text Playback Mode
* @type select
* @option Ordered
* @value order
* @option Random
* @value random
* @desc Playlist Playback Mode. Ordered will play videos in order. Random will play a random video.
* @default order
*
* @param Wait
* @text Title Screen Idle Duration
* @type number
* @default 120
* @min -1
* @desc Time in seconds to wait for movie to play when player is idle. Set to -1 to disable Idle Video Player.
*
* @param Fade
* @text Title Screen Idle Fade Speed
* @type number
* @default 3
* @desc The fade speed in seconds when transitioning from Title Screen to movie when player is idle.
* 
* @param BlackWait
* @text Black Screen Duration
* @type number
* @default 1
* @desc The number of seconds to wait after Title screen fades to black before starting Title Movie.
* 
*/


var Imported = Imported || {};
Imported.Ritter_TitleMovie = true;

var Ritter = Ritter || {};
Ritter.Params = Ritter.Params || {};
Ritter.TitleMovie = {};

// Parameters

var parameters = PluginManager.parameters('Ritter_TitleMovie');
Ritter.Params.ptMovie = JSON.parse(parameters['Pre-Title Movie Settings']);
Ritter.Params.ptMovie.Playlist = JSON.parse(Ritter.Params.ptMovie.Playlist);
Ritter.Params.bgMovie = JSON.parse(parameters['Background Movie Settings']);
Ritter.Params.fgMovie = JSON.parse(parameters['Foreground Movie Settings']);
Ritter.Params.focus = JSON.parse(parameters['Pause Videos On Focus Lost']);
Ritter.Params.idleVideo = JSON.parse(parameters['Idle Movie Settings']);
Ritter.Params.idleVideo.BlackWait = JSON.parse(Ritter.Params.idleVideo.BlackWait);
Ritter.Params.idleVideo.Fade = JSON.parse(Ritter.Params.idleVideo.Fade);
var _pl = Ritter.Params.idleVideo.Playlist;
Ritter.Params.idleVideo.Playlist = [];

	var playlist = JSON.parse(_pl);
	for (i = 0; i < playlist.length; i++) {
		var vid = {};
		vid.name = playlist[i];
		vid.id = i + 1;
		Ritter.Params.idleVideo.Playlist[vid.id] = vid;
	}

Ritter.Params.idleVideo.Wait = JSON.parse(Ritter.Params.idleVideo.Wait);

var $idlePlayer = Ritter.Params.idleVideo;
$idlePlayer.Fade *= 60;
$idlePlayer.Wait *= 60;
$idlePlayer.BlackWait *= 60;
$idlePlayer.Enabled = $idlePlayer.Playlist.length > 0;
$idlePlayer.isRunning = false;
var RitterTitleMovie = false;
var RitterFadeOut = false;
var RitterFadeTime = $idlePlayer.Fade;
var RitterBlackWait = $idlePlayer.BlackWait;
var RitterTitleWait = $idlePlayer.Wait;

if ($idlePlayer.Playlist.length > 0) $idlePlayer.active = $idlePlayer.Playlist.length;

// Plugin Code

// TitleMovie Scene

function Scene_TitleMovie() {
	this.initialize.apply(this, arguments);
};

Scene_TitleMovie.prototype = Object.create(Scene_Base.prototype);
Scene_TitleMovie.prototype.constructor = Scene_TitleMovie;

Scene_TitleMovie.prototype.initialize = function() {
	Scene_Base.prototype.initialize.call(this);
	if ($idlePlayer.Enabled && $idlePlayer.isRunning) {
		var active = $idlePlayer.Playlist[$idlePlayer.active].name;
	}
	var name = active || Ritter.Params.ptMovie.Playlist[0];
	if (name.length > 0) {
		var ext = Ritter.videoFileExt();
		Video.play('movies/' + name + ext);
		this.active = 0;
	}
};

Scene_TitleMovie.prototype.update = function () {
	if (Ritter.TitleMovie.isInputPressed()) {
		Video._element.pause();
		Video._onEnd();
	}
};

(function() {

Ritter_Video_onEnd = Video._onEnd;
Video._onEnd = function() {
    Ritter_Video_onEnd.call(this);
	var scene = SceneManager._scene;
	if (scene instanceof Scene_TitleMovie) {
		var playlist = Ritter.Params.ptMovie.Playlist;
		var index = scene.active + 1;
		var name = playlist[index];
		var notIdle = !$idlePlayer.isRunning;
		if (RitterTitleMovie && !!name && notIdle) {
			var ext = Ritter.videoFileExt();
			Video.play('movies/' + name + ext);
			scene.active = index;
		} else {
			RitterTitleWait = $idlePlayer.Wait;
			RitterFadeOut = false;
			RitterFadeTime = $idlePlayer.Fade;
			RitterBlackWait = $idlePlayer.BlackWait;
			SceneManager.goto(Scene_Title);
		}
		
	}
};

Ritter.TitleMovie.isInputPressed = function() {
	if (!Video.isPlaying()) return false;
	if (Input.isTriggered('ok')) return true;
	if (Input.isTriggered('menu')) return true;
	if (Input.isTriggered('cancel')) return true;
	if (Input.isTriggered('escape')) return true;
	if (TouchInput.isCancelled()) return true;
	if (TouchInput.isTriggered()) return true;
	return false;
}

Ritter.videoFileExt = function() {
	if (Utils.canPlayWebm()) {
        return ".webm";
    } else {
        return ".mp4";
    }
};

var Ritter_SceneManager_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if (Ritter.Params.ptMovie.Playlist.length > 0) { 
		if (sceneClass === Scene_Title && RitterTitleMovie == false) {
			this._nextScene = new Scene_TitleMovie();
			RitterTitleMovie = true;
		} else {
			Ritter_SceneManager_goto.call(this, sceneClass);
		}
	} else {
		Ritter_SceneManager_goto.call(this, sceneClass);
	}
};

Ritter_Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	if (Ritter.Params.idleVideo.Playlist.length > 0) {
		//if (TouchInput.isTriggered() || TouchInput.isCancelled()) {
			//RitterFadeOut ? Ritter.cancelTitleFade() : RitterTitleWait = Ritter.Params.ptMovie.Wait;
		//}
		if (RitterTitleWait > 0) RitterTitleWait -= 1;
		if (RitterTitleWait == 0) {
			if (RitterFadeOut === false) {
				RitterFadeOut = true;
				this.fadeOutAll();
			}
			if (RitterFadeTime > 0) RitterFadeTime -= 1;
			if (RitterFadeTime == 0) {
				if (RitterBlackWait > 0) RitterBlackWait -= 1;
				if (RitterBlackWait == 0) {
					$idlePlayer.setVideoName();
					$idlePlayer.isRunning = true;
					SceneManager.goto(Scene_TitleMovie);
					$gameScreen.startFadeIn(0);
				}
			}
		}
	}

	if (SceneManager.isSceneChanging()) {
		this._endVideos();
	}
	Ritter_Scene_Title_update.call(this);
};

$idlePlayer.setVideoName = function() {
	var key = $idlePlayer.Playback
	var id = $idlePlayer.active;
	switch (key) {
		case "order":
			if (!!id) {
				$idlePlayer.active += 1;
				var noActive = !$idlePlayer.active;
				var listEnd = $idlePlayer.active >= $idlePlayer.Playlist.length;
				if (noActive || listEnd) {
					$idlePlayer.active = 1;
				}
			} else {
				$idlePlayer.active = 1;
			}
			break;
		case "random":
			$idlePlayer.active = Math.ceil(Math.random() * ($idlePlayer.Playlist.length - 1));
			break;
		default:
			break;
	}
}

var Ritter_Scene_Base_fadeOutAll = Scene_Base.prototype.fadeOutAll;
Scene_Base.prototype.fadeOutAll = function() {
	if (RitterFadeOut == true) {
		var time = $idlePlayer.Fade / 60;
		AudioManager.fadeOutBgm(time);
		AudioManager.fadeOutBgs(time);
		AudioManager.fadeOutMe(time);
		this.startFadeOut($idlePlayer.Fade);
	} else {
		Ritter_Scene_Base_fadeOutAll.call(this);
	}
};

// Refresh Title Screen idle timer on player activity

var Ritter_Input_isTriggered = Input.isTriggered;
Input.isTriggered = function(keyName) {
	if (SceneManager._scene instanceof Scene_Title && (keyName == 'up'
												   || keyName == 'down'
												   || keyName == 'left'
												   || keyName == 'right'
												   || keyName == 'escape'
												   || keyName == 'cancel'
												   || keyName == 'menu')) {
		RitterTitleWait = $idlePlayer.Wait;
		if (RitterFadeOut == true) {
			Ritter.cancelTitleFade();
		}
	}
	return Ritter_Input_isTriggered.call(this, keyName);
};

// Cancel Transition from Title Screen to Intro Movie on 'ok'

var Ritter_Window_TitleCommand_processOk = Window_TitleCommand.prototype.processOk;
Window_TitleCommand.prototype.processOk = function() {
    if (RitterFadeOut == true) { 
		Ritter.cancelTitleFade();
	} else {
	Ritter_Window_TitleCommand_processOk.call(this);
	}
};

Ritter.cancelTitleFade = function() {
	SceneManager._scene.startFadeIn(0, false);
	AudioManager._bgmBuffer = Ritter._TitleSceneBuffer;
	AudioManager._currentBgm = Ritter._TitleSceneBgm;
	Ritter._bgm = AudioManager.saveBgm();
	Ritter._bgs = AudioManager.saveBgs();			
	var bgm = Ritter._bgm;
	var bgs = Ritter._bgs;
	if(!AudioManager.isCurrentBgm(Ritter._bgm)) {
		AudioManager.playBgm(Ritter._bgm);
	} else if(AudioManager._bgmBuffer) {
		AudioManager._bgmBuffer.play(true, bgm.pos);
	}
	if(!AudioManager.isCurrentBgs(Ritter._bgs)) {
		AudioManager.playBgs(Ritter._bgs);
	} else if(AudioManager._bgsBuffer) {
		AudioManager._bgsBuffer.play(true, bgs.pos);
	}
	RitterFadeOut = false;
	RitterFadeTime = $idlePlayer.Fade;
	RitterBlackWait = $idlePlayer.BlackWait;
	RitterTitleWait = $idlePlayer.Wait;
};

// Audio Manager

var Ritter_AudioManager_fadeOutBgm = AudioManager.fadeOutBgm;
AudioManager.fadeOutBgm = function(duration) {
    if (SceneManager._scene instanceof Scene_Title) {
		if (this._bgmBuffer && this._currentBgm) {
		Ritter._TitleSceneBgm = this._currentBgm;
		Ritter._TitleSceneBuffer = this._bgmBuffer;
		this._bgmBuffer.fadeOut(duration);
		this._currentBgm = null;
		}
	} else {
		Ritter_AudioManager_fadeOutBgm.call(this,duration);
	}
};

// Background and Foreground Video Code

const Ritter_Scene_Title_CreateBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
    Ritter_Scene_Title_CreateBackground.call(this);
	if (Ritter.Params.bgMovie.Name !== "none" && !SceneManager._scene._backVideo) {
		this.createBackVideo();
	}
};

const Ritter_Scene_Title_Create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Ritter_Scene_Title_Create.call(this);
	RitterTitleWait = $idlePlayer.Wait;
	if (Ritter.Params.fgMovie.Name !== "none" && !SceneManager._scene._foreVideo) {
		this.createForeVideo();
	}
};

Scene_Title.prototype.createBackVideo = function() {
	const VidSet = Ritter.Params.bgMovie;
	const VideoName = VidSet.Name; 
	const x = 0;
	const y = 0;
	const w = Graphics.width;
	const h = Graphics.height;
	const blend = VidSet.BlendMode;
	const rate = Number(VidSet.Rate);
	const loop = (VidSet.Loop === 'true');
	const volume = Number(VidSet.Volume);
	const alpha = Number(VidSet.Alpha);
	this._backVideo = Ritter._CreateVideoPlayer(VideoName, x, y, w, h, blend, rate, loop, volume, alpha);
		
	this.addChild(this._backVideo);
}

Scene_Title.prototype.createForeVideo = function() {
		const VidSet = Ritter.Params.fgMovie;
		const VideoName = VidSet.Name;
		const x = 0;
		const y = 0;
		const w = Graphics.width;
		const h = Graphics.height;
		const blend = VidSet.BlendMode;
		const rate = Number(VidSet.Rate);
		const loop = (VidSet.Loop === 'true');
		const volume = Number(VidSet.Volume);
		const alpha = Number(VidSet.Alpha);
		this._foreVideo = Ritter._CreateVideoPlayer(VideoName, x, y, w, h, blend, rate, loop, volume, alpha);
		
		this.addChild(this._foreVideo);
}


const Ritter_SceneManager_updateScene = SceneManager.updateScene;
SceneManager.updateScene = function() {
    if (this._scene instanceof Scene_Title) {
		if (this._scene.isStarted()) {
			let bgmovie = Ritter.Params.bgMovie.Name == 'none' ? false : true;
			let fgmovie = Ritter.Params.fgMovie.Name == 'none' ? false : true;
			let bgsrc = bgmovie ? this._scene._backVideo.src : false;
			let fgsrc = fgmovie ? this._scene._foreVideo.src : false;
			if (!window.top.document.hasFocus() && Ritter.Params.focus) {
				if (!!bgsrc) bgsrc.pause();
				if (!!fgsrc) fgsrc.pause();
			}
		}
	}
	if (this._scene instanceof Scene_TitleMovie) {
		if (Ritter.Params.ptMovie.Playlist.length > 0 || $idlePlayer.Playlist.length > 0) {
			var lostFocus = !window.top.document.hasFocus() && Ritter.Params.focus;
			if (lostFocus && Video._element.currentTime > 0.1) {
				Video._element.pause();
			}
		
			if (!Video._element.isPlaying && SceneManager.isGameActive() && Ritter.Params.focus) {
				Video._element.play();
			}
		}
	}
	Ritter_SceneManager_updateScene.call(this);
};

Scene_Title.prototype._endVideos = function() {
	//destroy crashes game when 2 videos are playing... future fix if issues arise.
	if (!!this._backVideo) {
		this._backVideo.src.pause();
		this._backVideo.src.remove();
		this.removeChild(this._backVideo);
	}
	
	if (!!this._foreVideo) {
		this._foreVideo.src.pause();
		this._foreVideo.src.remove();
		this.removeChild(this._foreVideo);
	}
}

Ritter._CreateVideoPlayer = function(VideoName, x, y, w, h, blend, rate, loop, volume, alpha) {
	var ext = Game_Interpreter.prototype.videoFileExt();
	var VideoFilePath = 'movies/' + VideoName + ext;
	var VideoTexture = PIXI.Texture.from(VideoFilePath);
	var VideoSprite = new PIXI.Sprite(VideoTexture);
	var VideoSource = VideoTexture.baseTexture.resource.source;

	VideoSprite.blendMode = PIXI.BLEND_MODES[blend];
	VideoSprite.x = x;
	VideoSprite.y = y;
	VideoSprite.width = w;
	VideoSprite.height = h;
	VideoSprite.src = VideoSource;
	VideoSprite.alpha = alpha;

	VideoSource.volume = volume;
	VideoSource.playbackRate = rate;

	VideoSource.onplay = function() {
		VideoSource.isPlaying = true;
	}
	VideoSource.onpause = function() {
		VideoSource.isPlaying = false;
	}
	
	VideoSprite.update = function() {
		VideoTexture.update();

		if (!loop && VideoSource.currentTime == VideoSource.duration) {
			VideoSource.pause();
			VideoSource.remove();
			VideoSprite.destroy(true);
			this.removeChild(VideoSprite);
			VideoSource = null;
			VideoSprite = null;
			return;
		} 
		if (loop && VideoSource.currentTime == VideoSource.duration) {
			VideoSource.currentTime = 0;
			VideoSource.play();
		} 
		
		if (!SceneManager.isGameActive() && Ritter.Params.focus) {
			VideoSource.pause();
		}
		
		if (!VideoSource.isPlaying && SceneManager.isGameActive()) {
			VideoSource.play();
		}
		
	};
	return VideoSprite;
}

})();