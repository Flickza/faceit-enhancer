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
  if (hasFeatureAttribute(FEATURE_ATTRIBUTE, recentMatchesTable)) {
    return
  }

  const rows = recentMatchesTable?.children[1].children
  const theadRows = recentMatchesTable?.children[0].children[0]
  if (theadRows.children.length === 4) {
    theadRows.insertBefore(
      <>
        <th className={`${theadRows.children[0].className}`}>Score</th>
        <th className={`${theadRows.children[0].className}`}>Map</th>
      </>,
      theadRows.children[3],
    )
  }
  // biome-ignore lint/style/useConst: <Not using const in a for loop>
  for (let row of rows) {
    if (hasFeatureAttribute(FEATURE_ATTRIBUTE, row)) {
      continue
    }
    const roomUrl = row.children[3].children[0].children[0]?.href
    const regex = /en\/cs2\/room\/([^\/]+)(\/|$)/
    const regexMatch = roomUrl.match(regex)
    if (regexMatch === null) {
      break
    }
    try {
      getMatch(regexMatch[1]).then((match) => {
        if (!match) {
          return
        }
        let scoreElement
        if (!match.clientCustom && match.state === 'FINISHED') {
          scoreElement = (
            <>
              <td className={row.children[0].className}>Walkover</td>
              <td className={row.children[0].className} />
            </>
          )
        } else if (match.state === 'SCHEDULED') {
          scoreElement = (
            <>
              <td className={row.children[0].className} />
              <td className={row.children[0].className} />
            </>
          )
        } else {
          scoreElement = (
            <>
              <td className={row.children[0].className}>
                {match.clientCustom.team1Score} /{' '}
                {match.clientCustom.team2Score}
              </td>
              <td className={row.children[0].className}>
                {match.clientCustom.map}
              </td>
            </>
          )
        }
        if (row.children.length === 4) {
          row.insertBefore(scoreElement, row.children[3])
        }
        setFeatureAttribute(FEATURE_ATTRIBUTE, row)
      })
    } catch (e) {
      console.error(e)
    }
  }
  setFeatureAttribute(FEATURE_ATTRIBUTE, recentMatchesTable)
}
