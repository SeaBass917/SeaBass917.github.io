
// Main
document.addEventListener("DOMContentLoaded", function() {

    // ----------------------------------------------
    // Set up the listener for each project modal
    // ----------------------------------------------

    // Dynamically determine what projects are in the projects section
    let projectCards = document.getElementById("projects").getElementsByClassName("cardbox")[0].children
    let projectNames = []
    for (let projectCard of projectCards){
        projectNames.push(projectCard.id)
    }
    // Dynamically determine what projects are in the publications section
    let pubCards = document.getElementById("publications").getElementsByClassName("cardbox")[0].children
    for (let pubCard of pubCards){
        projectNames.push(pubCard.id)
    }

    // Set up the button listeners on each modal
    for(let projectName of projectNames){

        // Each project must have:
        //    a modal popup, the button that opens it, and the button the closes it
        let modal = document.getElementById(`${projectName}Modal`)
        if(modal){
            let btn = document.getElementById(`${projectName}`)
            if(btn){
                let btnClose = document.getElementById(`${projectName}BtnClose`)
                if(btnClose){

                    // When the user clicks on the button, open the modal
                    btn.onclick = function() {
                        modal.style.display = "block"
                        modal.classList.add("showModal")
                    }
                    
                    // When the user clicks on (x), close the modal
                    btnClose.onclick = function() {
                        modal.style.display = "none"
                        modal.classList.remove("showModal")
                    }
                    
                    // When the user clicks anywhere outside of the modal, close it
                    // NOTE: this technically means clicking on the modal, the stuff inside is "contents"
                    window.onclick = function(event) {
                        if (event.target.className.includes("modal")) {
                            event.target.style.display = "none"
                            event.target.classList.remove("showModal")
                        }
                    }
                }
                else{
                    console.error(`No closing button for ${projectName} modal in DOM.`)
                }
            }
            else{
                console.error(`No opening button for ${projectName} modal in DOM.`)
            }
        }
        else{
            console.error(`No modal div for ${projectName} in DOM.`)
        }
    }
})