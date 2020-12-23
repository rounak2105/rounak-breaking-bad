import React, { Component } from "react";
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Char from "./Char";
import Home from "./Home";
import "./style.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      data: null
    };
    this.lower = 0;
    this.upper = 10;
    this.showMe = true;
  }

  componentDidMount = () => {
    fetch("https://www.breakingbadapi.com/api/characters")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  nextClick() {
    if (this.upper < this.state.data.length) {
      this.lower = this.lower + 10;
      this.upper = this.upper + 10;
      this.forceUpdate();
    }
  }

  prevClick() {
    if (this.lower >= 10) {
      this.lower = this.lower - 10;
      this.upper = this.upper - 10;
      this.forceUpdate();
    }
  }

  show() {
    this.showMe = false;
    this.forceUpdate();
  }

  render() {
    return (
      <Router>
        <Route path={"/char/:id"} exact component={Char} />
        <div>
          <div>
            {this.showMe &&
              this.state.data &&
              this.state.data.slice(this.lower, this.upper).map((user, idx) => (
                <Link
                  to={"/char/" + user.char_id}
                  style={{ textDecoration: "none" }}
                  onClick={this.show.bind(this)}
                >
                  <div id={user.char_id}>
                    <div class="header">
                      <p>Name : {user.name}</p>
                    </div>
                    <div class="card">
                      <p>Occupation : {user.occupation + ","} </p>
                      <p>DOB:{user.birthday + " "}</p>
                      <p>Status:{user.status}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div class="buttons">
            {this.state.data && this.showMe && (
              <button class="prevButton" onClick={this.prevClick.bind(this)}>
                &#8249;
              </button>
            )}
            {this.state.data && this.showMe && (
              <button class="nextButton" onClick={this.nextClick.bind(this)}>
                &#8250;
              </button>
            )}
          </div>
          {!this.state.data && <p>Loading</p>}
        </div>
      </Router>
    );
  }
}
export default Home;
