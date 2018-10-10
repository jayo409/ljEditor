import React from 'react'

import Editor from '../components/editor'

export default class App extends React.Component {

  render () {
    return (
      <Editor
        style={{width: 500, height: 500, margin: '200px auto'}}
      />
    )
  }
}