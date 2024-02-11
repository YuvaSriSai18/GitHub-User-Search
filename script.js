var form = document.getElementById("MyForm");

form.addEventListener('submit',async (e) =>{
    e.preventDefault();

    var search = document.getElementById("search").value ;
    var originalName = search.split(' ').join('')
    fetch("https://api.github.com/users/"+originalName)
    .then((result) => {
        if(!result.ok){
            errorDisplay(error);
            return;
        }
        return result.json() ;
    })
    .then((data) => {
        console.log(data);

        const error_div = document.getElementById("error") ;
        error_div.style.display = "none" ;

        document.getElementById("result").style.display = "block" ;

        const img = document.getElementById("userimg");
        const Name = document.getElementById("name");
        const UserDesc = document.getElementById("user-desc");
        const repo = document.getElementById("repos");
        const location = document.getElementById("location");
        const viewFullProfile = document.getElementById("viewfullprofile");

        img.src = `${data.avatar_url}` ;
        Name.textContent = `${data.name}` ;
        UserDesc.textContent = `${data.bio}`;
        repo.textContent = `Repositories : ${data.public_repos}`;
        location.textContent = `Location : ${data.location}`;
        viewFullProfile.href = `https://github.com/${originalName}`;
    })
    .catch(error => {
        console.error('Error:', error);
        errorDisplay(error) ;
    });
});
function errorDisplay(message) {
    var search = document.getElementById("search").value ;
    var originalName = search.split(' ').join('');

    document.getElementById("result").style.display = "none" ;

    const error_div = document.getElementById("error") ;
    error_div.style.display = "block" ;
    error_div.textContent = `User with ${originalName} not found !!` ;
}