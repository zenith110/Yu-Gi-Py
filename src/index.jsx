import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header/Header'
import Editor from './components/Editor/Editor'
import Display from './components/Display/Display'

import './index.scss'

const App = function() {
  return (
    <>
      <Header/>
      <Display/>
      {/* <Editor/> */}
    </>
  )
}

const view = App('pywebview')

const element = document.getElementById('app')
ReactDOM.render(view, element)