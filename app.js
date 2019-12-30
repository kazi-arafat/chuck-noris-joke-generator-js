document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    e.preventDefault();
    const number = document.getElementById('number').value;
    // console.log('Number ',number);
    // console.log('Type of number',typeof number);
    if (number != '') {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
        xhr.onload = function () {
            if (this.status === 200) {
                const response = JSON.parse(this.responseText);
                let output = '';
                console.log(response);
                if (response.type === "success") {
                    response.value.forEach(function (joke) {
                        output += `
                            <li>${joke.joke}</li>`
                    });
                } else {
                    output += `Error in processing request`
                }
                document.querySelector('.jokes').innerHTML = output;
            }
        }
        xhr.send();
    } else {
        console.log('Please enter how many jokes can be generated!!');
        document.querySelector('.msg').firstChild.innerHTML = '*';
        document.querySelector('.msg').firstChild.style.color = '#ff0000';
        setTimeout(function () {
            document.querySelector('.msg').removeChild(document.querySelector('.msg').firstChild);
        }, 2000);
        
    }
}