const getAllUsers = (req, res) => {
    res.json({ message: 'Get all users' });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user with ID: ${id}` });
};

module.exports = { 
    getAllUsers, 
    getUserById 
};