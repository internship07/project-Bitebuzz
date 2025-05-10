document.addEventListener("DOMContentLoaded", () => {
  console.log("Signup script running...");

  const signupForm = document.getElementById("signup-form");
  if (!signupForm) {
    console.error("Signup form not found.");
    return;
  }

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userData = {
      username: document.getElementById("username").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      password: document.getElementById("password").value.trim(),
    };

    console.log("Sending request:", JSON.stringify(userData));

    try {
      const response = await fetch("http://localhost/bitebuzz/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      console.log("Fetch response:", response);

      const rawText = await response.text();
      console.log("Raw Response from Server:", rawText);

      if (!rawText) {
        throw new Error("Empty response from server.");
      }

      const data = JSON.parse(rawText);
      console.log("Parsed JSON:", data);

      if (data.success) {
        alert("Signup successful! Redirecting to homepage...");
        window.location.href = data.redirect;
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });
});
