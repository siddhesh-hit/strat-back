const express = require("express");
const cors = require("cors");

// const GoogleSuccess = async (response) => {
//     try {
//       const res = await axios.post('http://localhost:5000/auth/Oauth',
//       { credential: response.tokenId })
//         console.log(res)
//     } catch (error) {
//       console.log(error)
//     }
//   };

// GoogleRegister = async (req, res) => {
//     try {
//         const { token } = req.body
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: GOOGLE_CLIENT_ID,
//         });
//         const profile = ticket.getPayload()
//         const UserExists = await User.findOne({ email: profile.email })
//         if (UserExists) {
//             // Create token
//             const token = jwt.sign(
//                 { user_id: UserExists._id, email: UserExists.email },
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn: "2h",
//                 }
//             );

//             const tokenuser = {
//                 firstName: UserExists.firstName,
//                 lastName: UserExists.lastName,
//                 picture: UserExists.picture,
//                 email: UserExists.email,
//                 accessToken: token
//             }

//             return res.status(200).send(tokenuser)
//         } else {
//             const user = await User.create({
//                 firstName: profile.given_name,
//                 lastName: profile.family_name,
//                 picture: profile.picture,
//                 email: profile.email,
//             })
//             // Create token
//             const token = jwt.sign(
//                 { user_id: user._id, email: user.email },
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn: "2h",
//                 }
//             );

//               const tokenuser = {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 picture: user.picture,
//                 email: user.email,
//                 accessToken: token
//             }
//             return res.status(200).send(tokenuser)
//         }
//     } catch (error) {
//         return { error: "Invalid user detected. Please try again" };
//     }
// }
