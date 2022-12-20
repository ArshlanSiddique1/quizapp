const { sendSuccess, sendCustomError } = require("../../helper/response");
const { Sectors } = require("../../models/sectors");


const create = async (req, res) => {
    let { title, slug, shortDescription, metaTitle, metaDescription, status } = req.body;
    // console.log(name)
    let requestData = { title, slug, shortDescription, metaTitle, metaDescription, status };
    let newSectors = new Sectors(requestData);

    newSectors.save(async (err, data) => {
        if (err) {
            console.log('err', err)

            if (err.code == 11000) {
                return sendCustomError({}, res, err.code, 'Data Already Exists !')
            } else {
                return sendCustomError({}, res, 500, 'Error in adding Data.')
            }

        } else {
            return sendSuccess(data, res, 200, "Sectors added successfully.");
        }

    })


}


// Read Sectors
const view = async (req, res) => {
    const current_page = parseInt((req.query.current_page) ? req.query.current_page : 1)
    const search = (req.query.search) ? req.query.search : "";
    let field_name = (req.query.order_by) ? req.query.order_by : "";
    let order = (req.query.order) ? req.query.order : "";
    let order_by = {};

    // For Sorting
    if (field_name.length > 0 && order.length > 0) {
        order_by[field_name] = order;
    } else {
        order_by['createdAt'] = -1;
    }

    // For pagination
    const per_page = parseInt((req.query.per_page) ? req.query.per_page : 5);
    const offset = parseInt((current_page - 1) * per_page);


    // For Filtering
    let conditions = {};

    if (search.length > 0) {
        conditions = {
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { status: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        }
    }

    const SectorDetailsAll = await Sectors.find(conditions).sort(order_by).limit(per_page).skip(offset)

    if (SectorDetailsAll.length > 0) {
        res.status(200).send({ "status": "success", "message": "Sector Details", "data": SectorDetailsAll })
    } else {
        res.status(404).send({ "status": "Failed", "message": "No Data Found!" })
    }
}


// Read indivisually Sectors
const viewOne = async (req, res) => {

    const { sector_id } = req.params;
    const sectorDetails = await Sectors.findOne({ _id: sector_id })
    if (sectorDetails) {
        return (
            res.status(200).send({ "status": "success", "message": "Sector Details", "data": sectorDetails })
        )
    } else {
        res.status(500).send({ "status": "Failed", "message": "Error in fetching details" })
    }
}

// Update indivisually Sectors
const update = async (req, res) => {
    const { title, slug, image, descripton, shortDescription, metaTitle, metaDescription, featured, status } = req.body;
    const { sector_id } = req.params;
    try {
        const sectorDetails = await Sectors.findOne({ _id: sector_id });
        if (sector_id) {
            const sector = await Sectors.findOneAndUpdate({ _id: sectorDetails.id },
                { $set: { title, slug, image, descripton, shortDescription, metaTitle, metaDescription, featured, status } },
                { new: true });
            await Sectors.findOne({ _id: sectorDetails.id }).then(result => {
                return res.send({ "status": "success", "message": "Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: Sector id not found" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", "message": "Error in Updating Details" })
    }
}

// Delete indivisually Sectors
const destroy = async (req, res) => {
    const { sector_id } = req.params;
    const sectorDetails = await Sectors.findOne({ _id: sector_id });
    if (sectorDetails) {
        await Sectors.findOneAndDelete({ _id: sector_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": sectorDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}

module.exports = { create, view, viewOne, update, destroy }
