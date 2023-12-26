const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
const cors = require('cors')
const {initializeApp} = require("firebase/app");
const  {getAuth,signInWithEmailAndPassword} = require('firebase/auth')
const  {createUserWithEmailAndPassword, GoogleAuthProvider , signInWithRedirect, signInWithPopup} = require('firebase/auth')

const firebaseConfig = {
  apiKey: "AIzaSyAVwiC31XZ4T0qsN5F8Ar8Z3ROCGfQtbz4",
  authDomain: "attendence-afddf.firebaseapp.com",
  projectId: "attendence-afddf",
  storageBucket: "attendence-afddf.appspot.com",
  messagingSenderId: "805341651681",
  appId: "1:805341651681:web:bac3307f2400629bc88da0"
};



const firebase_app = initializeApp(firebaseConfig);
let auth = getAuth(firebase_app);
//const google_provider = new GoogleAuthProvider();


app.use(cors())

app.use(express.json());
app.use(express.static('public'));

app.get('/' , (req,res)=>{

    res.redirect('signup.html');
})

app.post('/login' ,(req,res)=>{

    let email = req.body.email;
    let password = req.body.password;

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        let user = userCredential.user;
        console.log(user);
        res.send("home.html")
    })


   
})
app.get('/home' , (req,res)=>{

    res.redirect('signup.html');
})


app.post('/signup', (req,res)=>{

    let data = req.body;
    console.log(data);
    //res.send(data);

    let email = req.body.email;
    let password = req.body.password;

    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
    const user = userCredential.user;
    console.log("success");
    res.send("http://localhost:3000/home");

    })
    .catch((error) => {
        //res.status(500).send(error.message);
    // ..
  });
})


app.listen(port,()=>{
    console.log("listining on port" + port);
});