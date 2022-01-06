// our-domain.com/new-meetup
import React from 'react'
import Layout from '../../components/layout/Layout'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetUpPage = () => {
    const addMeetupHandler = enterMeetupData => {
        console.log(enterMeetupData)
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetUpPage
