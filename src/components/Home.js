import React, { useEffect, useState } from "react";
import { Col, Row, Collection, CollectionItem, Preloader } from "react-materialize";
import { Link } from "react-router-dom";
import api from "../api";

export default function Home() {
  const [scheduledMatch, setScheduleMatch] = useState([])
  const [finishedMatch, setFinishedMatch] = useState([])
  const [showError, setShowError] = useState(null)

  useEffect(() => {
    async function getMatches() {
      try {
        const { scheduled, finished } = await api.getJadwalTanding(2001);
        setFinishedMatch(finished)
        setScheduleMatch(scheduled)

      } catch (error) {
        setShowError('Gagal Memuat') 
      }
    }
    
    getMatches()
  }, [])


  return (
    <>
      {
        !showError
          ? <RenderContent scheduledMatch={scheduledMatch} finishedMatch={finishedMatch} />
          : showError
      }
    </>
  );
}

function RenderContent({scheduledMatch, finishedMatch}) {
  function renderCollection(matches) {
    if (!matches) return 'Loading'
    return matches.map(match => (
      <CollectionItem key={match.id}>
        <p>{match.group}</p>
        <Row>
          <Col
            s={9}
            m={9}
            l={6}
            className="left-align"
          >
            <h5><Link to={`/team/${match.homeId}`}>{match.homeTeam}</Link></h5>
            <h5><Link to={`/team/${match.awayId}`}>{match.awayTeam}</Link></h5>
          </Col>
          <Col
            s={3}
            m={3}
            l={6}
            className="center-align"
          >
            <h5>: {match.homeScore}</h5>
            <h5>: {match.awayScore}</h5>
          </Col>
        </Row>
        <p>{match.date}</p>
      </CollectionItem>
    ))
  }

  return (
    <Row>
      {
        scheduledMatch.length > 0 || finishedMatch.length > 0
          ? <>
              <Col
                s={12}
                m={12}
                l={6}
              >
                <Collection className="center-align" header="Pertandingan Terjadwal">
                  {renderCollection(scheduledMatch)}
                </Collection>
              </Col>
              <Col
                s={12}
                m={12}
                l={6}
              >
                <Collection className="center-align" header="Pertandingan Selesai">
                {renderCollection(finishedMatch)}
              </Collection>
            </Col>
          </>
          : 
          <Col s={12} m={12} l={12} className="center-align">
            <Preloader
              active
              color="blue"
              flashing={false}
              size="big"
            />
          </Col>
      }
    </Row>
  )
}

