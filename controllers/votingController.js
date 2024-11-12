const Candidate = require('../models/candidate');
const User = require('../models/user');

// Cast vote
exports.vote = async (req, res) => {
    try {
        const userId = req.userId; // Ensure the user is authenticated
        console.log("userid : ",userId)
        const candidateId = req.params.candidateId; // Corrected to match route parameter console.log("candidate id : ",

        // Check if the user has already voted
        const user = await User.findById(userId);
        
        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Find the candidate and update their vote count
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        candidate.votes.push({ user: userId });
        candidate.voteCount += 1;

        // Mark the user as voted
        user.isVoted = true;

        await candidate.save();
        await user.save();

        return res.status(200).json({ message: 'Vote cast successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error casting vote', error: error.message });
    }
};

// Get candidates and their vote count
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().populate('votes.user', 'name');
        return res.status(200).json(candidates);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching candidates', error: error.message });
    }
};
