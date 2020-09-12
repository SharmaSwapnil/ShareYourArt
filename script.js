const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready =false;
let imagesLoaded = 0;
let totalImages =0;
let photosArray = [];

// function to Check if all images were loaded
const imageLoaded=()=>{	
	imagesLoaded++;
	console.log(imagesLoaded);
	if (imagesLoaded===totalImages){
		ready = true;
		loader.hidden = true;

	}
}

//  helper function to set Attributes on DOM Elements
const setAttribues = (element,attributes)=>{
	for(const key in attributes){
		element.setAttribute(key,attributes[key]);
	}

}

// Create Elements for Links and Photos + Add to the DOM
const displayPhotos =() =>{
	imagesLoaded = 0;
	totalImages =photosArray.length;
	
	// Run for each object in photosArray
	photosArray.forEach((photo)=>{
		//Create 'a' element-(anchor element)
		const item = document.createElement('a');
		// item.setAttribute('href',photo.links.html);
		// item.setAttribute('target','_blank');
		// instead of setting attibutes 2 times above use helper function for cleaner code
		setAttribues(item,{
			href:photo.links.html,
			target:'_blank',
		});
		//Create <img> for photo
		const img = document.createElement('img');
		// img.setAttribute('src',photo.urls.regular);
		// img.setAttribute('alt',photo.alt_description);
		// img.setAttribute('title',photo.alt_description);
		// instead of setting attibutes 3 times above use helper function for cleaner code
		setAttribues(img,{
			src:photo.urls.regular,
			alt:photo.alt_description,
			title:photo.alt_description
		});		

		// Event Listener , check when each is finished loading
		img.addEventListener('load', imageLoaded);

		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}



// Unsplash API
const count =10;
const apiKey ='r6l00ebI7qwxNeP7m4DmFH452indLUCkTfvBNwYGX0o';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Get photos from Unsplash API

async function getPhotos() {
	try{
		const response = await fetch(apiURL);
		photosArray = await response.json();
		displayPhotos();

	}catch(error){
		// Catch Error Here
	}

}

// Check to see if scrolling at the bottom of the page - load more photos
window.addEventListener('scroll', ()=>{	
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
		ready=false;
		loader.hidden = false;
		getPhotos();		
	}
});

// On Load
getPhotos();