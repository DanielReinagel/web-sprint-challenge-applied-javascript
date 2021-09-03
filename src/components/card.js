import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const authorImgContainerDiv = document.createElement('div');
  const authorImg = document.createElement('img');
  const authorNameSpan = document.createElement('span');

  cardDiv.className = 'card';
  headlineDiv.className = 'headline';
  authorDiv.className = 'author';
  authorImgContainerDiv.className = 'img-container';

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(authorImgContainerDiv);
  authorDiv.appendChild(authorNameSpan);
  authorImgContainerDiv.appendChild(authorImg);

  headlineDiv.textContent = article.headline;
  authorImg.src = article.authorPhoto;
  authorNameSpan.textContent = `By ${article.authorName}`;

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('http://localhost:5000/api/articles')
    .then(resp => {
      const r = resp.data['articles'];
      Object.keys(r).forEach(key => r[key].forEach(obj => document.querySelector(selector).appendChild(Card(obj))));
    })
    .catch(err => console.log(err));
}

export { Card, cardAppender }
