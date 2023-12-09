import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
// import viewBook from './viewBook';

const viewAuthor = (obj = {}) => {
  clearDom();

  const domString = `
  <h3> ${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge badge-warning sale-badge"><i class="fa fa-heart" aria-hidden="true"></i></badge></h2>' : ''}
  <p>author email: ${obj.email}</p>
  <button type="button" class="btn btn-info" id="update-author--${obj.firebaseKey}"><i class="fa fa-edit btn btn-info" aria-hidden="true"></i></button>
  <button type="button" class="btn btn-danger" id="delete-author-btn--${obj.firebaseKey}"><i class="btn btn-danger fa fa-trash-alt" aria-hidden="true"></i></button>
  <br/>
  <br/>
  <h3>Books</h3>
`;

  renderToDOM('#form-container', domString);

  let authorCard = '';
  obj.booksArray.forEach((item) => {
    authorCard += `
    <div class="card">
    <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
    <div class="card-body" style="height: 180px;">
      <h5 class="card-title">${item.title}</h5>
        <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
        <hr>
        <i class="btn btn-success fa fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
        <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
        <i id="delete-book-btn--${item.firebaseKey}" class="btn btn-danger fa fa-trash-alt"></i>
    </div>
  </div>`;
  });
  console.warn(obj.booksArray);
  renderToDOM('#store', authorCard);
};

export default viewAuthor;
