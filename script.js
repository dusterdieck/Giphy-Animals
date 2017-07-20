//inital group of animals
var animals = ['gorillas', 'giraffes', 'skunks', 'puppies', 'cats', 'lions', 'tigers', 'bears' /*oh my*/, 'horses', 'ostriches', 'rabbits', 'birds'];

//populate DOM with initial buttons
addButton();

//function to add button
function addButton( clicked ) {

  //if a parameter is passed, then it was called a button click, so use search box text for label and id
  if( clicked ) {
    //set variable equal to value of search box
      var newAnimal = $('#animal-box').val().trim();
      console.log(newAnimal)
      //creates button element
      var newButton = $('<button>');
      newButton.addClass('btn btn-default animal-button') //adds animal-button class to button, as well as bootstrap classes
               .attr('id', newAnimal ) //sets the id of the button to the parameter passed
               .text( newAnimal ); //sets the text of the button to the parameter passed

      $('#buttons-area').append(newButton); //appends the button to the buttons-area on the DOM
      //clear contents of search box
      $('#animal-box').val('');
  }
  else{ //if no parameter passed, use the animals array for the label and id    
    for(var i in animals) {
      //creates button element
      var newButton = $('<button>');
      newButton.addClass('btn btn-default animal-button') //adds animal-button class to button, as well as bootstrap classes
               .attr('id', animals[i]) //sets the id of the button to the parameter passed
               .text( animals[i] ); //sets the text of the button to the parameter passed

      $('#buttons-area').append(newButton); //appends the button to the buttons-area on the DOM
    }
    }
}

//function to add image
function addImage( imageObj ) {
  //create image div
  var imgDiv = $('<div>');
  //create p tag for rating
  var imgRating = $('<p>');
  //create img tag for actual img
  var imgIMG = $('<img>');

  //set the text of the <p> element to the rating value of the passed object
  imgRating.text('Rating: ' + imageObj.rating );
           
  //set the src and other attributes for the <img> tag
  imgIMG.attr('src', imageObj.images.fixed_height_still.url ) //sets to still image first
        .attr('data-still', imageObj.images.fixed_height_still.url) //url of still image
        .attr('data-animate', imageObj.images.fixed_height.url) //url of animated image
        .attr('data-state', 'still') //default state set to still
        .addClass('gif'); //class added so the click can be recorded
        

  imgDiv.append( imgRating ) //add <p> to img div
        .append( imgIMG ) //add <img> to img div
        .addClass('generated-image') //class for formatting purposes on the DOM
        .addClass('text-center'); //class for formatting purposes on the DOM

  $('#gif-area').append(imgDiv); //add class to DOM
  
}

//function to generate all images for a given animal
function generateImages() {

  $('#gif-area').empty();
  //variables for Giphy API call
  var apiKey = 'dc6zaTOxFJmzC';
  var queryURL = 'https://api.giphy.com/v1/gifs/search?';
  var animal = $(this).attr('id');
  var limit = 10;

  queryURL += 'q=' + animal + '&limit=' + limit + '&api_key=' + apiKey;

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done(function( response ) {
    console.log( response );
    for(var i=0; i < limit; i++){
      console.log(response.data[i])
      addImage( response.data[i] );
    }
  });

}

//function to toggle the gif animation back and forth
function toggleGifAnimation() {


  //set variable called 'state' to value of 'data-state' attribute
  var state = $(this).attr('data-state') ;
  
  

  if (state == 'still') {
    //set 'src' attribute to 'data-animate' value
    $(this).attr('src', $(this).attr('data-animate') );
    //set 'data-state' attribute to 'animate'
    $(this).attr('data-state', 'animate');
  }
  else if (state == 'animate') {
    //set 'src' attribute to 'data-still' value
    $(this).attr('src', $(this).attr('data-still') );
    //set 'data-state' attribute to 'still'
    $(this).attr('data-state', 'still' );
  }

}

//when the submit button is clicked, call addAnimal function
$('#submit-button').click( addButton );

//when an animal button is clicked, call the generateImages function
$(document).on('click', '.animal-button', generateImages );


//when an element with class 'gif' is clicked on, call the toggleGifAnimation function
$(document).on("click", '.gif', toggleGifAnimation );


