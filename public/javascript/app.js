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
