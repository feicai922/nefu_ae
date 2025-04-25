/*-------------------------------------
容器显示隐藏的初始化
-------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  // 模块展示容器
  document.querySelectorAll(".work-details-container").forEach((container) => {
    container.style.display = "none";
  });
  // 展示处理结果的容器(图片/视频)
  document.querySelectorAll(".local-test-result").forEach((container) => {
    container.style.display = "none";
  });
  // 本地测试案例的输入框(视频)
  document.querySelectorAll(".load-video-container").forEach((container) => {
    container.style.display = "none";
  });
  // 本地测试案例的显示框(视频)
  document.querySelectorAll(".video-preview").forEach((container) => {
    container.style.display = "none";
  });
  document.getElementById("load").style.display = "flex"; // 默认显示模块
});

/*-------------------------------------
保证同一组选择性按钮只能选中一个
-------------------------------------
*/
// 保证一次只选中一个项目
$(".button-group").each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on("click", "button", function () {
    $buttonGroup.find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
  });
});

/*-------------------------------------
模块展示界面切换
-------------------------------------
*/
// 获取所有模块按钮并添加点击事件
document.querySelectorAll(".wdbutton").forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target"); // 获取按钮的data-target属性
    const targetContent = document.getElementById(targetId); // 获取对应的内容容器
    // 隐藏所有模块容器
    document
      .querySelectorAll(".work-details-container")
      .forEach((container) => {
        container.style.display = "none";
        if (container.classList.contains("show")) {
          container.classList.remove("show");
        }
      });

    // 显示指定的内容
    if (targetContent) {
      targetContent.style.display = "flex";
      targetContent.classList.add("show");
    } else {
      console.log("not find container", targetId);
    }
  });
});

/*-------------------------------------
左侧导航栏切换
-------------------------------------
*/
// 确保导航栏选中的
document.querySelectorAll(".cbutton").forEach((button) => {
  button.addEventListener("click", function () {
    const show_container = document.querySelector(
      ".work-details-container.show"
    ); // 获取当前显示的模块的容器
    const targetId = this.getAttribute("data-target"); // 获取按钮的data-target属性
    const choose_container = show_container.querySelector(".container"); // 获取内容容器
    const targetContent = choose_container.querySelector("." + targetId); // 获取对应的内容
    // 滑动到指定页面
    if (targetContent) {
      targetContent.scrollIntoView({ behavior: "smooth", block: "start" }); // 滚动到指定内容
      window.scrollTo({
        behavior: "smooth",
        top: targetContent.offsetTop - 80,
      });
    } else {
      console.log("not find container", targetId);
      console.log("show-container", show_container);
      console.log("choose_container", choose_container);
    }
  });
});

/*-------------------------------------
示例视频播放
-------------------------------------
*/
// 点击播放按钮，开始播放，播放时播放按钮消失
document.querySelectorAll("#display-video-play").forEach((a) => {
  a.addEventListener("click", function () {
    const parent_container = this.parentElement; // 获取当前按钮的父元素
    const video = parent_container.querySelector("video");
    if (video) {
      if (video.paused) {
        // 如果视频处于暂停状态
        video.play().then(
          (r) =>
            // 隐藏播放按钮
            (this.style.display = "none")
        ); // 播放视频
      }
    } else {
      console.log("not find video");
      console.log("show-container", show_container);
    }
  });
});

// 点击视频，视频暂停并显示播放按钮
document.querySelectorAll(".display-video").forEach((video) => {
  video.addEventListener("click", function () {
    const video_container = this.parentElement;
    const display_a = video_container.querySelector(".popup-video");
    if (!this.paused) {
      // 如果视频正在播放
      this.pause();
      display_a.style.display = "block";
    } else if (this.paused) {
      // 如果视频处于暂停状态
      this.play(); // 播放视频
      display_a.style.display = "none";
    }
  });
});

/*-------------------------------------
本地测试案例播放
-------------------------------------
*/
// 图片/视频处理界面切换(upload-container)
document.querySelectorAll(".local-load").forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const show_container = document.querySelector(".work-details-container.show"); // 获取当前显示的模块的容器
    const choose_container = show_container.querySelector(".container");
    const local_test = choose_container.querySelector(".local-test");
    const upload_container = local_test.querySelector(".upload-container");
    if (targetId === "image") {
      // 显示图片处理界面
      upload_container.querySelector(".load-image-container").style.display = "flex"; // 显示内容1
      upload_container.querySelector(".load-video-container").style.display = "none"; // 显示内容1

      upload_container.querySelector(".img-preview").style.display = "flex"; // 默认隐藏内容2
      upload_container.querySelector(".video-preview").style.display = "none"; // 默认隐藏内容2

    } else if (targetId === "video") {
      // 显示视频处理界面
      upload_container.querySelector(".load-video-container").style.display = "flex"; // 显示内容1
      upload_container.querySelector(".load-image-container").style.display = "none"; // 显示内容1

      upload_container.querySelector(".video-preview").style.display = "flex"; // 默认隐藏内容2
      upload_container.querySelector(".img-preview").style.display = "none"; // 默认隐藏内容2
    }
  });
});

