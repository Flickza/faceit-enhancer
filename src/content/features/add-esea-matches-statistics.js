import React from 'dom-chef'
import select from 'select-dom'
import {
  hasFeatureAttribute,
  setFeatureAttribute,
} from '../helpers/dom-element'

const FEATURE_ATTRIBUTE = 'ESEA-STATS'

export default async () => {
  const parasiteContainerElement = select('#parasite-container')

  if (parasiteContainerElement?.children.length !== 6) {
    return
  }

  const statsContentRootElement = parasiteContainerElement.children[5]

  if (statsContentRootElement.children.length !== 3) {
    return
  }

  const recentMatchesContainer = statsContentRootElement.children[2].children[0]

  if (recentMatchesContainer?.children.length !== 2) {
    return
  }
  const tableContainer = recentMatchesContainer.children[1]

  if (tableContainer.localName !== 'table') {
    return
  }

  const recentMatchesTable = tableContainer

  const rows = recentMatchesTable?.children[1].children

  const ESEA_MATCHES_TABLE = playerNameElement?.parentElement?.parentElement

  setFeatureAttribute(FEATURE_ATTRIBUTE, recentMatchesTable)

  const statisticsElement = (
    <div
      style={{
        marginBottom: 4,
      }}
    >
      {createFeaturedPlayerBadgeElement(playerBadge)}
    </div>
  )

  ESEA_MATCHES_TABLE.prepend(statisticsElement)
}
