const { Router } = require('express')
const router = Router()

const {
    getMebels,
    getMebelById,
    addMebel,
    updateMebel,
    deleteMebel
} = require("../controllers/mebelControllers")

const {upload} = require("../utils/multer")

router.get('/', getMebels)
router.get('/:id', getMebelById)
router.post('/add', upload.fields([{name:"img_list", maxCount:20}, {name:"img"}]), addMebel)
router.put('/:id', upload.fields([{name:"img_list", maxCount:20}, {name:"img"}]), updateMebel)
router.delete("/:id", deleteMebel)

module.exports = router