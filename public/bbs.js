"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');
let editingPostId = null;  // 編集中の投稿IDを保持
let replyingToPostId = null;  // 返信先の投稿IDを保持

// 投稿ボタンのクリック
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    if (editingPostId) {
        // 編集中の場合、既存の投稿を更新
        const params = {
            method: 'PUT',
            body: 'name=' + name + '&message=' + message,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const url = "/update/" + editingPostId;
        fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                let updatedPost = response.post;
                const postDiv = document.querySelector(`[data-id="${updatedPost.id}"]`);
                if (postDiv) {
                    postDiv.remove();
                    renderPost(updatedPost);
                }

                // 編集モードを解除
                editingPostId = null;
                document.querySelector('#name').value = "";
                document.querySelector('#message').value = "";
            });
    } else if (replyingToPostId) {
        // 返信の場合
        const params = {
            method: 'POST',
            body: 'name=' + name + '&message=' + message + '&parentId=' + replyingToPostId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const url = "/reply";
        fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                document.querySelector('#message').value = "";
                replyingToPostId = null;  // 返信後はIDをクリア
                const parentPostDiv = document.querySelector(`[data-id="${response.post.id}"]`);
                renderReplies(parentPostDiv, response.post.replies);  // 親投稿の下に返信を表示
            });
    } else {
        // 新しい投稿
        const params = {
            method: "POST",
            body: 'name=' + name + '&message=' + message,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const url = "/post";
        fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                document.querySelector('#message').value = "";
            });
    }
});

// 投稿をDOMに追加する関数
function renderPost(post) {
    let cover = document.createElement('div');
    cover.className = 'cover';
    cover.setAttribute('data-id', post.id);  // 投稿IDをセット

    let name_area = document.createElement('span');
    name_area.className = 'name';
    name_area.innerText = post.name;

    let mes_area = document.createElement('span');
    mes_area.className = 'mes';
    mes_area.innerText = post.message;

    // 編集ボタン
    let edit_button = document.createElement('button');
    edit_button.innerText = '編集';
    edit_button.addEventListener('click', () => {
        editingPostId = post.id;
        document.querySelector('#name').value = post.name;
        document.querySelector('#message').value = post.message;
    });

    // 削除ボタン
    let delete_button = document.createElement('button');
    delete_button.innerText = '削除';
    delete_button.addEventListener('click', () => {
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const url = "/delete/" + post.id;
        fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                cover.remove();  // 投稿削除後、DOMからも削除
            });
    });

    // 返信ボタン
    let reply_button = document.createElement('button');
    reply_button.innerText = '返信';
    reply_button.addEventListener('click', () => {
        replyingToPostId = post.id;
        document.querySelector('#message').focus();
    });

    // 返信エリア（もし返信があれば）
    if (post.replies && post.replies.length > 0) {
        renderReplies(cover, post.replies);
    }

    cover.appendChild(name_area);
    cover.appendChild(mes_area);
    cover.appendChild(edit_button);
    cover.appendChild(delete_button);
    cover.appendChild(reply_button);

    bbs.appendChild(cover);
}

// 親投稿の下に返信を表示するための関数
function renderReplies(postDiv, replies) {
    replies.forEach(reply => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'reply';

        let reply_name = document.createElement('span');
        reply_name.className = 'name';
        reply_name.innerText = reply.name;

        let reply_message = document.createElement('span');
        reply_message.className = 'mes';
        reply_message.innerText = reply.message;

        replyDiv.appendChild(reply_name);
        replyDiv.appendChild(reply_message);
        postDiv.appendChild(replyDiv);
    });
}

// 投稿の読み込み
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            if (number != value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            renderPost(mes);
                        }
                    });
            }
        });
});