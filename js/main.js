$(document).ready(function(){
	$(document).on('click', '.reposlist__block__readmore', function(event) {
			$(this.nextElementSibling).find('li').toggle();
			var targetbtn = $(event.target);
				if(targetbtn[0].innerHTML == 'Read more...') {
					targetbtn.html('Hide');
				}
				else {
					targetbtn.html('Read more...');
				}
		});
	
	$(document).on('keyup', '#searchUser', function(e){ 
    var username = e.target.value;
    // Make request to Github
    $.ajax({
    	url:'https://api.github.com/users/'+username,
      	data:{
        	client_id:'27ec00565a5381aac083',
        	client_secret:'aa7760b653dd32fa2dd97482056c026e698e4002'
      	}
    }).done(function(user){
      	$.ajax({
        	url:'https://api.github.com/users/'+username+'/repos',
        	data:{
          		client_id:'27ec00565a5381aac083',
          		client_secret:'aa7760b653dd32fa2dd97482056c026e698e4002',
        
        	}
      	}).done(function(repos){
				$('.result').html(`
				<span class="result__userlogin">${user.login}</span><br>
				<img src="${user.avatar_url}" class="user__avatar"></img>
				Name: ${user.name} <br>
				Repositories: ${user.public_repos}<br>
				Company: ${user.company} <br>
				E-mail: ${user.email} <br>
				Followers: ${user.followers} <br>
				Registration date: ${user.created_at}
				<div class="space"></div>
				<div class="reposlist"> </div>
				`);
			$.each(repos, function(index, repo){
				$(".reposlist").prepend(`
				<div class="reposlist__block">
					<a href="${repo.html_url}" target="_blank" class="repos__link">${repo.name}</a> 
					<hr>
					<span class="reposlist__block__description"> Description:  </span>
					${repo.description} 
					<br>
					<ul>
						<li>
							<button class="reposlist__block__readmore" data-toggle="modal" ">Read more...</button>
							<ul class="reposlist__ul">
								<li class="reposlist__li"><b class="reposlist__li__details">Name: </b> ${repo.name} <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Full Name:</b> ${repo.full_name} <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Clone:</b> <a href="${repo.clone_url}" class="reposlist__li__cloneURL">${repo.clone_url}</a>  <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Date of creation:</b> ${repo.created_at} <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Language:</b> <span class="reposlist__li__language">${repo.language}</span> <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Open issues:</b> ${repo.open_issues_count} <br></li>
								<li class="reposlist__li"><b class="reposlist__li__details">Forks count:</b> ${repo.forks_count} <br></li>
							</ul>
						</li>
					</ul>
				</div> `);
				
				
			});
      });
		
		});
	});
});