let C_URL = "../json/ranking_global.json"
fetch(C_URL)
    .then(response => response.json())
    .then(data => renderCountry(data))
    .catch(error => console.error("Lỗi:", error));

let b = document.getElementById("ds_r")

function renderCountry(data) {
    console.log(data);
    
    let itemHTML = "";
    let i = ""

    // data.forEach(a => {
    data.forEach(a=>{

        i=`         <div class="giao_dien">

                        <div class="dcgd">

                            <p>Top</p>

                            <p class="bo_ipad">Quốc gia</p>

                        </div>
                        <p>Thành tích</p>

                    </div>
`

        itemHTML += `
            <div class="giao_dien_1">

                        <div class="dcgd_1">
                            <div class="chu-gl">
                                <p>${a.id}</p>
                            </div>
                            <div style="display:flex;">
                                <img src="${a.flag}" class="ten_nuoc" width="75px" height="50px">
                                <p style="margin: 0;">${a.name}</p>
                            </div>

                        </div>
                        <p>${a.number}</p>

                    </div>`})
    
    i = i + itemHTML
    b.innerHTML = i;
}

renderCountry()

renderAccountMenu();