//to display note modal
function showModal() {
  $("#noteModal").modal({
    keyboard: false
  });
};

$(".addNote").click(function() {
  showModal();
});

//add note in the modal
$(document).on("click", ".addNote", function() {
  $("#notes").empty();

  var currentId = $(this).attr("id");

  $.ajax({
    method: "GET",
    url: "/articles/" + currentId
  })
  .done(function(data) {
    console.log(data);
    $(".modal-title").html("Add Note To: " + data.title);
    $(".modal-body").append("<input id='titleinput' name='title' placeholder='Note Title'><br>");
    $(".modal-body").append("<textarea id='bodyinput' name='body' placeholder='Your note'></textarea><br>");
    $(".modal-body").append("<button id ='savenote'>Save Note</button>");

    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});

//savenote on click
$(document).on("click", "#savenote", function() {
  var currentId = $(this).attr("id");

  $.ajax({
    method: "POST",
    url: "/articles/" + currentId,
    data: {
      title: $("#tableinput").val(),
      body: $("#bodyinput").val()
    }
  })
  .done(function(data) {
    console.log(data);
    $("#notes").append(data);
  });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//to save an article from index
$(document).on("click", ".saveArticle", function() {
  var currentId = $(this).attr("id");
  console.log(currentId);

  $.ajax({
    method: "POST",
    url: "/saved/" + currentId,
    data: {
      savedArticle: true
    }
  })
  .done(function(data) {
    console.log("saved ", data);
  });
});

//to delete a note
$(document).on("click", ".deleteNote", function() {
  var currentId= $(this).attr("id");
  console.log(currentId);

  $.ajax({
    method: "DELETE",
    url: "/delete/" + currentId
  })
  .done(function(data) {
    console.log("deleted ", data);
  });
});