/* ****************************
处理任务选择
****************************** */
document.querySelectorAll(".upload-select").forEach((select) => {
  select.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const myDictionary = {
      目标检测: "detect",
      目标追踪: "track",
      实例分割: "segment",
      pose检测: "pose",
      自主避障: "obstacle",
      人脸识别: "face",
      货物分拣: "sorting",
      局部路径: "localPath",
      全局路径: "globalPath",
    };
    this.setAttribute("data-target", myDictionary[selectedOption.text]);
    console.log("选中的选项内容:", selectedOption.text);
  });
});

/* ****************************
图片/视频处理
****************************** */
// 显示上传图片/视频
document.querySelectorAll(".imageUpload").forEach((input) => {
  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const showContainer = document.querySelector(
      ".work-details-container.show"
    ); // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector(".local-test"); // 获取当前显示的模块的localTest
    const upload_container = localTest.querySelector(".upload-container");
    const img_container = upload_container.querySelector(".img-preview");
    img_container.querySelector("img").src = URL.createObjectURL(file);
  });
});
document.querySelectorAll(".videoUpload").forEach((input) => {
  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const showContainer = document.querySelector(
      ".work-details-container.show"
    ); // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector(".local-test"); // 获取当前显示的模块的localTest
    const upload_container = localTest.querySelector(".upload-container");
    const video_container = upload_container.querySelector(".video-preview");
    video_container.querySelector("video").src = URL.createObjectURL(file);
  });
});

// 开始处理按钮的点击事件
document.querySelectorAll(".start-process").forEach((button) => {
  button.addEventListener("click", function () {
    const showContainer = document.querySelector(".work-details-container.show"); // 获取当前显示的模块的容器
    const localTest = showContainer.querySelector(".local-test"); // 获取当前显示的模块的localTest
    // 判断处理图片还是处理视频
    const loadButton = localTest.querySelector(".local-load");
    // 获取图片/视频的输入容器
    const upload_container = localTest.querySelector(".upload-container");
    const upload_box = upload_container.querySelector(".upload-box");
    // 获取结果显示的容器
    const imageDisplay = localTest.querySelector(".after-deal-image");
    const videoDisplay = localTest.querySelector(".after-deal-video");
    const responseContainer = upload_container.querySelector(".response").querySelector("pre"); // 获取当前显示文本的容器
    // 获取图片/视频的处理方式
    const uploadSelect = upload_container.querySelector(".upload-select-start").querySelector("select"); // 获取功能选择下拉框
    const function_name = uploadSelect.getAttribute("data-target"); // 获取当前选择的功能
    console.log(upload_container);
    console.log("showContainer:", showContainer);
    console.log("upload_box", upload_box);
    console.log("imageDisplay", imageDisplay);
    console.log("videoDisplay", videoDisplay);
    if (loadButton.classList.contains("is-checked") && loadButton.getAttribute("data-target") === "image") {
      if (function_name === "sorting" || function_name === "face") {
        processImageWithText(
          upload_box.querySelector(".load-image-container").querySelector("input"),
          function_name,
          imageDisplay,
          responseContainer
        ).then((r) => console.log(function_name, "use processImageWithText"));
      } else {
        processImage(
          upload_box.querySelector(".load-image-container").querySelector("input"),
          function_name,
          imageDisplay,
          responseContainer
        ).then((r) => console.log(function_name, "use processImageWithText"));
      }
    } else if (function_name === "obstacle") {
      processVideo_obstacle(
        upload_box.querySelector(".load-video-container").querySelector("input"),
        function_name,
        videoDisplay,
        responseContainer
      ).then((r) => console.log(function_name, "use processVideo_obstacle"));
    } else {
      processVideo(
        upload_box.querySelector(".load-video-container").querySelector("input"),
        function_name,
        videoDisplay,
        responseContainer
      ).then((r) => console.log(function_name, "use processVideo"));
    }
  });
});

