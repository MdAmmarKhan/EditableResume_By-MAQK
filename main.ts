// Function to generate the resume and make it editable
function generateResume() {
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const middleName = (document.getElementById('middleName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const institution = (document.getElementById('institution') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;

    // Handle profile picture preview
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    let profilePictureURL = '';
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePictureURL = e.target?.result as string;
            displayResume(profilePictureURL);
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
        displayResume('');
    }

    // Function to display the resume with inline editing
    function displayResume(profilePictureURL: string) {
        const resumeContent = `
            <h2 contenteditable="true" id="editableName">${firstName} ${middleName} ${lastName}'s Resume</h2>
            <div>
                ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">` : ''}
            </div>
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> <span contenteditable="true" id="editableEmail">${email}</span></p>
            <p><strong>Contact:</strong> <span contenteditable="true" id="editableContact">${contact}</span></p>
            <p><strong>Address:</strong> <span contenteditable="true" id="editableAddress">${address}</span></p>
            <h3>Education</h3>
            <p><strong>Degree:</strong> <span contenteditable="true" id="editableDegree">${degree}</span></p>
            <p><strong>Institution:</strong> <span contenteditable="true" id="editableInstitution">${institution}</span></p>
            <h3>Skills</h3>
            <p contenteditable="true" id="editableSkills">${skills}</p>
            <h3>Work Experience</h3>
            <p contenteditable="true" id="editableExperience">${experience}</p>
        `;

        // Display the resume preview in the div
        const resumePreview = document.getElementById('resumePreview');
        if (resumePreview) {
            resumePreview.innerHTML = resumeContent;
        }

        // Add event listeners to track changes
        makeResumeEditable();
    }
}

// Function to add event listeners to the editable sections
function makeResumeEditable() {
    const editableFields = [
        { id: 'editableName', target: ['firstName', 'middleName', 'lastName'] },
        { id: 'editableEmail', target: 'email' },
        { id: 'editableContact', target: 'contact' },
        { id: 'editableAddress', target: 'address' },
        { id: 'editableDegree', target: 'degree' },
        { id: 'editableInstitution', target: 'institution' },
        { id: 'editableSkills', target: 'skills' },
        { id: 'editableExperience', target: 'experience' },
    ];

    editableFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.addEventListener('input', (e: Event) => {
                const targetField = Array.isArray(field.target) ? field.target : [field.target];
                targetField.forEach(tf => {
                    (document.getElementById(tf) as HTMLInputElement).value = (e.target as HTMLElement).innerText;
                });
            });
        }
    });
}

// Function to download the resume as a PDF using jsPDF
function downloadPDF() {
    const { jsPDF } = window as any;
    const doc = new jsPDF();

    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const middleName = (document.getElementById('middleName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const institution = (document.getElementById('institution') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;

    // Add content to the PDF
    doc.text(`${firstName} ${middleName} ${lastName}'s Resume`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Contact: ${contact}`, 10, 30);
    doc.text(`Address: ${address}`, 10, 40);
    doc.text(`Degree: ${degree}`, 10, 50);
    doc.text(`Institution: ${institution}`, 10, 60);
    doc.text(`Skills: ${skills}`, 10, 70);
    doc.text(`Experience: ${experience}`, 10, 80);

    // Save the PDF
    doc.save('resume.pdf');
}

// Add event listeners to the buttons
document.getElementById('generateResume')?.addEventListener('click', generateResume);
document.getElementById('downloadPDF')?.addEventListener('click', downloadPDF);
