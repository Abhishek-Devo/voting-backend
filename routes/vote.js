//voting related routes to get candidates and allow users to vote
const express=require("express")
const router=express.Router()
const votingController=require('../controllers/votingController');
const verifyToken=require('../middleware/authMiddleware')

//get list of all candidates with their current votes
router.get('/',verifyToken,votingController.getCandidates);

//vote for a specific candidate
router.post('/:candidateId/vote',verifyToken,votingController.vote);

module.exports=router; 