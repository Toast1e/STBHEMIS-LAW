const popupContainer = document.querySelector(".popup-container");
const popupCloseBtn = document.querySelector("#popup-close-btn");
const popupTab = document.querySelector("#popup-tab");

document.addEventListener("DOMContentLoaded", function() {
  var overlay = document.getElementById("overlay-notice");
  var popupContainer = document.getElementById("popup-container-notice");
  var closeButton = document.getElementById("close-button-notice");
  
  var hasAccepted = localStorage.getItem("ACCEPTED");
  
  if (hasAccepted === null) {
    // Show the popup and overlay if the user hasn't accepted it before
    overlay.style.display = "block";
    popupContainer.style.display = "block";
  } else {
    // If the user has already accepted, show the popup every week
    setInterval(function() {
      overlay.style.display = "block";
      popupContainer.style.display = "block";
    }, 604800000);
  }
  
  closeButton.addEventListener("click", function() {
    // Store the fact that the user has accepted and hide the popup and overlay
    localStorage.setItem("ACCEPTED", true);
    overlay.style.display = "none";
    popupContainer.style.display = "none";
    
    // If the user has accepted, show the popup every week
    setInterval(function() {
      overlay.style.display = "block";
      popupContainer.style.display = "block";
    }, 604800000);
  });
  
  // Hide the overlay if the user has already accepted the popup before
  if (hasAccepted === "true") {
    overlay.style.display = "none";
  }
});










// show popup when page loads
window.onload = function() {
  popupContainer.classList.add("show");
};

// close popup when close button is clicked
popupCloseBtn.addEventListener("click", function() {
  popupContainer.classList.remove("show");
  popupTab.classList.add("show");
});

// show popup again when tab is clicked
popupTab.addEventListener("click", function() {
  popupContainer.classList.add("show");
  popupTab.classList.remove("show");
});

function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("subjects-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

fetch('engData.json')
.then(response => response.json())
.then(data => {
  const tableBody = document.querySelector('#subjects-table tbody');
  let totalPassValues = JSON.parse(localStorage.getItem('totalPassValues')) || [0, 0, 0, 0];
  let totalTakingValues = JSON.parse(localStorage.getItem('totalTakingValues')) || [0, 0, 0, 0];

  data.forEach((subject, index) => {
    const row = document.createElement('tr');
    const moduleCell = document.createElement('td');
    moduleCell.innerText = subject.id;
    row.appendChild(moduleCell);

    const kreditsCell = document.createElement('td');
    kreditsCell.innerText = subject.value;
    row.appendChild(kreditsCell);

    const takingCell = document.createElement('td');
    const takingCheckbox = document.createElement('input');
    takingCheckbox.type = 'checkbox';
    takingCheckbox.addEventListener('click', () => {
      if (takingCheckbox.checked) {
        passCheckbox.disabled = false;
        totalTakingValues[subject.label - 1] += parseInt(subject.value);
        localStorage.setItem(`${subject.id}-taking`, true);
      } else {
        passCheckbox.disabled = true;
        if (passCheckbox.checked) {
          passCheckbox.checked = false;
          totalPassValues[subject.label - 1] -= parseInt(subject.value);
          localStorage.removeItem(`${subject.id}-passed`);
        }
        totalTakingValues[subject.label - 1] -= parseInt(subject.value);
        localStorage.removeItem(`${subject.id}-taking`);
      }
      updateHemis();
    });

    takingCell.appendChild(takingCheckbox);
    row.appendChild(takingCell);

    const passCell = document.createElement('td');
    const passCheckbox = document.createElement('input');
    passCheckbox.type = 'checkbox';
    passCheckbox.disabled = true;
    passCheckbox.addEventListener('click', () => {
      if (passCheckbox.checked) {
        totalPassValues[subject.label - 1] += parseInt(subject.value);
        localStorage.setItem(`${subject.id}-passed`, true);
      } else {
        totalPassValues[subject.label - 1] -= parseInt(subject.value);
        localStorage.removeItem(`${subject.id}-passed`);
      }
      updateHemis();
    });

    if (localStorage.getItem(`${subject.id}-taking`) === 'true') {
      takingCheckbox.checked = true;
      passCheckbox.disabled = false;
      totalTakingValues[subject.label - 1] += parseInt(subject.value);
    }

    if (localStorage.getItem(`${subject.id}-passed`) === 'true') {
      passCheckbox.checked = true;
      totalPassValues[subject.label - 1] += parseInt(subject.value);
    }

    passCell.appendChild(passCheckbox);
    row.appendChild(passCell);

    // if (index > 1) {
      if (1<2) {
      tableBody.appendChild(row);
  } else {
    tableBody.appendChild(row).style.display = 'none';
  }
});

updateHemis();

function getSubjects() {
  const subjects = [];
  data.forEach((subject) => {
    const row = tableBody.querySelector(`tr td:first-child:contains(${subject.id})`).parentNode;
    if (row) {
          const takingCheckbox = row.querySelector('input[type="checkbox"]:first-child');
          const passCheckbox = row.querySelector('input[type="checkbox"]:last-child');
          const subjectData = {
            id: subject.id,
            taking: takingCheckbox.checked,
            passed: passCheckbox.checked,
          };
          subjects.push(subjectData);
        }
      });
      return subjects;
    }

    function updateHemis() {
      const hemis = document.querySelector('#hemis');
      let totalHemisValue = 0;
      for (let i = 0; i < 4; i++) {
        if (totalTakingValues[i] > 0) {
          const hemisValue = (totalPassValues[i] / totalTakingValues[i]).toFixed(2);
          totalHemisValue += parseFloat(hemisValue);
        }
      }
      hemis.innerText = `HEMIS: ${(totalHemisValue).toFixed(2)}`;
    }

          const popupContainer = document.querySelector(".popup-container");
          const popupCloseBtn = document.querySelector("#popup-close-btn");
          const popupTab = document.querySelector("#popup-tab");
          
          // show popup when page loads
          window.onload = function() {
            popupContainer.classList.add("show");
          };
          
          // close popup when close button is clicked
          popupCloseBtn.addEventListener("click", function() {
            popupContainer.classList.remove("show");
            popupTab.classList.add("show");
          });
          
          // show popup again when tab is clicked
          popupTab.addEventListener("click", function() {
            popupContainer.classList.add("show");
            popupTab.classList.remove("show");
          });
        });
