import { Link } from 'react-router-dom'
import MatchCard from '../components/MatchCard'
import { matches, leagues, getLiveMatches, getUpcomingMatches } from '../data/matches'
import './Home.css'

function Home() {
  const liveMatches = getLiveMatches()
  const upcomingMatches = getUpcomingMatches()

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">بث مباشر للمباريات</h1>
        <p className="hero-subtitle">شاهد جميع المباريات الرياضية مباشرة بجودة عالية</p>
      </section>

      <section className="leagues-section">
        <h2 className="section-title">الدوريات والبطولات</h2>
        <div className="leagues-grid">
          {leagues.map(league => (
            <Link to={`/league/${league.id}`} key={league.id} className="league-card">
              <span className="league-icon">{league.icon}</span>
              <span className="league-name">{league.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {liveMatches.length > 0 && (
        <section className="matches-section">
          <h2 className="section-title">
            <span className="live-dot"></span>
            المباريات المباشرة الآن
          </h2>
          <div className="matches-grid">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      <section className="matches-section">
        <h2 className="section-title">المباريات القادمة</h2>
        <div className="matches-grid">
          {upcomingMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
