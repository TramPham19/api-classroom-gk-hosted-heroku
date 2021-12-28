const jwt = require('jsonwebtoken')

const checkAdmin = (req, res, next) => {
	// try {
    //     //kiem tra token phai hang xin khong?
	// 	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
	// 	req.email = decoded.email
	// 	next()
	// } catch (error) {
	// 	console.log(error)
	// 	return res.status(403).json({ success: false, message: 'Invalid token!' })
	// }
}

module.exports = checkAdmin