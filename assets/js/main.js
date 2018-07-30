$(document).ready(function() {
  
    function getRequest() {
    axios.get('http://treeapi.ramonterry.com/api/branches')
    .then(function(response) {
        let resData = response.data;
  
        var result = resData.map(function(a) {
           var branch = a.name;
                return $("#branches").append("<ul>" + "<button" + " " + "id=#parent>" + branch + "</button>" + "</ul>")   
            
        }
    );
     
    })
    .catch(function (error) {
        console.log(error);
      });
  
    
}

getRequest();

$("#branchSubmit").click(function(event) {
    event.preventDefault();
function postBranch() {
    var branchInput = $("#inputNode").val();
    
    
    axios.post('http://treeapi.ramonterry.com/api/branches', {
        name: branchInput
        
    })
    .then(function (response) {
     var newBranch = response.data.name;
     return $("#branches").append("<ul></ul>", newBranch)
        
        
  
    })
    .catch(function (error) {
        console.log(error);
    })
    
}
postBranch();

})

});

