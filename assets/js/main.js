$(document).ready(function() {
  
//  at start load assets from the database
    function getRequest() {
    axios.get('http://treeapi.ramonterry.com/api/branches')
    .then(function(response) {
        let resData = response.data;
  
        var result = resData.map(function(a) {
           var branch = a.name;
           var branchId = a.id;
           var newId = "New" + branchId;
           var branchChildren = a.children;
           var branchStart = a.range_start;
           var branchEnd = a.range_finish;
            
           function appendGet() {
                return $("#branches")
                .append("<ul" + " " + "id=New" + branchId + ">" + "<button" + " " + "type=" +
                "button" + " " + "title=" + branch + " " + "class='branchButton btn btn-success'" +
                " " +  "data-toggle=" + "modal" + " " + "data-target=" + "#treeForm" 
                + " " + "id=" + branchId + " " + "value=" + branchId +  
                " " + ">" + branch + "</button>" + "</ul>");

           }
           appendGet();
           for (var i = 0; i < branchChildren; i++) {
            var random = Math.floor((Math.random() * branchEnd) + branchStart);
             function randomChild() {
              $("#" + newId).append("<li>" + random + "</li>");
            }
             randomChild();
        }
        }
        
    );
    
    })
    .catch(function (error) {
        console.log(error);
      });
  
    
}

getRequest();

// post new branch to the database
$("#branchSubmit").click(function(event) {
    event.preventDefault();
function postBranch() {
    var branchInput = $("#inputNode").val();
    
    
    axios.post('http://treeapi.ramonterry.com/api/branches', {
        name: branchInput
        
    })
    .then(function (response) {

       $("#branches").empty();
       getRequest(); 
        
  
    })
    .catch(function (error) {
        console.log(error);
    });
    
}
postBranch();

});

// edit branch name from the database
function editBranch() {
$(document).on('click', '.branchButton', function(event){
    event.preventDefault();
    var branchText = this.title;
    var currentId = this.id;
   
    $("#nameUpdate").attr("placeholder",branchText);
    $(".nameUpdate").attr("id",currentId);
});
    $(document).on('click', '.nameUpdate', function(event){
        event.preventDefault(); 
        var updateId = this.id;  
        var nameUpdate = $("#nameUpdate").val();
        
    axios.patch('http://treeapi.ramonterry.com/api/branches/' + updateId, {
        name: nameUpdate
        
        
    })
    .then(function (response) {
     var replaceBranch = response.data.name;
  

     $("#branches").empty();
     getRequest();
        
        
  
    })
    .catch(function (error) {
        console.log(error);
    });
    
});
}


editBranch();
// add and edit child number from the database
function editChild() {
    $(document).on('click', '.branchButton', function(event){
        event.preventDefault();
        var currentId = this.id;
        var childValue = 0;
        
        $("#childUpdate").attr("placeholder",childValue);
        $(".childUpdate").attr("id",currentId);
        $(".rangeUpdate").attr("id",currentId);
    });
        $(document).on('click', '.childUpdate', function(event){
            event.preventDefault(); 
            var updateId = this.id;  
            var childUpdate = $("#childUpdate").val();
            if (childUpdate > 15) {
                alert("Enter value between 0-15");
                return false;
            }
         

        axios.patch('http://treeapi.ramonterry.com/api/branches/' + updateId, {
            children: childUpdate
            
            
        })
        .then(function (response) {
         let replaceChild = response.data.children;
         var branch = "New" + response.data.id;
         
         
         
       
         for (var i = 0; i < replaceChild; i++) {
            var random = Math.floor((Math.random() * 100) + 1);
             function randomChild() {
              $("#" + branch).append("<li>" + random + "</li>");
            }
             randomChild();
        } 
    })
        .catch(function (error) {
            console.log(error);
        });
        
    });
    
    // add and edit range of random numbers for each child
    $(document).on('click', '.rangeUpdate', function(event){
        event.preventDefault(); 
        var updateId = this.id;  
        var rangeStart = $("#rangeStart").val();
        var rangeEnd = $("#rangeEnd").val();
        if (rangeStart < 1 || rangeEnd < 2) {
            alert("Enter start value greater than 1 and value greater than 2");
            return false;
        }
       

    axios.patch('http://treeapi.ramonterry.com/api/branches/' + updateId, {
        range_start: rangeStart,
        range_finish: rangeEnd
        
        
    })
    .then(function (response) {
     var replaceStart = response.data.range_start;
     var replaceEnd = response.data.range_finish;
     var branch = "New" + response.data.id;
     var child = response.data.children;
     
     
   
   
     for (var i = 0; i < child; i++) {
        var random = Math.floor((Math.random() * replaceEnd) + rangeStart);
         function randomChild() {
          $("#" + branch).append("<li>" + random + "</li>");
        }
         randomChild();
    } 
})
    .catch(function (error) {
        console.log(error);
    });
    
});
    }
    
    
    editChild();

    
// delete branch completely from database
function deleteBranch() {
    $(document).on('click', '.branchButton', function(event){
        event.preventDefault();
        
        var currentId = this.id;
        
        $(".deleteButton").attr("id",currentId);
    });
        $(document).on('click', '.deleteButton', function(event){
            event.preventDefault(); 
            var deleteId = this.id;  
            
        axios.delete('http://treeapi.ramonterry.com/api/branches/' + deleteId, {
                
        })
        .then(function (response) {
         var replaceBranch = response.data.name;
         
    
         $("#branches").empty();
         getRequest();
            
            
      
        })
        .catch(function (error) {
            console.log(error);
        });
        
    });
    }
    
    
    deleteBranch();



        

});

