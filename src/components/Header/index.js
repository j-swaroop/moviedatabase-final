import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="header-responsive">
      <h1 className="page-heading"> movieDB </h1>
      <div className="search-container">
        <input type="search" className="search-bar" placeholder="Search.." />
        <button type="button" className="search-btn">
          Search
        </button>
      </div>

      <div className="nav-items-container">
        <Link to="/" className="nav-item">
          {' '}
          <h1 className="nav-item"> Popular </h1>{' '}
        </Link>
        <Link to="/top-rated" className="nav-item">
          {' '}
          <h1 className="nav-item"> Top Rated </h1>{' '}
        </Link>
        <Link to="/upcoming" className="nav-item">
          {' '}
          <h1 className="nav-item"> Upcoming </h1>{' '}
        </Link>
      </div>
    </div>
  </nav>
)

export default withRouter(Header)
