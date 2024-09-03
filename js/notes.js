function playAudio(audioname) {
    let audio = new Audio("audio/" + audioname + "note.wav");
    audio.play();
}

$(document).ready(function () {
    let output="<h3 class='text-danger'>Finger Notations :</h3>" +
        "<p class='text-secondary'> Proper finger positioning is crucial for developing good technique, producing a balanced sound.</p>"+
        "<ul class='text-success'>" +
        "<li>Thumb (1)</li>" +
        "<li>Index finger (2)</li>" +
        "<li>Middle finger (3)</li>" +
        "<li>Ring finger (4)</li>" +
        "<li>Little finger (5)</li>" +
        "</ul>";
    $("#content").html(output).show();
    $("#content1").click(function (){
        let output="<h3 class='text-danger'>Finger Notations :</h3>" +
            "<p class='text-secondary'> Proper finger positioning is crucial for developing good technique, producing a balanced sound</p>"+
            "<ul class='text-success'>" +
            "<li>Thumb (1)</li>" +
            "<li>Index finger (2)</li>" +
            "<li>Middle finger (3)</li>" +
            "<li>Ring finger (4)</li>" +
            "<li>Little finger (5)</li>" +
            "</ul>"
        $("#content").html(output).fadeIn();
    })
    $("#content2").click(function (){
        let output="<h3 class='text-danger'>Hand Positions :</h3>" +
            "<ul class='text-success'>" +
            "<li>Curve your fingers naturally, keeping your hands relaxed.</li>" +
            "<li>The fingers should be slightly rounded, with the fingertips making contact with the keys.</li>" +
            "<li>The wrist should be level with the back of the hand, not too high or too low.</li>" +
            "</ul>"
        $("#content").html(output).fadeIn();
    })
    $("#content3").click(function (){
        let output="<h3 class='text-danger'>Body Position :</h3><ul class='text-success'>" +
            "<li>Sit with your back straight and your shoulders relaxed.</li>" +
            "<li>Keep both feet flat on the floor, ensuring stability and balance.</li>" +
            "<li>Avoid elevating or dropping your shoulders while playing.</li>" +
            "<li>Sit centered on the bench, facing the piano squarely.</li>" +
            "<li>Take short breaks during extended practice sessions to prevent strain.</li>" +
            "</ul>"
        $("#content").html(output).fadeIn();
    })

    $("#pianokeys").hide()
    $("#keysbtn").click(function () {
        $("#pianoimg").hide();
        $("#pianokeys").fadeIn();
        document.addEventListener("keydown", pressedKey);
    })
    $("#imgbtn").click(function () {
        $("#pianoimg").fadeIn();
        $("#pianokeys").hide();
    })

    $(".fade-in-btn,.fade-in-btn1").click(function () {
        let x = $(this).data("target");
        let key = $(this).data("key");
        playAudio(x)
    })

    const pressedKey = (e) => {
        // if the pressed key is in the allKeys array, only call the playTune function
        let allkeys = ['a', 's', 'd', 'f', 'g', 'h','j', 'w', 'e', 't', 'y', 'u'];
        if (allkeys.includes(e.key)) {
            const target = document.querySelector(`[data-key="${e.key}"]`).getAttribute('data-target');
            playAudio(target);
            colr(e.key)
        }
    }
})
function colr(key)
{
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.toggle("bg-primary");
    clickedKey.classList.toggle("text-white");

    setTimeout(function() {
        clickedKey.classList.remove("bg-primary");// set back to original color
        clickedKey.classList.remove("text-white");// set back to original color
    }, 100);
}