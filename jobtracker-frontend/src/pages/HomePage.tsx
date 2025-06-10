
import Header from '../components/Header'
import ApplicationsTable from '../components/ApplicationsTable'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
        <Header/>
        <main className='py-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 max-w-7xl mx-auto'>
          
        <ApplicationsTable/>
        </main>
    
    </div>
  )
}

export default HomePage