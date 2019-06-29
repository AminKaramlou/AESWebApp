import type { Machine, Job, JobMap } from "./types";

const nurse1: Machine = {
  id: 1,
  name: "John",
  state: "angry",
  completionTime: 0,
  nfd: [],
  pfd: []
};

const nurse2: Machine = {
  id: 2,
  name: "Mai",
  state: "angry",
  completionTime: 0,
  nfd: [],
  pfd: []
};

const nurse3: Machine = {
  id: 3,
  name: "Ruban",
  state: "angry",
  completionTime: 0,
  nfd: [{"value":"C","label":"Intravenous drip"}],
  pfd: []
};

export const machines: Machine[] = [nurse1, nurse2, nurse3];

export const jobs: Job[] = [
  {
    length: 30,
    actions: [],
    id: "A",
    machine: nurse1,
    name: "Measles Vaccination",
    type: "injection"
  },
  {
    length: 30,
    id: "B",
    actions: [],
    machine: nurse2,
    name: "Administer antibiotics",
    type: "medicine"
  },
  {
    length: 20,
    id: "C",
    actions: [],
    machine: nurse3,
    name: "Intravenous drip",
    type: "medicine"
  },
  {
    length: 10,
    id: "D",
    actions: [],
    machine: "unassigned",
    name: "Blood test",
    type: "test"
  }
];

// So we do not have any clashes with our hardcoded ones
let idCount: number = jobs.length + 1;

export const getJobs = (count: number): Job[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Job = jobs[Math.floor(Math.random() * jobs.length)];

    const custom: Job = {
      ...random,
      id: `G${idCount++}`
    };

    return custom;
  });

export const getMachines = (count: number): Machine[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Machine =
      machines[Math.floor(Math.random() * machines.length)];

    const custom: Machine = {
      ...random,
      id: `machine-${idCount++}`
    };

    return custom;
  });

const getByMachine = (machine: Machine, items: Job[]): Job[] =>
  items.filter((job: Job) => job.machine === machine);

export const machineJobMap: JobMap = machines.reduce(
  (previous: JobMap, machine: Machine) => ({
    ...previous,
    [machine.name]: getByMachine(machine, jobs)
  }),
  {}
);

export const generateJobMap = (jobCount: number): JobMap =>
  machines.reduce(
    (previous: JobMap, machine: Machine) => ({
      ...previous,
      [machine.name]: getJobs(jobCount / machines.length)
    }),
    {}
  );
