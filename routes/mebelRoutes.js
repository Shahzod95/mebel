const { Router } = require('express')
const router = Router()

const {
    getMebels
} = require("../controllers/mebelControllers")

router.post('/', getMebels)


module.exports = router