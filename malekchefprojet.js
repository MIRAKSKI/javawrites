let h = "AKfycbzS7xT3yK7YXviM6DUz4QwpWvqTPdTri88uFgXxtdANURBcTm8A86G9j7zoridJtzyi";
const WEB_APP_URL = "https://script.google.com/macros/s/passkey/exec";
WEB_APP_URL.replace("passkey", decoderX(h));
function sendData(dataElement) {
  const formData = new FormData();
  const payload = {
    newData: dataElement.value,
    timestamp: new Date().toLocaleString('ar-EG')
  };
  formData.append('jsonPayload', JSON.stringify(payload));
  fetch(WEB_APP_URL, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    if (result.status === 'success') {
      //responseElement.textContent = `✅ نجح التعديل: ${result.message}\n\nمحتوى الملف بعد التعديل:\n${JSON.stringify(result.content, null, 2)}`;
    } else {
      //responseElement.textContent = `❌ فشل التعديل: ${result.message}`;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
function opendialog(id) {
  let holder = document.createElement('div');
  holder.setAttribute("class", "hdiag");
  for (var i = 0; i < 4; i++) {
    let hl = document.createElement('div');
    hl.setAttribute("class", "hhldiag");
    if (i == 0) {
      let ttl = document.createElement('p');
      ttl.innerText = id;
      let cls = document.createElement('input');
      cls.setAttribute("onclick", "closediag()");cls.setAttribute("type", "button");
      cls.setAttribute("class", "clsbtn");cls.setAttribute("value", "X");
      hl.appendChild(ttl);hl.appendChild(cls);
      let br = document.createElement('br');
      hl.appendChild(br);
    }
    else if (i == 1) {
      let ttl = document.createElement('p');
      ttl.innerText = "Date:";
      hl.appendChild(ttl);
      let slct = document.createElement("select");
      slct.setAttribute("id", "DD");slct.setAttribute("class", "selector");
      for (var d = 0; d < 31; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = (d+1);
        slct.appendChild(pp);
      }
      hl.appendChild(slct);
      let month = ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let slctt = document.createElement("select");
      slctt.setAttribute("id", "MM");slctt.setAttribute("class", "selector");
      for (var d = 0; d < 12; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = month[d];
        slctt.appendChild(pp);
      }
      hl.appendChild(slctt);
      let year = ["2025", "2026"];
      let slcttt = document.createElement("select");
      slcttt.setAttribute("id", "YYYY");slcttt.setAttribute("class", "selector");
      for (var d = 0; d < 2; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = year[d];
        slcttt.appendChild(pp);
      }
      hl.appendChild(slcttt);
    }
    else if (i == 2) {
      let ttl = document.createElement('p');
      ttl.innerText = "Expe:";
      hl.appendChild(ttl);
      let exp = ["Nul", "SONIC", "CORE SAMPLE"];
      let slcttt = document.createElement("select");
      slcttt.setAttribute("id", "exp");slcttt.setAttribute("class", "selector");
      for (var d = 0; d < 3; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = exp[d];
        slcttt.appendChild(pp);
      }
      hl.appendChild(slcttt);
    }
    else {
      let btn = document.createElement('input');
      id = id.replace("'", "%");id = id.replace("\"", "#");
      btn.setAttribute("onclick", "setitemx('"+id+"')");btn.setAttribute("type", "button");
      btn.setAttribute("class", "seteditbtn");btn.setAttribute("value", "SET!");
      hl.appendChild(btn);
    }
    holder.appendChild(hl);
  }
  let bg = document.createElement('div');
  bg.setAttribute("class", "bgdiag");
  bg.setAttribute("id", "seteditdiag");
  bg.appendChild(holder);
  document.getElementsByTagName('body')[0].appendChild(bg);
}
function setitemx(id) {
  if (cryppassKey != passKey) {
    return;
  }
  id = id.replace("%", "'");id = id.replace("#", "\"");
  let dd = document.getElementById('DD').value;
  let mm = document.getElementById('MM').value;
  let yy = document.getElementById('YYYY').value;
  let exp = document.getElementById('exp').value;
  let fulldate = dd+"/"+mm+"/"+yy;
  let log = id+":"+fulldate+":"+exp;
  sendData(log);
  dec[id] = [fulldate, exp];
  document.getElementById(id).removeAttribute("class");
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).setAttribute("class", "eleypro");
  document.getElementById(id).setAttribute("onclick", "viewer(this.id)");
  closediag();
}
function editdialog(id) {
  closediag();
  id = id.replace("%", "'");id = id.replace("#", "\"");
  let fulldatede = dec[id][0];
  fulldatede = fulldatede.split("/");
  let dd = fulldatede[0];
  let mm = fulldatede[1];
  let yyyy = fulldatede[2];
  let exprt = dec[id][1];
  let holder = document.createElement('div');
  holder.setAttribute("class", "hdiag");
  for (var i = 0; i < 4; i++) {
    let hl = document.createElement('div');
    hl.setAttribute("class", "hhldiag");
    if (i == 0) {
      let ttl = document.createElement('p');
      ttl.innerText = id;
      let cls = document.createElement('input');
      cls.setAttribute("onclick", "closediag()");cls.setAttribute("type", "button");
      cls.setAttribute("class", "clsbtn");cls.setAttribute("value", "X");
      hl.appendChild(ttl);hl.appendChild(cls);
      let br = document.createElement('br');
      hl.appendChild(br);
    }
    else if (i == 1) {
      let ttl = document.createElement('p');
      ttl.innerText = "Date:";
      hl.appendChild(ttl);
      let slct = document.createElement("select");
      slct.setAttribute("id", "DD");slct.setAttribute("class", "selector");
      for (var d = 0; d < 31; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = (d+1);
        slct.appendChild(pp);
      }
      slct.value = dd;
      hl.appendChild(slct);
      let month = ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let slctt = document.createElement("select");
      slctt.setAttribute("id", "MM");slctt.setAttribute("class", "selector");
      for (var d = 0; d < 12; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = month[d];
        slctt.appendChild(pp);
      }
      slctt.value = mm;
      hl.appendChild(slctt);
      let year = ["2025", "2026"];
      let slcttt = document.createElement("select");
      slcttt.setAttribute("id", "YYYY");slcttt.setAttribute("class", "selector");
      for (var d = 0; d < 2; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = year[d];
        slcttt.appendChild(pp);
      }
      slcttt.value = yyyy;
      hl.appendChild(slcttt);
    }
    else if (i == 2) {
      let ttl = document.createElement('p');
      ttl.innerText = "Expe:";
      hl.appendChild(ttl);
      let exp = ["Nul", "SONIC", "CORE SAMPLE"];
      let slcttt = document.createElement("select");
      slcttt.setAttribute("id", "exp");slcttt.setAttribute("class", "selector");
      for (var d = 0; d < 3; d++) {
        let innr = d;
        let pp = document.createElement("option");
        pp.innerText = exp[d];
        slcttt.appendChild(pp);
      }
      slcttt.value = exprt;
      hl.appendChild(slcttt);
    }
    else {
      let btn = document.createElement('input');
      id = id.replace("'", "%");id = id.replace("\"", "#");
      btn.setAttribute("onclick", "setEDITED('"+id+"')");btn.setAttribute("type", "button");
      btn.setAttribute("class", "seteditbtn");btn.setAttribute("value", "CONFORM!");
      hl.appendChild(btn);
    }
    holder.appendChild(hl);
  }
  let bg = document.createElement('div');
  bg.setAttribute("class", "bgdiag");
  bg.setAttribute("id", "seteditdiag");
  bg.appendChild(holder);
  document.getElementsByTagName('body')[0].appendChild(bg);
}
function setEDITED(id) {
  if (cryppassKey != passKey) {
    return;
  }
  id = id.replace("%", "'");id = id.replace("#", "\"");
  let dd = document.getElementById('DD').value;
  let mm = document.getElementById('MM').value;
  let yy = document.getElementById('YYYY').value;
  let exp = document.getElementById('exp').value;
  let fulldate = dd+"/"+mm+"/"+yy;
  let log = id+":"+fulldate+":"+exp;
  sendData(log);
  dec[id] = [fulldate, exp];
  document.getElementById(id).removeAttribute("class");
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).setAttribute("class", "eleypro");
  document.getElementById(id).setAttribute("onclick", "viewer(this.id)");
  closediag();
}

