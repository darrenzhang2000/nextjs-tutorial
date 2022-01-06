
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import React, { Fragment } from 'react'
import MeetupList from '../components/meetups/MeetupList'

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
//         address: 'Some address, 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
//         address: 'Some address, 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
//         address: 'Some address, 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
// ]

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
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetups={meetups} />
        </Fragment>
    )
}

// // server side code
// export async function getServerSideProps(context){
//     const req = context.req
//     const res = context.res // like (req, res) from node.js

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// getStaticProps is faster so use getServerSideProps only if data is changing frequently (multiple times a second)
// or if you need access to req and res
// server side code
export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://testuser:testuser123@cluster0.2z58v.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        // A problem with prerendering on build is that the data can run stale. 
        // To get around this, we can pass the revalidate property which rebuilds the page every x seconds
        // Rebuilds website every 10 secs.
        revalidate: 10
    }
}

export default HomePage
