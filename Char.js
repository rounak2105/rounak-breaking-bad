import React, { Component } from "react";
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hello from "./Hello";
import Home from "./Home";
import "./style.css";

class Char extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      data: null
    };
    this.lower = 0;
    this.upper = 10;
    this.quotes = null;
  }

  componentDidMount = () => {
    fetch(
      "https://www.breakingbadapi.com/api/characters/" +
        this.props.match.params.id
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  getQuotes(name) {
    fetch(
      "https://www.breakingbadapi.com/api/quote?author=" +
        name.replace(/ /g, "+")
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.quotes = data;
      });
    this.checkQuotes();
  }
  checkQuotes() {
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <div>
          <a
            class="back"
            href="https://react-fetch-data-from-api-6hr2f3.stackblitz.io"
            variant="secondary"
            size="lg"
            disabled
          >
            &#8249;
          </a>
          {this.state.data &&
            this.state.data.map(user => (
              <div class="cardchar">
                <img src={user.img} />
                <h3>Name : {user.name}</h3>
                <p>Occupation : {user.occupation + ","} </p>
                <p>DOB:{user.birthday + " "}</p>
                <p>Status:{user.status}</p>
                <p>Nickname:{user.nickname}</p>
                <p>Category:{user.appearance}</p>
                <p>Actor:{user.portrayed}</p>
                {!this.quotes && (
                  <button
                    class="getQ"
                    onClick={this.getQuotes.bind(this, user.name)}
                  >
                    Get Quotes
                  </button>
                )}
              </div>
            ))}
          <div class="cardchar">
            {this.quotes && <h3>Quotes:</h3>}
            {this.quotes && <h4>Quotes found : {this.quotes.length}</h4>}
            {this.quotes && this.quotes.map(quote => <p>{quote.quote}</p>)}
          </div>
        </div>
      </div>
    );
  }
}
export default Char;
