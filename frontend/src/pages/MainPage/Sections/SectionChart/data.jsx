import { colors } from '@atlaskit/theme';
import type { Machine, Job, JobMap } from './types';
const uuidv4 = require('uuid/v4');



const nurse1: Machine = {
  id: 1,
  name: 'Nurse 1',
  state: 'neutral',
  completionTime: 0
};

const nurse2: Machine = {
  id: 2,
  name: 'Nurse 2',
  state: 'neutral',
  completionTime: 0
};

const nurse3: Machine = {
  id: 3,
  name: 'Nurse 3',
  state: 'neutral',
  completionTime: 0
};

const nurse4: Machine = {
  id: 4,
  name: 'Nurse 4',
  state: 'neutral',
  completionTime: 0
};

export const machines: Machine[] = [nurse1, nurse2, nurse3, nurse4];

export const jobs: Job[] = [
  {
    length: 10,
    actions: [],
    id: "A",
    content: 'Sometimes life is scary and dark',
    machine: nurse2,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "B",
    actions: [],
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    machine: nurse1,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 30,
    id: "C",
    actions: [],
    content: "You got to focus on what's real, man",
    machine: nurse1,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 60,
    id: "D",
    actions: [],
    content: 'Is that where creativity comes from? From sad biz?',
    machine: nurse3,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "E",
    actions: [],
    content: 'Homies help homies. Always',
    machine: nurse3,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "F",
    actions: [],
    content: 'Responsibility demands sacrifice',
    machine: nurse4,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "G",
    actions: [],
    content: "That's it! The answer was so simple, I was too smart to see it!",
    machine: nurse4,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 80,
    id: "H",
    actions: [],
    content: 'People make mistakes. It’s a part of growing up',
    machine: nurse3,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 100,
    id: "I",
    actions: [],
    content: "Don't you always call sweatpants 'give up on life pants,' nurse2?",
    machine: nurse3,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "J",
    actions: [],
    content: 'I should not have drunk that much tea!',
    machine: nurse4,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "K",
    actions: [],
    content: 'Please! I need the real you!',
    machine: nurse4,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
  },
  {
    length: 20,
    id: "L",
    actions: [],
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    machine: nurse4,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },

  },
];

// So we do not have any clashes with our hardcoded ones
let idCount: number = jobs.length + 1;

export const getJobs = (count: number): Job[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Job = jobs[Math.floor(Math.random() * jobs.length)];

    const custom: Job = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getMachines = (count: number): Machine[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Machine = machines[Math.floor(Math.random() * machines.length)];

    const custom: Machine = {
      ...random,
      id: `machine-${idCount++}`,
    };

    return custom;
  });

const getByMachine = (machine: Machine, items: Job[]): Job[] =>
  items.filter((job: Job) => job.machine === machine);

export const machineJobMap: JobMap = machines.reduce(
  (previous: JobMap, machine: Machine) => ({
    ...previous,
    [machine.name]: getByMachine(machine, jobs),
  }),
  {},
);

export const generateJobMap = (jobCount: number): JobMap =>
  machines.reduce(
    (previous: JobMap, machine: Machine) => ({
      ...previous,
      [machine.name]: getJobs(jobCount / machines.length),
    }),
    {},
  );