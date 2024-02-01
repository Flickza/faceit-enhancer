import React from 'dom-chef'
import select from 'select-dom'
import {
  hasFeatureAttribute,
  setFeatureAttribute,
} from '../helpers/dom-element'
import { getMatch, getSelf } from '../helpers/faceit-api'

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
  const theadRows = recentMatchesTable?.children[0].children[0]
  if (theadRows.children.length === 4) {
    theadRows.insertBefore(
      <th className={`${theadRows.children[0].className}`}>Score</th>,
      theadRows.children[2],
    )
  }

  // biome-ignore lint/style/useConst: <explanation>
  for (let row of rows) {
    const roomUrl = row.children[3].children[0].children[0]?.href
    const regex = /en\/cs2\/room\/([^\/]+)(\/|$)/
    const regexMatch = roomUrl.match(regex)
    if (regexMatch === null) {
      break
    }
    const match = await getMatch(regexMatch[1])
    if (!match) {
      break
    }
    const scoreElement = (
      <td className={row.children[0].className}>
        {match.clientCustom.team1Score} / {match.clientCustom.team2Score}
      </td>
    )
    if (row.children.length === 4) {
      row.insertBefore(scoreElement, row.children[3])
    }
  }

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
