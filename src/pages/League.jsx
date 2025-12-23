import { useParams, Link } from 'react-router-dom'
import MatchCard from '../components/MatchCard'
import { getMatchesByLeague, leagues } from '../data/matches'
import './League.css'

function League() {
  const { leagueId } = useParams()
  const league = leagues.find(l => l.id === leagueId)
  const matches = getMatchesByLeague(leagueId)

  if (!league) {
    return (
      <div className="league-page">
        <div className="not-found">
          <h2>الدوري غير موجود</h2>
          <Link to="/" className="back-btn">العودة للرئيسية</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="league-page">
      <div className="league-header">
        <Link to="/" className="back-link">← العودة للرئيسية</Link>
        <div className="league-info">
          <span className="league-icon-large">{league.icon}</span>
          <h1 className="league-title">{league.name}</h1>
        </div>
      </div>

      {matches.length > 0 ? (
        <div className="league-matches">
          <h2 className="section-title">مباريات الدوري</h2>
          <div className="matches-grid">
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-matches">
          <p>لا توجد مباريات متاحة حالياً في هذا الدوري</p>
          <Link to="/" className="back-btn">استعرض المباريات الأخرى</Link>
        </div>
      )}
    </div>
  )
}

export default League
