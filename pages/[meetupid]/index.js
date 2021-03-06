import React, { Fragment } from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
const MeetupDetails = (props) => {
    const { image, title, address, description } = props.meetupData
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail
                image={image}
                title={title}
                address={address}
                description={description}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://testuser:testuser123@cluster0.2z58v.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

    client.close()

    return {
        fallback: false,
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://testuser:testuser123@cluster0.2z58v.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

    client.close()


    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails
