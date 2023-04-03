const express=require('express')
const userController=require('../controller/userController/register')
const userController=require('../controller/userController/updateUser')
const tweetController=require('../controller/tweetController/tweet')
const followController=require('../controller/followController/follow')
const auth=require('../authentication/auth')

const router=express.Router()


router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forget_password)
router.put('/updateUser',auth.authentication,auth.authorization,userController.updateUser)
router.post('/createTweet',auth.authentication,tweetController.createTweet)
router.delete('/deleteTweet',auth.authentication,auth.authorization,tweetController.deleteTweet)
router.put('/likeTweet',auth.authentication,auth.authorization,tweetController.likeTweet)
router.get('/displayTweets',tweetController.displayTweet)
router.get('/displayMyTweets',tweetController.displayMyTweets)
router.post('/follow',auth.authentication,followController.follow)
router.post('/getfollowers',followController.displayFollowers)


