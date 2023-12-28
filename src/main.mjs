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
const db = getDatabase(app);
//const new_user = ref(db , "users/" + auth.currentUser.displayName );
const provider = new GoogleAuthProvider();
const login_btn = document.getElementById("login");
const logout_btn = document.getElementById("logout");
const div_sub1 = document.getElementById("div_sub1");
const div_sub2 = document.getElementById("div_sub2");


login_btn.style.display = "none";
logout_btn.style.display = "none";
$(".sub").hide();
$("#edit_btn").hide();
$("#edit_done_btn").hide();
$("#cancel").hide();
$(".inc").hide()
$(".dec").hide()
let before_edit_sub1 = 0;
let before_edit_sub2 =0;
let before_edit_sub3 =0;
let before_edit_sub4 = 0;
let before_edit_sub5 =0;
let before_edit_sub6 =0;
let before_edit_sub7 = 0;
let before_edit_sub8 =0;
let before_edit_sub9 =0;
let before_edit_sub10 = 0;
let before_edit_sub11 =0;





$(window).on('load' , ()=>{
    update(ref(db , "users/" + auth.currentUser.displayName) ,{
        sub1: before_edit_sub1,
        sub2: before_edit_sub2,
        sub3: before_edit_sub3,
        sub4: before_edit_sub4,
        sub5: before_edit_sub5,
        sub6: before_edit_sub6,
        sub7: before_edit_sub7,
        sub8: before_edit_sub8,
        sub9: before_edit_sub9,
        sub10: before_edit_sub10,
        sub11: before_edit_sub11
    } )
})
$("#cancel").click(()=>{
    update(ref(db , "users/" + auth.currentUser.displayName) ,{
        sub1: before_edit_sub1,
        sub2: before_edit_sub2,
        sub3: before_edit_sub3,
        sub4: before_edit_sub4,
        sub5: before_edit_sub5,
        sub6: before_edit_sub6,
        sub7: before_edit_sub7,
        sub8: before_edit_sub8,
        sub9: before_edit_sub9,
        sub10: before_edit_sub10,
        sub11: before_edit_sub11
    } )
    $("#cancel").hide();
    $("#edit_done_btn").hide();
    $("#edit_btn").prop("disabled" ,false);
    hide_inc_dec();
})
// increment decrement functions
function increment(some){
    const new_ref = ref(db , "users/" + auth.currentUser.displayName);
    let new_var;
    onValue(new_ref ,(snapshot)=> {
        new_var = snapshot.val()[some]
    })

    new_var = new_var + 1;
    update(new_ref , {
        [some] : new_var
    })


}
function decrement(some){
    const new_ref = ref(db , "users/" + auth.currentUser.displayName);
    let new_var;
    onValue(new_ref ,(snapshot)=> {
        new_var = snapshot.val()[some]
    })

    new_var = new_var - 1;
    if(new_var <0){
        new_var=0;
    }
    update(new_ref , {
        [some] : new_var
    })
 
}
//increment counters
$("#increment_sub1").click(()=>{
    increment("sub1")
})
$("#increment_sub2").click(()=>{
    increment("sub2")
})
$("#increment_sub3").click(()=>{
    increment("sub3")
})
$("#increment_sub4").click(()=>{
    increment("sub4")
})
$("#increment_sub5").click(()=>{
    increment("sub5")
})
$("#increment_sub6").click(()=>{
    increment("sub6")
})
$("#increment_sub7").click(()=>{
    increment("sub7")
})
$("#increment_sub8").click(()=>{
    increment("sub8")
})
$("#increment_sub9").click(()=>{
    increment("sub9")
})
$("#increment_sub10").click(()=>{
    increment("sub10")
})
$("#increment_sub11").click(()=>{
    increment("sub11")
})
// decrement counters
$("#decrement_sub1").click(()=>{
   decrement("sub1");
})
$("#decrement_sub2").click(()=>{
    decrement("sub2");
 })
 $("#decrement_sub3").click(()=>{
    decrement("sub3");
 })
 $("#decrement_sub4").click(()=>{
    decrement("sub4");
 })
 $("#decrement_sub5").click(()=>{
    decrement("sub5");
 })
 $("#decrement_sub6").click(()=>{
    decrement("sub6");
 })
 $("#decrement_sub7").click(()=>{
    decrement("sub7");
 })
 $("#decrement_sub8").click(()=>{
    decrement("sub8");
 })
 $("#decrement_sub9").click(()=>{
    decrement("sub9");
 })
 $("#decrement_sub10").click(()=>{
    decrement("sub10");
 })
 $("#decrement_sub11").click(()=>{
    decrement("sub11");
 })
 

 
 
 function show_inc_dec(){
     $(".inc").show()
     $(".dec").show()   
    }
    
    function hide_inc_dec(){
        $(".inc").hide();
        $(".dec").hide();
    }
    
    
    
    $("#edit_btn").click(()=>{
        $("#edit_done_btn").show();
        $("#cancel").show();
        $("#edit_btn").prop("disabled",true);
        show_inc_dec();
        
        get(ref(db , "users/"+auth.currentUser.displayName)).then((snapshot)=>{
            before_edit_sub1 = snapshot.val().sub1;
            before_edit_sub2 = snapshot.val().sub2;
            before_edit_sub3 = snapshot.val().sub3;
            before_edit_sub4 = snapshot.val().sub4;
            before_edit_sub5 = snapshot.val().sub5;
            before_edit_sub6 = snapshot.val().sub6;
            before_edit_sub7 = snapshot.val().sub7;
            before_edit_sub8 = snapshot.val().sub8;
            before_edit_sub9 = snapshot.val().sub9;
            before_edit_sub10 = snapshot.val().sub10;
            before_edit_sub11 = snapshot.val().sub11;
            
        })
        
    })
    
    $("#edit_done_btn").click(()=>{
        
        $("#edit_done_btn").hide();
        $("#edit_btn").prop("disabled",false);
        $("#cancel").hide();
        hide_inc_dec();
    })
    
    function user_loggedin(){
        
        logout_btn.style.display = "block";
        login_btn.style.display = "none";
        $(".sub").show();
        $("#edit_btn").show();
        $("#logo").attr('src' , auth.currentUser.photoURL);
        $(".navbar-brand").text(auth.currentUser.displayName);
        //console.log("hi", auth.currentUser.displayName)
        
        
        console.log(auth.currentUser);
    }
    
    function user_loggedout(){
    login_btn.style.display = "block";
    logout_btn.style.display = "none";
    $(".sub").hide();
    $("#logo").hide();
    $(".a").hide();
    $("#edit_btn").hide();
    $("#logo").attr('src' , null);
    $(".navbar-brand").text("User name");
    
    }

