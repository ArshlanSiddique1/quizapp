const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const { Sections } = require("../../models/sections");
const { sendSuccess, sendCustomError } = require("../../helper/response");



// Create Sections
const register = async (req, res) => {
    try {
        console.log("boddyy", req.body)
        const sectionsDetails = new Sections({
            sector_id: req.body.sector_id,
            category_id: req.body.category_id,
            grade_id: req.body.grade_id,
            subject_id: req.body.subject_id,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            metaTitle: req.body.metaTitle,
            metaDescription: req.body.metaDescription,
            status: req.body.status
        });
        console.log("boddyy", req.body)
        const sectionsData = await sectionsDetails.save();
        res.status(200).send({ "status": "success", "mesage": "Section Inserted !", "Data": sectionsData })
    } catch (error) {
        console.log(error)
        return sendCustomError({ error }, res, 400, 'Status : failed')


    }
}


// Read Sections Lists
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
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
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




    let total_records = await Sections.count(conditions);

    let total_pages = Math.ceil(total_records / per_page);
    let meta = {
        current_page: current_page,
        per_page: per_page,
        total_pages: total_pages,
        total_records: total_records
    }


        await Sections.find(conditions).sort(order_by).limit(per_page).skip(offset).then(results => {
            if (results.length > 0) {
                let sectionsDetailsAll = {
                    'results': results,
                    'meta': meta
                }
                res.status(200).send({ "status": "success", "message": "Sections Details", "data": sectionsDetailsAll })
            }
            else {
                res.status(404).send({ "status": "Failed", "message": "No Data Found!" })
            }
        })
    
    
}


// Read indivisually Sections
const viewOne = async (req, res) => {

    const { section_id } = req.params;
    const sectionDetails = await Sections.findOne({ _id: section_id })
    if (sectionDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "Sectoion Details", "data": sectionDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}


// Update indivisually Sections
const update = async (req, res) => {
    const { sector_id, category_id, grade_id, subject_id, title, image, description, shortDescription, metaTitle, metaDescription, status } = req.body;
    const { section_id } = req.params;
    try {
        const sectionDetails = await Sections.findOne({ _id: section_id });
        if (section_id) {
            await Sections.findOneAndUpdate({ _id: sectionDetails.id },
                { $set: { sector_id, category_id, grade_id, subject_id, title, image, description, shortDescription, metaTitle, metaDescription, status } },
                { new: true });
            await Sections.findOne({ _id: sectionDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Data Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Wrong Section Id" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", "message": "Error in Updating Details" })
    }
}

// Delete indivisually Sections
const destroy = async (req, res) => {
    const { section_id } = req.params;
    const sectionDetails = await Sections.findOne({ _id: section_id });
    if (sectionDetails) {
        await Sections.findOneAndDelete({ _id: section_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": sectionDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}

module.exports = { register, view, viewOne, update, destroy }
