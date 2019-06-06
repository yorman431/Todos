import React from 'react';
import Listado from './Listado'

export class Todos extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      tasks: []
    }
    this.handleText = this.handleText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
  }

  componentDidMount() {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/yorman",{
      method: 'GET'
    }).then(resp => {
      console.log(resp.ok);
      console.log(resp.status);
      return resp.json()
    }).then(data => {
      this.setState({ tasks: data })
    }).catch(error => {
      console.log(error)
    })
  }

  updateTodos() {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/yorman",{
      method: 'PUT',
      body: JSON.stringify(this.state.tasks),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => {
      return resp.json();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let arr = this.state.tasks;
    if (this.state.text !== ''){
      const item = {label: this.state.text, done: false};
      arr.push(item);
      this.setState({
        tasks: arr,
        text: ''
      });
      this.updateTodos();
    }else{
      alert('Debe ingresar un dato');
    }
  }
  
  handleText(e) {
    this.setState({
      text: e.target.value,
    });
  }


  DeleteItem = (i) =>{
    const deleteItem = this.state.tasks;
    deleteItem.splice(i, 1);
    this.setState({tasks: deleteItem});
    this.updateTodos();
  }

  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <div className="row">
                  <span className="card-title">To Do List<i className=""></i></span>
                  <div className="input-field col s12">
                    <form onSubmit={this.handleSubmit}>
                      <input id="to_do" type="text" className="validate" onChange={this.handleText} value={this.state.text}/>
                      <label htmlFor="to_do">To Do</label>
                    </form>
                    <Listado tasks={this.state.tasks} delete={this.DeleteItem} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}