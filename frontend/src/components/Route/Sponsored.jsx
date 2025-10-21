import React from 'react'
import styles from '../../styles/styles'

const Sponsored = () => {
    return (
        <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
            <div className='flex justify-between w-full'>
                <div className='flex items-center'>
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
                <div className='flex items-center'>
                    <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
                <div className='flex items-center'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFg4_AOWHnfdj4xO2zWm3BzSBLbh76j4QIoA&s" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
                <div className='flex items-center'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOqTudOHrwzaKQUIl4NmdU6ZkwD16d6LX6dw&s" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
                <div className='flex items-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
                <div className='flex items-center'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDuX-2IMc2tm0zrgdoxtEcjjFD3KwV0T98g&s" alt="" style={{width: "150px", objectFit: "contain"}} />
                </div>
            </div>
        </div>
    )
}

export default Sponsored
