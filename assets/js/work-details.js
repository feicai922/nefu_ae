/*-------------------------------------
保证同一组选择性按钮只能选中一个
-------------------------------------*/
// 保证一次只选中一个项目
$(".button-group").each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function() {
        $buttonGroup.find(".is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
    });
});


/*-------------------------------------
模块展示界面切换
-------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".work-details-container").forEach(container => {
    container.style.display = "none";
  });
  document.getElementById("load").style.display = "flex"; // 默认显示内容1
});
document.querySelectorAll(".wdbutton").forEach(button => {
    button.addEventListener("click", function() {
      const targetId = this.getAttribute("data-target"); // 获取按钮的data-target属性
      const targetContent = document.getElementById(targetId); // 获取对应的内容容器
      const upload_box = targetContent.getElementById("upload-box");
      // 隐藏所有内容
      document.querySelectorAll(".work-details-container").forEach(container => {
        container.style.display = "none";
        if (container.classList.contains("show")) {
          container.classList.remove("show");
        }
      });

      // 显示指定的内容
      if (targetContent) {
        targetContent.style.display = "flex";
        upload_box.style.display = "block";
        targetContent.classList.add("show");
      } else {
        console.log("not find container", targetId)
      }
    });
});


/*-------------------------------------
左侧导航栏切换
-------------------------------------*/
// 确保导航栏选中的

document.querySelectorAll(".cbutton").forEach(button => {
  button.addEventListener("click", function() {
    const show_container = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const targetId = this.getAttribute("data-target"); // 获取按钮的data-target属性
    const choose_conteainer = show_container.querySelector(".container"); // 获取内容容器
    const targetContent = choose_conteainer.querySelector("#"+targetId); // 获取对应的内容

    if (targetContent){
      targetContent.scrollIntoView({behavior: "smooth", block: "start"}); // 滚动到指定内容
      window.scrollTo({
        behavior: "smooth",
        top: targetContent.offsetTop - 80
      })
    }else{
      console.log("not find container", targetId);
      console.log("show-container", show_container);
      console.log("choose_conteainer", choose_conteainer);
    }
  });
});


/*-------------------------------------
示例视频播放
-------------------------------------*/
// 获取视频元素

document.querySelectorAll("#display-video-play").forEach(a => {
  a.addEventListener("click", function() {
    const show_container = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const video = show_container.querySelector("#display-video");
    if (video){
      if (video.paused) { // 如果视频处于暂停状态
        video.play(); // 播放视频
      }
      // 隐藏播放按钮
      this.style.display = "none";
      console.log("show-container", show_container);
    }else{
      console.log("not find video");
      console.log("show-container", show_container);
    }
  }) 
});

// 获取暂停按钮并添加点击事件
document.querySelectorAll("#display-video").forEach(video => {
  video.addEventListener("click", function() {
    const show_container = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const display_a = show_container.querySelector("#display-video-play");
    if (!video.paused) { // 如果视频正在播放
      video.pause(); // 暂停视频
      display_a.style.display = "block";
    } else if (video.paused) { // 如果视频处于暂停状态
      video.play(); // 播放视频
      display_a.style.display = "none";
    }
  })
});


/*-------------------------------------
本地测试案例播放
-------------------------------------*/
// 显示内容切换
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".local-test-result").forEach(container => {
    container.style.display = "none";
  });
  // document.getElementById("before-deal").style.display = "flex"; // 默认显示内容1
});

// 图片/视频切换
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".display-result").forEach(container => {
    container.style.display = "none";
  });
  document.getElementById("load-image-container").style.display = "flex"; // 默认显示内容1
  document.getElementById("image-before").style.display = "flex"; // 默认隐藏内容2
});
document.querySelectorAll(".local-load").forEach(button => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    if(targetId == "image-test"){
      document.getElementById("load-image-container").style.display = "flex"; // 显示内容1
      document.getElementById("load-video-container").style.display = "none"; // 显示内容1

      document.getElementById("image-before").style.display = "flex"; // 默认隐藏内容2
      document.getElementById("video-before").style.display = "none"; // 默认隐藏内容2

      document.getElementById("load-video").src = "";
    }else if (targetId == "video-test") {
      document.getElementById("load-video-container").style.display = "flex"; // 显示内容1
      document.getElementById("load-image-container").style.display = "none"; // 显示内容1

      document.getElementById("video-before").style.display = "flex"; // 默认隐藏内容2
      document.getElementById("image-before").style.display = "none"; // 默认隐藏内容2
      document.getElementById("load-image").src = "assets/img/undeal-1.png";
    }
    document.getElementById('responseText').textContent = "";
    document.getElementById("after-deal-image").src = "assets/img/undeal-1.png";
  });
});



