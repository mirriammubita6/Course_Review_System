document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const courseName = document.getElementById('courseName').value;
  const file = document.getElementById('materialUpload').files[0];

  const formData = new FormData();
  formData.append('courseName', courseName);
  formData.append('file', file);

  const res = await fetch('/api/lecturer/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token') // adjust if you use cookies
    },
    body: formData
  });

  const data = await res.json();
  alert(data.message);
});


document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const token = localStorage.getItem('token');

  const response = await fetch('/api/lecturer/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const result = await response.json();
  alert(result.message);
});


