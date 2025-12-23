import { Link } from 'react-router-dom'
import './MatchCard.css'

function MatchCard({ match }) {
  const isLive = match.status === 'live'
  
  return (
    <Link to={`/watch/${match.id}`} className={`match-card ${isLive ? 'live' : ''}`}>
      {isLive && <span className="live-badge">مباشر</span>}
      <div className="match-league">{match.league}</div>
      <div className="match-teams">
        <div className="team">
          <img src={match.team1.logo} alt={match.team1.name} className="team-logo" />
          <span className="team-name">{match.team1.name}</span>
        </div>
        <div className="match-score">
          {isLive ? (
            <span className="score">{match.team1.score} - {match.team2.score}</span>
          ) : (
            <span className="vs">VS</span>
          )}
        </div>
        <div className="team">
          <img src={match.team2.logo} alt={match.team2.name} className="team-logo" />
          <span className="team-name">{match.team2.name}</span>
        </div>
      </div>
      <div className="match-time">
        {isLive ? `الدقيقة ${match.minute}'` : match.time}
      </div>
      <button className="watch-btn">
        {isLive ? 'شاهد الآن' : 'تذكير'}
      </button>
    </Link>
  )
}

export default MatchCard
