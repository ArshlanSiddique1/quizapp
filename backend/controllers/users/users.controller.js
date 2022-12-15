const mongoose = require("mongoose");
const { Users, ObjectId } = require("../../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PASSWORD } = require('../../constant/common');
const generateToken = require("../../constant/generateToken");
const { sendSuccess, sendCustomError } = require('../../helper/response');
const { comparePassword } = require("../../constant/commonFunctions");


// Api User register
const register = async (req, res) => {
    const { name, email, password, mobileNumber } = req.body;
    const userExists = await Users.findOne({ email: email });
    if (userExists) {
        res.status(400).send({ "status": "Duplicate", "message": "Email already Exists" })
    } else {
        if (name && email && password) {
            try {
                const salt = bcrypt.genSaltSync(PASSWORD.SALT_LENGTH);
                const hashPassword = bcrypt.hashSync(password, salt);
                const doc = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    password: hashPassword,
                    mobileNumber: mobileNumber
                });
                doc.save()
                // const saved_user = await Users.findOne({ email: email })
                // generating JWT Tokens
                // const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                res.status(201).send({ "status": "Success", "message": "Registered Successfully", "data": doc })
            } catch (error) {
                res.send(error);
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are required" })
        }
    }
}




// Api User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log({ email, password })
        if (email && password) {

            const userDtails = await Users.findOne({ email: email });
            if (userDtails) {

                // const isMatch = await bcrypt.compare(password, userDtails.password)
                const isMatch = await comparePassword({ password, dbPassword: userDtails.password })

                if (userDtails.email === email && isMatch) {

                    // Generating JWT Tokens
                    const token = await generateToken({ userID: userDtails._id, email: userDtails.email });
                    await Users.findOneAndUpdate(
                        { _id: ObjectId(userDtails.id) },
                        { $set: { accessToken: token } },
                        { new: true }
                    );

                    let responseData = userDtails.toJSON();
                    console.log("responseData", responseData);
                    responseData['accessToken'] = token;
                    delete responseData['password'];
                    return sendSuccess(responseData, res, 200, "Logged in Successfully");
                } else {
                    return sendCustomError({}, res, 401, 'Email or Password is not Valid !');
                }
            } else {
                return sendCustomError({}, res, 401, 'You are not a registered User !');
            }
        }
    } catch (error) {
        console.log(error);
        return sendCustomError({}, res, error.code || 401, error.message)
    }
}



// Read User
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
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { email: { $regex: '.*' + search + '.*', $options: 'i' } },
                // { mobileNumber: { $regex: '.*' + search + '.*', $options: 'i' } }
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
        const userDeailsAll = await Users.find(conditions, { password: 0 }).sort(order_by).limit(per_page).skip(offset);
        res.status(200).send({ "status": "success", "message": "Users Details", userDeailsAll })
    } catch (error) {
        res.status(400).send({ "status": "Failed", "message": "Error in Fetching Details", error })
    }

}

// Update indivisually User
const update = async (req, res) => {
    const { name, email, mobileNumber } = req.body;
    const { user_id } = req.params;
    try {
        const userDetails = await Users.findOne({ _id: user_id });
        if (user_id) {
            await Users.findOneAndUpdate({ _id: userDetails.id },
                { $set: { name, email, mobileNumber } },
                { new: true });
                
            await Users.findOne({ _id: userDetails.id })
            .then(result => {
                return res.send({ "status": "success", "message": "Updated Successfully", "Data": result })
            })
        } else {
            res.send({ "status": "Failed", "message": "Error: User id not found" })
        }
    } catch (error) {
        res.status(500).send({ "status": "Failed", error })
    }
}

// Delete indivisually Users
const destroy = async (req, res) => {
    const { delete_id } = req.params;
    const UserDetails = await Users.findOne({ _id: delete_id });
    if (UserDetails) {
        await Users.findOneAndDelete({ _id: delete_id });
        return res.send({ "status": "success", "message": "Deleted Successfully", "Data": UserDetails })
    } else {
        res.send({ "status": "Failed", "message": "Error in Deleting Details" })
    }
}
module.exports = { register, login, view, update, destroy }