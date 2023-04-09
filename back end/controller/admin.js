const User = require('../model/users');

exports.addUser = async (req, res, next) => {
    try{
        const name = req.body.name;
        const email_id = req.body.email_id;
        const subject_opted = req.body.subject_opted;
    
        const data = await User.create ({name : name, email : email_id, subject : subject_opted});
        res.status(201).json({newUserDetail : data});
      } catch(err) {
        res.status(500).json({
          error : err
        })
    }
}

exports.getUsers = async (req, res, next) => {
    try{
        const users = await User.findAll();
        res.status(201).json({allUsers : users});
      } catch(err) {
        res.status(500).json({
          error : err
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try{
        await User.destroy({where : {id : req.params.id}});
        res.send('DELETE request called');
        } catch(err){
        res.status(500).json({
          error : err
        })
    }
}