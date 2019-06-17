$(document).ready(function() {
  // Getting references to our form and input
  var profileForm = $("#profileForm");



  profileForm.on("submit", function (event) {
    var validSignup = true;

    event.preventDefault();

    // Use FormData constructor to build a new multipart form (for handling images)
    var formData = new FormData();


      if ($("#file-input").prop("files")[0], $("#file-input").prop("files")[0]) {
        // append photo information to form (photo: {objOfPhotoInfo})
        formData.append("photo", $("#file-input").prop("files")[0], $("#file-input").prop("files")[0].name);
      }

      updateUser(formData);
  });

  function updateUser(formData) {
    // console.log(JSON.stringify(formData));
    $.ajax({
      url: "/api/updateprofile",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      method: 'PUT'
    }).done(function (data) {
      // console.log(data);
      window.location.reload();
      // If there's an error, handle it by displaying validation error
    }).fail(function(err) {
      console.log(err);
    });
  }
}
