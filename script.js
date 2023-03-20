const fileInput = document.querySelector("input")
const downloadBtn = document.querySelector("button")

downloadBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    downloadBtn.innerText = "Downloading file..."
    fetchFile(fileInput.value)
})

function fetchFile(url) {
    //fetching file & returning response as blob
    fetch(url)
    .then(res => res.blob())
    .then(file => {
        //URL.createObjURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file) 
        let aTag = document.createElement("a")
        aTag.href = tempUrl //passing file last name & extension as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/,'') 
        document.body.appendChild(aTag) //adding <a> tag inside body
        aTag.click() //clicking <a> tag so the file download
        aTag.remove() // removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl)
        downloadBtn.innerText = "Download file"
       
})
    .catch(() => {
        downloadBtn.innerText = "Download file"
        alert("Failed to download file!")
    })
}



