//Initialize
$(function() {
  createButtons(topics, 'animal-button', '#animal-buttons');
  console.log('Page loaded!');
});

var topics = [
  'dog',
  'cat',
  'cow',
  'lion',
  'bunny',
  'whale',
  'cheetah',
  'giraffe',
  'snake',
  'penguin'
];

function createButtons(arrayToUse, classToAdd, areaToAdd) {
  $('areaToAdd').empty();
  for (var i = 0; i < arrayToUse.length; i++) {
    var a = $('<button>');
    a.addClass(classToAdd);
    a.attr('data-type', arrayToUse[i]);
    a.text(arrayToUse[i]);
    $(areaToAdd).append(a);
  }
}

$(document).on('click', '.animal-button', function() {
  // Scroll to #animals div
  $('html, body').animate(
    {
      scrollTop: $('#animals')
        .first()
        .offset().top
    },
    500
  );

  $('#animals').empty();
  var type = $(this).data('type');
  var queryURL =
    'http://api.giphy.com/v1/gifs/search?q=' +
    type +
    '&api_key=Ob1qUTKq8pdxE6QqYZDJ7jiFTOMeUg2F&limit=9&rating=pg-13';
  $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
    var results = response.data;

    for (var j = 0; j < results.length; j++) {
      console.log(results[j]);

      var searchDiv = $(
        "<div class='col-sm-4' id='search-col'><div class='search-item'></div>"
      );
      var rating = results[j].rating;
      var p = $('<p>').text('Rating: ' + rating);
      var animated = results[j].images.fixed_height.url;
      var still = results[j].images.fixed_height_still.url;
      var image = $('<img>');
      image.attr('src', still);
      image.attr('data-still', still);
      image.attr('data-animated', animated);
      image.attr('data-state', 'still');
      image.addClass('animalImage');
      searchDiv.append(p);
      searchDiv.append(image);
      $('#animals').append(searchDiv);
    }
  });
});

$(document).on('click', '.animalImage', function() {
  var state = $(this).data('state');
  if (state === 'still') {
    console.log('animated clicked');
    $(this).attr('src', $(this).data('animated'));
    $(this).data('state', 'animated');
  } else if (state === 'animated') {
    console.log('still clicked');
    $(this).attr('src', $(this).data('still'));
    $(this).data('state', 'still');
  }
});

$('#submit-animal-button').on('click', function() {
  var newSearch = $('input')
    .eq(0)
    .val();
  topics.push(newSearch);
  $('#animal-buttons').empty();
  createButtons(topics, 'animal-button', '#animal-buttons');
  return false;
});
