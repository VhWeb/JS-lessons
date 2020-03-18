$(document).ready(function(){
    function popup() {
        $('.overlay').fadeToggle();
        $('.modal').slideToggle("slow");
    }
    $(".close").on("click", function() {
        $(".main_btna").addClass('main_btn');
        $(".main_btna").toggleClass('main_btna');
        popup();
    });
    $('.main_btn').on("click", function(e){
        let target = e.target;
        if($(target) && $(target).hasClass('main_btn')) {
            $(target).toggleClass('main_btn');
            $(target).toggleClass('main_btna');
        }
        popup();
    });
    $('a[href="#sheldure"]').on("click", popup);
});