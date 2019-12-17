import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      id: '172764c-1ab1-11ea-b9fe-2f5417770f',
      username: '',
      review_title:'',
      review: '',
      rating: null,
      query: `http://localhost:3003/reviews/172764c-1ab1-11ea-b9fe-2f5417770f`,
      selection: [1, 2, 3, 4, 5]
    }
  }

  componentDidMount() {
    //console.log(this.state.query)
    this.getReviews();
  }

  getReviews() {
    axios.get(this.state.query)
    .then(({data}) => {
      this.setState({data: data.reverse()});
      console.log(this.state.data)
    })
  }

  handleUsernameChange (e) {
    this.setState({username: e.target.value})
    console.log(e.target.value)
  }

  handleReviewChange (e) {
    this.setState({review: e.target.value})
    console.log(e.target.value)
  }
  
  handleTitleChange (e) {
    this.setState({review_title: e.target.value})
    console.log(e.target.value)
  }

  selectRating(e){
    this.setState({rating: e.target.value})
    console.log(e.target.value)
  }

  handleClick(e) {
    axios.post(this.state.query, {
      id: this.state.id,
      username: this.state.username,
      review_title: this.state.review_title,
      review: this.state.review,
      rating: this.state.rating
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render(){
    return (
      <div className='reviews_module' id='wrap-collapsible'>
        <input id="collapsible" className="toggle" type="checkbox"/>
        <label htmlFor="collapsible" className="lbl-toggle">Reviews</label>
        <ul className='collapsible-content'>
          <div className='user_inputs'>
            <div>
              <h4>Username</h4>
          <input className='username_input' type='text' onChange={this.handleUsernameChange.bind(this)} />
          </div>
          <div>
          <h4>Review Title</h4>
            <input className='review_title_input' type='text' onChange={this.handleTitleChange.bind(this)}/>
          </div>
          <div>
          <h4>Write Your Review</h4>
          <input className='review_input' type='text' onChange={this.handleReviewChange.bind(this)}/>
          </div>
          <div>
          <h4>Overall Rating</h4>
          <select className='rating_selection' onChange={this.selectRating.bind(this)}>
            {this.state.selection.map((el, index) => {
              return (
                <option key={index} value={el}>{el} Stars</option>
              )
            })}
          </select>
          </div>
          <div>
          <button value='submit' className='button' onClick={this.handleClick.bind(this)}>Submit Your Review</button>
          </div>
          </div>
        {this.state.data.map((el, index) => {
          return (
            <li key={index} id='review_list' className='content-inner'>
              <div className='username'>{el.username}</div>
              <div className='review_title'>"{el.review_title}"</div>
              <div className='review'>{el.review}</div>
              <span className="starRating">
              {el.rating}/5 Stars
              </span>
          </li>
        )})}
        </ul>
      </div>
    )};
}

export default App;
