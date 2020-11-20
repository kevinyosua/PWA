import React, { useEffect, useState } from 'react';
import { Button, Col, Collapsible, CollapsibleItem, Collection, CollectionItem, Icon, Preloader, Row } from 'react-materialize';
import api from '../api';
import db from '../db';

function Team({match}) {
    const idTeam = match.params.id;
    const isSaved = match.params.saved;
    const [teamInfo, setTeamInfo] = useState()
    const [scheduleMatches, setScheduleMatches] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        async function getTeamInfo() {
            if (!isSaved) {
                try {
                    const team = await api.getTeamInfo(idTeam);
                    const matches = await api.getScheduledTeamMatches(idTeam)
                    setScheduleMatches(matches)
                    setTeamInfo(team)
                } catch (error) {
                    setError('Gagal Memuat')
                }
            } else {
                const { teamInfo: team, scheduleMatches: matches  } = await db.getById(parseInt(idTeam))
                setScheduleMatches(matches)
                setTeamInfo(team)
            }
        }

        try {
            getTeamInfo()
        } catch (error) {
            setError('Gagal Memuat')
        }
    }, [idTeam])

    function onFabClick() {
        if (isSaved) return db.deleteById(teamInfo.id)
                            .then(res => M.toast({html: 'Tim dihapus dari Tim Favorit !'})); 

        const saveData = { teamInfo, scheduleMatches }
        db.add(teamInfo.id, saveData)
        .then( M.toast({html: 'Tim Berhasil ditambahkan ke Tim Favorit !'}))
    }

    return(
        <>
        {
            !error
            ?
                <Row>
                    {teamInfo
                        ? <>
                            <Button
                                className="red"
                                fab={{ direction: 'bottom' }}
                                icon={<Icon>{isSaved ? 'delete_forever': 'add'}</Icon>}
                                node="button"
                                waves="light"
                                onClick={onFabClick}
                            />
                            <RenderContent team={teamInfo} scheduleMatches={scheduleMatches}/>
                        </>
                        :
                        <Collection s={12} l={12} className="center-align">
                            <Preloader
                                active
                                color="blue"
                                flashing={false}
                                size="big"
                            />
                        </Collection>
                    }
                </Row>
            : error
        }
        </>
    )
    
}

function RenderContent({team, scheduleMatches}) {
    return (
        <>
            <Col
                s={12}
                m={12}
                l={6}
            >
                <Collection header='Info Team'>
                    <CollectionItem>
                        <img className="responsive-img" alt={`Logo ${team.shortName}`} src={team.image} />
                    </CollectionItem>
                    <CollectionItem>
                        <h4>{team.name}</h4>
                        <p><b>Short Name:</b> {team.shortName}</p>
                        <p><b>Founded:</b> {team.founded}</p>
                        <p><b>Address:</b> {team.address}</p>
                        <p><b>Phone:</b> {team.phone}</p>
                        <p><b>Website:</b> {team.website}</p>
                        <p><b>Email:</b> {team.email}</p>
                        <p><b>Club Colors:</b> {team.clubColor}</p>
                        <p><b>Venue:</b> {team.venue}</p>
                    </CollectionItem>
                </Collection>
                <Collection header='Jadwal Pertandingan'>
                    {
                        scheduleMatches.map(match => (
                            <CollectionItem key={match.id}>
                                <p>{match.date}</p>
                                <h5>{match.homeTeam} vs {match.awayTeam}</h5>
                                <p>{match.group}</p>
                            </CollectionItem>
                        ))
                    }
                </Collection>
            </Col>
            <Col
                s={12}
                m={12}
                l={6}
            >
                <Collection header="Squad">
                    <Collapsible header="Squad" accordion popout>
                        {team.squad.map(squad => (
                            <CollapsibleItem
                                key={squad.id}
                                expanded={false}
                                header={`${squad.name} - ${squad.position}`}
                                node="div"
                            >
                                <h4>{squad.name}</h4>
                                <p><b>Position:</b> {squad.position}</p>
                                <p><b>Birth Date:</b> {squad.birthDate}</p>
                                <p><b>Nationality:</b> {squad.nationality}</p>
                                <p><b>Shirt Number:</b> {squad.shirtNumber}</p>
                                <p><b>Role</b> {squad.role}</p>
                            </CollapsibleItem>
                        ))}
                    </Collapsible>
                </Collection>
            </Col>
        </>
    ) 
}


export default Team;