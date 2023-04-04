const router = require("express").Router()

const Card = require("../models/Card.model")
const Checklist = require("../models/Checklist.model")

// Post a new element in the checklist
router.post("/", async (req, res, next) => {
    console.log("body", req.body)
    try {
        const { title, card } = req.body
        await Checklist.create({ title, card, isDone: false })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

// Delete one element
router.delete("/:id", async (req, res, next) => {
    try {
        await Checklist.findByIdAndRemove(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }

})

// Edit element
router.put("/:id", async (req, res, next) => {
    console.log("body", req.body)
    try {
        const id = req.params.id;
        const updatedChecklist = await Checklist.findByIdAndUpdate(id, req.body);
        res.status(201).json(updatedChecklist);
    } catch (error) {
        next(error);
    }
});


// Delete all checklists (for testing purpose)
router.get("/deleteAll", async (req, res, next) => {
    try {
        await Checklist.deleteMany()
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const allChecks = await Checklist.find()
        res.send(allChecks)
    } catch (error) {
        next(error)
    }
})


module.exports = router