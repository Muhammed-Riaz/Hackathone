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
      const resumeImage = document.getElementById("resume-image") as HTMLImageElement;
      if (resumeImage) {
        resumeImage.src = imgSrc; // Update image display when a new image is uploaded
      }
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
  form.style.display = "none";
  elements.style.display = "block";

  // Handle edit button click
  document.getElementById("edit-button")?.addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      (el as HTMLElement).contentEditable = "true"; // Enable editing for each editable element
    });
    document.getElementById("save-button")!.style.display = "inline"; // Show save button
    document.getElementById("edit-image-button")!.style.display = "inline"; // Show edit image button
  });

  // Handle save button click
  document.getElementById("save-button")?.addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      (el as HTMLElement).contentEditable = "false"; // Disable editing for each editable element
    });
    document.getElementById("save-button")!.style.display = "none"; // Hide save button
    document.getElementById("edit-image-button")!.style.display = "none"; // Hide edit image button
  });

  // Handle edit image button click
  document.getElementById("edit-image-button")?.addEventListener("click", () => {
    profilePictureInput.click(); // Trigger image upload
  });
});
