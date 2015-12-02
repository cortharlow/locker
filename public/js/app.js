'use strict';
$(function() {
  console.log('Loaded!');

  $('#add-article').off('click').on('click').click((event) => {
    event.preventDefault();
    let articleUrl = $('#add-article-field').val();
    let encodedUrl = encodeURIComponent(articleUrl);
    console.log(encodedUrl);
    $.ajax({
      url: 'http://localhost:3000/api/' + encodedUrl
    }).done(function(data) {
      console.log(data);
      articlePreview(data);
    });
  });
});

var articlePreview = function(data) {
  var result = $('#json-data').append('<div>');
  result.attr('class', 'article');
  if (data.title == null && data.description == null) {
    alert('Error: This article is in a format that cannot be saved.');
  }
  else {
    if (data.title !== null) {
      result.append('<h2>' + data.title + '</h2>');
    }
    if (data.description !== null) {
      result.append('<h4>' + data.description + '</h4>');
    }
    if (data.images[0].url !== null) {
      result.append('<img src="' + data.images[0].url + '">');
    }
    result.append('<p>' + data.provider_name + '</p>');
  }
};
