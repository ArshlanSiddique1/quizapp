const express = require("express");
const { Categorys } = require("../../models/categories");
// const { sendSuccess, sendCustomError } = require("../../helper/response");


// Create Category
const register = async (req, res) => {
    try {
        const categoryDetails = new Categorys({
            sector_id:req.body.sector_id,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            metaTitle: req.body.metaTitle,
            metaDescription: req.body.metaDescription,
            status: req.body.status,
            featured: req.body.featured,
            subscription: req.body.subscription
        });
        const categoryData = await categoryDetails.save();
        res.status(200).send({ "status": "success", "mesage": "Category Details Inserted !", "Data": categoryData })
    } catch (error) {
        console.log(error)
        res.status(400).send({ "status": "failed", error })
    }
}

// Read Category
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
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { subscription: { $regex: '.*' + search + '.*', $options: 'i' } },
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

    
    let total_records = await Categorys.count(conditions);

    let total_pages = Math.ceil(total_records / per_page);
    let meta = {
        current_page: current_page,
        per_page: per_page,
        total_pages: total_pages,
        total_records: total_records
    }



        const CategoryDetailsAll = await Categorys.find(conditions).sort(order_by).limit(per_page).skip(offset).then(results => {
        if (results.length > 0) {
            let CategoryDetailsAll = {
                'results': results,
                'meta': meta
            }
            res.status(200).send({ "status": "success", "message": "Categorys Details", "data": CategoryDetailsAll })
        }
        else {
            res.status(404).send({ "status": "Failed", "message": "No Data Found!" })
        }
    })

}


// Read indivisually Category
const viewOne = async (req, res) => {
    const { category_id } = req.params;
    const CategoryDetails = await Categorys.findOne({ _id: category_id })
    if (CategoryDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "category Details", "data": CategoryDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}


// Update indivisually Category
const update = async (req, res) => {
    const { sector_id, title, slug, image, descripton, shortDescription, metaTitle, metaDescription, featured, status, subscription } = req.body;
    const { category_id } = req.params;
    try {
        const CategoryDetails = await Categorys.findOne({ _id: category_id });
        if (category_id) {
            const categoryData = await Categorys.findOneAndUpdate({ _id: CategoryDetails.id },
                { $set: { sector_id, title, slug, image, descripton, shortDescription, metaTitle, metaDescription, featured, status, subscription } },
                { new: true });
            await Categorys.findOne({ _id: CategoryDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Category id not found" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", error })
    }
}


// Delete indivisually Category
const destroy = async (req, res) => {
    const { category_id } = req.params;
    const CategoryDetails = await Categorys.findOne({ _id: category_id });
    if (CategoryDetails) {
        await Categorys.findOneAndDelete({ _id: category_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": CategoryDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}


module.exports = { register, view, viewOne, update, destroy }
