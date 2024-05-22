const Data = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUser } = require('../../config/checkToken');

const createJWT = (user) =>
	jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' });

const createUser = async (req, res) => {
	const { name, email, address, username, password, orders } = req.body;
	let { usertype } = req.body;
	usertype === 'SEIRocks!' ? (usertype = 'admin') : (usertype = 'user');
	try {
		const existingUser = await Data.User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already in use' });
		}
		const user = await Data.User.create({
			name,
			email,
			address,
			username,
			usertype,
			password,

			orders,
		});
		const token = createJWT(user);
		res.status(201).json(token);
	} catch (error) {
		res.status(401).json({ error });
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await Data.User.findOne({ email });

	if (user === null) {
		res.status(401).json({ msg: 'User not found' });
		return;
	}

	const match = await bcrypt.compare(password, user.password);

	if (match) {
		const token = createJWT(user);
		res.json(token);
	} else {
		res.status(401).json({ msg: 'Password incorrect' });
	}
};

const getUserOrdersById = async (req, res) => {
	// const { userId } = req.params;

	const currentUser = getUser(req, res);
	const userId = currentUser._id;

	try {
		const user = await Data.User.findById(userId, 'orders');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user.orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error retrieving user orders' });
	}
};

module.exports = {
	createUser,
	userLogin,
	getUserOrdersById,
};
