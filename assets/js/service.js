
{/* <div class="video-container">
<video id="myVideo" controls>
    <source src="your-video-file.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
<br>
<button id="playButton">播放</button>
<button id="pauseButton">暂停</button>
</div> */}


// 获取视频元素
const video = document.getElementById("service-video");

// 获取播放按钮并添加点击事件
document.getElementById("service-play-button").addEventListener("click", function() {
    if (video.paused) { // 如果视频处于暂停状态
    video.play(); // 播放视频
    }
    // 隐藏播放按钮
    this.style.display = "none";
});

// 获取暂停按钮并添加点击事件
document.getElementById("service-video").addEventListener("click", function() {
    if (!video.paused) { // 如果视频正在播放
    video.pause(); // 暂停视频
    document.getElementById("service-play-button").style.display = "block";
    } else if (video.paused) { // 如果视频处于暂停状态
    video.play(); // 播放视频
    document.getElementById("service-play-button").style.display = "none";
    }
    // 显示播放按钮
    
});
