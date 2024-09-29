
let imgSrc = "";

document.getElementById("upload-button").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("profile-picture").click();
});

document.getElementById("profile-picture").addEventListener("change", (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      imgSrc = e.target.result; // Store the image source
      // Update image display when a new image is uploaded
      if (document.getElementById("resume-image")) {
        document.getElementById("resume-image").src = imgSrc;
      }
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const Name = document.getElementById("name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const locate = document.getElementById("location").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const skills = document.getElementById("skills").value.split(',').map(skill => skill.trim());

  let elements = document.createElement("div");
  elements.className = "Dynamic";
  elements.innerHTML = `
    <h1>Editable Resume</h1>
    <div class="resume-info">

    <div class="profile-side">
      <div class="resume-image">
        <img src="${imgSrc}" style="display: block;" class="image" id="resume-image">
        <h2><i><span contentEditable="false">Profile</span></i></h2>
      </div>
      </div>
      <div class="resume-content">
        <b>Name:<span class="editable" contentEditable="false">${Name} ${lastName}</span></b><br>
        <b>Email:<span class="editable" contentEditable="false">${email}</span></b><br>
        <b>Phone:<span class="editable" contentEditable="false">${phone}</span></b><br>
        <b>Location:<span class="editable" contentEditable="false">${locate}</span></b><br>
        <h2>Education</h2>
        <p><span class="editable" contentEditable="false">${education}</span></p>
        <h2>Work Experience</h2>
        <p><span class="editable" contentEditable="false">${experience}</span></p>
        <h2>Skills</h2>
        <ul>
          ${skills.map(skill => `<li class="editable" contentEditable="false">${skill}</li>`).join('')}
        </ul>
        <hr>
      </div>
    </div>
    <button id="edit-button" type="button" class="action-button">Edit</button>
    <button id="save-button" type="button" class="action-button" style="display: none;">Save</button>
    <button id="edit-image-button" type="button" class="action-button" style="display: none;">Edit Image</button>
  `;

  document.body.appendChild(elements);
  document.querySelector("form").style.display = "none";
  elements.style.display = "block";

  // Handle edit button click
  document.getElementById("edit-button").addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      el.contentEditable = "true"; // Enable editing for each editable element
    });
    document.getElementById("save-button").style.display = "inline"; // Show save button
    document.getElementById("edit-image-button").style.display = "inline"; // Show edit image button
  });

  // Handle save button click
  document.getElementById("save-button").addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      el.contentEditable = "false"; // Disable editing for each editable element
    });
    document.getElementById("save-button").style.display = "none"; // Hide save button
    document.getElementById("edit-image-button").style.display = "none"; // Hide edit image button
  });

  // Handle edit image button click
  document.getElementById("edit-image-button").addEventListener("click", () => {
    document.getElementById("profile-picture").click(); // Trigger image upload
  });
});
