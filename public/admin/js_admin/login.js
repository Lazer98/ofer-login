import {API_URL,doApiMethod} from "../services/apiService.js"
let $ = document.querySelector.bind(document);


window.onload = () => {
  declareEvents();
}

const declareEvents = () => {
  $("#id_form").addEventListener("submit", (e) => {
    // למנוע ברירת מחדל של שיגור טופס
    e.preventDefault();
    // console.log("from work");
    let bodyData = {
      email: $("#id_email").value,
      password: $("#id_pass").value
    }

    if (!bodyData.email.includes("@") || !bodyData.email.includes(".") || bodyData.email.length < 5) {
      return alert("Enter valid email!");
    }
    if (bodyData.password.length < 3) {
      return alert("Enter valid password");
    }
    console.log(bodyData)
    doApi(bodyData)

  })
}


const doApi = async (_bodyData) => {
  let url = API_URL+"/users/login"
  // בקשת פטץ' של פוסט
  try {
    // let resp = await fetch(url , {
    //   method:"POST",
    //   body:JSON.stringify(_bodyData),
    //   headers: { 'content-type': "application/json" }
    // })
    // let data = await resp.json();
    let data = await doApiMethod(url,"POST",_bodyData);
    console.log(data)
    // בדיקה שהצליח לעשות לוגאין
    if(data.token){
      // שומר את הטוקן שישמש בהמשך לבקשות
      localStorage.setItem("tok_cakes", data.token);
      // מעביר לעמוד של רשימת העוגות
      window.location.href = "cakesList.html"
    }
    else{
      alert("Password or email is wrong")
    }
  }
  catch(err){
    alert("There problem in server try again later..")
  }
}

