import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, push,remove, query, limitToLast, set, get, onValue, onChildChanged, onChildAdded, update } from 'firebase/database';


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
//const login_btn = document.getElementById("login");
const logout_btn = document.getElementById("logout");
//const div_sub1 = document.getElementById("div_sub1");
//const div_sub2 = document.getElementById("div_sub2");
//let sub1_date_data = document.getElementById("sub1_data");



//login_btn.style.display = "none";
logout_btn.style.display = "none";
$(".sub").hide();
$("#edit_btn").hide();
$("#edit_done_btn").hide();
$("#cancel").hide();
$("#date_fields_sub1").hide();
$("#date_fields_sub2").hide();
$("#date_fields_sub3").hide();
$("#date_fields_sub4").hide();
$("#date_fields_sub5").hide();
$("#date_fields_sub6").hide();
$("#date_fields_sub7").hide();
$("#date_fields_sub8").hide();
$("#date_fields_sub9").hide();
$("#date_fields_sub10").hide();
$("#date_fields_sub11").hide();
$(".navbar").hide();
$("#login_container").hide();


//$(".inc").hide()
//$(".dec").hide()

// Set default date to todays date 
let full_date = new Date();
let month = parseInt(full_date.getMonth() + 1).toString();
if (month.length != 2) {
    month = '0' + month;
}
let date = full_date.getDate().toString();
if (date.length != 2) {
    date = '0' + date;
}
var date_today = full_date.getFullYear() + "-" + month + "-" + date;
$(".date_input").val(date_today);


// increment function
function increment(some) {

    const new_ref = ref(db, "users/" + auth.currentUser.displayName);
    let new_var;
    onValue(new_ref, (snapshot) => {
        new_var = snapshot.val()[some]
    })

    new_var = new_var + 1;
    update(new_ref, {
        [some]: new_var
    })


}
// decrement function
function decrement(some) {

    const new_ref = ref(db, "users/" + auth.currentUser.displayName);
    let new_var;
    onValue(new_ref, (snapshot) => {
        new_var = snapshot.val()[some]
    })

    new_var = new_var - 1;
    update(new_ref, {
        [some]: new_var
    })


}





// load date data to respective div

function load_date_data(some) {

    $("#"+ some + "_data").empty()

    get(ref(db, "users/" + auth.currentUser.displayName + "/date_data_" + some)).
        then((snapshot) => {
            snapshot.forEach((promise) => {
                const new_element = document.createElement("span");
                const del_button =  document.createElement("button");
                del_button.setAttribute("class" , "delete_button");
                del_button.setAttribute("id" , `${some}_del`);
                del_button.setAttribute("value" , promise.key);
                del_button.setAttribute("name" , some);
                del_button.textContent = "DEL";
                //del_button.textContent = "Del";
                //const del = document.getElementById(`${some}_del`);
                
                new_element.textContent = promise.val();
                const cont = document.getElementById(`${some}_data`)
                cont.appendChild(new_element);
                cont.appendChild(del_button);
                cont.appendChild(document.createElement("br"));
                on_click_del();
                


                //
                
            })
        })

}

// count the missed 

function count(some){

    let count_miss =0 ;
    
    get(ref(db , "users/"+ auth.currentUser.displayName + "/date_data_" + some)).then((snapshot)=>{
        snapshot.forEach((promise)=>{
            count_miss++;
           // console.log(count_miss)
        })
        update(ref(db , "users/" + auth.currentUser.displayName) ,{
            [some] : count_miss
        })
    })

    // console.log(count_miss);

    // update(ref(db , "users/" + auth.currentUser.displayName) ,{
    //     [some] : count_miss
    // })

    console.log(count_miss);
}

