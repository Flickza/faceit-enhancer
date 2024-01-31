import { getCurrentPath } from './location'

export const isRoomOverview = (path) =>
  /room\/.+-.+-.+-.+$/.test(path || getCurrentPath())

export const isPlayerProfileStats = (path) =>
  /players\/.+\/stats\//.test(path || getCurrentPath())

export const isPlayerProfile = (path) =>
  /players\/.*$/.test(path || getCurrentPath())

export const isTeamsOverview = (path) =>
  /teams\/.+-.+-.+-.+$/.test(path || getCurrentPath())

//league/ESEA%20League/a14b8616-45b9-4581-8637-4dfd0b5f6af8/b090ee8f-f4b7-4125-92ce-db6d23b839be/overview
export const isESEATeamProfile = (path) =>
  /league\/ESEA%20League\/.+\/.+\/overview/.test(path || getCurrentPath())
