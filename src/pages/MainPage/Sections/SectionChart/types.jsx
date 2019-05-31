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
|};

export type Job = {|
  length: number,
  id: Id,
  content: string,
  machine: Machine,
|};

export type JobMap = {
  [key: string]: Job[],
};