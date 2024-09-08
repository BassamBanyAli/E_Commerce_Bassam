async function editcategory(event) {
    event.preventDefault();
    let EditID = Number(localStorage.getItem('EditID'));

    const url = `https://localhost:7000/api/Categories_Bassam/GetCategoryById/${EditID}`;
var form=document.getElementById("form");
    const formData = new FormData(form);
    console.log(formData);

  const response = await fetch(url, {
        method: 'PUT',
        body:formData
    });
    console.log(response);

    if (response.ok) {
        const data = await response.json();
        console.log('Category updated successfully:', data);
    } else {
        console.error('Failed to update category:', response.status, response.statusText);
    }

    window.location.href="categories.html";
}