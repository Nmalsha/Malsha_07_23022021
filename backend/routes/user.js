const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controller/user');

//router.post('/register',userCtrl.signup);
//router.post('/login',userCtrl.login);
/*

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
*/
module.exports = router;