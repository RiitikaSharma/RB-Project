const mongoose = require('mongoose');
const _ = require('lodash');

const Data = mongoose.model('Data');
const User = mongoose.model('User');

module.exports.getData = (req, res) => {
    Data.find({user: req.params.user}).then((data)=>{
        return res.status(200).json({ status: true, data : data})
    })
}

module.exports.upload = (req, res) => {
    const { user, personal, education, professional, others } = req.body
    User.findOne({ email: user }).then((User)=>{
        if(User) {
            const userData = new Data({ user: user, personal, education, professional, others })
            userData.save().then(()=>{
                return res.status(201).json({ Message : "Data Is Stored Successfully"})
            }).catch((err)=>{ return res.status(500).json({ error : 'Failed To Save Data', msg : err})})
        }
        else {
            return res.status(403).json({ error : 'unauthorized user'})
        }
    }).catch(err => res.status(500).json({ error : 'Failed To Load User Data'}))
}

module.exports.update = (req,res) => {
    const { user, personal, education, professional, others } = req.body
    Data.findById(req.params.id).then((data)=>{
        if(data) {
            Data.findByIdAndUpdate(data._id,{$set:{ user, personal, education, professional, others }}).then(()=>{
                res.status(201).json({ Message : "Data Is Updated Successfully"})
            }).catch((err)=>{res.status(500).json({ error : 'Failed To Save Data', msg : err})})
        }
        else return res.status(404).json({ status: false, message: 'Record not found.' });
    })
}

module.exports.delete = (req,res) => {
    Data.findById(req.params.id).then((data)=>{
        if(data) 
        Data.findByIdAndRemove(data._id).then((resume, err)=>{
            if(!err) return res.status(200).json({ Message: "Record has been deleted successfully"})
            else return res.status(500).json({ error : "Unable To Proceed Your Request"})
        })
        else return res.status(404).json({ status: false, message: 'Data record not found.' });
    })
}

module.exports.deleteAll = (req,res) => {
    Data.deleteMany({}).then((data, err) => {
        if(err) return res.status(500).json({ error: "Unable to proceed your request"})
        else {
            if (data.deletedCount == 0) return res.status(404).json({ error : "Zero record found"})
            return res.status(200).json({ Message : "Records are deleted successfully", DeletedRecords: data.deletedCount})
        }
    })
}
