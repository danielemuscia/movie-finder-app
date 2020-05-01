import React from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Error from './pages/Error'
import SearchResults from './pages/SearchResults'
import SingleMovie from './components/SingleMovie'

export default function App() {
  return (
    <>
    <Route component={NavBar}/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/catalog' component={Catalog}/>
      <Route exact path='/search' component={SearchResults}/>
      <Route exact path='/movie/:slug' component={SingleMovie} />
      <Route component={Error}/>
    </Switch>
    </>
  )
}
