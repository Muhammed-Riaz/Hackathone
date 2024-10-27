var imgSrc = "";
var uploadButton = document.getElementById("upload-button");
var profilePictureInput = document.getElementById("profile-picture");
var form = document.querySelector("form");
uploadButton.addEventListener("click", function (e) {
    e.preventDefault();
    profilePictureInput.click();
});
profilePictureInput.addEventListener("change", function (e) {
    var _a;
    e.preventDefault();
    var target = e.target;
    var file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            imgSrc = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Store the image source
            var resumeImageDiv = document.querySelector(".resume-image");
            resumeImageDiv.innerHTML = ""; // Clear previous content
            var img = document.createElement("img");
            img.src = imgSrc;
            img.style.display = "block"; // Show the image
            img.className = "image";
            resumeImageDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var Name = document.getElementById("name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var locate = document.getElementById("location").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(',')
        .map(function (skill) { return skill.trim(); });
    var elements = document.createElement("div");
    elements.className = "Dynamic";
    elements.innerHTML = "\n    <div class=\"resume-info\">\n      <div class=\"profile-side\">\n        <div class=\"resume-image\">\n          <img src=\"".concat(imgSrc, "\" style=\"display: block;\" class=\"image\" id=\"resume-image\">\n          <h2><i><span contentEditable=\"false\">Profile</span></i></h2>\n        </div>\n      </div>\n      <div class=\"resume-content\">\n        <b>Name:<span class=\"editable\" contentEditable=\"false\">").concat(Name, " ").concat(lastName, "</span></b><br>\n        <b>Email:<span class=\"editable\" contentEditable=\"false\">").concat(email, "</span></b><br>\n        <b>Phone:<span class=\"editable\" contentEditable=\"false\">").concat(phone, "</span></b><br>\n        <b>Location:<span class=\"editable\" contentEditable=\"false\">").concat(locate, "</span></b><br>\n        <h2>Education</h2>\n        <p><span class=\"editable\" contentEditable=\"false\">").concat(education, "</span></p>\n        <h2>Work Experience</h2>\n        <p><span class=\"editable\" contentEditable=\"false\">").concat(experience, "</span></p>\n        <h2>Skills</h2>\n        <ul>\n          ").concat(skills.map(function (skill) { return "<li class=\"editable\" contentEditable=\"false\">".concat(skill, "</li>"); }).join(''), "\n        </ul>\n        <hr>\n      </div>\n    </div>\n  ");
    document.body.appendChild(elements);
    form.style.display = "none";
    elements.style.display = "block";
});
