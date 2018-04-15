import React from 'react';
import ReactDOM from 'react-dom';
import Stars from './components/Stars.jsx';
import Form from './components/Form.jsx';
import Finding from './components/Finding.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles.css';
// import StarRatings from 'react-star-ratings';


const axios = require('axios');


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      room: {
        room_id: 5,
        room_rate: '',
        room_name: '',
        world_name: '',
        host_name: '',
        booked_dates: [],
        guest_number: 0,
        review_count: 0,
        review_grade: 0,
      },
      rooms: []
    };
  }

  componentDidMount() {
    this.getRoomData();
  }

  // Fetch this page's room data
  getRoomData() {
    axios.get(`/booking/${this.state.room.room_id}`)
      .then((items) => {
        console.log('Data receiced', items.data);
        console.log(typeof items.data.review_grade)
        this.setState({ room: items.data });
      })
      .catch(err => console.log('Fetching error', err));
  }


  render() {
    return (

      <div className={styles.container}>

        <div className={styles.component}>
          <span>
            <span>${this.state.room.room_rate}</span>
            <span> per night</span>
          </span>
        </div>
        <div className={styles.component}>
          <Stars room={this.state.room} />
          
          {/* <span> <StarRatings
            rating={this.state.room.review_grade}
            starRatedColor="#008489"
            starDimension="10px"
            starSpacing="0px"
            numberOfStars={5}/>
          </span>
          <span>{this.state.room.review_count}</span> */}
   
        </div >
        <MuiThemeProvider>
          <Form room={this.state.room} />
        </MuiThemeProvider>
        <div className={styles.component}>
          <Finding room={this.state.room}/>
        </div>
      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('booking'));


