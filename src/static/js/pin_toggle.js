$(function(){
	$('input:checkbox').click(function(){
		var pin = $(this).attr('value');
		var state = $(this)[0].checked ? "HIGH" : "LOW";

		$.ajax({
			url: '/pin',
			data: 'pin='+pin+"&state="+state,
			type: 'PUT',
			success: function(response){
				console.log(response);

                pin_state = JSON.parse(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});

$(function(){
	$('input:radio').click(function(){
		$('input[name="'+$(this).attr('name')+'"]').each(function() {
			var pin = $(this).attr('value');
			var state = $(this)[0].checked ? "HIGH" : "LOW";

			$.ajax({
				url: '/pin',
				data: 'pin='+pin+"&state="+state,
				type: 'PUT',
				success: function(response){
					console.log(response);
	
					pin_state = JSON.parse(response);
					$('#pin_' + pin).prop("checked", "HIGH" == pin_state.state);
				},
				error: function(error){
					console.log(error);
				}
			});

		});

		setTimeout(function() {
			$('input:radio').prop("checked", false);
		}, 3000);
	});
});
