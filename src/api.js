const STATUS = {
    SCHEDULED: "SCHEDULED",
    FINISHED: "FINISHED"
}

class api {
    static async __fetchApi(url, resultCallback) {
        return new Promise(async(resolve, reject) => {
            if ("caches" in window) {
                try {
                    const res = await caches.match(url)
                    const result = await res.json()
                    
                    resolve(resultCallback(result))
                } catch (error) {
                    return await _fetch()
                }
            }

            async function _fetch() {
                try {
                    const res = await fetch(url, { headers: { 'X-Auth-Token': process.env.TOKEN } })
                    const result = await res.json();

                    resolve(resultCallback(result))
                } catch (e) {
                    reject(e)
                }
            }

        })
    }
    static async getJadwalTanding(idLiga) {
        function _result(result){
            const { count, matches } = result;
            if (count <= 0) new Error('0')

            const listMatch = matches.map(match => new Match(match))

            const scheduled = listMatch.filter(match => match.status === STATUS.SCHEDULED)
            const finished = listMatch.filter(match => match.status === STATUS.FINISHED)

            return { scheduled, finished}
        }
        const url = `${process.env.BASE_URL}/competitions/${idLiga}/matches`

        return this.__fetchApi(url, _result)
    }

    static async getTeamInfo(idTeam) {
        const url = `${process.env.BASE_URL}/teams/${idTeam}`;

        return this.__fetchApi(url, _result)

        function _result(result){
            return new Team(result)
        }
    }

    static async getScheduledTeamMatches(idTeam) {
        const url = `${process.env.BASE_URL}/teams/${idTeam}/matches?status=SCHEDULED`

        return this.__fetchApi(url, _result)

        function _result(result) {
            const { matches } = result;
            return matches.map(match => new Match(match)).splice(0, 10)
        }
    }
}


class Match {
    constructor({id, utcDate, status, group, score, homeTeam, awayTeam}) {
        this.id = id;
        this.date = new Date(utcDate).toLocaleDateString('id-ID',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
        this.status = status;
        this.group =  group;
        this.awayScore = this.status === STATUS.FINISHED ? score.fullTime.awayTeam : '-';
        this.homeScore = this.status === STATUS.FINISHED ?  score.fullTime.homeTeam : '-';
        this.homeId = homeTeam.id;
        this.homeTeam = homeTeam.name;
        this.awayId = awayTeam.id;
        this.awayTeam = awayTeam.name;
    }
}

class Team {
    constructor({
        id,
        name,
        shortName,
        crestUrl,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        squad
    }) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.image = this.replaceHttptoHttps(crestUrl);
        this.address = address;
        this.phone = phone;
        this.website = website;
        this.email = email;
        this.founded = founded;
        this.clubColor = clubColors;
        this.venue = venue;
        this.squad = this.convertToSquad(squad);
    }

    replaceHttptoHttps(url) {
        return url ? url.replace(/^http:\/\//i, 'https://') : ''
    }

    convertToSquad(squad) {
        return squad.map(s => new Squad(s))
    }

}

class Squad {
    constructor({
        id,
        name,
        position,
        dateOfBirth,
        nationality,
        shirtNumber,
        role
    }) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.birthDate = new Date(dateOfBirth).toLocaleDateString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric'});
        this.nationality = nationality;
        this.shirtNumber = shirtNumber;
        this.role = role;
    }
}

export default api