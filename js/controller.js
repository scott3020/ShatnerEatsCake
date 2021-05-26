$(document).ready(function(){
	$("#poo").click(function(){
	//next: move this into a function and apply an onclick to the box
		let random_mod_y = Math.random() * -150;
		let random_mod_x = Math.random() * 100;
		let gameClock = setInterval(gameLoop, 30);
		let object_ref = $("#poo");
		let floor_ref = $("#floor");
		let right_ref = $("#right-wall");
		let left_ref = $("#left-wall");
		let y_position = object_ref.position().top;
		let x_position = object_ref.position().left;
		let floor_position = floor_ref.position().top;
		let right_wall_position = right_ref.position().left;
		let left_wall_position = left_ref.position().left;
		let object_height = object_ref.height();
		let object_width = object_ref.width();
		let object_base = floor_position - object_height;
		let object_right = right_wall_position - object_width;
		let object_left = left_wall_position;
		let gravity = 3;
		let time = 1;
		let y_velocity = random_mod_y;
		let x_velocity = random_mod_x * (Math.round(random_mod_x) % 2 == 0 ? 1 : -1);
		let rebound_factor = 2.6;
		let in_motion = true;
		
		function gameLoop(){
			if(in_motion){
				y_velocity += (gravity * time++);
				y_position += y_velocity;
				x_position += x_velocity;
				object_ref.offset({ top: y_position, left: x_position});
				if(y_position > object_base) {
					spawn_impact(x_position, floor_position+2, 0, y_velocity);
					y_position = object_base;
					object_ref.offset({ top: y_position, left: x_position});
					x_velocity /= (rebound_factor/2);
					y_velocity /= rebound_factor;
					in_motion = (y_velocity >= 1 || y_velocity <= -1);
					time = 1;
					y_velocity *= -1;
				}
				if(x_position > object_right){
					spawn_impact(right_wall_position+2, y_position, 90, x_velocity);
					x_position = object_right;
					object_ref.offset({ top: y_position, left: x_position});
					x_velocity *= -1;
				}
				if(x_position < object_left){
					spawn_impact(left_wall_position, y_position, 270, x_velocity);
					x_position = object_left;
					object_ref.offset({ top: y_position, left: x_position});
					x_velocity *= -1;
				}
					
			}
			else {
				clearInterval(gameClock);
			}
		}
	});
	
	function spawn_impact(x, y, theta, impact_force){
		let height_attr = 100;
		let width_attr = 10;
		if(theta == 0){
			height_attr = impact_force;
			width_attr = 100;
		} else if(theta == 90) {
			height_attr = 100;
			width_attr = impact_force;
		} else if (theta == 270){
			height_attr = 100;
			width_attr = impact_force * -1;
			x -= impact_force * -1;
		}
		let height_string = "height: " + height_attr + "px; ";
		let width_string = "width: " + width_attr + "px; ";
		let position_left_string = "left: " + x + "px; ";
		let position_top_string = "top: " + y + "px; ";
		let color_string = (Math.round(Math.random() * 20)) % 20 == 0 ? 'background-color: red; ' : '' ;
		let style_string = 
		position_left_string + position_top_string + height_string + width_string + color_string;
		
		let splat = "<div class=\"floater\" style=\""+style_string+"\"/>";
		$("body").append(splat);
		console.log(style_string);
	}
});