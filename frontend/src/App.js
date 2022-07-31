import React from 'react';
import appStyles from './App.module.scss'
import { Header } from './modules';

function App() {
  return (
    <div className={appStyles.container}>
      <Header/>
    </div>
  )
}

export default App;
