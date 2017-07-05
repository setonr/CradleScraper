$(document).on("click", "#test", function() {
  alert("hey!");
})

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
    method: "GET"
    url: "/articles/" + currentId
  })
  .done(function(data) {
    console.log(data);
    $(".modal-title").html("<h5>Add Note To: " + data.title + "</h5>");
    $(".modal-body").html("<input id='titleinput' name='title' placeholder='Note Title'>");
    $(".modal-body").append("<input id='authorName' name='author' placeholder='Your Name'>");
    $(".modal-body").append("<textarea id='bodyinput' name='body' placeholder='Your note'></textarea>");
    $(".modal-body").append("<button data-id'" + data._id + "' id='savenote'>Save Note</button>");

    if (data.note) {
      $("#titleinput").val(data.note.title);
      $("#bodyinput").val(data.note.body);
    }
  });
});

//savenote on click
$(document).on("click", "#savenote", function() {
  var currentId = $(this).attr("data-id");

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
    $("#notes").empty();
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
$(".deleteNote").on("click", function() {
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