import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Movie from '../Movie'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PREOGRESS',
}

class UpcomingMovies extends Component {
  state = {
    upcomingData: [],
    apiStatus: apiConstants.initial,
    pageNo: 1,
  }

  componentDidMount() {
    this.getUpcomingData()
  }

  getUpcomingData = async () => {
    const {pageNo} = this.state

    this.setState({apiStatus: apiConstants.inProgress})

    const key = '2abedcb807ab04027da1284d52c87a8b'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=${pageNo}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const imgUrl = 'https://image.tmdb.org/t/p/w500'
      const updated = data.results.map(item => item)
      const updatedData = updated.map(item => ({
        posterPath: imgUrl + item.poster_path,
        id: item.id,
        title: item.title,
        rating: item.vote_average,
      }))

      this.setState({
        upcomingData: updatedData,
        apiStatus: apiConstants.success,
      })
    }
  }

  renerLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderUpcomingContent = () => {
    const {upcomingData, pageNo} = this.state

    const disabledBtn = pageNo <= 1 ? 'disabled-btn' : ''

    return (
      <>
        <p className="pageno">Page No: {pageNo} </p>
        <ul className="movies-list">
          {upcomingData.map(item => (
            <Movie details={item} key={item.id} />
          ))}
        </ul>
        <div className="btns-container">
          <button
            type="button"
            onClick={this.onClickPrevPage}
            className={`btn ${disabledBtn}`}
          >
            {' '}
            Prev
          </button>
          <button type="button" onClick={this.onClickNextPage} className="btn">
            Next
          </button>
        </div>
      </>
    )
  }

  onClickPrevPage = () => {
    const {pageNo} = this.state

    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getUpcomingData,
      )
    }
  }

  onClickNextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getUpcomingData,
    )
  }

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderUpcomingContent()
      case apiConstants.inProgress:
        return this.renerLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="upcoming-container">
          <div className="upcoming-responsive-container">
            {this.renderData()}
          </div>
        </div>
      </>
    )
  }
}

export default UpcomingMovies
