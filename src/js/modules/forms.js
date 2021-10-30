function forms() {
    const forms = document.querySelectorAll('form'),
        message = {
            loading: 'img/spinner.svg',
            success: 'thanks we will phone you later',
            failure: 'somthing wrong...'
        };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            body: data,
            mode: 'no-cors'
        });
        return await res.json();

    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
   `;
            form.insertAdjacentElement('afterend', statusMessage);
            setTimeout(() => {
                statusMessage.remove();
            }, 2000);

            const formData = new FormData(form);

            // const json = JSON.stringify(Object.fromEntries(formData.entries()));

            const obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });
            console.log(obj);


            postData('http://localhost:3000/requests', JSON.stringify(obj))
                .then(obj => {
                    console.log(obj);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);

                }).finally(() => {

                    form.reset();
                });
        })
    }
    //JSON form



    /*  request.send(json);

        console.log(request.response); */
    /*  request.addEventListener('load', () => {
           if (request.status === 200) {
               showThanksModal(message.success);
                form.reset(); 
           } else {
               showThanksModal(message.failure);
           }
       }); 
    });*/
}

module.exports = forms;