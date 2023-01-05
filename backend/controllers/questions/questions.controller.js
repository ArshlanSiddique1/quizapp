const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const { Questions } = require("../../models/questions");


// Create Questions
const register = async (req, res) => {
    try {
        const questionsDetails = new Questions({
            sector_id: req.body.sector_id,
            category_id: req.body.category_id,
            grade_id: req.body.grade_id,
            subject_id: req.body.subject_id,
            section_id: req.body.section_id,
            title: req.body.title,
            explanation: req.body.explanation,
            year: req.body.year,
            options:
            {
                title: req.body.titles,
                isCorrect: req.body.isCorrect,
            },
            difficulty: req.body.difficulty,
            status: req.body.status
        });
        const questionData = await questionsDetails.save();
        res.status(200).send({ "status": "success", "mesage": "Question Inserted !", "Data": questionData })
    } catch (error) {
        res.status(400).send({ "status": "failed", error })
    }
}


// Read Questions Lists
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
                { subject_id: { $regex: '.*' + search + '.*', $options: 'i' } },
                { section_id: { $regex: '.*' + search + '.*', $options: 'i' } },
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { explanation: { $regex: '.*' + search + '.*', $options: 'i' } },
                { year: { $regex: '.*' + search + '.*', $options: 'i' } },
                { difficulty: { $regex: '.*' + search + '.*', $options: 'i' } },
                { status: { $regex: '.*' + search + '.*', $options: 'i' } },
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
    const per_page = parseInt((req.query.per_page) ? req.query.per_page : 8);
    const offset = parseInt((current_page - 1) * per_page);



    let total_records = await Questions.count(conditions);

    let total_pages = Math.ceil(total_records / per_page);
    let meta = {
        current_page: current_page,
        per_page: per_page,
        total_pages: total_pages,
        total_records: total_records
    }

        const questionsDetailsAll = await Questions.find(conditions).sort(order_by).limit(per_page).skip(offset).then(results => {
            if (results.length > 0) {
                let questionsDetailsAll = {
                    'results': results,
                    'meta': meta
                }
                res.status(200).send({ "status": "success", "message": "Questions Details", "data": questionsDetailsAll })
            }
            else {
                res.status(404).send({ "status": "Failed", "message": "No Data Found!" })
            }
        })
    
}

// Read indivisually Questions
const viewOne = async (req, res) => {

    const { question_id } = req.params;
    const questionDetails = await Questions.findOne({ _id: question_id })
    if (questionDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "Question Details", "data": questionDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}


// Update indivisually Questions
const update = async (req, res) => {
    console.log("Im here")
    const { sector_id, category_id, grade_id, subject_id, section_id, title, explanation, year, options, difficulty, status } = req.body;
    const { question_id } = req.params;
    try {
        const questionDetails = await Questions.findOne({ _id: question_id });
        if (question_id) {
            await Questions.findOneAndUpdate({ _id: questionDetails.id },
                { $set: { sector_id, category_id, grade_id, subject_id, section_id, title, explanation, year, options, difficulty, status } },
                { new: true });
            await Questions.findOne({ _id: questionDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Data Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Wrong Question Id" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", "message": "Error in Updating Details" })
    }
}

// Delete indivisually Questions
const destroy = async (req, res) => {
    const { question_id } = req.params;
    const questionDetails = await Questions.findOne({ _id: question_id });
    if (questionDetails) {
        await Questions.findOneAndDelete({ _id: question_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": questionDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}

module.exports = { register, view, viewOne, update, destroy }
