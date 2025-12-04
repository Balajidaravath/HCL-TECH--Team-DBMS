async function registerUser(event) {
    event.preventDefault();

    const fullName = document.querySelector("input[placeholder='Full Name']").value;
    const email = document.querySelector("input[placeholder='Email']").value;
    const phone = document.querySelector("input[placeholder='Phone Number']").value;
    const username = document.querySelector("input[placeholder='Username']").value;
    const password = document.querySelector("input[placeholder='Password']").value;
    const confirmPassword = document.querySelector("input[placeholder='Confirm Password']").value;
    
    const role = document.querySelector("input[name='role']:checked").value;

    const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, username, password, confirmPassword, role })
    });

    const result = await response.json();
    alert(result.message);

    if (response.status === 201) {
        window.location.href = "index.html";
    }
}
