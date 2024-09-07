async function CreatePassword(event) {
            event.preventDefault();  // Prevent form submission and page reload
            debugger;
            var url = 'https://localhost:7000/api/Users_Bassam/CreatePassword';
            var data = JSON.parse(localStorage.getItem("user"));
            if (!data || !data.displayName) {
                alert('User data is missing. Please log in again.');
                return;
            }
            

            var form = document.getElementById("passwordForm");
            var formData = new FormData();
            var password1 = document.getElementById("password1").value;
            var password2 = document.getElementById("password2").value;
            formData.append('displayName', data.displayName);
            if (password1 !== password2) {
                alert("Passwords do not match");
                return;
            }
        
            formData.append('Password', password1);
 

            try {
                var response = await fetch(url, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert('Password changed successfully');
                } else {
                    const errorData = await response.json();
                    alert('Error: ' + (errorData.message || 'Password change failed'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while changing the password. Please try again.');
            }
        }