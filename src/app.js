'use strict'

import React, { Fragment } from 'react'
import cpfAPI from './services/cpf'

// const requestWithFilters = (it, filters) => cpfAPI
//   .get(filters)
//   .then(cpfs => {
//     this.setState({ cpfs })
//   })

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      cpfs: [],
      filters: {}
    }
  }

  requestWithFilters (filters) {
    cpfAPI.get(filters).then(cpfs => {
      this.setState({ cpfs })
    })
  }

  componentDidMount () {
    this.search()
  }

  handleTypeChange (e) {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.currentTarget.value
      }
    })
  }

  search () {
    this.requestWithFilters(this.state.filters)
    console.log(this.state.filters)
  }

  handleCpfChange (e) {
    this.setState({
      filters: {
        ...this.state.filters,
        cpf: e.currentTarget.value
      }
    })
  }

  handleUpdateCpf (e) {
    const cpf = this.state.cpfs.find(cpf => cpf.cpf === e.currentTarget.getAttribute('data-cpf'))
    cpfAPI.createOrUpdate({
      ...cpf,
      isValid: !cpf.isValid
    }).then(cpf => this.search())
  }

  handleRemoveCpf (e) {
    cpfAPI.remove({ cpf: e.currentTarget.getAttribute('data-cpf') }).then(cpf => this.search())
  }

  render () {
    return (
      <Fragment >

        <Fragment>
          <div>
            header
            <button>+</button>
          </div>
        </Fragment>

        <Fragment>
          <input onChange={this.handleCpfChange.bind(this)} />
          <input type='radio' name='type' value='cpf' defaultChecked onChange={this.handleTypeChange.bind(this)} /> CPF
          <input type='radio' name='type' value='cnpj' onChange={this.handleTypeChange.bind(this)} /> CNPJ
          <button onClick={this.search.bind(this)}>buscar</button>
          <table>
            <thead>
              <tr>
                {['CPF', 'valido', 'ações'].map((title, idx) => (
                  <th key={idx}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.cpfs.map((cpf, index) => (
                <tr key={cpf + index}>
                  <td>{cpf.cpf}</td>
                  <td>{cpf.isValid ? 's' : 'n'}</td>
                  <td>
                    <button data-cpf={cpf.cpf} onClick={this.handleUpdateCpf.bind(this)}>{cpf.isValid ? '+ blacklist' : '- blacklist'}</button>
                    <button data-cpf={cpf.cpf} onClick={this.handleRemoveCpf.bind(this)}>apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>

      </Fragment >
    )
  }
}

export default App
