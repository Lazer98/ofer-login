const jwt = require("jsonwebtoken");


exports.auth = (req,res,next) => {
  // אם בכלל נשלח טוקן
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({err_msg:"need to send token to his endpoint url"})
  }
  try{
    // בודק אם הטוקן תקף או לגטימי
    let decodeToken = jwt.verify(token, "MonkeySecret");
    req.tokenData = decodeToken;
    // נקסט אומר שהפונקציה סיימה את תפקידה ואפשר לעבור
    // לפונקציה הבאה בשרשור של הרואטר
    next()
  }
  catch(err){
    return res.status(401).json({err_msg:"Token invalid or expired"})
  }
}