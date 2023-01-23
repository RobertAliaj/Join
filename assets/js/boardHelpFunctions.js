function displayBoardPopUp() {
    document.getElementById('card').classList.remove('d-none')
}


function removeBoardPopUp() {
    document.getElementById('card').classList.add('d-none')
}


function displayOverlay() {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('popUp').classList.remove('d-none');
}


function removeOverlay() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('popUp').classList.add('d-none')
}


function highlight(id) {
    document.getElementById(id).classList.add('dragarea-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragarea-highlight');
}


function setColors(category) {
    let categorysAndColors = {
        design: "rgb(239, 132, 41)",
        Sales: "rgb(236, 126, 250)",
        Backoffice: "rgb(100, 210, 193)",
        Marketing: "rgb(18, 58, 248)",
        Media: "rgb(247, 202, 57)",
    };
    return (categorysAndColors[category]);
}