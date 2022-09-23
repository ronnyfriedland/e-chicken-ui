$( document ).ready(function() {
    console.log( "ready!" );

    $.each( ["26", "6", "22", "4"], function( index, pin ){
        $.ajax({
            url: '/pin/' + pin,
            type: 'GET',
            success: function (response) {
                console.log(response);

                pin_state = JSON.parse(response);
                $('#pin_' + pin).prop("checked", "HIGH" == pin_state.state);
            },
            error: function(error){
                console.log(error);
            }
        });
    });


});