// delete function
function on_click_del(){
    var items = document.getElementsByClassName("delete_button");


                for(var i = items.length; i--;) {
                let currentItem = items[i];
                let new1 = "";
                currentItem.onclick = function(e) {
                    new1 = this.value;
                    //console.log(new1);
                    //document.getElementById(this.id).setAttribute("disabled", true);
                    $(".delete_button").attr("disabled" ,true);/*  */
                    update(ref(db , "users/" + auth.currentUser.displayName + "/date_data_" + this.name  ) ,{
                        [new1]:null
                    }).then(()=>{
                        
                        load_date_data(this.name);
                        decrement(this.name);
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                
                };
}
}


// click functions when ok is clicked
$("#ok_date_sub1").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub1");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub1").val()).then((promise) => {
       // console.log(promise);
    });
    //add_latest("sub1");
    $("#sub1_data").empty();
    load_date_data("sub1");
    //increment("sub1");
    count("sub1");
    $("#date_fields_sub1").hide();
    $("#increment_sub1").toggle();
})
$("#ok_date_sub2").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub2");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub2").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub2");
    $("#sub2_data").empty();
    load_date_data("sub2");
    //increment("sub2");
    count("sub2");
    $("#date_fields_sub2").hide();
    $("#increment_sub2").toggle();
})
$("#ok_date_sub3").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub3");
   // console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub3").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub3");
    $("#sub3_data").empty();
    load_date_data("sub3");
    //increment("sub3");
    count("sub3");
    $("#date_fields_sub3").hide();
    $("#increment_sub3").toggle();
})
$("#ok_date_sub4").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub4");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub4").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub4");
    $("#sub4_data").empty();
    load_date_data("sub4");
    count("sub4");
    //increment("sub4");
    $("#date_fields_sub4").hide();
    $("#increment_sub4").toggle();
})
$("#ok_date_sub5").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub5");
    console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub5").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub5");
    $("#sub5_data").empty();
    load_date_data("sub5");
    //increment("sub5");
    count("sub5");
    $("#date_fields_sub5").hide();
    $("#increment_sub5").toggle();
})
$("#ok_date_sub6").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub6");
    console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub6").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub6");
    $("#sub6_data").empty();
    load_date_data("sub6");
    //increment("sub6");
    count("sub6");
    $("#date_fields_sub6").hide();
    $("#increment_sub6").toggle();
})
$("#ok_date_sub7").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub7");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub7").val()).then((promise) => {
        //console.log(promise);
    });
    //add_latest("sub7");
    $("#sub7_data").empty();
    load_date_data("sub7");
    //increment("sub7");
    count("sub7")
    $("#date_fields_sub7").hide();
    $("#increment_sub7").toggle();
})
$("#ok_date_sub8").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub8");
   // console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub8").val()).then((promise) => {
       // console.log(promise);
    });
    //add_latest("sub8");
    $("#sub8_data").empty();
    load_date_data("sub8");
    //increment("sub8");
    count("sub8");
    $("#date_fields_sub8").hide();
    $("#increment_sub8").toggle();
})
$("#ok_date_sub9").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub9");
   // console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub9").val()).then((promise) => {
      //  console.log(promise);
    });
    //add_latest("sub9");
    $("#sub9_data").empty();
    load_date_data("sub9");
    //increment("sub9");
    count("sub9");
    $("#date_fields_sub9").hide();
    $("#increment_sub9").toggle();
})
$("#ok_date_sub10").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub10");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub10").val()).then((promise) => {
      //  console.log(promise);
    });
    //add_latest("sub10");
    $("#sub10_data").empty();
    load_date_data("sub10");
    //increment("sub10");
    count("sub10");
    $("#date_fields_sub10").hide();
    $("#increment_sub10").toggle();
})
$("#ok_date_sub11").click(() => {
    const new_ref = ref(db, "users/" + auth.currentUser.displayName + "/date_data_sub11");
    //console.log(auth.currentUser.displayName);
    push(new_ref, "You missed 1 class on : " + $("#date_input_sub11").val()).then((promise) => {
      //  console.log(promise);
    });
    //add_latest("sub11");
    $("#sub11_data").empty();
    load_date_data("sub11");
    //increment("sub11");
    count("sub11");
    $("#date_fields_sub11").hide();
    $("#increment_sub11").toggle();
})




//increment counters

