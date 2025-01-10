document.addEventListener("DOMContentLoaded", () => {
  fetch("posts.json")
    .then((response) => response.json())
    .then((posts) => renderPosts(posts));

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
      const title = post.querySelector(".post-title").textContent.toLowerCase();
      post.style.display = title.includes(query) ? "block" : "none";
    });
  });
});

// 渲染博文列表
function renderPosts(posts) {
  const postList = document.getElementById("post-list");
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h3 class="post-title">${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <p class="post-content">${post.content}</p>
    `;
    postElement.querySelector(".post-content").style.display = "none"; // 隐藏完整内容
    postElement.addEventListener("click", () => togglePost(postElement, index));
    postList.appendChild(postElement);
  });
}

let currentlyExpandedIndex = null;

function togglePost(postElement, index) {
  const content = postElement.querySelector(".post-content");
  const excerpt = postElement.querySelector(".post-excerpt");

  if (currentlyExpandedIndex === index) {
    // 当前已展开，折叠
    content.style.animation = "fadeOut 0.5s forwards";
    excerpt.style.animation = "fadeIn 0.5s forwards";
    setTimeout(() => {
      content.style.display = "none";
      excerpt.style.display = "block";
    }, 500);
    currentlyExpandedIndex = null;
  } else {
    // 展开新博文
    const previousExpanded = document.querySelector(".post-expanded");
    if (previousExpanded) {
      // 折叠之前展开的博文
      const previousContent = previousExpanded.querySelector(".post-content");
      const previousExcerpt = previousExpanded.querySelector(".post-excerpt");
      previousContent.style.animation = "fadeOut 0.5s forwards";
      previousExcerpt.style.animation = "fadeIn 0.5s forwards";
      setTimeout(() => {
        previousContent.style.display = "none";
        previousExcerpt.style.display = "block";
        previousExpanded.classList.remove("post-expanded");
      }, 500);
    }

    // 展开当前点击的博文
    content.style.display = "block";
    excerpt.style.display = "none";
    content.style.animation = "fadeIn 0.5s forwards";
    postElement.classList.add("post-expanded");
    currentlyExpandedIndex = index;
  }
}
