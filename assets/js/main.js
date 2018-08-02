$(document).ready(function() {
  
    function getRequest() {
    axios.get('http://treeapi.ramonterry.com/api/branches')
    .then(function(response) {
        let resData = response.data;
  
        var result = resData.map(function(a) {
           var branch = a.name;
           var branchId = a.id;
           console.log(branchId); 
                return $("#branches")
                .append("<ul>" + "<button" + " " + "type=" +
                "button" + " " + "class=" + "branchButton" +
                " " +  "data-toggle=" + "modal" + " " + "data-target=" + "#treeForm" 
                + " " + "id=" + branchId + " " + "value=" + branchId +  
                " " + ">" + branch + "</button>" + "</ul>")   
            
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


function editBranch() {
$(document).on('click', '.branchButton', function(event){
    event.preventDefault();
    
    var currentId = this.id;
    console.log(this.id);
    $(".nameUpdate").attr("id",currentId);
});
    $(document).on('click', '.nameUpdate', function(event){
        event.preventDefault(); 
        var updateId = this.id;  
        var nameUpdate = $("#nameUpdate").val();
        console.log(this.id);
    axios.patch('http://treeapi.ramonterry.com/api/branches/' + updateId, {
        name: nameUpdate
        
        
    })
    .then(function (response) {
     var replaceBranch = response.data.name;
     console.log(replaceBranch);

     $("#branches").empty();
     getRequest();
        
        
  
    })
    .catch(function (error) {
        console.log(error);
    })
    
});
}


editBranch();






});

