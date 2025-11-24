import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event)

  return (
    <div> 
      <Header activeHeading={4} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full py-10 px-5'>
          {allEvents && allEvents.length > 0 ? (
            allEvents.map((event, index) => (
              <EventCard key={index} active={true} data={event} />
            ))
          ) : (
            <div className='w-full text-center py-20'>
              <h1 className='text-2xl font-semibold'>No Events Available</h1>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventsPage
