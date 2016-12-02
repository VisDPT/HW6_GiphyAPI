$('button').on('click', function() {
    var car = $(this).data('car');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response);
            //response.data because image info is inside the data key
            var results = response.data;

            //for loop to display only 10 results
            for (var i = 0; i < results.length; i++) {
                var carDiv = $('<div class = "item">');
                var rating = results[i].rating;
                var p = $('<p>').text("Rating: " + rating);

                var img = $('<img>');
                img.attr('src', results[i].images.fixed_height_still.url);

                //DATA STATES added to img tag
                img.attr('data-still', results[i].images.fixed_height_still.url);
                img.attr('data-animate', results[i].images.fixed_height.url);
                img.attr('data-state', 'still');
                img.attr('class', 'carImages');
                console.log(img);

                carDiv.append(p);
                carDiv.append(img);
                $('#gifsAppearHere').prepend(carDiv);
            }
        });
});

//=====================DATA STATE IMG CLICK======================
$(document).on('click', '.carImages', dataState); //GOLDEN LINE!!!

function dataState() {
    console.log('on click works');
    var state = $(this).attr('data-state');
    console.log("The state is:" + state);

    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');

    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
};

//=====================SEARCH BUTTON ON CLICK FUNCTIONWITH NEW BUTTON=====================
//Search Button On click
$('#searchBtn').on('click', function() {
    // Get Search Term
    queryTerm = $('#search').val().trim();
    // Add in the Search Term
    var newURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(newURL);

    //=============== ADD a button with search term ======================
    var searchResultButton = ('<button>' + queryTerm + '</button>')
    $('.searchedCarButtons').append(searchResultButton);

    //add function to the new button
    $('.searchedCarButtons').on("click", function() {
        $.ajax({
                url: newURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(response);
                var sResults = response.data;

                for (var i = 0; i < sResults.length; i++) {
                    var sCarDiv = $('<div class = "item">');
                    var sRating = sResults[i].rating;
                    var sP = $('<p>').text("Rating: " + sRating);

                    var sImg = $('<img>');
                    sImg.attr('src', sResults[i].images.fixed_height_still.url);
                    sImg.attr('data-still', sResults[i].images.fixed_height_still.url);
                    sImg.attr('data-animate', sResults[i].images.fixed_height.url);
                    sImg.attr('data-state', 'still');
                    sImg.attr('class', 'carImages');


                    sCarDiv.append(sP);
                    sCarDiv.append(sImg);
                    $('#gifsAppearHere').prepend(sCarDiv);

                }
            });
    });
});