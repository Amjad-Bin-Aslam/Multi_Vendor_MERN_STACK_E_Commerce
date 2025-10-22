import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'

const FAQPage = () => {
    return (
        <div>
            <Header activeHeading={5} />
            <Faq />
            <Footer />
        </div>
    )
}


// FAQ component
const Faq = () => {
    const [activeTab, setActiveTab] = useState(false)

    const toogleTgab = (tab) => {
        if (activeTab === false) {
            setActiveTab(false)
        } else {
            setActiveTab(tab)
        }
    }

    return (
        <div className={`${styles.section}`}>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 mt-8'> FAQ
            </h2>
            <div className='mx-auto space-y-4'>
                {/* single faq */}
                <div className='border-b border-gray-200 pb-4'>
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toogleTgab(true)}
                    >
                        <span className='text-lg font-medium text-gray-900'>
                            How do I track my order?
                        </span>
                        {
                            activeTab ? (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )

                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FAQPage
