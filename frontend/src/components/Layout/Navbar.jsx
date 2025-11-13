import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({ active }) => {
    return (
    <div className={`lg:${styles.noramlFlex} block`}>
        {
            navItems && navItems.map((item, index) => (
                <div className='flex' key={index}>
                    <Link
                        to={item.url}
                        className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black lg:text-[#fff] pb-[30px] lg:pb-0 "} font-[500] px-6 cursor-pointer`}
                    >
                        {item.title}
                    </Link>
                </div>
            ))
        }
    </div>
    )
}

export default Navbar
