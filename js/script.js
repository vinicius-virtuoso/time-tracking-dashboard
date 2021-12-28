const menu = document.querySelectorAll('.item-list');
menu[1].classList.add('active');
menu.forEach((item) => {
  item.addEventListener('click', () => {
    menu.forEach((itemOut) => itemOut.classList.remove('active'))
    item.classList.add('active');
    let selectItem = item.innerHTML.toLowerCase();
    fetchData(selectItem);
  })

})

async function fetchData(date) {
  fetch('./js/data.json')
    .then((res) => res.json())
    .then(body => {
      const listBox = document.querySelector('.dados');
      listBox.innerHTML = '';
      for (let i = 0; i < body.length; i++) {
        let currentTime = body[i]['timeframes'][date]['current'];
        let previousTime = body[i]['timeframes'][date]['previous'];

        const box = document.createElement('div');
        box.classList.add('box');
        box.classList.add(body[i]['title'].toLowerCase().replace(' ', ''));
        listBox.appendChild(box)

        box.innerHTML = `
        <div class="box-info">
            <div class="header-box">
              <p class="action">${body[i]['title'] == 'SelfCare' ? 'Self Care' : body[i]['title']}</p>
              <div class="box-pointers">
                <span class="pointer"></span>
                <span class="pointer"></span>
                <span class="pointer"></span>
              </div>
            </div>
            <div class="box-time-infos">
              <p class="time">${currentTime}hrs</p>
              <span class="history">Last Week - ${previousTime}hrs</span>
            </div>
          </div>
      `
      }
    })
}
fetchData('weekly')





