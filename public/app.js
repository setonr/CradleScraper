// $.getJSON("/articles", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

// // $("#getHeadlines").on("click", function() {
// //   $("#articles").empty();

// //   $.ajax({
// //     method: "GET"
// //     url: "/scrape"
// //   })
// //   .done(function(data) {
// //     $.ajax({
// //       method: "GET",
// //       url: "/articles"
// //     })
// //     .done(function(data) {
// //       for (var i = 0; i < data.length; i++) {
// //         $("#articles").append(data);
// //       }
// //     })
// //   })
// // })

// $("p").on("click", function() {
//   $("#notes").empty();

//   var currentId = $(this).attr("data-id");

//   $.ajax({
//     method: "GET"
//     url: "/articles/" + currentId
//   })
//   .done(function(data) {
//     console.log(data);
//     //article title
//     $("#notes").append("<h1>" + data.title + "</h1>");
//     //note title input
//     $("#notes").append("<input id = 'titleInput' name = 'title' >");
//     //textarea for note
//     $("#notes").append("<textarea id='bodyinput' name = 'body'></textarea>");
//     //submit button to add note (with article id saved)
//     $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Add Note</button>");

//     if (data.note) {
//       $("#titleinput").val(data.note.title);
//       $("#bodyinput").val(data.note.body);
//     }
//   });
// });

// //savenote on click
// $("#savenote").on("click", function() {
//   var currentId = $(this).attr("data-id");

//   $.ajax({
//     method: "POST",
//     url: "/articles/" + currentId,
//     data: {
//       title: $("#tableinput").val(),
//       body: $("#bodyinput").val()
//     }
//   })
//   .done(function(data) {
//     console.log(data);
//     $("#notes").empty();
//   });

//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });