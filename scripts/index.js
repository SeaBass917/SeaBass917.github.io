/**
 * Hide a modal.
 * @param {HTMLElement} modal The modal to hide.
 */
function hideModal(modal){
    modal.style.display = "none"
    modal.classList.remove("showModal")
    modal.classList.add("hideModal")
}

/**
 * Show a modal.
 * @param {HTMLElement} modal The modal to show.
 */
function showModal(modal){
    modal.style.display = "block"
    modal.classList.add("showModal")
    modal.classList.remove("hideModal")
}

// Main
document.addEventListener("DOMContentLoaded", function() {

    // ----------------------------------------------
    // Set up the listener for each project modal
    // ----------------------------------------------

    // Dynamically determine what projects are in the projects section
    let projectCards = document.getElementById("projects").getElementsByClassName("cardbox")[0].children;
    let modalNames = [];
    for (let projectCard of projectCards){
        modalNames.push(projectCard.id);
    }
    // Dynamically determine what projects are in the publications section
    let pubCards = document.getElementById("publications").getElementsByClassName("cardbox")[0].children;
    for (let pubCard of pubCards){
        modalNames.push(pubCard.id);
    }
    // Dynamically determine what projects are in the publications section
    let presiCards = document.getElementById("presentations").getElementsByClassName("cardbox")[0].children;
    for (let presiCard of presiCards){
        modalNames.push(presiCard.id);
    }

    // Set up the button listeners on each modal
    for(let projectName of modalNames){

        // Gather deps
        // Each modal view must have:
        //    a modal popup, the button that opens it, and the button the closes it
        let modalElement = document.getElementById(`${projectName}Modal`);
        let cardElement = document.getElementById(`${projectName}`)
        let modalXButtonElement = document.getElementById(`${projectName}BtnClose`)

        if(modalElement === null){
            console.error(`No modal div for ${projectName} in DOM.`)
            continue;
        }
        if(cardElement === null){
            console.error(`No opening button for ${projectName} modal in DOM.`)
            continue;
        }
        if(modalXButtonElement === null){
            console.error(`No closing button for ${projectName} modal in DOM.`)
            continue;
        }

        // When the user clicks on the button, open the modal
        cardElement.onclick = function() {

            let modal = document.getElementById(`${this.id}Modal`);
            showModal(modal);

            // Load the videos
            // Play the first one
            const video_eles = modal.getElementsByTagName("video");
            for(let video_ele of video_eles){
                video_ele.preload = "auto";
            }
            if(video_eles.length) video_eles[0].play();
        }
        
        // When the user clicks on (x), close the modal
        modalXButtonElement.onclick = function() {
            let modal = document.getElementById(`${this.id.substring(0, this.id.length-8)}Modal`);
            hideModal(modal);
        }
        
        // When the user clicks anywhere outside of the modal, close it
        // NOTE: The modal is the whole screen, so we need to check if the click happens outside the bounds of the modal
        modalElement.onclick = function(event) {
            // get the location of this modal's `modal-content` child element
            let modalRect = this.getElementsByClassName("modal-content")[0].getBoundingClientRect();

            // Add 20 pixels to the to all bounds to account for the padding
            modalRect.left -= 20;
            modalRect.right += 20;
            modalRect.top -= 20;
            modalRect.bottom += 20;

            // get the location of the click
            let clickX = event.clientX;
            let clickY = event.clientY;

            // if the click is outside the modal, close it
            if(clickX < modalRect.left || clickX > modalRect.right || clickY < modalRect.top || clickY > modalRect.bottom){
                hideModal(this);
            }
        }
    }
})