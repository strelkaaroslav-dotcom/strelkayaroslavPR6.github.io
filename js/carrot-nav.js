(function () {
  const tomatoes = [
    { id: 0, code: 'TAG 1000 (TAG 853)', name: 'Tomato Determinate Red Standard Round', img: 'images/t2.png' },
    { id: 1, code: 'TAG 1001 (TAG 855)', name: 'Tomato Determinate Red Standard Round', img: 'images/t3.png' },
    { id: 2, code: 'TAG 1002 (TAG 809)', name: 'Tomato Determinate Red Standard Round', img: 'images/t4.png' },
    { id: 3, code: 'TAG 1003 (TAG 834)', name: 'Tomato Determinate Red Standard Round', img: 'images/t5.png' },
    { id: 4, code: 'TAG 1004 (TAG 848)', name: 'Tomato Determinate Red BEEF Round', img: 'images/t6.png' },
    { id: 5, code: 'TAG 1005 (TAG 800)', name: 'Tomato Determinate Red Standard Round', img: 'images/t7.png' },
    { id: 6, code: 'TAG 1006 (TAG 898)', name: 'Tomato Determinate Red Elongated', img: 'images/t8.png' },
    { id: 7, code: 'TAG 1007 (TAG 816)', name: 'Tomato Determinate Red Elongated', img: 'images/t9.png' },
  ];

  const params = new URLSearchParams(window.location.search);
  let current = parseInt(params.get('id')) || 0;
  if (current < 0 || current >= tomatoes.length) current = 0;

  const t = tomatoes[current];


  const titleCode = document.querySelector('.pd-title-code');
  const titleName = document.querySelector('.pd-title-name');
  const photo = document.querySelector('.pd-photo');

  if (titleCode) titleCode.textContent = t.code;
  if (titleName) titleName.innerHTML = t.name.replace(' ', '<br>');
  if (photo) { photo.src = t.img; photo.alt = t.code; }


  const counter = document.getElementById('pd-counter');
  if (counter) counter.textContent = (current + 1) + ' / ' + tomatoes.length;


  const prevBtn = document.getElementById('pd-prev');
  const nextBtn = document.getElementById('pd-next');

  if (prevBtn) {
    if (current > 0) {
      prevBtn.href = 'carrot-one.html?id=' + (current - 1);
    } else {
      prevBtn.classList.add('pd-nav-disabled');
      prevBtn.href = '#';
    }
  }

  if (nextBtn) {
    if (current < tomatoes.length - 1) {
      nextBtn.href = 'carrot-one.html?id=' + (current + 1);
    } else {
      nextBtn.classList.add('pd-nav-disabled');
      nextBtn.href = '#';
    }
  }
})();
