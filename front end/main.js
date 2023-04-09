//console.log('Hello World!');
// console.log(document.getElementsByName('field1'));

let loginForm = document.getElementById("loginForm");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http:localhost:4000/user/get-users")
        .then((resp) => {
            console.log(resp)
            for (let i =0; i<resp.data.allUsers.length; i++){
                addUser(resp.data.allUsers[i])
            }
        })
        .catch((err) => console.log(err))
})

function save(event) {
    
    event.preventDefault();

    firstName = event.target.field1.value;
    lastName = event.target.field2.value;

    fullName = firstName + ' ' + lastName;
    //console.log(fullName);
    eMail = event.target.field3.value;
    var x = document.getElementById("subject");
    var i = x.selectedIndex;
    subject = event.target.field4.value = x.options[i].text;

    let user_details = {
        name: fullName,
        email_id : eMail,
        subject_opted : subject
    };

    user_details_serialized = JSON.stringify(user_details);
    //console.log(user_details_serialized);
    axios.post("http://localhost:4000/user/add-user", user_details)
    .then((response) => {
        console.log(response);
        addUser(response.data.newUserDetail);
    })
    .catch((err) => {
        console.log(err);
    })
    //localStorage.setItem(eMail,user_details_serialized);
    //addUser(user_details);
  }

  function addUser(user_details) {
    
    const parentElem = document.getElementById('users');
    const childElem = document.createElement('li');
    childElem.textContent = user_details.name + ' - ' + user_details.email + ' - ' + user_details.phone + ' - ' + user_details.subject;

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button'
    deleteBtn.value = 'Delete'
    deleteBtn.onclick = () => {
        //localStorage.removeItem(user_details.email_id);
        
        axios.delete(`http://localhost:4000/user/delete-user/${user_details.id}`)
            .then(() => {
                parentElem.removeChild(childElem);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    const editBtn = document.createElement('input');
    editBtn.type = 'button'
    editBtn.value = 'Edit'
    editBtn.onclick = () => {
        
        //localStorage.removeItem(user_details.email_id);
        //parentElem.removeChild(childElem);
        axios.delete(`http://localhost:4000/user/delete-user/${user_details.id}`)
            .then((response) => {
                document.getElementById('firstName').value = user_details.name.split(' ')[0];
                document.getElementById('lastName').value = user_details.name.split(' ')[1];
                document.getElementById('eMail').value = user_details.email_id;
                document.getElementById('subject').value = user_details.subject_opted;
                parentElem.removeChild(childElem);
                axios.post("http://localhost:4000/user/add-user", user_details)
                    .then((response) => {
                        console.log(response);
                        addUser(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    childElem.appendChild(editBtn);
    childElem.appendChild(deleteBtn);
    parentElem.appendChild(childElem);
  }



  

