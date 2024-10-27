let imgSrc: string = "";

document.getElementById("upload-button")?.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();
  (document.getElementById("profile-picture") as HTMLInputElement).click();
});

document.getElementById("profile-picture")?.addEventListener("change", (e: Event) => {
  e.preventDefault();
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      imgSrc = e.target?.result as string; // Store the image source
      const resumeImage = document.getElementById("resume-image") as HTMLImageElement;
      if (resumeImage) {
        resumeImage.src = imgSrc; // Update image display when a new image is uploaded
      }
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector("form")?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  
  const username = (document.getElementById("username") as HTMLInputElement).value;
  const Name = (document.getElementById("name") as HTMLInputElement).value;
  const lastname = (document.getElementById("lastname") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const locate = (document.getElementById("location") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement).value;
  const experience = (document.getElementById("experience") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(',').map(skill => skill.trim());

  const elements = document.createElement("div");
  elements.className = "Dynamic";
  elements.innerHTML = `
    <h1>Editable Resume</h1>
    <div class="resume-info">
      <div class="resume-image">
        <img src="${imgSrc}" style="display: block;" class="image" id="resume-image">
        <h2><i><span contentEditable="false">Profile</span></i></h2>
      </div>
      <br>
      <div class="resume-content">
        <b style="display:none">Username: <span class="editable" contentEditable="false">${username}</span></b>
        <br>
        <b>First-Name: <span class="editable" contentEditable="false">${Name}</span></b>
        <br>
        <b>Last-Name: <span class="editable" contentEditable="false">${lastname}</span></b>
        <br>
        <b>Email: <span class="editable" contentEditable="false">${email}</span></b>
        <br>
        <b>Phone: <span class="editable" contentEditable="false">${phone}</span></b>
        <br>
        <b>Location: <span class="editable" contentEditable="false">${locate}</span></b>
        <br>
        <hr/>
        <h2>Education</h2>
        <p><span class="editable" contentEditable="false">${education}</span></p> <br>
        <h2>Work Experience</h2>
        <p><span class="editable" contentEditable="false">${experience}</span></p><br>
        <h2>Skills</h2><br>
        <ul>
          ${skills.map(skill => `<li class="editable" contentEditable="false">${skill}</li>`).join('')}
        </ul>
        <hr>
      </div>
    </div>
    <button id="edit-button" type="button" class="action-button">Edit</button>
    <button id="save-button" type="button" class="action-button" style="display: none;">Save</button>
    <button id="edit-image-button" type="button" class="action-button" style="display: none;">Edit Image</button>
    <br>
    <div id="shareable-link-container" style="display: none; text-align: center;">
      <h2>Shareable Link</h2>
      <span>Here is your resume URL:</span>
      <a href="#" id="shareable-link" target="_blank" rel="noopener noreferrer"></a>
      <br>
    </div>
    <button id="download" type="button" class="action-button">Download Resume</button>
  `;

  document.body.appendChild(elements);
  document.querySelector("form")!.style.display = "none";
  elements.style.display = "block";

  updateDownloadLink();

  document.getElementById("download")!.style.display = "block";

  // Handle edit button click
  document.getElementById("edit-button")?.addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      (el as HTMLElement).contentEditable = "true"; // Enable editing for each editable element
    });
    document.getElementById("save-button")!.style.display = "inline"; // Show save button
    document.getElementById("edit-image-button")!.style.display = "inline"; // Show edit image button
    document.getElementById("download")!.style.display = "none"; // Hide download button
  });

  // Handle save button click
  document.getElementById("save-button")?.addEventListener("click", () => {
    document.querySelectorAll('.editable').forEach(el => {
      (el as HTMLElement).contentEditable = "false"; // Disable editing for each editable element
    });
    document.getElementById("save-button")!.style.display = "none"; // Hide save button
    document.getElementById("edit-image-button")!.style.display = "none"; // Hide edit image button

    updateDownloadLink();

    document.getElementById("download")!.style.display = "block";
  });

  // Handle edit image button click
  document.getElementById("edit-image-button")?.addEventListener("click", () => {
    (document.getElementById("profile-picture") as HTMLInputElement).click(); // Trigger image upload
  });

  function updateDownloadLink() {
    const resumeContent = `
      <html>
        <head><title>Unique Path Resume</title>
        <style>
        body {
          margin: 20px;
          padding: 20px;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 2rem;
          border-radius: 2rem;
          background: linear-gradient(to left, skyblue, blue);
        }
        img {
          height: 14rem;
          object-fit: cover;
          width: 10rem;
          border-radius: 4rem;
        }
        .resume-info {
          text-align: center;
          font-size: 25px;
          padding-top: 59px;
          width: 14rem;
          box-shadow: 0px 0px 10px blue;
          background: linear-gradient(to right, white, blue);
          color: white;
          text-shadow: 0px 0px 10px darksalmon;
        }
        header {
          font-size: 19px;
          resize: vertical;
          margin-top: 4rem;
        }
        .resume-content {
          border: 2px solid blue;
          padding: 2rem;
          box-shadow: 0px 0px 10px blue;
          text-shadow: 0px 0px 10px fuchsia;
          background: linear-gradient(to right, blue, #1fbeff);
          color: white;
        }
        </style>
        </head>
        <body>
          <div class="container">
            <div class="resume-info">
              <img src="${imgSrc}" alt="Profile Picture" />
              <i style="font-size:30px">Profile</i>
              <br/>
            </div>
            <header>
              <div class="resume-content">
                <b>Name : ${Name} ${lastname}</b>
                <br/>
                <b>Email: ${email}</b>
                <br>
                <b>Phone: ${phone}</b>
                <br/>
                <b>Location: ${locate}</b>
                <br>
                <h2>Education</h2>
                <br/>
                <i>${education}</i>
                <br/>
                <h2>Work Experience</h2>
                <i>${experience}</i>
                <br/>
                <h2>Skills</h2>
                <i>
                <ul>
                  ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                </i>
              </div>
            </header>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([resumeContent], { type: 'text/html' });

    // Handle download button click
    document.getElementById("download")?.addEventListener("click", () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${username.replace(/\s+/g, '')}_resume.html`;
      downloadLink.click();
    });
  }
});
