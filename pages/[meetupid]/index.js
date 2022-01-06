import React, { Fragment } from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = () => {
    return (
        <MeetupDetail
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU'
            title='A First Meetup'
            address='Some Street 5, Some City'
            description='The meetup description'
        />
    )
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: "m1"
                }
            },

            {
                params: {
                    meetupId: "m2"
                }
            },

        ]
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId

    console.log(meetupId)
    return {
        props: {
            meetupData: {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SPDOv9ngD-19xo3aGTH0PdN6bHyybjnpRA&usqp=CAU',
                id: meetupId,
                title: 'A First Meetup',
                address: 'Some Street 5, Some City',
                description: 'The meetup description'
            }
        }
    }
}

export default MeetupDetails
