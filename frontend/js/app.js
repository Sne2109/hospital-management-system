// 🔐 AUTH
// REGISTER
function register() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username: regUser.value, password: regPass.value });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered");
  window.location.href = "index.html";
}

function login() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let valid = users.find(u => u.username === username.value && u.password === password.value);

  if (valid) {
    localStorage.setItem("loggedInUser", username.value);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Login");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function checkLogin() {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
  }
}

function addDoctor() {
  if (!docName.value || !specialization.value) {
    alert("Fill all fields");
    return;
  }

  let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  doctors.push({ name: docName.value, spec: specialization.value });

  localStorage.setItem("doctors", JSON.stringify(doctors));
  showDoctors();
}

function showDoctors() {
  let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  doctorTable.innerHTML = "";

  doctors.forEach(d => {
    doctorTable.innerHTML += `<tr><td>${d.name}</td><td>${d.spec}</td></tr>`;
  });
}

function addAppointment() {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push({ patient: patientName.value, doctor: doctorName.value, status: "Pending" });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  showAppointments();
}

function showAppointments() {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointmentTable.innerHTML = "";

  appointments.forEach((a, i) => {
    appointmentTable.innerHTML += `
    <tr>
      <td>${a.patient}</td>
      <td>${a.doctor}</td>
      <td class="${a.status === 'Pending' ? 'pending' : 'completed'}">${a.status}</td>
      <td>
        <button onclick="complete(${i})">Complete</button>
        <button onclick="deleteApp(${i})">Delete</button>
      </td>
    </tr>`;
  });
}

function complete(i) {
  let appointments = JSON.parse(localStorage.getItem("appointments"));
  appointments[i].status = "Completed";
  localStorage.setItem("appointments", JSON.stringify(appointments));
  showAppointments();
}

function deleteApp(i) {
  let appointments = JSON.parse(localStorage.getItem("appointments"));
  appointments.splice(i, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  showAppointments();
}

function loadDashboard() {
  let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  totalDoctors.innerText = doctors.length;
  totalAppointments.innerText = appointments.length;
  pendingAppointments.innerText = appointments.filter(a => a.status === "Pending").length;
  completedAppointments.innerText = appointments.filter(a => a.status === "Completed").length;
}
function addBill() {
  let bills = JSON.parse(localStorage.getItem("bills")) || [];

  bills.push({
    patient: patientBill.value,
    amount: amount.value
  });

  localStorage.setItem("bills", JSON.stringify(bills));
  showBills();
}

function showBills() {
  let bills = JSON.parse(localStorage.getItem("bills")) || [];
  billTable.innerHTML = "";

  bills.forEach((b, i) => {
    billTable.innerHTML += `
    <tr>
      <td>${b.patient}</td>
      <td class="amount">₹ ${b.amount}</td>
      <td>
        <button onclick="deleteBill(${i})">Delete</button>
      </td>
    </tr>`;
  });
}

function deleteBill(i) {
  let bills = JSON.parse(localStorage.getItem("bills"));
  bills.splice(i, 1);
  localStorage.setItem("bills", JSON.stringify(bills));
  showBills();
}