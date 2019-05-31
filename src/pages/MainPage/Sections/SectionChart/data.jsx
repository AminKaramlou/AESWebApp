import { colors } from '@atlaskit/theme';
import type { Machine, Job, JobMap } from './types';
import nurse1Img from 'assets/nurse1.png';
import nurse3Img from 'assets/nurse3.png';
import nurse2Img from 'assets/nurse2.png';
import nurse4Img from 'assets/nurse4.png';

const nurse1: Machine = {
  id: '1',
  name: 'Nurse 1',
  colors: {
    soft: colors.Y50,
    hard: colors.Y200,
  },
};

const nurse2: Machine = {
  id: '2',
  name: 'Nurse 2',
  colors: {
    soft: colors.G50,
    hard: colors.G200,
  },
};

const nurse3: Machine = {
  id: '3',
  name: 'Nurse 3',
  colors: {
    soft: colors.B50,
    hard: colors.B200,
  },
};

const nurse4: Machine = {
  id: '4',
  name: 'Nurse 4',
  colors: {
    soft: colors.P50,
    hard: colors.P200,
  },
};

export const machines: Machine[] = [nurse1, nurse2, nurse3, nurse4];

export const jobs: Job[] = [
  {
    length: 10,
    id: '1',
    content: 'Sometimes life is scary and dark',
    machine: nurse2,
  },
  {
    length: 20,
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    machine: nurse1,
  },
  {
    length: 30,
    id: '3',
    content: "You got to focus on what's real, man",
    machine: nurse1,
  },
  {
    length: 60,
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
    machine: nurse3,
  },
  {
    length: 20,
    id: '5',
    content: 'Homies help homies. Always',
    machine: nurse3,
  },
  {
    length: 20,
    id: '6',
    content: 'Responsibility demands sacrifice',
    machine: nurse4,
  },
  {
    length: 20,
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
    machine: nurse4,
  },
  {
    length: 80,
    id: '8',
    content: 'People make mistakes. It’s a part of growing up',
    machine: nurse3,
  },
  {
    length: 100,
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' nurse2?",
    machine: nurse3,
  },
  {
    length: 20,
    id: '10',
    content: 'I should not have drunk that much tea!',
    machine: nurse4,
  },
  {
    length: 20,
    id: '11',
    content: 'Please! I need the real you!',
    machine: nurse4,
  },
  {
    length: 20,
    id: '12',
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    machine: nurse4,
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