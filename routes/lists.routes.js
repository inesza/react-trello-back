const Card = require("../models/Card.model")
const Checklist = require("../models/Checklist.model")
const List = require("../models/List.model")

const router = require("express").Router()

//! Routes are prefixed with /lists 

// get lists
router.get("/", async (req, res, next) => {
    try {
        const allLists = await List.find()
        res.status(200).json(allLists)

    } catch (error) {
        next(error)
    }
})

// Create new list
router.post("/", async (req, res, next) => {
    try {
        const { listTitle } = req.body
        await List.create({ title: listTitle })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

// get cards belonging to a list
router.get("/:id/cards", async (req, res, next) => {
    try {
        const listCards = await Card.find({ list: req.params.id }).populate('list')
        res.status(201).json(listCards)
    } catch (error) {
        next(error)
    }
})

// Delete a list and related cards
router.delete("/:id", async (req, res, next) => {
    try {
        await List.findByIdAndRemove(req.params.id);
        const relatedCards = await Card.find({ list: req.params.id })
        for (const card of relatedCards) { await Card.findByIdAndRemove(card._id) }
        res.sendStatus(200);
    } catch (error) {
        next(err);
    }
});



// Quick way to remove all lists,cards and checklists- for testing purpose only
router.get("/deleteAll", async (req, res, next) => {
    try {
        await Card.deleteMany()
        await List.deleteMany()
        await Checklist.deleteMany()
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})


module.exports = router