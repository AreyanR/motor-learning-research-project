﻿/************* 
 * Game *
 *************/


// store info about the experiment session:
let expName = 'game';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: false,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); },flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(MainGameRoutineBegin());
flowScheduler.add(MainGameRoutineEachFrame());
flowScheduler.add(MainGameRoutineEnd());
flowScheduler.add(quitPsychoJS, 'Thank you for your patience.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for your patience.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'Assets/dino.png', 'path': 'Assets/dino.png'},
    {'name': 'Assets/meat_bone.png', 'path': 'Assets/meat_bone.png'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2024.2.4';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var MainGameClock;
var dino_image;
var floor1;
var floor2;
var meatbone_image;
var score_text;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "MainGame"
  MainGameClock = new util.Clock();
  dino_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dino_image', units : undefined, 
    image : 'Assets/dino.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.2, 0.2],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  floor1 = new visual.Rect ({
    win: psychoJS.window, name: 'floor1', 
    width: [0.5, 0.3][0], height: [0.5, 0.3][1],
    ori: 0.0, 
    pos: [(- 0.5), (- 0.5)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1.0, 
    lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    fillColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -1, 
    interpolate: true, 
  });
  
  floor2 = new visual.Rect ({
    win: psychoJS.window, name: 'floor2', 
    width: [0.5, 0.3][0], height: [0.5, 0.3][1],
    ori: 0.0, 
    pos: [0, (- 0.5)], 
    draggable: false, 
    anchor: 'center', 
    lineWidth: 1.0, 
    lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    fillColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    colorSpace: 'rgb', 
    opacity: undefined, 
    depth: -2, 
    interpolate: true, 
  });
  
  meatbone_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'meatbone_image', units : undefined, 
    image : 'Assets/meat_bone.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, 
    pos : [0, 0], 
    draggable: false,
    size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  score_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'score_text',
    text: 'Score: 0',
    font: 'Arial',
    units: undefined, 
    pos: [0.45, 0.45], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var MainGameMaxDurationReached;
var MainGameMaxDuration;
var MainGameComponents;
function MainGameRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MainGame' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    MainGameClock.reset();
    routineTimer.reset();
    MainGameMaxDurationReached = false;
    // update component parameters for each repeat
    psychoJS.experiment.addData('MainGame.started', globalClock.getTime());
    MainGameMaxDuration = null
    // keep track of which components have finished
    MainGameComponents = [];
    MainGameComponents.push(dino_image);
    MainGameComponents.push(floor1);
    MainGameComponents.push(floor2);
    MainGameComponents.push(meatbone_image);
    MainGameComponents.push(score_text);
    
    MainGameComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var _pj;
var keys;
function MainGameRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MainGame' ---
    // get current time
    t = MainGameClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *dino_image* updates
    if (t >= 0.0 && dino_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dino_image.tStart = t;  // (not accounting for frame time here)
      dino_image.frameNStart = frameN;  // exact frame index
      
      dino_image.setAutoDraw(true);
    }
    
    
    // *floor1* updates
    if (t >= 0.0 && floor1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      floor1.tStart = t;  // (not accounting for frame time here)
      floor1.frameNStart = frameN;  // exact frame index
      
      floor1.setAutoDraw(true);
    }
    
    
    // *floor2* updates
    if (t >= 0.0 && floor2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      floor2.tStart = t;  // (not accounting for frame time here)
      floor2.frameNStart = frameN;  // exact frame index
      
      floor2.setAutoDraw(true);
    }
    
    
    // *meatbone_image* updates
    if (t >= 0.0 && meatbone_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      meatbone_image.tStart = t;  // (not accounting for frame time here)
      meatbone_image.frameNStart = frameN;  // exact frame index
      
      meatbone_image.setAutoDraw(true);
    }
    
    
    // *score_text* updates
    if (t >= 0.0 && score_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      score_text.tStart = t;  // (not accounting for frame time here)
      score_text.frameNStart = frameN;  // exact frame index
      
      score_text.setAutoDraw(true);
    }
    
    // Run 'Each Frame' code from DinoMovement
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    keys = psychoJS.eventManager.getKeys();
    if (_pj.in_es6("right", keys)) {
        trex.pos += [5, 0];
    }
    if (_pj.in_es6("left", keys)) {
        trex.pos -= [5, 0];
    }
    if ((_pj.in_es6("up", keys) && (trex.pos[1] === (- 150)))) {
        trex.pos += [0, 200];
    }
    if ((trex.pos[1] > (- 150))) {
        trex.pos -= [0, 10];
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    MainGameComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MainGameRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MainGame' ---
    MainGameComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('MainGame.stopped', globalClock.getTime());
    // the Routine "MainGame" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
