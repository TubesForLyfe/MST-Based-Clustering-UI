import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
  return (
    <div className='container'>
      <div className='ui'>
        <h2 className='mt-3'>MST-Based Clustering</h2>
        <h5>by TubesForLyfe</h5>
        <div className='mt-4 landing'>
            <p className='mt-4'><Link to="/new-cluster"><button>Create New Cluster</button></Link></p>
            <p className='mt-4'><Link to="/cluster-log"><button>Show Cluster History</button></Link></p>
        </div>
      </div>
    </div>
  )
}

export default Landing
