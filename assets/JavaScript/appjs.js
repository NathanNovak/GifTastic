
//initial array of topics
var gifs = [];



//button is rendered on the top of the screen with selected animal
$('#submit').on('click', function () {
  event.preventDefault();

  var selection = $('input').val().trim();

  //pushes the new input to the array "gifs"
  gifs.push(selection);
  console.log(gifs);
  //clears the input box
  $('input').val('');
  renderButton();



});
//each new input and submit renders and appends a new button
function renderButton() {
  //empties the div so the new buttons can append without repeat
  $('#button-view').empty();

  for (var i = 0; i < gifs.length; i++) {

    var gifButtons = $('<button>');


    gifButtons.addClass('btn btn-primary newButton');

    gifButtons.attr('data_name', gifs[i]);


    gifButtons.text(gifs[i]);
    $('#button-view').append(gifButtons);
    console.log(gifs[i]);


  }



}
//user can click on the buttons and it will call for a response
$(document).on('click', '.newButton', function () {


  var chosenGifs = $(this).attr('data_name');
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Xk431AeNbIzBbsXzkM8eIOvOHXENtz1N&q=" + chosenGifs + "&limit=10&offset=0&rating=R&lang=en";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {


    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      var resultsDiv = $('<div>');
      var p = $('<p>').text("Rating: " + results[i].rating);
      console.log(p);

      var imgForGifs = $('<img>');
      imgForGifs.attr({src: results[i].images.fixed_height_still.url, 
        data_state: "still",
        data_still: results[i].images.fixed_height_still.url,
        data_animate: results[i].images.fixed_height.url});

      resultsDiv.append(p);
      resultsDiv.append(imgForGifs);


      $('#gif-view').prepend(resultsDiv);

      
    }
    $(document).on('click','img', AnimateStill );

  });
});

function AnimateStill() {

  var state = $(this).attr("data_state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data_animate"));
    $(this).attr("data_state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data_still"));
    $(this).attr("data_state", "still");
  }

}
//searches the document and runs the displayGifs function in any element with the class of newButton
// $(document).on('click','.newButton', displayGifs );



//10 gifs display below of the selected animal

//ratings from API should be displayed on each gif

//user can click on each gif to play and click again to stop

//input an animal in "add an animal" and press submit