const express=require('express')
const adminController=require('../controllers/adminController')
const verifyToken=require('../middleware/authMiddleware');
const router=express.Router()

//create a new candidate
router.post('/candidate',verifyToken,adminController.createCandidate);

//update an existing candidate
router.put('/candidate/:candidateId',verifyToken,adminController.updateCandidate);

//delete a candidate
router.delete('/candidate/:candidateId',verifyToken,adminController.deleteCandidate);

//view a list of candidates
router.get('/candidates',verifyToken,adminController.viewCandidates);

module.exports=router;
