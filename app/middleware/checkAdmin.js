const jwt = require('jsonwebtoken')

const checkAdmin = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		if(decoded.email == "admin@gmail.com"){
			req.email = decoded.email
			next()
		}
		else{
			return res.status(403).json({ success: false, message: 'Invalid Admin!' })
		}
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token!' })
	}
}

module.exports = checkAdmin