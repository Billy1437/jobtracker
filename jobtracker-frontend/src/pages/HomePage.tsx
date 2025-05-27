import React from 'react'
import Header from '../components/Header'
import ApplicationsTable from '../components/ApplicationsTable'

const HomePage = () => {
  return (
    <div className=''>
        <Header/>
        <main className='md:py-5 px-40'>
          
        <ApplicationsTable/>
        </main>
    
    </div>
  )
}

export default HomePage