// import kit from '@canvas/index';
import kit from '../../../../src/canvas';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//  由于ctx.globalCompositeOperation = "destination-out"会影响到画布上已有的图像
//  所以需要先创建一个离屏canvas，把空心线绘制到离屏canvas上，再将离屏canvas绘制到页面的画布中
var tempCanvas = document.createElement("canvas");
tempCanvas.width = 800;
tempCanvas.height = 800;
// document.body.appendChild(tempCanvas);
var tempCtx = tempCanvas.getContext("2d");

// rgba 颜色提取专用画布
var colorCanvas = document.createElement("canvas");
colorCanvas.width = 1;
colorCanvas.height = 1;
var colorCtx = colorCanvas.getContext("2d");

// Z
var points = [
  kit.utils.newPoint(50,       50),
  kit.utils.newPoint(50 + 150, 50),
  kit.utils.newPoint(50,       50 + 150),
  kit.utils.newPoint(50 + 150, 50 + 150),
];
// F
var points2 = [
  kit.utils.newPoint(50 + 200 + 150, 50),
  kit.utils.newPoint(50 + 200,       50),
  kit.utils.newPoint(50 + 200,       50 + 60),
  kit.utils.newPoint(50 + 200 + 150, 50 + 60),
  kit.utils.newPoint(50 + 200,       50 + 60),
  kit.utils.newPoint(50 + 200,       200),
];
// K
var points3 = [
  kit.utils.newPoint(50 + 200 + 200,       50),
  kit.utils.newPoint(50 + 200 + 200,       200),

  kit.utils.newPoint(50 + 200 + 200,       200 - 80),
  kit.utils.newPoint(50 + 200 + 200 + 100, 50),

  kit.utils.newPoint(50 + 200 + 200 + 20,       200 - 90),
  kit.utils.newPoint(50 + 200 + 200 + 100, 200),
];


var options = {
  color: "#03a4fe", //  轨道颜色
  lineWidth: 26,    //  总宽度
  borderWidth: 8,   //  边框宽度
  shadowBlur: 20,   //  阴影模糊半径
  reflectOffsetX: 0,
  reflectOffsetY: 10, //  倒影偏移距离
};
var optionsInner = {
    color: "#03a4fe", //  轨道颜色
    innerColor: "#acacac",
    innerWidth: 10,    //  总宽度
    borderWidth: 8,   //  边框宽度
    shadowBlur: 6,   //  阴影模糊半径
    lineDashOffset: 0,
};

var isPause = false;
function update() {
  if (isPause) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  optionsInner.lineDashOffset += 0.4;
  draw(ctx, points, options, optionsInner);
  draw(ctx, points2, options, optionsInner);
  draw(ctx, points3, options, optionsInner);
  requestAnimationFrame(update);
}

update();

document.querySelector('#btn').onclick = function() {
  if (this.innerText === 'start') {
    this.innerText = 'pause';
    isPause = true;
  }
  else {
    this.innerText = 'start';
    isPause = false;
    update();
  }
};



// 绘制单个字
function draw(ctx, points, options, optionsInner) {
  paintTemp(tempCtx, points, options);
  ctx.drawImage(tempCanvas, 0, 0);

  paintInnerTemp(tempCtx, points, optionsInner);
  ctx.drawImage(tempCanvas, 0, 0);
}


// 绘制外轨道 (外轨 + 投影)
function paintTemp(ctx, points, options) {
  const { color, lineWidth, borderWidth, reflectOffsetX = 0, reflectOffsetY = 0, } = options;

  // 0. 清理
  ctx.clearRect(0, 0, tempCanvas.width,  tempCanvas.height);
  ctx.save();

  // 1. 倒影
  // 绘制倒影的时候透明度降低
  ctx.globalAlpha = 0.5;
  // 通过自调绘制一个倒影效果出来
  kit.shape.line.drawHollow(
    ctx,
    points.map(v => kit.utils.newPoint(v.x + reflectOffsetX, v.y + reflectOffsetY)),
    { color, lineWidth, borderWidth, shadowBlur: 0 }
  );
  // 恢复透明度
  ctx.globalAlpha = 1;

  // 2. 轨道
  kit.shape.line.drawHollow(ctx, points, options);

  // 3. 还原
  ctx.restore();
}

// 绘制轨道中间部分 (内轨 + 斑马线)
function paintInnerTemp(
  ctx,
  points,
  { color, innerWidth, borderWidth, innerColor, shadowBlur, lineDashOffset = 0, }
) {
  // 0. 清理
  ctx.clearRect(0, 0, tempCanvas.width,  tempCanvas.height);
  ctx.save();

  // 先根据中间部分的颜色绘制一条线出来
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  kit.path.line.draw(ctx, points);

  // 阴影
  ctx.lineWidth = innerWidth;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = shadowBlur;
  ctx.strokeStyle = innerColor;
  ctx.shadowColor = color;
  ctx.stroke();

  // 再根据轨道的主色调绘制一条透明度较低的虚线
  ctx.lineCap = "butt";
  ctx.setLineDash([5, 15]);
  ctx.lineDashOffset = lineDashOffset;
  kit.path.line.draw(ctx, points);
  const { r, g, b } = kit.utils.getRGBA(colorCtx, color);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`;
  ctx.stroke();

  // 3. 还原
  ctx.restore();
}