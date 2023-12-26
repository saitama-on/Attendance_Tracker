import { initializeApp }from "firebase/app";
import {getAuth,onAuthStateChanged,signInWithPopup,  GoogleAuthProvider , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "firebase/auth";
import { getDatabase , ref ,push , query,limitToLast, set, get , onValue , onChildChanged ,onChildAdded, update} from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyAVwiC31XZ4T0qsN5F8Ar8Z3ROCGfQtbz4",
    authDomain: "attendence-afddf.firebaseapp.com",
    databaseURL: "https://attendence-afddf-default-rtdb.firebaseio.com",
    projectId: "attendence-afddf",
    storageBucket: "attendence-afddf.appspot.com",
    messagingSenderId: "805341651681",
    appId: "1:805341651681:web:bac3307f2400629bc88da0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const login_btn = document.getElementById("login");
const logout_btn = document.getElementById("logout");
const div_sub1 = document.getElementById("div_sub1");
const div_sub2 = document.getElementById("div_sub2");

login_btn.style.display = "none";
logout_btn.style.display = "none";
div_sub1.style.display = "none";
div_sub2.style.display = "none";


function user_loggedout(){
login_btn.style.display = "block";
logout_btn.style.display = "none";
div_sub1.style.display = "none";
div_sub2.style.display = "none";
}

function user_loggedin(){

    logout_btn.style.display = "block";
    login_btn.style.display = "none";
    div_sub1.style.display = "block";
    div_sub2.style.display ="block";
   // let db = getDatabase(app);
   // const new_user = ref(db , "/users"+ "/" + auth.currentUser.displayName);

    // add_btn.addEventListener("click", ()=>{
    //     push(new_user , add_name.value).then((promise)=>{
    //         console.log(promise);
    //     })
    //     add_name.value ="";
    // })
   
    console.log(auth.currentUser.displayName);
}
    

onAuthStateChanged(auth , (user)=>{
    if(user){
        console.log(user.displayName);
        console.log("signined");
        
        user_loggedin();


        const db = getDatabase(app);
        const new_user = ref(db , "users/" + user.displayName);


        get(new_user).then((s)=>{

            const a = s.val().sub1;
            document.getElementById("sub1").textContent = a;
            document.getElementById("sub2").textContent = s.val().sub2;
            console.log(s.val());
        }
        )

        
    

    }
    else{
        console.log("please sigin");
        user_loggedout();
        //display_login_page();

    }
})



let user1;

login_btn.addEventListener("click" , ()=>{
    console.log('clicked');

    signInWithPopup(auth , provider).then
    ((user)=>{
     console.log(user.user.displayName);
 
     const db = getDatabase(app);
     const new_user = ref(db , "users/" + user.user.displayName);


     get(new_user).then((snapshot)=>{
        console.log(snapshot.val());

        if(snapshot.val() == null ){
            set(new_user, {
                first_login:"Y",
                sub1:0,
                sub2:0
             }).then(()=>{
               // npx webpack --config webpack.config.js
                const a = snapshot.val().sub1;
                document.getElementById("sub1").textContent = a;
                document.getElementById("sub2").textContent = snapshot.val().sub2;
             })

            
        }
        else{
            const a = snapshot.val().sub1;
            document.getElementById("sub1").textContent = a;
            document.getElementById("sub2").textContent = snapshot.val().sub2;
        }

         
     })
    //  set(new_user,{
    //     first_login:"YES"
    //  })

    //  get(new_user).then((snapshot)=>{
    //     console.log(snapshot);
    //  }).catch((e)=>{
    //     new_user.set({
    //         sub1:0,
    //         sub2:0
    //     })
    //  })
       

    })
    .catch((error)=>{
     console.log(error);
    })
})

logout_btn.addEventListener("click" , ()=>{

    signOut(auth).then(()=>{
        console.log("signout");
    })

    console.log(user1);
});

console.log(auth.currentUser);

