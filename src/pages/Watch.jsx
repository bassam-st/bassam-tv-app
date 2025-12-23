import { useParams, Link } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import { getMatchById, matches } from '../data/matches'
import './Watch.css'

function Watch() {
  const { matchId } = useParams()
  const match = getMatchById(matchId)

  if (!match) {
    return (
      <div className="watch-page">
        <div className="not-found">
          <h2>المباراة غير موجودة</h2>
          <Link to="/" className="back-btn">العودة للرئيسية</Link>
        </div>
      </div>
    )
  }

  const isLive = match.status === 'live'
  const otherMatches = matches.filter(m => m.id !== matchId).slice(0, 3)

  return (
    <div className="watch-page">
      <div className="watch-header">
        <Link to="/" className="back-link">← العودة</Link>
        <span className="match-league-badge">{match.league}</span>
      </div>

      <div className="watch-content">
        <div className="player-section">
          <VideoPlayer 
            streamUrl={match.streamUrl} 
            title={`${match.team1.name} vs ${match.team2.name}`}
          />
          
          <div className="match-info">
            <div className="teams-info">
              <div className="team-info">
                <img src={match.team1.logo} alt={match.team1.name} className="team-logo-large" />
                <span className="team-name-large">{match.team1.name}</span>
              </div>
              <div className="score-section">
                {isLive ? (
                  <>
                    <span className="live-indicator">مباشر</span>
                    <span className="current-score">{match.team1.score} - {match.team2.score}</span>
                    <span className="match-minute">الدقيقة {match.minute}'</span>
                  </>
                ) : (
                  <>
                    <span className="upcoming-indicator">قادمة</span>
                    <span className="match-time-large">{match.time}</span>
                  </>
                )}
              </div>
              <div className="team-info">
                <img src={match.team2.logo} alt={match.team2.name} className="team-logo-large" />
                <span className="team-name-large">{match.team2.name}</span>
              </div>
            </div>

            <div className="channels-info">
              <h4>القنوات الناقلة:</h4>
              <div className="channels-list">
                {match.channels.map((channel, idx) => (
                  <span key={idx} className="channel-badge">{channel}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="sidebar">
          <h3 className="sidebar-title">مباريات أخرى</h3>
          <div className="sidebar-matches">
            {otherMatches.map(m => (
              <Link to={`/watch/${m.id}`} key={m.id} className="sidebar-match">
                <div className="sidebar-teams">
                  <span>{m.team1.name}</span>
                  <span className="sidebar-vs">vs</span>
                  <span>{m.team2.name}</span>
                </div>
                <span className={`sidebar-status ${m.status}`}>
                  {m.status === 'live' ? 'مباشر' : m.time}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Watch