/* ****************************
处理任务选择
****************************** */
document.querySelectorAll("#upload-select").forEach(select => {
  select.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const myDictionary = {
      "目标检测": "detect",
      "目标追踪": "track",
      "实例分割": "segment",
      "pose检测": "pose",
      "自主避障": "obstacle",
      "人脸识别": "face",
      "货物分拣": "sorting"
    };
    this.setAttribute("data-target", myDictionary[selectedOption.text]);
    // 在控制台输出选中的选项内容
    console.log("选中的选项内容:", selectedOption.text);
  });
});

 
/* ****************************
图片/视频处理
****************************** */
// 显示上传图片/视频
document.querySelectorAll('#imageUpload').forEach(input => {
  input.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const showContainer = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector("#local-test") // 获取当前显示的模块的localTest
    localTest.querySelector("#load-image").src = URL.createObjectURL(file);
  })
});
document.querySelectorAll('#videoUpload').forEach(input => {
  input.addEventListener('change', function (event) {
    const file = event.target.files[0];
    const showContainer = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector("#local-test") // 获取当前显示的模块的localTest
    localTest.querySelector("#load-video").src = URL.createObjectURL(file);
  })
})



// 开始处理
document.querySelectorAll("#start-process").forEach(button => {
  button.addEventListener("click", function () {
    const showContainer = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector("#local-test") // 获取当前显示的模块的localTest
    const loadButton = localTest.querySelector("#local-load-image") // 获取当前显示的模块的loadButton
    const imageDisplay = localTest.querySelector("#after-deal-image") // 获取当前显示体图片的容器
    const responseContainer = localTest.querySelector("#responseText") // 获取当前显示文本的容器
    const uploadSelect = localTest.querySelector("#upload-select") // 获取功能选择下拉框
    const function_name = uploadSelect.getAttribute("data-target") // 获取当前选择的功能
    if (loadButton.classList.contains("is-checked")){
      if (function_name === "sorting" || function_name === "face"){
        console.log("function_name use with text", function_name);
        processImageWithText(localTest.querySelector("#imageUpload"), function_name, imageDisplay, responseContainer);
      }else{
        processImage(localTest.querySelector("#imageUpload"), function_name, imageDisplay, responseContainer);
      }
    }else{
      processVideo(localTest.querySelector("#videoUpload"), function_name, responseContainer);
    }
  })
})
const port = "https://80a8-2001-da8-b804-2-7860-2200-e71d-c3d5.ngrok-free.app";
// 图片处理函数
async function processImage(fileInput, function_name, imageDisplay, responseContainer) {

  if (!fileInput.files.length) {
      errorDiv.textContent = '请先选择图片文件';
      return;
  }

  const formData = new FormData();
  formData.append('image', fileInput.files[0]);

  try {
      const response = await fetch(port+'/api/image/'+function_name+'_image', {
          method: 'POST',
          body: formData,
          headers: {
            'ngrok-skip-browser-warning': 'true' // 添加跳过警告的请求头
          }
      });

      if (!response.ok) {
          const error = await response.text();
          errorDiv.textContent = error || '图片处理失败';
          return;
      }

      // 获取图片Blob
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      // 显示结果-图片
      imageDisplay.style.display = 'flex';
      imageDisplay.src = imageUrl;

  } catch (error) {
      responseContainer.textContent = `请求失败: ${error.message}`;
  }
}
// 图片处理函数带返回文本
async function processImageWithText(fileInput, function_name, imageDisplay, responseContainer) {
  if (!fileInput.files.length) {
    errorDiv.textContent = '请先选择图片文件';
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('image', file);

  // Step 1: Upload image and get JSON response
  fetch(port+'/api/' + function_name + '_image', {
    method: 'POST',
    body: formData,
    headers: {
      'ngrok-skip-browser-warning': 'true' // 添加跳过警告的请求头
    }
  })
    .then(response => response.json())
    .then(data => {
      responseContainer.textContent = JSON.stringify(data, null, 2);

      const processedImageUrl = data.processedImageUrl;
      if (processedImageUrl) {
        return fetch(port + processedImageUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true' // 添加跳过警告的请求头
          }
        });
      } else {
        throw new Error('Processed image URL not found in response.');
      }
    })
    .then(response => response.blob())
    .then(blob => {
      // Step 3: Display the processed image
      const imageUrl = URL.createObjectURL(blob);
      imageDisplay.src = imageUrl;
      imageDisplay.style.display = 'flex';
    })
    .catch(error => {
      console.error('Error:', error);
      responseContainer.textContent = 'An error occurred: ' + error.message;
    });
}

  // 视频处理函数
async function processVideo(fileInput, function_name, responseContainer) {
  const showContainer = document.querySelector(".work-details-container.show") // 获取当前显示的模块的容器
  const localTest = showContainer.querySelector("#local-test") // 获取当前显示的模块localTest
  const videoDisplay = localTest.querySelector("#local-video-display") // 获取当前显示视频的容器


  if (!fileInput.files.length) {
      errorDiv.textContent = '请先选择视频文件';
      return;
  }

  const formData = new FormData();
  formData.append('video', fileInput.files[0]);

  try {
      const response = await fetch(port+'/api/video/'+function_name+'_video', {
          method: 'POST',
          body: formData,
          headers: {
            'ngrok-skip-browser-warning': 'true' // 添加跳过警告的请求头
          }
      });

      if (!response.ok) {
          const error = await response.text();
          errorDiv.textContent = error || '视频处理失败';
          return;
      }

      // 获取视频Blob
      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);

      // 显示视频
      videoDisplay.style.display = 'flex';
      videoDisplay.src = videoUrl;

  } catch (error) {
      responseContainer.textContent = `请求失败: ${error.message}`;
  }
}
