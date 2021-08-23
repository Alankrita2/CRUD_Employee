

//Adding Data to db.json using json server
function addEmp(){
   
    const id = document.getElementById('empID').value;
	const ename = document.getElementById('empName').value;
	const city = document.getElementById('city').value;
    let emp ={
        "id":id,
        "ename":ename,
        "city":city
    }
    fetch('http://localhost:3000/emp/',{
         method: 'POST',
         headers:{
            'Content-Type':'application/json' 
         },
         body:JSON.stringify(emp)
     }).then((res)=>{
         console.log(res);
         document.write("Employee details with employee id " + id + " is created");
 
     })
 }
 
 //Updating the Data in db.json using json server
 function editEmp(){
    const id = document.getElementById('empID').value;
	const ename = document.getElementById('empName').value;
	const city = document.getElementById('city').value;
     let emp ={
         "id":id,
         "ename":ename,
         "city":city
     }    
     fetch(`http://localhost:3000/emp/${id}`,{
         method:"PUT",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify(emp)
     }).then((res)=>{
         console.log(res);
         if (res.status === 404) {
            alert("ID requested to edit was not found!");
        }else
         document.write("Employee details with employee id " + id + " is edited");
     })
 }

 //Deleting Data in db.json using json server
 function deleteEmp(data){
   
    if (confirm('Are you sure to delete this record ?')) {
    }

    const id = data.id;
     fetch(`http://localhost:3000/emp/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
       }).then((res)=>{
        console.log(res);
        if (res.status === 404) {
            alert('ID requested to delete was not found!');
        }else{

            document.write("Employee details with employee id " + id + " is deleted");
            getAllEmp();
        }
    })
 }
 

 function deleteAll(){
   
    if(confirm('Are you sure to delete this record ?')) {
        
    }

     fetch("http://localhost:3000/emp/",{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
       }).then((res)=>{
        console.log(res);
        if (res.status === 404) {
            alert('ID requested to delete was not found!');
        }else{

            document.write("All Employee details are deleted!");
            getAllEmp();
        }
    })


 }
 //Fetching the Data from db.json using json server
 


 function getAllEmp(){
    fetch(`http://localhost:3000/emp?_sort=id&_order=asc`).then((res)=>{
       return res.json();
   }).then((emp)=>{
       console.log(emp);
       
           const employee = document.getElementById('employeeTable');
           while (employee.hasChildNodes()) {
               employee.removeChild(employee.firstChild);
           }

           const container = document.querySelector('.list');
           let template = `
           <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
            </thead>`;
           emp.forEach(item => {
            template += ` 
            <tbody>
            <tr>
            <td>${item.ename} </td>
            <td>${item.id} </td>
            <td>${item.city} </td>
            <td><a data-toggle="modal" data-target="#editModal"><i class="fa fa-edit action"></i> Edit</a>
            <a onClick="deleteEmp(this)"> <i class="fa fa-trash-o action"></i> Delete</a></td>
            </tr>
            </tbody>
            `           
            
           });
           container.innerHTML = template;
       
       
   })
}


function getEmp(){
   
    const id = document.getElementById('getEmpID').value;
    fetch(`http://localhost:3000/emp/${id}`).then((res)=>{
       return res.json();
   }).then((emp)=>{
       console.log(emp);
       
        const item = emp;
           const employee = document.getElementById('employeeTable');
           while (employee.hasChildNodes()) {
               employee.removeChild(employee.firstChild);
           }
           
           const container = document.querySelector('.list');
           let template = `
           <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>City</th>
                </tr>
            </thead>`;
           
            template += ` 
            <tbody>
            <tr>
            <td>${item.ename} </td>
            <td>${item.id} </td>
            <td>${item.city} </td>
            </tr>
            </tbody>`;   
            
           container.innerHTML = template;
   })
}


 