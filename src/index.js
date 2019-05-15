console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", function (){
  const dropdown = document.getElementById("breed-dropdown")
  dogImgList()
  breedList()
  dropdown.addEventListener("change", filterBreedList)
})

function filterBreedList(e){
  const filterLetter = e.target.value
  const breedListElement = document.getElementById("dog-breeds")
  const petArray = breedListElement.childNodes
  petArray.forEach( (breed) => {
    if (!!breed.innerText){
      breed.style.display = ""
      if (breed.innerText.charAt(0) !== filterLetter){
        breed.style.display = "none"
      }
    }
  })
}


function dogImgList(){
  fetch(imgUrl)
  .then((response) => response.json())
  .then((object) => object.message.forEach(handleImgList))
}

function handleImgList(index){
  let imgTag = document.createElement('img')
  imgTag.src = index
  imgTag.style.display = "block"
  const imgNode = document.getElementById("dog-image-container")
  imgNode.appendChild(imgTag)
}

function breedList(){
  fetch(breedUrl)
  .then((response) => response.json())
  .then((object) =>{
    for (let breed in object.message){
      handleBreedList(object.message, breed)
    }
  })
}
function handleBreedList(object, breed){
  const unorderedList = document.getElementById("dog-breeds")
  let list = document.createElement("li")
  list.innerHTML = breed
  list.addEventListener("click", changeColor)

  if (!!object[breed]){
    let subBreedList = document.createElement("ul")
    object[breed].forEach( (subBreed) => {
      let subList = document.createElement("li")
      subList.innerHTML = subBreed
      subList.addEventListener("click", changeColor)
      subBreedList.appendChild(subList)
      }
    )
    list.appendChild(subBreedList)
  }
  unorderedList.appendChild(list)
}

function changeColor(e){
  e.target.style.color === "blue" ? e.target.style.color = "black" : e.target.style.color = "blue"
}
