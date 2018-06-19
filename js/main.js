$(document).ready(function(){
	$(document).on('click', '.reposlist__block__readmore', function(event) {
			$(this.nextElementSibling).find('li').toggle();
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
			$.each(repos, function(index, repo){
				$(".reposlist").append(`
				<div class="reposlist__block">
					<a href="${repo.html_url}" target="_blank" class="repos__link">${repo.name}</a> 
					<hr>
					
					${repo.description} 
					<br>

					<ul>
						<li>
							<button class="reposlist__block__readmore" data-toggle="modal" data-target="#Test">Read more...</button>
							<ul class="${repo.id}">
								<li class="reposlist__li">Name:  ${repo.name} <br></li>
								<li class="reposlist__li">Full Name: ${repo.full_name} <br></li>
								<li class="reposlist__li">Clone: ${repo.clone_url} <br></li>
								<li class="reposlist__li">Date of creation: ${repo.created_at} <br></li>
								<li class="reposlist__li">Language: <span style='color:#ffd800;background-color: #d9ecda;'>${repo.language}</span> <br></li>
								<li class="reposlist__li">Open issues: ${repo.open_issues_count} <br></li>
								<li class="reposlist__li">Forks count: ${repo.forks_count} <br></li>
							</ul>
						</li>
					</ul>
				</div> `);
			});
      });
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
		});
	});
});