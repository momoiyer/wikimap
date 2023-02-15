const renderMapCardForDetailPage = function(map) {
  const $html = `
  <header>
    <div>
      <input type="hidden" id="mapId" name="mapId" value="${map.id}">
      <p id="title-heart">${map.title}<i class="fa-solid fa-heart"></i></p>
      <p>${map.description}</p>
      <p><small>created on:${map.created_date}</small></p>
    </div>
  </header>
  `;
  return $html;
};


const renderMapEditForm = function(map) {
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <form class="edit-map">
    <div>edit map details</div>
    <input type="hidden" id="mapId" name="mapId" value="${map.id}">
    <div class="form-group">
      <label for="map-title">map name</label>
        <input type="text" name="title" class="form-control" id="map-title"  value="${map.title}">
    </div>
    <div class="form-group">
      <label for="map-description">description</label>
      <input type="text" name="description" class="form-control" id="map-description" value="${map.description}">
    </div >
    <button type="submit" class="btn btn-outline-dark btn-small">save</button>
  </form >
  `;
  return $html;
};


const renderCreateMapForm = function() {
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <form class="new-map">
    <div>create a new map</div>
    <div class="form-group">
      <label for="map-title">map name</label>
      <input type="text" name="title" class="form-control" id="map-title"  placeholder="">
    </div>
    <div class="form-group">
      <label for="map-description">description</label>
      <input type="text" name="description" class="form-control" id="map-description" placeholder="">
    </div>
    <button type="submit" class="btn btn-outline-dark btn-small">save</button>
  </form>
  `;
  return $html;
};


const renderManageContributorForm = function(contributors) {

  $('.manage-contributors').remove();
  const contributorListView = renderContributorsListView(contributors);
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <form class="manage-contributors">
    <div>current contributors</div>
    <ul class="view-contributors" style="list-style-type:none;">
      ${contributorListView}
    </ul >
    <div class="form-group">
      <label for="name-of-contributor">name</label>
      <input type="text" name="name" class="form-control" id="name-of-contributor" placeholder="">
    </div>
    <button type="submit" class="btn btn-outline-dark btn-small">add</button>
  </form >
  `;
  return $html;
};

const renderContributorsListView = function(contributors) {
  let $html = '';
  contributors.forEach(contributor => $html += ` <li><i  class="delete fa-solid fa-trash-can">&nbsp;&nbsp;</i>${contributor.name}</li> `);
  return $html;
};


const renderPointCard = function(point) {
  const $html = `
  <!-- append in to section.vertical-scroll-container #points-list of map details page -->

  <article class="point-card">
    <div>
      <img id="point-img" src="${point.image_url}">
      <div class="edit-delete-point">
        <i class="edit fa-regular fa-lg fa-pen-to-square">&nbsp;</i>
        <i class="delete fa-solid fa-lg fa-trash-can">&nbsp;</i>
      </div>
    </div>
    <div>
      <div>
        <p>${point.title}<p>
          <p>${point.description}</p>
          <p>${point.address_line_1}</p>
          <p>${point.address_line_2}</p>
        </div>
    </div>
  </article>
  `;

  return $html;
};

const renderPointCardCollection = function(points) {
  let $html = "";
  points.forEach(point => {
    const $pointCard = renderPointCard(point);
    $html += $pointCard;
  });
  return $html;
};
