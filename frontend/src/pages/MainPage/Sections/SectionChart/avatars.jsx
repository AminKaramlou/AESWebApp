import happy1 from "assets/img/argopt-icons/happy-1.png";
import happy2 from "assets/img/argopt-icons/happy-2.png";
import happy3 from "assets/img/argopt-icons/happy-3.png";

import angry1 from "assets/img/argopt-icons/angry-1.png";
import angry2 from "assets/img/argopt-icons/angry-2.png";
import angry3 from "assets/img/argopt-icons/angry-3.png";

import sad1 from "assets/img/argopt-icons/sad-1.png";
import sad2 from "assets/img/argopt-icons/sad-2.png";
import sad3 from "assets/img/argopt-icons/sad-3.png";

import happyManager from "assets/img/argopt-icons/happy-manager.png";
import thinkingManager from "assets/img/argopt-icons/thinking-manager.png";

const happyAvatarsArray = [
  happy1,
  happy2,
  happy3,
];
const angryAvatarsArray = [
  angry1,
  angry2,
  angry3,
];

const sadAvatarsArray = [sad1, sad2, sad3];

const managerAvatarsArray = [happyManager, thinkingManager];

const stateAvatars = {
  'sad': sadAvatarsArray,
  'happy': happyAvatarsArray,
  'angry': angryAvatarsArray,
  'manager': managerAvatarsArray
};

export default stateAvatars;