async function Register(event) {
    event.preventDefault();

    var form = document.getElementById("form");
    var formData = new FormData(form);


    var password = formData.get("Password");
    var repeatPassword = formData.get("repeatpassword");


    if (password !== repeatPassword) {
        alert('Passwords do not match. Please make sure both passwords are the same.');
        return; 
    }

    var url = 'https://localhost:7000/api/Users_Bassam/register';

    try {
        var response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert('Registered successfully');
            window.location.href = "login&register.html";
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.message || 'Registration failed'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering. Please try again.');
    }
}



async function login(event) {
    event.preventDefault();
    var url = 'https://localhost:7000/api/Users_Bassam/login';
    var form = document.getElementById("form1");
    var formData = new FormData(form);

    try {
        var response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            var result = await response.json();
            localStorage.setItem('jwtToken', result.token);
            alert('Logged in successfully');
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.message || 'Email or password is incorrect'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again.');
    }
}

