import React from 'dom-chef'
import select from 'select-dom'
import {
  hasFeatureAttribute,
  setFeatureAttribute,
} from '../helpers/dom-element'
import { getLobby, getMatch, getSelf } from '../helpers/faceit-api'

const FEATURE_ATTRIBUTE = 'ELO-PUNISHMENT-EVALUATOR'

export default async () => {
  const parasiteContainerElement = select('#parasite-container')

  if (parasiteContainerElement?.children.length !== 1) {
    return
  }
  const matchmakingContainer =
    parasiteContainerElement.children[0]?.children[0]?.children[0]?.children[0]
  if (matchmakingContainer?.children?.length !== 3) {
    return
  }
  const playersInLobby =
    matchmakingContainer?.children[1]?.children[0]?.children[1]

  if (playersInLobby.children.length !== 5) {
    return
  }

  const lobby = await getLobby()
  if (!lobby) return

  const statsContentRootElement = parasiteContainerElement.children[5]

  // setFeatureAttribute(FEATURE_ATTRIBUTE, recentMatchesTable);
}
