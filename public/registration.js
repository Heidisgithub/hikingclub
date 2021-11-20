 async function submitRegistration(hike_uuid) {

     const name = document.getElementById('name').value
     const email = document.getElementById('email').value
     const message = document.getElementById('message').value
     const checkbox = document.getElementById('privacyPolicyCheckbox').checked

     const registrationData = {
         name,
         email,
         message
     }

     console.log(checkbox)
     if (!name || !email) {
         document.getElementById('error').innerText = "Please insert a name and an email"
         return;
     }

     if (checkbox) {

         const url = `/publicapi/hikes/${hike_uuid}/registration`;
         let jsonResponse
         const postingRegistration = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(registrationData)
         };
         const response = await fetch(url, postingRegistration)
         if (response.ok) {
             console.log(response)
             document.getElementById('registrationForm').innerHTML = "<div class='registrationFormSuccess'>Thank you for participating in this hike!</div>"
         }
     } else {
         document.getElementById('error').innerText = "Please agree to our data protection terms"
     }
     console.log(registrationData)
 }