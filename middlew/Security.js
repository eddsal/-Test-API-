const jwt = require('jsonwebtoken');
const SECRET_KEY = "eddy";
const bcrypt = require('bcryptjs');
const User = require("../models/User");

const comparePassword = (password, user) => {
    let token = '';
    const response = bcrypt.compare(password, user.password);
    if (response) {
        const expireIn = 24 * 60 * 60;
        token = jwt.sign(
            {
                user: user
            },
            SECRET_KEY,
            {
                expiresIn: expireIn
            }
        );
        return token;
    }
}

const findUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      console.error(error);
    }
  };


exports.auth = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await findUserByEmail(email);
		if (user) {
			const token = comparePassword(password, user);
			console.log(token)
			res.header('Authorization', 'Bearer ' + token);
			res.status(200).json({
				action: req.url,
				method: req.method,
				data: { data: { user: user, token: token } }
			});
		}
	} catch (error) {
		console.error(error) || res.sendStatus(500);
	}
};

exports.checkJWT = async (req, res, next) => {
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		if (!!token && token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		if (token) {
			let decoded = await jwt.verify(token, SECRET_KEY);
			if (decoded) {
				req.decoded = decoded;
				const expiresIn = 24 * 60 * 60;
				const newToken = jwt.sign(
					{
						user: decoded.user
					},
					SECRET_KEY,
					{
						expiresIn: expiresIn
					}
				);
				res.header('Authorization', 'Bearer ' + newToken);
				return next();
			}
			return res.status(401).json('token_not_valid');
		} else {
			return res.status(404).json('token_required');
		}
	} catch (error) {
		console.error(error) || res.sendStatus(500);
	}
};