const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const Grades = require("../../models/grades");


// Create Grades
const register = async (req, res) => {
    try {
        const gradesDetails = new Grades({
            name: req.body.name,
            image: req.body.image,
            featured: req.body.featured,
            status: req.body.status,
        });
        const gradesData = await gradesDetails.save();
        res.status(200).send({ "status": "success", "mesage": "Grade Details Inserted !", "Data": gradesData })
    } catch (error) {
        res.status(400).send({ "status": "failed", error })
    }
}


// Read Grades
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
                { name: { $regex: '.*' + search + '.*' } },
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
        const gradeDetailsAll = await Grades.find(conditions).sort(order_by).limit(per_page).skip(offset);
        res.status(200).send({ "status": "success", "message": "Grade Details", gradeDetailsAll })
    } catch (error) {
        res.status(400).send({ "status": "Failed", "message": "Error in Fetching Details", error })
    }
}



// Update indivisually Grades
const update = async (req, res) => {
    const { name, slug, image, featured, status } = req.body;
    const { grade_id } = req.params;
    try {
        const gradeDetails = await Grades.findOne({ _id: grade_id });
        if (grade_id) {
            await Grades.findOneAndUpdate({ _id: gradeDetails.id },
                { $set: { name, slug, image, featured, status } },
                { new: true });
            await Grades.findOne({ _id: gradeDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Data Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Wrong Grade Id" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", "message": "Error in Updating Details" })
    }
}


// Read indivisually Grades
const viewOne = async (req, res) => {
    const { grade_id } = req.params;
    const GradeDetails = await Grades.findOne({ _id: grade_id })
    if (GradeDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "Grade Details", "data": GradeDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}


// Delete indivisually Grades
const destroy = async (req, res) => {
    const { grade_id } = req.params;
    const GradeDetails = await Grades.findOne({ _id: grade_id });
    if (GradeDetails) {
        await Grades.findOneAndDelete({ _id: grade_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": GradeDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}

module.exports = { register, view, viewOne, update, destroy }
