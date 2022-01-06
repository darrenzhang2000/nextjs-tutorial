import { MongoClient } from 'mongodb'

// /api/new-meetup

// POST /api/new-meetup
async function handler(req, res) {
    if (req.method === 'POST') {
        try {

            const data = req.body // has title, image, address, description 

            const client = MongoClient.connect('mongodb+srv://testuser:testuser123@cluster0.2z58v.mongodb.net/meetups?retryWrites=true&w=majority')
            const db = (await client).db()

            const meetupsCollection = db.collection('meetups')

            const result = meetupsCollection.insertOne(data)

            console.log(result)

            client.close()

            res.status(201).json({ message: 'Meetup Inserted!'})
        }
        catch {

        }
    }
}