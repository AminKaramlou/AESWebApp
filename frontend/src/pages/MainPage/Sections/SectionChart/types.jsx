// @flow

export type Id = string;

export type MachineColors = {|
  soft: string,
  hard: string,
|};

export type Machine = {|
  id: Id,
  name: string,
  colors: MachineColors,
  pfd: [],
  nfd: [],
|};

export type Job = {|
  length: number,
  id: Id,
  machine: Machine,
  status: string,
  actions: [],
  name: string,
|};

export type JobMap = {
  [key: string]: Job[],
};