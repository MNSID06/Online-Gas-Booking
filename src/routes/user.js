const express = require("express");
const router = new express.Router();
const userController = require('../controller/userController')


router.post('/signup', userController.signup);

router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);


router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.patch('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

// router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);



module.exports = router;













// router.post('/user/register', async (req, res) => {
//    const user = await  User.findOne({email:req.body.email})
//         if (user) {
//           return res.status(400).json({ email: "Email already exists" });
//         } else {
//           const newUser = new User(req.body);
        
//     // const user = new User(req.body)
//     try {
//         await newUser.save()
//         const token = newUser.generateAuthToken()
//         res.status(201).send({ newUser, token })

//     } catch (error) {
//         res.status(400).send(error)
//     }
// }
// })


// router.post("/user/login", async (req, res, next) => {
  
//   const nuser = await User.findOne({ email:req.body.email });
//   if (!nuser) {
//     return res.status(400).json({ email: "Email does not exists" });
//   } else {
//     // const newUser = new User(req.body);
  

//     try {
//       const user = await User.findByCredentials(
//         req.body.email,
//         req.body.password,
//       );
      
      
//   const token = await user.generateAuthToken();
//   res.status(201).send({ user, token });
//       //authentication with token
     
//     } catch (e) {
//       res.status(400).send();
//     }
// }
//   });

//   router.get('/users', allowIfLoggedin, grantAccess('readAny', 'profile'),  async(req, res) => {
//     // res.send(req.user)
//     try {
//              const users =  await User.find({})
//       res.send(users)
//           } catch (e) {
//               res.status(500).send(e)
//           }
//   });

//   router.get('/user/:id', allowIfLoggedin, async (req, res) => {
//     const _id = req.params.id
//     try {
//       const user = await User.findById(_id);
//       if (!user) {
//         return res.status(404).send()
//       } 
//         res.send(user)
//       }
   
//      catch (e) {
//     res.status(500).send(e);
//     };
//   });

//   router.delete('/users/:id', async (req, res, next) => {
  
//     try {
//       const userId = req.params.userId;
//   const user = await User.findByIdAndDelete(userId);
     
//     res.status(200).send({user, message: 'user has been deleted'});
//   // await req.user.remove();
//   // res.send(req.user)
// } catch (error) {
//   next(error)
//   // res.status(500).send(error)
// }
//   });
  

