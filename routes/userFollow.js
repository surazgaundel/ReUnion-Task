const User=require('../models/User');


const followUser= async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.followers.includes(req.userData.userId)) {
        return res.status(400).json({ message: 'Already following this user' });
      }
  
      await User.findByIdAndUpdate(
        req.userData.userId,
        { $push: { following: user._id } },
        { new: true }
      );
  
      await User.findByIdAndUpdate(
        user._id,
        { $push: { followers: req.userData.userId } },
        { new: true }
      );
  
      return res.status(200).json({ message: 'Successfully followed user' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports=followUser;