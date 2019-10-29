// Get the modal
let modal1 = document.getElementById('id01');
let modal2 = document.getElementById('id02');
let modal3 = document.getElementById('id03');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
    if (event.target == modal2) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
    if (event.target == modal3) {
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
}

let alinktosignup = document.getElementById('signupbut');
let alinktologin = document.getElementById('loginbut');

alinktologin.onclick = function(event) {
    if (window.matchMedia("(max-width: 500px)").matches) {
        /* The viewport is less than, or equal to, 700 pixels wide */
        //alert('Hi');
        //return res.render('Login');
        window.location.href = "/Login";
    }
    else
    {
        document.getElementById('id03').style.display='block';
    }
}

alinktosignup.onclick = function(event) {
    if (window.matchMedia("(max-width: 500px)").matches) {
        /* The viewport is less than, or equal to, 700 pixels wide */
        //alert('Hi');
        //return res.render('Login');
        window.location.href = "/SignUp";
    }
    else
    {
        document.getElementById('id01').style.display='block';
    }
}