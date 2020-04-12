window.addEventListener("load", () => {
    
    //DOM Cache

    const canvas = document.querySelector("#canvas");
    const clear = document.querySelector(".clear");
    const ctx = canvas.getContext("2d");

    //buttons
    const colorButton = document.querySelector(".color")
    const strokeButton = document.querySelector(".strokeSize")
    const opacityButton = document.querySelector(".opacity")
    //toolbar DIVS
    const colorDiv = document.querySelector(".colorDiv");
    const strokeDiv = document.querySelector(".strokeDiv");
    const opacityDiv = document.querySelector(".opacityDiv");
    //sliders
    const strokePicker = document.querySelector(".stroke_picker");
    const colorLabel = document.querySelector(".colorDiv p");
    const redPicker = document.querySelector(".red_picker");
    const bluePicker = document.querySelector(".blue_picker");
    const greenPicker = document.querySelector(".green_picker");
    const opacityPicker = document.querySelector(".opacity_picker");

    //Resizing
    function resizeWindow() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    resizeWindow();

    //Drawing functions

    let painting = false;

    function startPosition (e) {
        painting = true;
        draw(e);
    }

    function finishedPosition () {
        painting = false;
        ctx.beginPath();
    }

    function draw (e) {
        if(!painting) return;

        ctx.strokeStyle = 
        `rgba(${redPicker.value}, 
            ${greenPicker.value}, 
            ${bluePicker.value}, 
            ${(opacityPicker.value)/100})`

        ctx.lineWidth = strokePicker.value;
        ctx.lineCap = 'round';
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    //UI Button and Display Handling

    function clearDrawing() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("cleared!");
    }

    function showColor() {
        if(colorDiv.style.display === "none") {
            colorDiv.style.display = "block";
        } else {
            colorDiv.style.display = "none";
        }
    }
    showColor();

    function changeDiv() {
         colorDiv.style.background = 
            `rgba(${redPicker.value}, 
                ${greenPicker.value}, 
                ${bluePicker.value}, 
                1)`;
         colorButton.style.background = 
            `rgba(${redPicker.value}, 
                ${greenPicker.value}, 
                ${bluePicker.value}, 
                1)`;
        colorLabel.innerText =`rgb(${redPicker.value}, ${greenPicker.value}, ${bluePicker.value})`
        opacityDiv.style.background = 
            `rgba(100, 100, 240, ${(opacityPicker.value)/100})`

    }

    function showStrokeSize() {
        if(strokeDiv.style.display === "none") {
            strokeDiv.style.display = "block";
        } else {
            strokeDiv.style.display = "none";
        }
    }
    showStrokeSize();

    function showOpacity() {
        if(opacityDiv.style.display === "none") {
            opacityDiv.style.display = "block";
        } else {
            opacityDiv.style.display = "none";
        }
    }
    showOpacity();

    //event listeners

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    clear.addEventListener('click', clearDrawing);
    colorButton.addEventListener('click', showColor);
    strokeButton.addEventListener('click', showStrokeSize);
    opacityButton.addEventListener('click', showOpacity);
    redPicker.addEventListener('input', changeDiv);
    greenPicker.addEventListener('input', changeDiv);
    bluePicker.addEventListener('input', changeDiv);
    opacityPicker.addEventListener('input', changeDiv);
    window.addEventListener('resize', resizeWindow);

});


//TODO

//Pop up range slider on stroke size button -DONE
//Pop up color sliders on color button -DONE
//Re-designate canvas size on resize -DONE
//figure out how to fix mouse-leaving-the-canvas-draw bug -POSTPONED
//finish styling of toolbar- DONE
//re-structure code to make it more your own and not just copied from a tutorial - DONE
//... possible circle/rectangle tools? -POSTPONED
//erasure tool (FULL WHITE FULL SIZE) -INDEFINITELY POSTPONED
//if we add that, add a first session pop=up tutorial window
//pat yourself on the back for an actually completed project