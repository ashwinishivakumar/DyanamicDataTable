const deviceData = [
    { name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
    { name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
    { name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
    { name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
    { name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' }
];
var count = 0;
let checkBoxArrayList = [];

window.onload = () => {
    localStorage.clear();
    loadTableData (deviceData);
}

function loadTableData (deviceData) {
    let tableBody = document.getElementById('tableData');
    let input_field = document.getElementById('selectAll');
    let dataHtml = '';
    for (let device of deviceData) {
        dataHtml += `<tr id="main"><td><input type='checkbox' id='${device.device}' value='Device:${device.device}, Path:${device.path}'/></td><td>${device.name}</td><td>${device.device}</td>
            <td id="download">${device.path}</td><td id="status"><span id="statusClass"  ></span>${device.status}</td></tr>`

    }
    input_field.innerHTML = '<input type="checkbox" id="optionAll" onchange="checkAll(this,event)"/>'
    tableBody.innerHTML = dataHtml;

}

//This function in invoked by clicking on  Download Selected 
function callMe () {
    const checkLocalStore = localStorage.getItem("alertValues");
    if (checkLocalStore != null) {
        alert(localStorage.getItem("alertValues"));
    } else {
        alert ("Please select CheckBoxes!");
    }
    
}

//This function is invoked when each checkbox is selected.
let checkBox = function () {
    let checkBoxes = document.querySelectorAll("input");
    let selectLength = document.getElementById("selectCount");
    selectLength.innerHTML = count;
    addGreenDot();
    selectCheckBoxes(checkBoxes, selectLength);
    
}

// Till loadTableData function is excuted checkBox function is delayed.
setTimeout(checkBox, 300);

//This function is iterating through checkboxes and stores in local storage.
function selectCheckBoxes(checkBoxes, selectLength) {
    for (let checkBox of checkBoxes) {
        checkBox.addEventListener('click', function () {
            if (this.checked == true) {
                checkBoxArrayList.push(this.value);
                //Selected checkboxes values stored in local storage.
                localStorage.setItem('alertValues', JSON.stringify(checkBoxArrayList));

                if (checkBox.getAttribute("id") != "optionAll") {
                    checkBox.parentNode.parentNode.setAttribute("class", "tr");
                }
                count++;
                if (count <= 5) {
                    document.getElementById("selectCount").innerHTML = count;
                }
            } else if (count >= 1) {
                count--;
                checkBox.parentNode.parentNode.setAttribute("class", "trWhite");
                selectLength.innerHTML = count;
            }

        });
    }
}

//This function is invoked from html and this function used local storage to retrive values.
function checkAll (source, event) {
    let checkBoxes = document.querySelectorAll("input");
    let arrList = localStorage.getItem("alertValues");
    let calculateArrLength = calculateLength(arrList);

   selectAllCheckBoxes(checkBoxes, calculateArrLength, source);

}

//Select All checkboxes 
function selectAllCheckBoxes(checkBoxes, calculateArrLength, source) {
    for (let i = 0; i < checkBoxes.length; i++) {
        if (calculateArrLength == 5.5) {
            source.checked = false;
        }
        if (checkBoxes[i] != source) {
            checkBoxes[i].checked = source.checked;
            count = 5;
            checkBoxes[i].parentNode.parentNode.setAttribute("class", "tr");
            document.getElementById("selectCount").innerHTML = count;
        }
        if (source.checked == false) {
            count = 0;
            document.getElementById("selectCount").innerHTML = count;
            checkBoxes[i].parentNode.parentNode.setAttribute("class", "trWhite");
            this.count = count;
            localStorage.clear();
        }
    }
}

// Reusable function
function calculateLength(arrList) {
    if (arrList != null) {
        let pro = arrList.split(",");
        let calu = pro.length / 2;
        return calu;
       
    }
}


// For adding Green Icon infront of available status. 
function addGreenDot () {
    let statusTdes = document.querySelectorAll("#status");
    for (let statusTd of statusTdes) {
        if (statusTd.textContent == 'available') {
            statusTd.querySelector("#statusClass").setAttribute("class", "dot");
        } else {
            statusTd.querySelector("#statusClass").setAttribute("class", "");
        }
    }

}


