const router = require("express").Router()

const Card = require("../models/Card.model")
const Checklist = require("../models/Checklist.model")

//! Routes are prefixed with /cards

// Post a new card
router.post("/", async (req, res, next) => {
    try {
        const { formData, listId } = req.body
        await Card.create({ title: formData.title, list: listId })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

// get all cards
router.get("/", async (req, res, next) => {
    try {
        let cards = await Card.find()
        res.json(cards)
    } catch (error) {
        next(error)
    }

})

// Delete one card
router.delete("/:id", async (req, res, next) => {
    try {
        await Card.findByIdAndRemove(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }

})

// Edit card content
router.put("/:id", async (req, res, next) => {
    console.log(req.body)
    try {
        const id = req.params.id;
        const updatedCard = await Card.findByIdAndUpdate(id, req.body);
        res.status(201).json(updatedCard);
    } catch (error) {
        next(error);
    }
});


// get checklists belonging to a card
router.get("/:id/checklists", async (req, res, next) => {
    try {
        const checklists = await Checklist.find({ card: req.params.id }).populate('card')
        res.status(201).json(checklists)
    } catch (error) {
        next(error)
    }
})



module.exports = router