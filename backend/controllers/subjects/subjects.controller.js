const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const {Subjects} = require("../../models/subjects");
const { sendSuccess, sendCustomError } = require("../../helper/response");


// Create Subjects
const register = async (req, res) => {
    try {
        const subjectDetails = new Subjects({
            sector_id: req.body.sector_id,
            category_id: req.body.category_id,
            grade_id: req.body.grade_id,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            metaTitle: req.body.metaTitle,
            metaDescription: req.body.metaDescription,
            status: req.body.status,
            featured: req.body.featured

        });
    
        
        const subjectData = await subjectDetails.save();
        res.status(200).send({ "status": "success", "mesage": "Subject Inserted !", "Data": subjectData })
    } catch (error) {
        return sendCustomError({error}, res, 500, 'Error in adding Data.')}
}


// Read Subjects Lists
const view = async (req, res) => {

    const search = (req.query.search) ? req.query.search : "";
    let field_name = (req.query.order_by) ? req.query.order_by : "";
    let order = (req.query.order) ? req.query.order : "";
    const current_page = parseInt((req.query.current_page) ? req.query.current_page : 1)

    // for filtering
    let conditions = {};
    if (search.length > 0) {
        conditions = {
            $or: [
                { sector_id: { $regex: '.*' + search + '.*', $options: 'i' } },
                { category_id: { $regex: '.*' + search + '.*', $options: 'i' } },
                { grade_id: { $regex: '.*' + search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }
    }

    // for sorting
    order_by = {};
    if (field_name.length > 0 && order.length > 0) {
        order_by[field_name] = order;
    } else {
        order_by['createdAt'] = -1;
    }

    // for pagination
    const per_page = parseInt((req.query.per_page) ? req.query.per_page : 5);
    const offset = parseInt((current_page - 1) * per_page);


    try {
        const subjectsDetailsAll = await Subjects.find(conditions).sort(order_by).limit(per_page).skip(offset);
        res.status(200).send({ "status": "success", "message": "Subject Details", subjectsDetailsAll })
    } catch (error) {
        res.status(400).send({ "status": "Failed", "message": "Error in Fetching Details", error })
    }

}

// Read indivisually Subjects
const viewOne = async (req, res) => {

    const { subject_id } = req.params;
    const subjectDetails = await Subjects.findOne({ _id: subject_id })
    if (subjectDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "Subject Details", "data": subjectDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}


// Update indivisually Subjects
const update = async (req, res) => {
    const { sector_id, category_id, grade_id, title, image, description, shortDescription, metaTitle, metaDescription, featured, status } = req.body;
    const { subject_id } = req.params;
    try {
        const subjectDetails = await Subjects.findOne({ _id: subject_id });
        if (subject_id) {
            await Subjects.findOneAndUpdate({ _id: subjectDetails.id },
                { $set: { sector_id, category_id, grade_id, title, image, description, shortDescription, metaTitle, metaDescription, featured, status } },
                { new: true });
            await Subjects.findOne({ _id: subjectDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Data Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Wrong subject Id" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", "message": "Error in Updating Details" })
    }
}


// Delete indivisually Subjects
const destroy = async (req, res) => {
    const { subject_id } = req.params;
    const subjectDetails = await Subjects.findOne({ _id: subject_id });
    if (subjectDetails) {
        await Subjects.findOneAndDelete({ _id: subject_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": subjectDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}

module.exports = { register, view, viewOne, update, destroy }
