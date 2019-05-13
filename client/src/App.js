import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      error: "",
      stock: "",
      show: false,
      text: "Add +"
    };
    this.updateInput = this.updateInput.bind(this);
    this.lookup = this.lookup.bind(this);
    this.add = this.add.bind(this);
    this.addInput = this.addInput.bind(this);
  }

  addInput(e) {
    if (this.state.show == false) {
      this.setState({
        show: true,
        text: "Cancel"
      });
    } else {
      this.setState({
        show: false,
        text: "Add +"
      });
    }
  }

  updateInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  lookup() {
    console.log("works")
    console.log(this.state.input)
    fetch(`https://financialmodelingprep.com/api/company/real-time-price/${this.state.input}?datatype=json`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.symbol)
      this.setState({
        error: "",
        stock: data.symbol,
        show: false,
        text: "Add +"
      }, function addTo() {
            this.add()
            if (this.state.stock == "") {
              this.setState({
                error: "This is not a known stock symbol.  Please try again."
              })
            }
      })
    })
  }

add() {
  console.log(this.state.stock)
  fetch('/add', {
    method: 'POST',
    body: JSON.stringify("test")
  })
  // .then(response => response.json())
  // .then(response => 
  //   this.setState({
  //     stock: ""
  //   }))
  // .catch(error => console.error('Error:', error));
}
  
  
  render() {
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
          <div className="col-md-6">
          {this.state.show &&
            <div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Stock Symbol</label>
                <input value={this.state.input} onChange={this.updateInput} type="text" className="form-control" placeholder="Enter symbol"/>
                <small id="emailHelp" className="form-text text-muted">{this.state.error}</small>
              </div>
              <button onClick={this.lookup} className="btn btn-dark">Add</button>
            </div>
            }
          </div>
        <div className="col-md-3"><button onClick={this.addInput} className="right btn btn-warning">{this.state.text}</button></div>
      </div>
      <div className="row">
        <div className="col-md-12">
        {!this.state.show &&
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        }
        </div>
      </div>
    </div>
    )
  }
}

export default App;
