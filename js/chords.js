// Define the playAudio function outside of the document.ready function
function playAudio(audioname) {
    let audio = new Audio("audio/" + audioname);
    audio.play();
}
function view(src,name){
    let output="<img src='"+src+"' class='img-thumbnail'>"
    $("#photobody").html(output)
    $("#modalheader").html("<h2 class='text-success text-center'>"+name+"</h2>");
}

$(document).ready(function () {
    function showData() {
        $("#chordserbody").hide()
        $("#chordsbody").show()
        $.ajax({
            url: "chords.json",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let x;
                let i;
                let output = "";
                if (data) {
                    x = data;
                    $.each(data, function (i) {
                        let audioname = x[i].audio;
                        let imgname = "/images/" + x[i].image;
                        let idd = "collapseOne" + i;
                        output += "   <div class=\"accordion\" id=\"accordion" + i + "\">\n" +
                            "        <div class=\"card mt-3 shadow-sm\">\n" +
                            "            <div class=\"card-header hover-overlay border-primary\" id=\"headingOne\">\n" +
                            "                <h2 class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#" + idd + "\" aria-expanded=\"true\" aria-controls=\"#" + idd + "\">\n" +
                            x[i].cname +
                            "                </h2>\n" +
                            "            </div>\n" +
                            "            <div id=\"" + idd + "\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingOne\" data-bs-parent=\"#accordion" + i + "\">\n" +
                            "                <div class=\"card-body\">\n" +
                            "                    <div class=\"container-fluid row\">\n" +
                            "                        <div class=\"col-3\">\n" +
                            "                            <div class=\"card\">\n" +
                            "                                <div class=\"card-header\">\n" +
                            "                                    <img class='img-fluid chordimg' onclick='view(this.src,this.alt)' data-target='#viewphoto' data-toggle='modal' title='View' data-placement='bottom' src=" + imgname + " width=\"400\" height=\"400\"alt='\"" + x[i].cname + "\"'>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"card-footer\">\n" +
                            // Call the playAudio function with the audioname parameter
                            "                                    <button class=\"btn btn-outline-primary col-12 mx-auto\" onclick='playAudio(\"" + audioname + "\")'><span class='material-icons'>music_note</span></button>\n" +
                            "                                </div>\n" +
                            "<div class='text-center'><h3 class='text-danger'>" + x[i].cname + "</h3></div>" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"col-9\">\n" +
                            "                            <h5 class=\"text-primary\">" + x[i].cdesc + "</h5><br>\n" +
                            "                            <h6>Notes : " + x[i].notes + "</h6>\n" +
                            "                            <h6>Right Hand Positions : " + x[i].rhand + "</h6>\n" +
                            "                            <h6>Left  Hand Positions : " + x[i].lhand + "</h6>\n" +
                            "                            <a href='notes.html'target='_blank' class='text-decoration-none'>Key Notations and Hand Positions are explained here.</a>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>";
                    })
                    $("#chordsbody").html(output);
                } else {
                    output = "No data found";
                    $("#chordserbody").html(output);
                }
            },
        });
    }

    showData();

    $(".dropdown-item").click(function (event) {
        $("#chordsbody").show()
        $("#chordserbody").hide()
        event.preventDefault();
        $("#ser").val("");
        var target = $(this).data("chord");
        $(target).collapse("show");
    });

    function searchData(val) {
        $.ajax({
            url: "chords.json",
            method: "GET", // Use GET for fetching data
            dataType: "json",
            success: function (data) {
                let output = "";
                if (data && data.length > 0) {
                    // Filter data based on the search value
                    let filteredData = data.filter(chord => 
                        chord.cname.toLowerCase().includes(val.toLowerCase()) ||
                        chord.defval.toLowerCase().includes(val.toLowerCase())
                    );
    
                    if (filteredData.length > 0) {
                        filteredData.forEach((chord, i) => {
                            let audioname = chord.audio ? chord.audio : "default-audio.wav"; // Default audio if not present
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
                                                    <div class="col-3">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                <img class='img-fluid chordimg' onclick='view(this.src, this.alt)' data-toggle='modal' data-target='#viewphoto' title='View' src="${imgname}" width="400" height="400" alt='${chord.cname}'>
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
                                                    <div class="col-9">
                                                        <h5 class="text-success">${chord.cdesc}</h5><br>
                                                        <h6>Notes : ${chord.notes}</h6>
                                                        <h6>Right Hand Positions : ${chord.rhand}</h6>
                                                        <h6>Left Hand Positions : ${chord.lhand}</h6>
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
        let val = $(this).val();
        if (val !== "") {
            $('#chordsbody').hide();
            $('#chordserbody').show();
            searchData(val);
        } else {
            showData(); // Assuming showData() function populates the full list
        }
    });
    

})