$("#increment_sub1").click(() => {
    //increment("sub1");
    $("#increment_sub1").toggle();
    $("#date_fields_sub1").show();
})
$("#increment_sub2").click(() => {
    //increment("sub2")
    $("#date_fields_sub2").show();
    $("#increment_sub2").toggle();

})
$("#increment_sub3").click(() => {
    //increment("sub3")
    $("#date_fields_sub3").show();
    $("#increment_sub3").toggle();

})
$("#increment_sub4").click(() => {
    //increment("sub4")
    $("#date_fields_sub4").show();
    $("#increment_sub4").toggle();
})
$("#increment_sub5").click(() => {
    //increment("sub5")
    $("#date_fields_sub5").show();
    $("#increment_sub5").toggle();

})
$("#increment_sub6").click(() => {
    //increment("sub1");
    $("#date_fields_sub6").show();
    $("#increment_sub6").toggle();
})
$("#increment_sub7").click(() => {
    //increment("sub2")
    $("#date_fields_sub7").show();
    $("#increment_sub7").toggle();

})
$("#increment_sub8").click(() => {
    //increment("sub3")
    $("#date_fields_sub8").show();
    $("#increment_sub8").toggle();

})
$("#increment_sub9").click(() => {
    //increment("sub4")
    $("#date_fields_sub9").show();
    $("#increment_sub9").toggle();
})
$("#increment_sub10").click(() => {
    //increment("sub5")
    $("#date_fields_sub10").show();
    $("#increment_sub10").toggle();

})
$("#increment_sub11").click(() => {
    //increment("sub5")
    $("#date_fields_sub11").show();
    $("#increment_sub11").toggle();

})





function user_loggedin() {

    logout_btn.style.display = "block";
    //login_btn.style.display = "none";
    $(".sub").show();
    //$("#edit_btn").show();
    $(".navbar").show();
    $(".login_container").hide();
    $("#logo").attr('src', auth.currentUser.photoURL);
    $(".navbar-brand").text(auth.currentUser.displayName);
    $("#sub1_data").empty();
    $("#sub2_data").empty();
    $("#sub3_data").empty();
    $("#sub4_data").empty();
    $("#sub5_data").empty();
    $("#sub6_data").empty();
    $("#sub7_data").empty();
    $("#sub8_data").empty();
    $("#sub9_data").empty();
    $("#sub10_data").empty();
    $("#sub11_data").empty();
    load_date_data("sub1");
    load_date_data("sub2");
    load_date_data("sub3");
    load_date_data("sub4");
    load_date_data("sub5");
    load_date_data("sub6");
    load_date_data("sub7");
    load_date_data("sub8");
    load_date_data("sub9");
    load_date_data("sub10");
    load_date_data("sub11");
    
    //console.log("hi", auth.currentUser.displayName)


    //console.log(auth.currentUser);
    //console.log(localStorage);
}

function user_loggedout() {
    //login_btn.style.display = "block";
    logout_btn.style.display = "none";
    $(".sub").hide();
    $("#logo").hide();
    $(".a").hide();
    //$("#edit_btn").hide();
    //$("#logo").attr('src' , null);
    //$(".navbar-brand").text("User name");
    $(".navbar").hide();
    $(".login_container").show();
    


}

onAuthStateChanged(auth, (user) => {

   
    if (user) {
        user_loggedin();

        const db = getDatabase(app);
        const new_user = ref(db, "users/" + user.displayName);


        onValue(new_user, (s) => {

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

            // console.log(s.val());
        }
        )

    }
    else {
        //console.log("please sigin");
        user_loggedout();
        //display_login_page();

    }
})


$("#login").click(() => {
    //console.log('clicked');

    signInWithPopup(auth, provider).then
        ((user) => {
            //console.log(user.user.displayName);

            const db = getDatabase(app);
            const new_user = ref(db, "users/" + user.user.displayName);


            get(new_user).then((snapshot) => {
                //console.log(snapshot.val());

                if (snapshot.val() == null) {
                    set(new_user, {
                        first_login: "Y",
                        sub1: 0,
                        sub2: 0,
                        sub3: 0,
                        sub4: 0,
                        sub5: 0,
                        sub6: 0,
                        sub7: 0,
                        sub8: 0,
                        sub9: 0,
                        sub10: 0,
                        sub11: 0
                    }).then(() => {
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
        .catch((error) => {
            console.log(error);
        })
})

logout_btn.addEventListener("click", () => {

    signOut(auth).then(() => {
        console.log("signout");
    })

    // console.log(user1);
    user_loggedout();
});

//console.log(auth.currentUser);