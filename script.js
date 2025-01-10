// 加载博文数据
document.addEventListener("DOMContentLoaded", () => {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => renderPosts(posts));

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const posts = document.querySelectorAll(".post");
    posts.forEach(post => {
      const title = post.querySelector(".post-title").textContent.toLowerCase();
      post.style.display = title.includes(query) ? "block" : "none";
    });
  });
});

// 渲染博文列表
function renderPosts(posts) {
  const postList = document.getElementById("post-list");
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h3 class="post-title">${post.title}</h3>
      <p>${post.excerpt}</p>
    `;
    postElement.addEventListener("click", () => {
      alert(`完整内容：\n\n${post.content}`);
    });
    postList.appendChild(postElement);
  });
}
