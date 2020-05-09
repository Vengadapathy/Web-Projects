// WINDOW ON LOAD
console.log("Hello");

//SELECTORS
var inputs = document.getElementsByClassName('input');
var tableDiv = document.querySelector('#tableDiv');
var tableNode = document.querySelector('.tableClass');

var add = document.getElementById('add');
var edit = document.getElementById('edit');
var dell = document.getElementById('delete');

var selectedRow ;
var editDelButtonRow ;


//EVENTS
add.addEventListener('click',checkInputs);
tableNode.addEventListener('click',showButtons);



//FUNCTIONS
function checkInputs(){
    if(isNaN(inputs[0].value)===false){
        alert('Check Student Name');
    } else if(isNaN(parseInt(inputs[1].value))===true ){
        alert('Check your RollNo');
    } else if(isNaN(parseInt(inputs[2].value))===true || isNaN(parseInt(inputs[3].value))===true || isNaN(parseInt(inputs[4].value))===true || (parseInt(inputs[2].value) >100 && parseInt(inputs[2].value) < 0 ) || (parseInt(inputs[3].value) >100 && parseInt(inputs[3].value) < 0 ) || (parseInt(inputs[4].value) > 100 && parseInt(inputs[4].value) < 0 ) ){
        alert('Please Enter a valid marks from 0 - 100');
    } else {
            addTableData();
    }
}

function addTableData(){
    // checkInputs();
    var row = document.createElement('tr');
    row.classList.add('rowDiv');

    for(var index of inputs){
        console.log(typeof index);
        let data = document.createElement('td');
        data.classList.add('tableData');
        let textData = document.createTextNode(index.value);
        data.appendChild(textData);
        row.appendChild(data);
        index.value="";
    }  
    var total = calculateTotal(row.lastElementChild);
    let data = document.createElement('td');
        data.classList.add('tableData');
        let textData = document.createTextNode(total);
        data.appendChild(textData);
        row.appendChild(data);

    var average = calculateAverage(row.lastElementChild).toPrecision(4);
        data = document.createElement('td');
        data.classList.add('tableData');
        textData = document.createTextNode(average);
        data.appendChild(textData);
        row.appendChild(data);
    
    tableNode.appendChild(row);
    
}

function calculateTotal(node){
    console.log(node);
    var sum = 0;
    for(var index=0;index<3;index++){
        sum += parseInt(node.innerText);
        node = node.previousElementSibling;
        console.log(sum);
    }
    return parseInt(sum);
}

function calculateAverage(node){
    return parseInt(node.innerText) / 3;
}

function editTableData(data){
    var cells = data.getElementsByTagName("td");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = cells[i].innerHTML;
        }
    data.nextElementSibling.remove();
    data.remove();
}

function dellTableData(data){
    data.nextElementSibling.remove();
    data.remove();
}


function showButtons(event){
    if(editDelButtonRow !== undefined){
       editDelButtonRow.remove(); 
    }
    
    console.log(editDelButtonRow);
    if(event.target.classList[0]==='rowDiv' || event.target.classList[0]==='tableData'){
        var data = event.target.parentElement;
        var row = document.createElement('tr');
        row.classList.add('popupTr');
        var tableData = document.createElement('td');
        tableData.classList.add('popUpTd');
        tableData.setAttribute('colspan','100');
        var edit = document.createElement('button');
        edit.classList.add('edit');
        var textnode = document.createTextNode('Edit');
        edit.append(textnode);
        var dell = document.createElement('button');
        dell.classList.add('delete');
        var textnode = document.createTextNode('Delete');
        dell.append(textnode);
        tableData.appendChild(edit);
        tableData.appendChild(dell);

        row.appendChild(tableData);
        console.log(row);
        editDelButtonRow = row ;
        console.log(row);
        console.log(editDelButtonRow);

        tableNode.insertBefore(row,data.nextElementSibling);


        console.log(data.nextElementSibling);

        // tableDiv.lastElementChild.classList.add("show");
        
        edit.addEventListener('click', function(){
            editTableData(data);
            clearTimeout();
        });
        dell.addEventListener('click',function(){
            dellTableData(data);
            clearTimeout();
        });
        setTimeout(function(){
            hideButtons(data.nextElementSibling);
        },5000);
    }
}

function hideButtons(node){
    node.remove();
}