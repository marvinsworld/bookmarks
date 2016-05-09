/**
 * 启动是加载
 */
chrome.tabs.onActivated.addListener(function () {
    chrome.bookmarks.getTree(function (data) {
        $.post("http://127.0.0.1:8000/chrome/", {bookmarks: JSON.stringify(data)}, function (result) {
            console.log(result);
        });
    });
});

/**
 * 批量创建书签
 * @param allBookmarks
 */
function createBookmarks(allBookmarks) {
    var childrenArr = allBookmarks.children[0].children;

    for (var i = 0; i < childrenArr.length; i++) {
        createRecur(childrenArr[i]);
    }
}

/**
 * 递归创建书签
 * @param bookmarksObj
 */
function createRecur(bookmarksObj) {
    chrome.bookmarks.create({
        "parentId": bookmarksObj.parentId,
        "index": bookmarksObj.index,
        "title": bookmarksObj.title,
        "url": bookmarksObj.url
    }, function (newFolder) {
        var childrenArr = bookmarksObj.children;
        if (childrenArr) {
            for (var i = 0; i < childrenArr.length; i++) {
                var bookmark = childrenArr[i];
                bookmark.parentId = newFolder.id;
                createRecur(bookmark);
            }
        }
    });
}

