//variable that holds our api key
let endPoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=c41a1b2d157f4b998ce08095b793f10c&language=en-US&page=1"
ajax(endPoint, displayMovies);

function displayMovies(results) {
    //set variable = to the content div
    let movieList = document.querySelector("#movies");

    //loop through to remove
    while (movieList.hasChildNodes()) {
        movieList.removeChild(movieList.lastChild);
    }   

    //change the results variable
    let numShown = document.querySelector("#moviesShown");
    let numMovies = document.querySelector("#moviesTotal");
    let movieResults = JSON.parse(results);
    numShown.innerHTML = movieResults.results.length;
    numMovies.innerHTML = movieResults.total_results;

	//make a row div that can hold our movies
    let rowElem = document.createElement("div");
	rowElem.classList.add("row");
	//add it to our content
	movieList.appendChild(rowElem);

	
	if (movieResults.innerHTML == 0) {
		let errorMessage = document.createElement("div");
		errorMessage.appendChild("p");
		errorMessage.firstChild.innerHTML = "Movie not found. Try another one!"
		movieList.appendChild(errorMessage);
	}

	for (let i = 0; i < Math.min(20, movieResults.results.length); i++) {
		let colElem = document.createElement("div");
		colElem.classList.add("col", "col-6", "col-md-4", "col-lg-3", "movie-col");

		let imgContainer = document.createElement("div");
		imgContainer.classList.add("img-container");
		let poster = document.createElement("img");
		poster.classList.add("img-hover");

		if (movieResults.results[i].poster_path != null) {
			poster.src = "http://image.tmdb.org/t/p/w500" + movieResults.results[i].poster_path;
		}
		else {
			poster.src = "unavailable.png"
	
		}
		imgContainer.appendChild(poster);

		let title = document.createElement("div");
		title.innerHTML = movieResults.results[i].title;
		let date = document.createElement("div");
		date.innerHTML = movieResults.results[i].release_date;

		let hoverContent = document.createElement("div");
		hoverContent.classList.add("hoverContent");
		let synopsis = movieResults.results[i].overview;

		if (synopsis.length > 200) {
			synopsis = synopsis.substring(0,201) + "...";
		}


		hoverContent.innerHTML = "Rating: " + movieResults.results[i].vote_average + "<br> <br> Number of Reviews: " + movieResults.results[i].vote_count + "<br> <br>" + synopsis;
		imgContainer.appendChild(hoverContent);
		colElem.appendChild(imgContainer);
		colElem.appendChild(title);
		colElem.appendChild(date);
		rowElem.appendChild(colElem);
	}



	}





function ajax(endpoint, returnFunction) {
	let httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", endpoint);
	httpRequest.send();

	httpRequest.onreadystatechange = function() {
		console.log(httpRequest.readyState);
		if( httpRequest.readyState == 4) {

			if(httpRequest.status == 200) {
				returnFunction(httpRequest.responseText);
			}
			else {
				console.log("Error!");
				console.log(httpRequest.status);
			}
		}

	}
}

//when the form is submitted
document.querySelector("#search-form").onsubmit = function(event) {
    event.preventDefault();
    //get the usersInput value from the textForm
    let userInput = document.querySelector("#textInput").value.trim();
    console.log(userInput);
    //make a new text variable for the endpoint with their search parameters

    let endPoint =  

    "https://api.themoviedb.org/3/search/movie?api_key=c41a1b2d157f4b998ce08095b793f10c&language=en-US&query="+ userInput +"&page=1&include_adult=false";

    ajax(endPoint, displayMovies);
}