// our-domain.com/new-meetup
import React from 'react'
import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetUpPage = () => {
    const router = useRouter()

    const addMeetupHandler = async enterMeetupData => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()

        console.log(data)

        router.push('/')
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetUpPage
