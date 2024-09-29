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
      const resumeImageDiv = document.querySelector(".resume-image");
      resumeImageDiv.innerHTML = ""; // Clear previous content

      let img = document.createElement("img");
      img.src = imgSrc;
      img.style.display = "block"; // Show the image
      img.className = "image";

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
  `;

  document.body.appendChild(elements);
  document.querySelector("form").style.display = "none";
  elements.style.display = "block";
});
