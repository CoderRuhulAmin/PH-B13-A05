const users = [
    {
        id: 1,
        name: "Ruhul Amin",
        username: "admin",
        password: "admin123"
    }
]

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const user = users[0];
    // console.log(user);

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const correctUsername = "admin";
    const correctPassword = "admin123";

    const message = document.getElementById("login-message");

    if(username === user.username && password === user.password){
        message.textContent = "Login Successful!";
        message.classList.add("text-green-600");

        // redirect to dashboard
        window.location.href = "dashboard.html";
    } 
    else{
        message.textContent = "Invalid username or password!";
        message.classList.add("text-red-600");
    }
});
