const Orders = require("../models/Orders");
const OrdersStatus = require("../models/OrdersStatus")

module.exports.getAllData = async (req, res) => {
	const transactions = await Orders.find({ school_id: school._id });
	return res.status(200).json(transactions);
};

module.exports.getSchools = async (req, res) => {
	try {
		const data = await School.find();
		return res.status(200).json(data);
	} catch (error) {
		console.log(error)
	}
}

module.exports.getAllTrans = async (req, res) => {
	const data = await Orders.find();
	return res.status(200).json(data);
}

module.exports.getAllTransData = async (req, res) => {
	const response = await OrdersStatus.find();
	return res.status(200).json(response);
};

module.exports.checkTransStatus = async (req, res) => {
	const data = await Orders.findById(req.params.id);
	return res.status(200).json(data);
}
