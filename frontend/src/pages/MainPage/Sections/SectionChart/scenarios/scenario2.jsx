import { colors } from '@atlaskit/theme';
import type { Machine, Job, JobMap } from './types';



const nurse1: Machine = {
  id: 1,
  name: 'Nurse 1',
  state: 'angry',
  completionTime: 0,
  pfd: [],
  nfd: []
};

const nurse2: Machine = {
  id: 2,
  name: 'Nurse 2',
  state: 'angry',
  completionTime: 0,
  pfd: [],
  nfd: []
};

const nurse3: Machine = {
  id: 3,
  name: 'Nurse 3',
  state: 'angry',
  completionTime: 0,
  pfd: [],
  nfd: []
};

export const machines: Machine[] = [nurse1, nurse2, nurse3];

export const jobs: Job[] = [
  {
    length: 10,
    actions: [],
    id: "A",
    machine: nurse3,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
    name: "This is job A....................................."
  },
  {
    length: 30,
    id: "B",
    actions: [],
    machine: nurse1,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
    name: "This is job B"
  },
  {
    length: 30,
    id: "C",
    actions: [],
    machine: nurse2,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
    name: "This is job C"
  },
  {
    length: 20,
    id: "D",
    actions: [],
    machine: nurse2,
    colors: {
      soft: colors.Y50,
      hard: colors.Y200,
    },
    name: "This is job D"
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