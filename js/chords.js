// Define the playAudio function outside of the document.ready function
function playAudio(audioname) {
    let audio = new Audio("audio/" + audioname);
    audio.play();
}

function view(src, name) {
    let output = "<img src='" + src + "' class='img-thumbnail'>";
    $("#photobody").html(output);
    $("#modalheader").html("<h2 class='text-success text-center'>" + name + "</h2>");
}

$(document).ready(function () {
    function showData() {
        $("#chordserbody").hide();
        $("#chordsbody").show();
        $.ajax({
            url: "chords.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let output = "";
                if (data) {
                    $.each(data, function (i, chord) {
                        let audioname = chord.audio;
                        let imgname = "/images/" + chord.image;
                        let idd = "collapseOne" + i;
                        output += `
                            <div class="accordion" id="accordion${i}">
                                <div class="card mt-3 shadow-sm">
                                    <div class="card-header hover-overlay border-primary" id="headingOne">
                                        <h2 class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${idd}" aria-expanded="true" aria-controls="${idd}">
                                            ${chord.cname}
                                        </h2>
                                    </div>
                                    <div id="${idd}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordion${i}">
                                        <div class="card-body">
                                            <div class="container-fluid row">
                                                <div class="col-12 col-md-3 mb-3 mb-md-0">
                                                    <div class="card">
                                                        <div class="card-header">
                                                            <img class='img-fluid chordimg' onclick='view(this.src, this.alt)' data-target='#viewphoto' data-toggle='modal' title='View' data-placement='bottom' src="${imgname}" alt='${chord.cname}'>
                                                        </div>
                                                        <div class="card-footer">
                                                            <button class="btn btn-outline-primary col-12 mx-auto" onclick='playAudio("${audioname}")'>
                                                                <span class='material-icons'>music_note</span>
                                                            </button>
                                                        </div>
                                                        <div class='text-center'>
                                                            <h3 class='text-danger'>${chord.cname}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <h5 class="text-primary">${chord.cdesc}</h5><br>
                                                    <h6>Notes: ${chord.notes}</h6>
                                                    <h6>Right Hand Positions: ${chord.rhand}</h6>
                                                    <h6>Left Hand Positions: ${chord.lhand}</h6>
                                                    <a href='notes.html' target='_blank' class='text-decoration-none'>Key Notations and Hand Positions are explained here.</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    });
                    $("#chordsbody").html(output);
                } else {
                    $("#chordsbody").html("<h6 class='text-danger text-center'>No data found</h6>");
                }
            },
        });
    }

    showData();

    $(".dropdown-item").click(function (event) {
        event.preventDefault();
        $("#chordsbody").show();
        $("#chordserbody").hide();
        $("#ser").val("");
        let target = $(this).data("chord");
        $(target).collapse("show");
    });

    function searchData(val) {
        $.ajax({
            url: "chords.json",
            method: "GET", 
            dataType: "json",
            success: function (data) {
                let output = "";
                if (data && data.length > 0) {
                    let filteredData = data.filter(chord => 
                        chord.cname.toLowerCase().includes(val.toLowerCase()) ||
                        chord.cdesc.toLowerCase().includes(val.toLowerCase())
                    );
    
                    if (filteredData.length > 0) {
                        filteredData.forEach((chord, i) => {
                            let audioname = chord.audio ? chord.audio : "default-audio.wav";
                            let imgname = "/images/" + chord.image;
                            let idd = "collapseOne" + i;

                            output += `
                                <div class="accordion" id="accordion${i}">
                                    <div class="card mt-3 shadow-sm">
                                        <div class="card-header hover-overlay border-primary" id="heading${i}">
                                            <h2 class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${idd}" aria-expanded="true" aria-controls="${idd}">
                                                ${chord.cname}
                                            </h2>
                                        </div>
                                        <div id="${idd}" class="accordion-collapse collapse show" aria-labelledby="heading${i}" data-bs-parent="#accordion${i}">
                                            <div class="card-body">
                                                <div class="container-fluid row">
                                                    <div class="col-12 col-md-3 mb-3 mb-md-0">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                <img class='img-fluid chordimg' onclick='view(this.src, this.alt)' data-toggle='modal' data-target='#viewphoto' title='View' src="${imgname}" alt='${chord.cname}'>
                                                            </div>
                                                            <div class="card-footer">
                                                                <button class="btn btn-outline-primary col-12 mx-auto" onclick='playAudio("${audioname}")'>
                                                                    <span class='material-icons'>music_note</span>
                                                                </button>
                                                            </div>
                                                            <div class='text-center'>
                                                                <h3 class='text-danger'>${chord.cname}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-9">
                                                        <h5 class="text-success">${chord.cdesc}</h5><br>
                                                        <h6>Notes: ${chord.notes}</h6>
                                                        <h6>Right Hand Positions: ${chord.rhand}</h6>
                                                        <h6>Left Hand Positions: ${chord.lhand}</h6>
                                                        <a href='notes.html' target='_blank' class='text-decoration-none'>Key Notations and Hand Positions are explained here.</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                        });
                        $("#chordserbody").html(output);
                    } else {
                        $("#chordserbody").html("<h6 class='text-danger text-center'>No matching data found.</h6>");
                    }
                } else {
                    $("#chordserbody").html("<h6 class='text-danger text-center'>No data available.</h6>");
                }
            },
            error: function () {
                $("#chordserbody").html("<h6 class='text-danger text-center'>Error loading data.</h6>");
            }
        });
    }

    $("#ser").keyup(function () {
        let val = $(this).val().trim();
        if (val === "") {
            showData();
            $("#chordserbody").hide();
            $("#chordsbody").show();
        } else {
            searchData(val);
            $("#chordsbody").hide();
            $("#chordserbody").show();
        }
    });
});
