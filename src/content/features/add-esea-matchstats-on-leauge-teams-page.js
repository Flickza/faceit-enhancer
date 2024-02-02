import React from 'dom-chef'
import select from 'select-dom'
import {
  hasFeatureAttribute,
  setFeatureAttribute,
} from '../helpers/dom-element'
import { getMatchStats, getSelf } from '../helpers/faceit-api'

const FEATURE_ATTRIBUTE = 'ESEA-STATS'

export default async () => {
  const parasiteContainerElement = select('#parasite-container')

  if (parasiteContainerElement?.children.length !== 4) {
    return
  }
  const statsContentRootElement =
    parasiteContainerElement.children[3].children[0]

  if (statsContentRootElement.children.length !== 3) {
    return
  }

  const recentMatchesContainer = statsContentRootElement.children[2]

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
        <th className={`${theadRows.children[0].className}`}>Demo</th>
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
    const notPlayed =
      row.children[2].children[0].children[0].innerHTML === 'Scheduled'
    const regex = /en\/cs2\/room\/([^\/]+)(\/|$)/
    const regexMatch = roomUrl.match(regex)
    try {
      getMatchStats(regexMatch[1]).then((match) => {
        let scoreElement
        if (!match || notPlayed) {
          scoreElement = (
            <>
              <td className={row.children[0].className}>Walkover</td>
              <td className={row.children[0].className} />
            </>
          )
        }
        if (match.length === 0) {
          scoreElement = (
            <>
              <td className={row.children[0].className}>Walkover</td>
              <td className={row.children[0].className} />
            </>
          )
        } else {
          scoreElement = (
            <>
              <td className={row.children[0].className}>{match[0].i18}</td>
              <td className={row.children[0].className}>{match[0].i1}</td>
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
