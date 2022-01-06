
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
        address: 'Some address, 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
        address: 'Some address, 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
        address: 'Some address, 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
]

const HomePage = (props) => {
    const { meetups } = props

    // This could be too slow since there are two renders.
    // React would show the empty meetups or loading state while 
    // the api request is made to fetch data from the backend.
    // By making the api call inside the getStaticProps function, the data is loaded during the build process in the server side
    // and never makes it to the client.

    // const [loadedMeetups, setLoadedMeetups] = useState([])

    // useEffect(() => {
    //     //fetch data from api
    //     setLoadedMeetups(DUMMY_MEETUPS)
    // }, [])

    return (
        <MeetupList meetups={meetups} />
    )
}

export async function getStaticProps() {
    // fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        // A problem with prerendering on build is that the data can run stale. 
        // To get around this, we can pass the revalidate property which rebuilds the page every x seconds
        // Rebuilds website every 10 secs.
        revalidate: 10 
    }
}

export default HomePage
