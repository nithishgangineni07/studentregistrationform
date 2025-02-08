let students = JSON.parse(localStorage.getItem('students')) || [];
if (!Array.isArray(students)) {
    students = []; 
}
let editingIndex = -1;

const form = document.getElementById("student-form");
const tableBody = document.getElementById("record-body");
const submitBtn = document.getElementById("submitBtn");

const fields={
    name:document.getElementById("studentname"),
    id:document.getElementById("studentid"),
    studentClass:document.getElementById("studentClass"),
    email:document.getElementById("studentemail"),
    contact:document.getElementById("studentcontact"),
};

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}


function renderTable() {
    tableBody.innerHTML = students.map((student, index) => `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
             <td>${student.studentClass}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="action-buttons">
                <button onclick="editStudent(${index})" class="edit-button">Edit</button>
                <button onclick="deleteStudent(${index})" class="delete-button">Delete</button>
            </td>
        </tr>
    `).join('');
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();


    const student={
        name:fields.name.value,
        id:fields.id.value,
        studentClass:fields.studentClass.value,
        email:fields.email.value,
        contact:fields.contact.value,
    };

    if (editingIndex === -1) {
        students.push(student);
    } else {
        students[editingIndex] = student;
        editingIndex = -1;
        submitBtn.textContent = 'Add Student';
    }

    saveStudents();
    renderTable();
    fields.name.value = "";
    fields.id.value = "";
    fields.studentClass.value = "";
    fields.email.value = "";
    fields.contact.value = "";


});




//EDIT STUDENT
window.editStudent =(index)=>{
    const student=students[index];
    fields.name.value=student.name;
    fields.id.value=student.id;
    fields.studentClass.value=student.studentClass;
    fields.email.value=student.email;
    fields.contact.value=student.contact;
    editingIndex=index;
    submitBtn.textContent='Update Student';

};

//DELETE STUDENT

window.deleteStudent=(index)=>{
    if(confirm('Are you  sure want to delete this student?')){
        students.splice(index,1);
        saveStudents();
        renderTable();
    }
 };

 document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});
