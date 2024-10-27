let imgSrc: string = "";

const uploadButton = document.getElementById("upload-button") as HTMLButtonElement;
const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;

uploadButton.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  profilePictureInput.click();
});

profilePictureInput.addEventListener("change", (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      imgSrc = event.target?.result as string; // Store the image source
      const resumeImageDiv = document.querySelector(".resume-image") as HTMLElement;
      resumeImageDiv.innerHTML = ""; // Clear previous content

      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.display = "block"; // Show the image
      img.className = "image";

      resumeImageDiv.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const Name = (document.getElementById("name") as HTMLInputElement).value;
  const lastName = (document.getElementById("last-name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const locate = (document.getElementById("location") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(',')
    .map(skill => skill.trim());

  const elements = document.createElement("div");
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
  form.style.display = "none";
  elements.style.display = "block";
});
