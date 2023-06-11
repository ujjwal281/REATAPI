const express = require('express');
const router = express.Router();
const Subscribers = require('../models/subscribers')


//Getting all
router.get('/',async (req, res) => {
    try {
        const subscribers = await Subscribers.find()
        res.json(subscribers);
    } catch (err) {
        res.status(5000).json({ message: err.message })
    }
   
})
//Getting One
router.get('/:id', getSubscribers , (req, res) => {
    res.json(res.subscriber);
})

//Creating one
router.post('/', async(req, res) => {
    const subscribers = new Subscribers({
        name: req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscribers.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
})
//Udpating one
router.patch('/:id', getSubscribers , async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name     
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel     
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//Delete One
router.delete('/:id', getSubscribers , async(req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({message : "deleted subscribers"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


async function getSubscribers(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscribers.findById(req.params.id);
        if (subscriber == null) {
            res.sendStatus(404).json({ messasge: 'Connot find Subscribers' });
        }
    } catch (error) {
        return res.sendStatus(404).json({ message : error.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;