const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.textContent = nav.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// subtle parallax on gradient orbs
const orbs = document.querySelectorAll(".orb");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((o, i) => {
    const f = (i + 1) * 0.5;
    o.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});

// Contact form client-side validation
(function () {
  emailjs.init("zyiLu_7HAGWwrraWc");
})();

const form = document.getElementById("contactForm");
if (form) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const statusEl = document.getElementById("formStatus");

  const showError = (input, msg) => {
    input.classList.add("error");
    const errorEl = document.getElementById(input.id + "Error");
    if (errorEl) errorEl.textContent = msg;
  };

  const clearError = (input) => {
    input.classList.remove("error");
    const errorEl = document.getElementById(input.id + "Error");
    if (errorEl) errorEl.textContent = "";
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    let ok = true;
    clearError(nameInput);
    clearError(emailInput);
    clearError(subjectInput);
    clearError(messageInput);
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      showError(nameInput, "Name is required.");
      ok = false;
    }

    if (!email) {
      showError(emailInput, "Email is required.");
      ok = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, "Enter valid email");
      ok = false;
    }

    if (!subject) {
      showError(subjectInput, "Subject is required.");
      ok = false;
    }

    if (!message) {
      showError(messageInput, "Message is required.");
      ok = false;
    }

    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validate()) {

      statusEl.textContent = "Sending message...";
      statusEl.className = "form-status";
  
      emailjs.send("service_5jpzp1g", "template_4oik976", {
          from_name: nameInput.value,
          from_email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value
      })
      .then(() => {
          statusEl.textContent =
          "Thanks for reaching out — I'll get back to you soon!";
          statusEl.className = "form-status success";
          form.reset();
      })
      .catch(() => {
          statusEl.textContent =
          "Failed to send message. Please try again.";
          statusEl.className = "form-status error";
      });

    } else {
      statusEl.textContent = "Please fix the errors above and try again.";
      statusEl.className = "form-status error";
    }
  });

  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });
}

