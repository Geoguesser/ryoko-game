import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'

function App() {
  return (
    <div>
      <h1 className={styles['title']}>App</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
