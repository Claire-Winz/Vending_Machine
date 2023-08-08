let wallet = 10000;
let insert = 0;
let machine = 0;
let menus = "";

const walletCoin = document.getElementById('myWallet');
const insertCoin = document.getElementById('insertCoin');
const machineCoin = document.getElementById('machineCoin');

const screenInsert = document.getElementById('screen');

function showPrice() {
    walletCoin.value = wallet;
    insertCoin.value = insert;
    machineCoin.value = machine;
}

showPrice();

function clickCoinButton(coinValue) {

    if (wallet >= parseInt(coinValue)) {
        screenInsert.append(coinValue + "원 투입.\n");

        insert += parseInt(coinValue);
        wallet -= parseInt(coinValue);

        showPrice();
        colorReset();
        colorChange(insert);

    } else {
        screenInsert.append("현재 소지금이 부족합니다.\n");
    }; 
}

let xhr = new XMLHttpRequest();

xhr.open("GET", 'vending_Object.json');

xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status ===200 ) {
        menus = JSON.parse(xhr.responseText);
        writeHTML(menus);
    }
};

function writeHTML(menuObj) {

    let Obj = document.getElementById('Obj');

    Obj.innerHTML = "";

    menuObj.forEach(function(menu){
        let button = document.createElement('button');
        
        button.type = 'button';
        button.value = menu.price;
        button.innerHTML = menu.name + "(" + menu.price + "원, 재고 수 : " + menu.stack + ")";
        addButtonFunction(button, menu);

        Obj.appendChild(button);
    }); 
}

function addButtonFunction(button, menu) {
    button.addEventListener('click', function() {
        
        if (menu.stack > 0) {
            if (insert >= menu.price) {
                screenInsert.append(menu.name + "구매.\n");
                insert -= menu.price;
                machine += menu.price;

                menu.stack -= 1;
                writeHTML(menus);
                
                showPrice();
                colorReset();
                colorChange(insert);
            } else {
                screenInsert.append("투입 금액이 부족합니다.\n");
            }
        } else {
            screenInsert.append(menu.name + "의 재고가 부족합니다.\n");

            wallet += insert;
            insert = 0;

            showPrice();
            colorReset();
            colorChange(insert);
        }
    });
}

function colorChange(insert) {
    let arrButton = document.querySelectorAll("button");

    for(let i = 0; i < arrButton.length; i++) {
        if(arrButton[i].name != "coin" && insert >= arrButton[i].value) {
            arrButton[i].setAttribute('class', 'done');
        }
    }
}

function colorReset() {
    let arrButton = document.querySelectorAll("button");

    for(let i = 0; i < arrButton.length; i++) {
        arrButton[i].classList.remove('done');
    }
}