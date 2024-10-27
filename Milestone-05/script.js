var _a, _b, _c;
var imgSrc = "";
(_a = document.getElementById("upload-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("profile-picture").click();
});
(_b = document.getElementById("profile-picture")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function (e) {
    var _a;
    e.preventDefault();
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imgSrc = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Store the image source
            var resumeImage = document.getElementById("resume-image");
            if (resumeImage) {
                resumeImage.src = imgSrc; // Update image display when a new image is uploaded
            }
        };
        reader.readAsDataURL(file);
    }
});
(_c = document.querySelector("form")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", function (e) {
    var _a, _b, _c;
    e.preventDefault();
    var username = document.getElementById("username").value;
    var Name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var locate = document.getElementById("location").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(',').map(function (skill) { return skill.trim(); });
    var elements = document.createElement("div");
    elements.className = "Dynamic";
    elements.innerHTML = "\n    <h1>Editable Resume</h1>\n    <div class=\"resume-info\">\n      <div class=\"resume-image\">\n        <img src=\"".concat(imgSrc, "\" style=\"display: block;\" class=\"image\" id=\"resume-image\">\n        <h2><i><span contentEditable=\"false\">Profile</span></i></h2>\n      </div>\n      <br>\n      <div class=\"resume-content\">\n        <b style=\"display:none\">Username: <span class=\"editable\" contentEditable=\"false\">").concat(username, "</span></b>\n        <br>\n        <b>First-Name: <span class=\"editable\" contentEditable=\"false\">").concat(Name, "</span></b>\n        <br>\n        <b>Last-Name: <span class=\"editable\" contentEditable=\"false\">").concat(lastname, "</span></b>\n        <br>\n        <b>Email: <span class=\"editable\" contentEditable=\"false\">").concat(email, "</span></b>\n        <br>\n        <b>Phone: <span class=\"editable\" contentEditable=\"false\">").concat(phone, "</span></b>\n        <br>\n        <b>Location: <span class=\"editable\" contentEditable=\"false\">").concat(locate, "</span></b>\n        <br>\n        <hr/>\n        <h2>Education</h2>\n        <p><span class=\"editable\" contentEditable=\"false\">").concat(education, "</span></p> <br>\n        <h2>Work Experience</h2>\n        <p><span class=\"editable\" contentEditable=\"false\">").concat(experience, "</span></p><br>\n        <h2>Skills</h2><br>\n        <ul>\n          ").concat(skills.map(function (skill) { return "<li class=\"editable\" contentEditable=\"false\">".concat(skill, "</li>"); }).join(''), "\n        </ul>\n        <hr>\n      </div>\n    </div>\n    <button id=\"edit-button\" type=\"button\" class=\"action-button\">Edit</button>\n    <button id=\"save-button\" type=\"button\" class=\"action-button\" style=\"display: none;\">Save</button>\n    <button id=\"edit-image-button\" type=\"button\" class=\"action-button\" style=\"display: none;\">Edit Image</button>\n    <br>\n    <div id=\"shareable-link-container\" style=\"display: none; text-align: center;\">\n      <h2>Shareable Link</h2>\n      <span>Here is your resume URL:</span>\n      <a href=\"#\" id=\"shareable-link\" target=\"_blank\" rel=\"noopener noreferrer\"></a>\n      <br>\n    </div>\n    <button id=\"download\" type=\"button\" class=\"action-button\">Download Resume</button>\n  ");
    document.body.appendChild(elements);
    document.querySelector("form").style.display = "none";
    elements.style.display = "block";
    updateDownloadLink();
    document.getElementById("download").style.display = "block";
    // Handle edit button click
    (_a = document.getElementById("edit-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        document.querySelectorAll('.editable').forEach(function (el) {
            el.contentEditable = "true"; // Enable editing for each editable element
        });
        document.getElementById("save-button").style.display = "inline"; // Show save button
        document.getElementById("edit-image-button").style.display = "inline"; // Show edit image button
        document.getElementById("download").style.display = "none"; // Hide download button
    });
    // Handle save button click
    (_b = document.getElementById("save-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        document.querySelectorAll('.editable').forEach(function (el) {
            el.contentEditable = "false"; // Disable editing for each editable element
        });
        document.getElementById("save-button").style.display = "none"; // Hide save button
        document.getElementById("edit-image-button").style.display = "none"; // Hide edit image button
        updateDownloadLink();
        document.getElementById("download").style.display = "block";
    });
    // Handle edit image button click
    (_c = document.getElementById("edit-image-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        document.getElementById("profile-picture").click(); // Trigger image upload
    });
    function updateDownloadLink() {
        var _a;
        var resumeContent = "\n      <html>\n        <head><title>Unique Path Resume</title>\n        <style>\n        body {\n          margin: 20px;\n          padding: 20px;\n          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\n        }\n        .container {\n          max-width: 800px;\n          margin: 0 auto;\n          display: flex;\n          justify-content: space-evenly;\n          align-items: center;\n          padding: 2rem;\n          border-radius: 2rem;\n          background: linear-gradient(to left, skyblue, blue);\n        }\n        img {\n          height: 14rem;\n          object-fit: cover;\n          width: 10rem;\n          border-radius: 4rem;\n        }\n        .resume-info {\n          text-align: center;\n          font-size: 25px;\n          padding-top: 59px;\n          width: 14rem;\n          box-shadow: 0px 0px 10px blue;\n          background: linear-gradient(to right, white, blue);\n          color: white;\n          text-shadow: 0px 0px 10px darksalmon;\n        }\n        header {\n          font-size: 19px;\n          resize: vertical;\n          margin-top: 4rem;\n        }\n        .resume-content {\n          border: 2px solid blue;\n          padding: 2rem;\n          box-shadow: 0px 0px 10px blue;\n          text-shadow: 0px 0px 10px fuchsia;\n          background: linear-gradient(to right, blue, #1fbeff);\n          color: white;\n        }\n        </style>\n        </head>\n        <body>\n          <div class=\"container\">\n            <div class=\"resume-info\">\n              <img src=\"".concat(imgSrc, "\" alt=\"Profile Picture\" />\n              <i style=\"font-size:30px\">Profile</i>\n              <br/>\n            </div>\n            <header>\n              <div class=\"resume-content\">\n                <b>Name : ").concat(Name, " ").concat(lastname, "</b>\n                <br/>\n                <b>Email: ").concat(email, "</b>\n                <br>\n                <b>Phone: ").concat(phone, "</b>\n                <br/>\n                <b>Location: ").concat(locate, "</b>\n                <br>\n                <h2>Education</h2>\n                <br/>\n                <i>").concat(education, "</i>\n                <br/>\n                <h2>Work Experience</h2>\n                <i>").concat(experience, "</i>\n                <br/>\n                <h2>Skills</h2>\n                <i>\n                <ul>\n                  ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n                </i>\n              </div>\n            </header>\n          </div>\n        </body>\n      </html>\n    ");
        var blob = new Blob([resumeContent], { type: 'text/html' });
        // Handle download button click
        (_a = document.getElementById("download")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "".concat(username.replace(/\s+/g, ''), "_resume.html");
            downloadLink.click();
        });
    }
});
