let add_btn = document.getElementById("add-btn")
let task = document.getElementById("task")
let tasks_list = document.getElementById("tasks-list")
let err_msg = document.getElementById("err-msg")


// get the data
fetch('https://682199fa259dad2655afc100.mockapi.io/tasks')
      .then(response => response.json())
      .then(data => {

        data.forEach(element => {
            let new_task = document.createElement("li")
            new_task.innerText = element.text

            new_task.classList.add("list-group-item");
            new_task.classList.add("my-1");
            new_task.classList.add("rounded");
            new_task.classList.add("d-flex");
            new_task.classList.add("align-items-center");
            new_task.classList.add("justify-content-between");
            new_task.classList.add("flex-wrap");
            

            let del_btn = document.createElement("button")
            del_btn.innerText = "X"
            del_btn.classList.add("btn")
            del_btn.classList.add("btn-danger")

            // delete a task
            del_btn.addEventListener("click", () => {
                fetch(`https://682199fa259dad2655afc100.mockapi.io/tasks/${element.id}`, {
                    method: 'DELETE',
                }).then(() => {
                    location.reload();
                })
            })

            let span = document.createElement("span")
            span.innerText = element.time
            span.style.color = "grey"
            span.classList.add("px-3");

            let date_box = document.createElement("div")
            date_box.appendChild(span)
            date_box.appendChild(del_btn)
            date_box.classList.add("d-flex");
            date_box.classList.add("align-items-center");

            new_task.appendChild(date_box)
            // new_task.appendChild(span)
            // new_task.appendChild(del_btn)
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
    let date_text = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
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