// 内网穿透网址
const port = "http://nefu.free.idcfengye.com";
// const port = "http://127.0.0.1:8080";
// 图片处理函数(不反回文本)
async function processImage(
  fileInput,
  function_name,
  imageDisplay,
  responseContainer
) {
  if (!fileInput.files.length) {
    responseContainer.textContent = "请先选择图片文件";
    return;
  }
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const response = await fetch(
      port + "/api/image/" + function_name + "_image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      errorDiv.textContent = error || "图片处理失败";
      return;
    }

    // 获取图片Blob
    const imageBlob = await response.blob();

    // 显示结果-图片
    imageDisplay.src =  URL.createObjectURL(imageBlob);
    imageDisplay.style.display = "flex";
  } catch (error) {
    responseContainer.textContent = `请求失败: ${error.message}`;
  }
}
// 图片处理函数(返回文本)
async function processImageWithText(
  fileInput,
  function_name,
  imageDisplay,
  responseContainer
) {
  if (!fileInput.files.length) {
    responseContainer.textContent = "请先选择图片文件";
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("image", file);
  console.log("formData", formData);

  // Step 1: Upload image and get JSON response
  fetch(port + "/api/" + function_name + "_image", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      response.json();
      console.log("responcejson", response.json());
    })
    .then((data) => {
      responseContainer.textContent = JSON.stringify(data, null, 2);

      const processedImageUrl = data.processedImageUrl;
      if (processedImageUrl) {
        return fetch(port + processedImageUrl);
      } else {
        throw new Error("Processed image URL not found in response.");
      }
    })
    .then((response) => response.blob())
    .then((blob) => {
      imageDisplay.src = URL.createObjectURL(blob);
      imageDisplay.style.display = "flex";
      console.log("change flex", imageDisplay);
    })
    .catch((error) => {
      console.error("Error:", error);
      responseContainer.textContent = "An error occurred: " + error.message;
    });
}

// 视频处理函数
async function processVideo(
  fileInput,
  function_name,
  videoDisplay,
  responseContainer
) {
  if (!fileInput.files.length) {
    responseContainer.textContent = "请先选择视频文件";
    return;
  }

  const formData = new FormData();
  formData.append("video", fileInput.files[0]);

  try {
    const response = await fetch(
      port + "/api/video/" + function_name + "_video",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      errorDiv.textContent = error || "视频处理失败";
      return;
    }

    // 获取视频Blob
    const videoBlob = await response.blob();

    // 显示视频
    videoDisplay.src = URL.createObjectURL(videoBlob);
    const videoContainer = videoDisplay.parentElement;
    videoContainer.style.display = "flex";
  } catch (error) {
    responseContainer.textContent = `请求失败: ${error.message}`;
  }
}

// 局部路径规划处理函数
async function processVideo_obstacle(
  fileInput,
  function_name,
  videoDisplay,
  responseContainer
) {
  if (!fileInput.files.length) {
    responseContainer.textContent = "请先选择视频文件";
    return;
  }

  if (!videoDisplay) {
    responseContainer.textContent = "视频播放器未正确初始化";
    return;
  }

  const formData = new FormData();
  formData.append("video", fileInput.files[0]);

  try {
    const response = await fetch(
      port + "/api/plan-path/" + function_name + "_video",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      responseContainer.textContent = error || "视频处理失败";
      return;
    }

    console.log(response.status); // 打印响应状态码
    console.log(response.statusText); // 打印响应状态文本

    const videoBlob = await response.blob();
    console.log(videoBlob.type); // 检查返回的 MIME 类型
    console.log(videoBlob.size); // 检查返回的文件大小

    if (!videoBlob.type.startsWith("video/")) {
      responseContainer.textContent = "返回的内容不是视频文件";
      return;
    }

    if (videoBlob.size === 0) {
      responseContainer.textContent = "返回的视频文件为空";
      return;
    }

    const videoUrl = URL.createObjectURL(videoBlob);
    console.log(videoUrl); // 打印生成的 URL

    // 清除 <video> 元素中的所有子元素
    while (videoDisplay.firstChild) {
      videoDisplay.removeChild(videoDisplay.firstChild);
    }

    // 设置新的视频源
    videoDisplay.src = videoUrl;
    const videoContainer = videoDisplay.parentElement;
    videoContainer.style.display = "flex";

    videoDisplay.addEventListener("loadedmetadata", () => {
      console.log("视频元数据加载完成");
    });

    videoDisplay.addEventListener("canplay", () => {
      console.log("视频可以播放");
      videoDisplay.play(); // 自动播放视频
    });
  } catch (error) {
    responseContainer.textContent = `请求失败: ${error.message}`;
  }
}
