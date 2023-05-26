import React from 'react'
import { useSelector } from 'react-redux'

import Navbar from '../navbar/Navbar';

const Dashboard = () => {
  const admin = useSelector(state => state.user);

  return (
  <>{!admin.isConnected ? <></> : 
      <main
        style={{display: 'flex', flexDirection: 'row'}}
      >
        <Navbar />
        <section>
          page
        </section>
      </main>
    }
  </>
  )
}

export default Dashboard