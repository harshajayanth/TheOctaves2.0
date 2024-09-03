$(document).ready(function () {

    $("#workpage,#contactpage").hide();

    $("#home").click(function (){
        $("#workpage,#contactpage").fadeOut();
        $("#homepage").fadeIn();
    })

    $("#work").click(function (){
        $("#homepage,#contactpage").fadeOut();
        $("#workpage").fadeIn();
        $("#workpage").load("work.html")
    })

    $("#contact").click(function (){
        $("#workpage,#homepage").fadeOut();
        $("#contactpage").fadeIn();
        $("#contactpage").load("contact.html")
    })

});