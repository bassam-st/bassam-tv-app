import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">▶</span>
          <span className="logo-text">بث مباشر</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">الرئيسية</Link>
          <Link to="/league/champions" className="nav-link">دوري الأبطال</Link>
          <Link to="/league/premier" className="nav-link">الدوري الإنجليزي</Link>
          <Link to="/league/laliga" className="nav-link">الدوري الإسباني</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
