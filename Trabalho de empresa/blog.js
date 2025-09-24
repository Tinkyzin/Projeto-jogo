// blog.js - Sistema simples de comentários usando localStorage

function openPost(id){
  document.getElementById('post-view').classList.add('show');
  document.getElementById('post-content').innerHTML = '<h3>Post '+id+'</h3><p>Conteúdo do post...</p>';
  loadComments(id);
}

function closePost(){
  document.getElementById('post-view').classList.remove('show');
}

function loadComments(id){
  let comments = JSON.parse(localStorage.getItem('comments_'+id) || '[]');
  let list = document.getElementById('comments-list');
  list.innerHTML='';
  comments.forEach(c=>{
    let div = document.createElement('div');
    div.className='comment';
    div.innerHTML=`<div class='who'>${c.name}</div><div class='text'>${c.text}</div>`;
    list.appendChild(div);
  });
}

function addComment(e){
  e.preventDefault();
  let name = document.getElementById('comment-name').value;
  let text = document.getElementById('comment-text').value;
  let postId = document.querySelector('.post-view.show') ? document.querySelector('.post-view.show').id : 'post-1';
  let comments = JSON.parse(localStorage.getItem('comments_'+postId)||'[]');
  comments.push({name,text});
  localStorage.setItem('comments_'+postId, JSON.stringify(comments));
  document.getElementById('comment-form').reset();
  loadComments(postId);
}
