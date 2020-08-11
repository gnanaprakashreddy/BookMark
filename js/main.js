document.getElementById('myform').addEventListener('submit',createBM);
fetchBookMarks();
function fetchBookMarks(){
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    var result  = document.getElementById('bookmarkResult');
    result.innerHTML='';
    bookmarks.forEach(bookmark => {
        var name = bookmark.name;
        var url = bookmark.url;
        result.innerHTML+='<div class="card mb-2">'+
                        '<h3 class="card-header">'+name+ 
                            '<a class="btn btn-success ml-2 mr-2" href="'+url+'" target=_blank>Visit</a>'+ 
                            '<a onclick="deleteBookMark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                        '</h3>'+
                    '</div>';
    })
}
function deleteBookMark(url){
    console.log(url);
   var bookmarkresult = JSON.parse(localStorage.getItem('bookmarks'));
   for(var i=0;i<bookmarkresult.length;i++)
    {
        if(bookmarkresult[i].url == url)
            bookmarkresult.splice(i,1);
    }
   localStorage.setItem('bookmarks',JSON.stringify(bookmarkresult));
   fetchBookMarks();
}
function createBM(e){
    
    let sitename = document.getElementById('sitename').value;
    let siteUrl = document.getElementById('siteurl').value;
    if(sitename.length ===0 || siteUrl.length===0)
        alert('Please enter all the fields');
    else    
        if(!(siteUrl.includes("https://www.")) || !(siteUrl.includes(".com")) || siteUrl.length===16)
            alert("Please enter the correct URL");
    else{
        var bookmark = {
            name : sitename,
            url : siteUrl
        }

        if(localStorage.getItem('bookmarks')===null){
            var bookmarks =[];
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
        else{
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            bookmarks.push(bookmark);
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }
        fetchBookMarks();   
        document.getElementById('sitename').value='';
        document.getElementById('siteurl').value='';
    }
    e.preventDefault();
}
