
import React from 'react'
import Layout from '../components/layout/Layout'
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
        address: 'Some address, 5, 12345 Some City',
        description: 'This is a first meetup!'
    }
]

const HomePage = () => {
    return (
        <Layout>
            <MeetupList meetups={DUMMY_MEETUPS} />
        </Layout>
    )
}

export default HomePage
