import { Outlet } from 'react-router-dom'
import Header from '../composants/header'
import Footer from '../composants/footer'

function Articles() {
  return (
    <div>    
      <div className='w-[40rem] m-auto py-10'>
        <Header />
        <div>
            <Outlet />
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Articles