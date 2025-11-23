import React, { useEffect, useState } from 'react'

const CountDown = ({data}) => {


    const calculateTimeLeft = () => {
        const difference = +new Date(data.finish_Date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timeComponenets = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return null
        }
        return (
            <span className='text-[25px] font-semibold text-[#475ad2]'>
            {timeLeft[interval]} {interval} {" "}
            </span>
        )
    })



    return (
    <div>
        {
            timeComponenets.length ? timeComponenets : (<span className='text-[red]'>Time's up!</span>)
        }
    </div>
  )
}

export default CountDown