onAuthStateChanged(auth , (user)=>{
    if(user){
        console.log(user.displayName);
        console.log("signined");
        
        user_loggedin();
        console.log(auth.currentUser.displayName);


        const db = getDatabase(app);
        const new_user = ref(db , "users/" + user.displayName);


        onValue(new_user, (s)=>{

            const a = s.val().sub1;
            document.getElementById("sub1").textContent = a;
            document.getElementById("sub2").textContent = s.val().sub2;
            document.getElementById("sub3").textContent = s.val().sub3;
            document.getElementById("sub4").textContent = s.val().sub4;
            document.getElementById("sub5").textContent = s.val().sub5;
            document.getElementById("sub6").textContent = s.val().sub6;
            document.getElementById("sub7").textContent = s.val().sub7;
            document.getElementById("sub8").textContent = s.val().sub8;
            document.getElementById("sub9").textContent = s.val().sub9;
            document.getElementById("sub10").textContent = s.val().sub10;
            document.getElementById("sub11").textContent = s.val().sub11;
            
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
                sub2:0,
                sub3:0,
                sub4:0,
                sub5:0,
                sub6:0,
                sub7:0,
                sub8:0,
                sub9:0,
                sub10:0,
                sub11:0
             }).then(()=>{
               // npx webpack --config webpack.config.js
                const a = snapshot.val().sub1;
                document.getElementById("sub1").textContent = a;
                document.getElementById("sub2").textContent = snapshot.val().sub2;
                document.getElementById("sub3").textContent = snapshot.val().sub3;
                document.getElementById("sub4").textContent = snapshot.val().sub4;
                document.getElementById("sub5").textContent = snapshot.val().sub5;
                document.getElementById("sub6").textContent = snapshot.val().sub6;
                document.getElementById("sub7").textContent = snapshot.val().sub7;
                document.getElementById("sub8").textContent = snapshot.val().sub8;
                document.getElementById("sub9").textContent = snapshot.val().sub9;
                document.getElementById("sub10").textContent = snapshot.val().sub10;
                document.getElementById("sub11").textContent = snapshot.val().sub11;
             })

            
        }

         
     })

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
    user_loggedout();
});

console.log(auth.currentUser);

