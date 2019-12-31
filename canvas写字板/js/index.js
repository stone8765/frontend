var canvasWidth, canvasHeight, canvas, context, lastLoc, isMouseDown, scolors;

lastLoc = { x: 0, y: 0 };
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left, y: y - bbox.top };//获取到了moveto的坐标点
}
window.onload = function () {

    document.getElementById('clear').addEventListener('click', function () {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid();
    });



    [].forEach.call(document.getElementsByClassName('color'), item => {
        item.addEventListener('click', function () {
            scolors = this.getAttribute('id');
        })
    });

    canvasWidth = 400;//设置canvas的宽度
    canvasHeight = 400;//设置canvas的高度
    canvas = document.getElementById("canvas");//找到canvas对象
    context = canvas.getContext("2d");//绘图环境
    // 绘制
    drawGrid();

    //获取到鼠标的坐标点
    canvas.onmousedown = function (e) {
        isMouseDown = true;
        lastLoc = windowToCanvas(e.clientX, e.clientY);

    }
    canvas.onmouseup = function (e) {
        isMouseDown = false;
    }
    canvas.onmouseout = function (e) {
        isMouseDown = false;
    }
    canvas.onmousemove = function (e) {

        if (isMouseDown) {
            var curLoc = windowToCanvas(e.clientX, e.clientY);//终点坐标
            context.beginPath();
            context.moveTo(lastLoc.x, lastLoc.y);//起点坐标
            context.lineTo(curLoc.x, curLoc.y);//终点坐标
            context.strokeStyle = scolors;
            context.lineWidth = 10;
            context.lineCap = "round";
            context.lineJion = "round";
            context.stroke();
            lastLoc = curLoc;

        }
    }

}


function drawGrid() {
    //绘制框
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.strokeStyle = "#f00";//设置线条的颜色
    context.beginPath();
    context.moveTo(0, 0);//起点坐标
    context.lineTo(canvasWidth, 0);//终点坐标
    context.lineTo(canvasWidth, canvasHeight);//终点坐标
    context.lineTo(0, canvasHeight);//终点坐标
    context.closePath();
    context.lineWidth = 6;
    context.stroke();//绘制

    // 绘制对角线
    context.beginPath();
    // 对角线
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);
    // 对角线
    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);
    // 横纵线和竖中线
    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);

    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);

    context.lineWidth = 1;
    context.stroke();//绘制
    context.closePath();

}