import happy1 from "assets/img/argopt-icons/happy-1.png";
import happy2 from "assets/img/argopt-icons/happy-2.png";
import happy3 from "assets/img/argopt-icons/happy-3.png";
import happy4 from "assets/img/argopt-icons/happy-4.png";
import happy5 from "assets/img/argopt-icons/happy-5.png";
import happy6 from "assets/img/argopt-icons/happy-6.png";
import happy7 from "assets/img/argopt-icons/happy-7.png";
import happy8 from "assets/img/argopt-icons/happy-8.png";

import angry1 from "assets/img/argopt-icons/angry-1.png";
import angry2 from "assets/img/argopt-icons/angry-2.png";
import angry3 from "assets/img/argopt-icons/angry-3.png";
import angry4 from "assets/img/argopt-icons/angry-4.png";
import angry5 from "assets/img/argopt-icons/angry-5.png";
import angry6 from "assets/img/argopt-icons/angry-6.png";
import angry7 from "assets/img/argopt-icons/angry-7.png";
import angry8 from "assets/img/argopt-icons/angry-8.png";

import sad1 from "assets/img/argopt-icons/sad-1.png";
import sad2 from "assets/img/argopt-icons/sad-2.png";
import sad3 from "assets/img/argopt-icons/sad-3.png";
import sad4 from "assets/img/argopt-icons/sad-4.png";
import sad5 from "assets/img/argopt-icons/sad-5.png";
import sad6 from "assets/img/argopt-icons/sad-6.png";
import sad7 from "assets/img/argopt-icons/sad-7.png";
import sad8 from "assets/img/argopt-icons/sad-8.png";


import happyManager from "assets/img/argopt-icons/happy-manager.png";
import thinkingManager from "assets/img/argopt-icons/thinking-manager.png";

import injectionImage from "assets/img/job-icons/injection.png"
import pillImage from "assets/img/job-icons/pill.png"
import checklistImage from "assets/img/job-icons/checklist.png"

const happyAvatarsArray = [
  happy1,
  happy2,
  happy3,
  happy4,
  happy5,
  happy6,
  happy7,
  happy8
];
const angryAvatarsArray = [
  angry1,
  angry2,
  angry3,
  angry4,
  angry5,
  angry6,
  angry7,
  angry8
];

const sadAvatarsArray = [sad1, sad2, sad3, sad4, sad5, sad6, sad7, sad8];

const managerAvatarsArray = [happyManager, thinkingManager];

export const stateAvatars = {
  'sad': sadAvatarsArray,
  'happy': happyAvatarsArray,
  'angry': angryAvatarsArray,
  'manager': managerAvatarsArray,
  'isFemaleNurse': [1,3,5,7]
};

export const jobAvatars = {
  'injection': injectionImage,
  'medicine': pillImage,
  'test': checklistImage,
};