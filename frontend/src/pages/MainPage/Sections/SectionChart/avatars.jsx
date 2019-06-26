import happy1 from "assets/img/argopt-icons/happy-1.png";
import happy2 from "assets/img/argopt-icons/happy-2.png";
import happy3 from "assets/img/argopt-icons/happy-3.png";
import happy4 from "assets/img/argopt-icons/happy-4.png";

import angry1 from "assets/img/argopt-icons/angry-1.png";
import angry2 from "assets/img/argopt-icons/angry-2.png";
import angry3 from "assets/img/argopt-icons/angry-3.png";
import angry4 from "assets/img/argopt-icons/angry-4.png";

import sad1 from "assets/img/argopt-icons/sad-1.png";
import sad2 from "assets/img/argopt-icons/sad-2.png";
import sad3 from "assets/img/argopt-icons/sad-3.png";
import sad4 from "assets/img/argopt-icons/sad-4.png";

import happyManager from "assets/img/argopt-icons/happy-manager.png";
import thinkingManager from "assets/img/argopt-icons/thinking-manager.png";

import injectionImage from "assets/img/job-icons/injection.png"
import pillImage from "assets/img/job-icons/pill.png"
import checklistImage from "assets/img/job-icons/checklist.png"

const happyAvatarsArray = [
  happy1,
  happy2,
  happy3,
  happy4
];
const angryAvatarsArray = [
  angry1,
  angry2,
  angry3,
  angry4
];

const sadAvatarsArray = [sad1, sad2, sad3, sad4];

const managerAvatarsArray = [happyManager, thinkingManager];

export const stateAvatars = {
  'sad': sadAvatarsArray,
  'happy': happyAvatarsArray,
  'angry': angryAvatarsArray,
  'manager': managerAvatarsArray
};

export const jobAvatars = {
  'injection': injectionImage,
  'medicine': pillImage,
  'test': checklistImage,
};