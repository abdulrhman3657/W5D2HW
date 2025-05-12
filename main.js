let add_btn = document.getElementById("add-btn")
let task = document.getElementById("task")
let tasks_list = document.getElementById("tasks-list")
let err_msg = document.getElementById("err-msg")
let counter = document.getElementById("counter")
let delete_all_btn = document.getElementById("delete_all_btn")


// get the data
fetch('https://682199fa259dad2655afc100.mockapi.io/tasks')
      .then(response => response.json())
      .then(data => {

        localStorage.setItem("task_list", JSON.stringify(data))

        let localStorage_list = JSON.parse(localStorage.getItem("task_list"))

        // localStorage_list.forEach((element) => {
        //     console.log(element)
        // })


        data.forEach(element => {

            let new_task = document.createElement("li")

            let check_div = document.createElement("div")
            check_div.classList.add("d-flex");
            check_div.classList.add("align-items-center");
            check_div.classList.add("justify-content-center");

            let checkbox = document.createElement("input");
            checkbox.style.border = "1px solid";
            checkbox.classList.add("form-check-input");
            checkbox.type = "checkbox";

            let checkbox_inner_div = document.createElement("div");
            checkbox_inner_div.classList.add("px-2");
            checkbox_inner_div.innerText = element.text;

            checkbox.addEventListener('click', () => {
                if(checkbox.checked){
                    checkbox_inner_div.style.textDecoration = "line-through"
                } else {
                    checkbox_inner_div.style.textDecoration = "none"
                }
            })

            new_task.classList.add("list-group-item");
            new_task.classList.add("my-1");
            new_task.classList.add("rounded");
            new_task.classList.add("d-flex");
            new_task.classList.add("align-items-center");
            new_task.classList.add("justify-content-between");
            // new_task.classList.add("flex-wrap");
            
            let del_btn = document.createElement("button")
            del_btn.innerText = "X"
            del_btn.classList.add("btn")
            del_btn.classList.add("btn-danger")
            del_btn.classList.add("py-2")
            del_btn.classList.add("px-3")

            // delete a task
            del_btn.addEventListener("click", () => {
                fetch(`https://682199fa259dad2655afc100.mockapi.io/tasks/${element.id}`, {
                    method: 'DELETE',
                }).then(() => {
                    location.reload();
                })
            })

            // delete all tasks
            delete_all_btn.addEventListener("click", () => {
                data.forEach(element => {
                    fetch(`https://682199fa259dad2655afc100.mockapi.io/tasks/${element.id}`, {
                        method: 'DELETE',
                    }).then(() => {
                        location.reload()
                    })
                })
            })

            counter.innerText = data.length

            let span = document.createElement("span")
            span.innerText = element.time
            span.style.color = "grey"
            span.classList.add("px-3");

            let update_btn = document.createElement("button")
            update_btn.classList.add("btn")
            update_btn.classList.add("btn-success")
            update_btn.classList.add("mx-1")

            let update_icon = document.createElement("span")
            update_icon.classList.add("material-symbols-outlined")
            update_icon.innerText = "edit"

            update_btn.appendChild(update_icon)

            update_btn.addEventListener("click", () => {

                checkbox_inner_div.innerText = "" 

                let text_input = document.createElement("input");
                text_input.classList.add("form-control")
                text_input.value = element.text;

                text_input.addEventListener("keypress", (e) => {

                    if (e.key == "Enter"){

                        let date = new Date()
                        let date_text = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

                        fetch(`https://682199fa259dad2655afc100.mockapi.io/tasks/${element.id}`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                id: element.id,
                                text: text_input.value,
                                time: date_text
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                        .then(() => {
                            location.reload();
                        })
                    }
                })

                checkbox_inner_div.appendChild(text_input)

            })

            let date_box = document.createElement("div")

            check_div.appendChild(checkbox)
            check_div.appendChild(checkbox_inner_div)

            date_box.appendChild(span)
            date_box.appendChild(update_btn)
            date_box.appendChild(del_btn)

            date_box.classList.add("d-flex");
            date_box.classList.add("align-items-center");
            
            new_task.appendChild(check_div)

            new_task.appendChild(date_box)
            tasks_list.appendChild(new_task)
        });
})


// add new task      
add_btn.addEventListener("click", () => {

    if(task.value.length == "") {
        err_msg.innerText = "task must not be empty"
        return
    } else {
        err_msg.innerText = ""
    }

    let date = new Date()
    let date_text = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
    // post a new task
    fetch('https://682199fa259dad2655afc100.mockapi.io/tasks', {
        method: 'POST',
        body: JSON.stringify({
            text: task.value,
            time: date_text
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then(() => {
            location.reload();
    });
})