import React, { useEffect, useState } from "react";
import { Card, CardTitle, Col, Row } from "react-materialize";
import { Link } from "react-router-dom";
import db from "../db";

export default function Saved() {
    const [teams, setTeams] = useState()

    useEffect(() => {
        async function getSavedTeam() {
            const listSave = await db.getAll()
            const saveTeams = listSave.map(save => save.teamInfo)
            
            setTeams(saveTeams)
        }
        
        getSavedTeam()
    }, [])


    return (
        <Row>
        { teams
            ? <Col m={6} s={12}>
                {teams.map(team => 
                        <Card
                            key={team.id}
                            actions={[<Link to={`/team/${team.id}/saved`}>Detail</Link>]}
                            header={<CardTitle image={team.image} />}
                            horizontal
                            >
                           <h4>{team.shortName}</h4>
                        </Card>    
                )}
              </Col>
            : 'Tim Favorit Kosong'
        }
        </Row>
    )
}