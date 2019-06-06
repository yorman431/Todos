import React, {Component} from 'react';

class Listado extends Component {

  render() {
    let listado = this.props.tasks.map((task,i) => {
      return (
        <li className="collection-item" key={i}  style={{color: 'black'}}>
          <div>{task.label}
            <a href="#!" className="secondary-content" onClick={() => this.props.delete(i)}>
              <i className="fas fa-times"></i>
            </a>
          </div>
        </li>
      )
    })
    return (
      <ul className="collection with-header">
        {listado}
      </ul>
    ) 
  }

}

export default Listado;