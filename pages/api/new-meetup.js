import { MongoClient } from 'mongodb'

// /api/new-meetup

// POST /api/new-meetup
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body // has title, image, address, description 

        const client = await MongoClient.connect('mongodb+srv://testuser:testuser123@cluster0.2z58v.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = meetupsCollection.insertOne(data)

        console.log(result)

        client.close()

        res.status(201).json({ message: 'Meetup Inserted!' })

    }
}

export default handler