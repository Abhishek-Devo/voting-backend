//handles candidate management
const Candidate=require('../models/candidate')

//view candidates in the admin area
exports.viewCandidates = async (req, res) => {
    try {
        // Fetch all candidates from the database
        const candidates = await Candidate.find();
        

        // Send response with candidates data
        res.status(200).json(candidates);
    } catch (error) {
        // Handle errors by sending a 500 status and an error message
        res.status(500).json({
            message: "Failed to fetch candidates",
            error: error.message,
        });
    }
};
//create a new candidate
exports.createCandidate = async (req, res) => {
    try{
        const {name,age,party}=req.body;
        const candidate=new Candidate({name,age,party});
        await candidate.save();
        res.status(201).json({
            messaage:"new candidate added successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:"something went wrong",error
    });
}
};

//update candidate info
exports.updateCandidate = async (req, res) => {
    try {
        const candidateID=req.params.candidateId;
        const updates=req.body;
        //console.log(candidateID);
        //console.log(updates);

        //find candidate in db using candidateId
        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateID, updates, { new: true});
        //if failed to find candidate
        if(!updatedCandidate){
            return res.status(404).json({
                message:"candidate not found"
            });
        }

        //if candidate found and updated info
        res.status(200).json({
            message:"candidate info updated successfully",
            updatedCandidate
        });        
    } catch (error) {
        res.status(500).json({
            message: "failed to update candidate info",error
        });  
        console.log(error)    
    }
};

//delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
    
        const candidateId=req.params.candidateId;
        console.log("Deleted candidate with ID:", candidateId)
        //find candidate in db using candidateId
        const candidate=await Candidate.findByIdAndDelete(candidateId);
        if(!candidate){
            return res.status(404).json({
                message:"candidate not found"
            })
        };
        //on successfull deletion
        res.json({
            message:"candidate deleted successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            message: "failed to delete candidate",error});        
    }
}