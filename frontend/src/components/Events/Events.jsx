import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import EventCard from './EventCard'
import { useSelector } from 'react-redux'

const Events = () => {

  const { allEvents, isLoading } = useSelector((state) => state.event) 
  
 
  return (
    <div>
      {
        !isLoading && (
          <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1 className='font-bold mb-5'> 
                        Popular Events 
                    </h1>
                </div>

                <div className='w-full'>
                    <EventCard data={allEvents && allEvents[0]} />
                </div>

            </div>
        </div>
        )
      }
    </div>
  )
}

export default Events
